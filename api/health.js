// Tiny diagnostic: reports WHICH server env vars are configured — booleans only,
// never the values. Lets you (or the assistant) verify at a glance that the
// recording / AI features have what they need, without exposing any secret.
//   GET /api/health  →  { ok, env: {...}, features: {...} }
export default function handler(req, res) {
  const present = (v) => typeof v === "string" && v.trim().length > 0
  res.status(200).json({
    ok: true,
    env: {
      GITHUB_TOKEN: present(process.env.GITHUB_TOKEN),
      ADD_SECRET: present(process.env.ADD_SECRET),
      GROQ_API_KEY: present(process.env.GROQ_API_KEY),
      BLOB_READ_WRITE_TOKEN: present(process.env.BLOB_READ_WRITE_TOKEN),
      BLOB_STORE_ID: present(process.env.BLOB_STORE_ID),
    },
    // what each feature needs
    features: {
      addNote: present(process.env.GITHUB_TOKEN) && present(process.env.ADD_SECRET),
      aiTidyAndLectureNotes: present(process.env.GROQ_API_KEY),
      transcription: present(process.env.GROQ_API_KEY),
      // static token OR OIDC store id — either connects the private Blob store
      recordingBackup:
        present(process.env.BLOB_READ_WRITE_TOKEN) || present(process.env.BLOB_STORE_ID),
    },
  })
}
