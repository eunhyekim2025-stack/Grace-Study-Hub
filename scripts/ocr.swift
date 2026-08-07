// OCR one or more images using the macOS Vision framework, printing the text.
//
// Used by scripts/ingest.mjs for images and scanned PDFs. Vision is chosen over
// tesseract because it needs no install (it ships with macOS), reads Korean and
// English out of the box, and is more accurate on photographed pages — which is
// what handwriting-adjacent lecture material usually is.
//
//   swift scripts/ocr.swift [--lang en-US,ko-KR] <image> [<image> ...]
//
// Pages are printed in argument order, separated by a form feed so the caller
// can tell them apart. Exit 1 on an unreadable file; nothing is written to disk.

import Foundation
import Vision
import AppKit

var langs = ["en-US", "ko-KR"]
var paths: [String] = []

var args = Array(CommandLine.arguments.dropFirst())
while let a = args.first {
    args.removeFirst()
    if a == "--lang" {
        guard let v = args.first else {
            FileHandle.standardError.write("--lang needs a value\n".data(using: .utf8)!)
            exit(2)
        }
        args.removeFirst()
        langs = v.split(separator: ",").map(String.init)
    } else {
        paths.append(a)
    }
}

guard !paths.isEmpty else {
    FileHandle.standardError.write(
        "usage: ocr.swift [--lang en-US,ko-KR] <image>...\n".data(using: .utf8)!)
    exit(2)
}

for (i, path) in paths.enumerated() {
    guard let img = NSImage(contentsOfFile: path),
          let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil)
    else {
        FileHandle.standardError.write("cannot read image: \(path)\n".data(using: .utf8)!)
        exit(1)
    }

    let req = VNRecognizeTextRequest()
    req.recognitionLevel = .accurate       // slower, markedly better on dense text
    req.usesLanguageCorrection = true
    req.recognitionLanguages = langs

    do {
        try VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
    } catch {
        FileHandle.standardError.write(
            "OCR failed on \(path): \(error)\n".data(using: .utf8)!)
        exit(1)
    }

    // Vision returns observations in reading order; take the best candidate each.
    for obs in req.results ?? [] {
        if let best = obs.topCandidates(1).first {
            print(best.string)
        }
    }
    if i < paths.count - 1 { print("\u{0C}") } // form feed between pages
}
