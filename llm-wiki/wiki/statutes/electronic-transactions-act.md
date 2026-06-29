---
title: Electronic Transactions Act (ETA, Cap 88)
tags: [business-law, statute, singapore, electronic-contract, offer, acceptance, formation]
sources:
  - "law/statutes/(2a) Electronic Transactions Act.pdf"
  - law/Textbook.pdf
updated: 2026-06-23
relations:
  governs: [law-concepts/offer, law-concepts/acceptance, law-concepts/terms]
  see-also: [statutes/evidence-act]
pagerank: 0.0048
betweenness: 0.0038
eigenvector: 0.0890
degree: 9
community: 0
---

# Electronic Transactions Act (ETA, Cap 88)

> **Source**: Act 16 of 2010, Revised Edition 2011 (in force 2010-07-01). Implements UNCITRAL's **United Nations Convention on the Use of Electronic Communications in International Contracts (2005)** into Singapore law.

## Purpose and Scope

- **Long Title**: an Act to provide for the security and use of electronic transactions and to give effect to the UN Convention on Electronic Communications (2005) [Long Title].
- **Purpose (s 3)**: on a foundation of commercially reasonable interpretation — (a) to facilitate electronic communication by means of reliable electronic records, (b) to remove barriers to electronic commerce arising from uncertainties over writing and signature requirements, (d) to minimise forgery, alteration, and fraud, (g) consistency with the UN Convention. A distinctive feature is the express standard of **"commercially reasonable"** interpretation.
- **Exclusions (s 4 + First Schedule)**: some provisions do not apply to matters listed in the First Schedule (e.g., wills, dispositions of interests in land, negotiable instruments — areas traditionally requiring strict writing/signature formalities). The ETA therefore does **not** electronify *all* transactions.
- **Party autonomy (s 5)**: the provisions of Part II may be **excluded or supplemented** by agreement between the parties. In particular s 5(3) — parties may, by agreement, exclude the application of, or vary the effect of, ss 6, 11, 12, 13, 14, 15, 16. Most of the ETA's contract-formation provisions are **default rules**.

## Key Provisions (Summary of Main Sections)

| Section | Heading | Gist |
|---|---|---|
| s 6 | Legal recognition of electronic records | Information shall not be denied legal effect, validity, or enforceability solely because it is in the form of an electronic record. |
| s 7 | Writing requirement | Where the law requires "writing", the requirement is met by an electronic record that is accessible so as to be usable for subsequent reference. |
| s 8 | Signature requirement | Where the law requires a signature, it is met if (a) a method is used to identify the person and indicate their intention regarding the information, and (b) the method is sufficiently reliable for the purpose. A **functional equivalence** approach. |
| s 11 | Formation and validity of contracts | **For the avoidance of doubt, in the context of contract formation, an offer and the acceptance of an offer may be expressed by electronic communications.** A contract shall not be denied validity or enforceability solely because an electronic communication was used. → Directly governs [[law-concepts/offer]] and [[law-concepts/acceptance]]. |
| s 12 | Effect between parties | As between the originator and the addressee, a declaration of will or statement shall not be denied legal effect solely because it is in the form of an electronic communication. |
| s 13 | Time and place of dispatch and receipt | **Dispatch**: the time when the record leaves an information system outside the control of the originator (or the person who sent it on the originator's behalf); if it has not left such control, the time of receipt. **Receipt**: the time when the record becomes capable of being retrieved at an electronic address *designated* by the addressee (s 13(2)); for a *non-designated* address, when it is retrievable and the addressee becomes aware it has been sent (s 13(3)). Place of dispatch = originator's place of business, place of receipt = addressee's place of business (s 13(5)). |
| s 14 | Invitation to make offers | A proposal generally accessible to users of information systems, rather than addressed to a specific person (e.g., the interactive ordering function of a website), is treated **in principle as an invitation to treat** — unless it clearly indicates an intention to be bound on acceptance. (Codifies the display doctrine of the traditional contract-law case *Pharmaceutical Society v Boots* for the online setting.) |
| s 15 | Formation by automated message systems | A contract formed by the interaction of an automated message system with a natural person, or between automated systems, is not invalid merely because no natural person reviewed or intervened in each individual action. |
| s 16 | Error in electronic communications | Where a natural person makes an input error in communicating with another party's automated system and the system did not provide an opportunity to correct it, that person has the right to **withdraw** the erroneous portion — provided they notify promptly and have not used or received any benefit from the goods/services (s 16(2)). |

> Part III (ss 17-19) provides for **secure electronic records/signatures** and the resulting **presumptions** — a secure electronic signature that meets the requirements (s 18, e.g., being linked to the record so that any alteration invalidates it) is presumed authentic (s 19). Parts IV-VII (Controller regulation, penalties, etc.) are administrative provisions outside the contract-law exam scope.

## Role in Contract Law

- **Statutory basis for online contract formation**: by declaring in s 11 that offer/acceptance can occur electronically, and classifying website proposals as invitations to treat in s 14, the Act transplants the traditional [[law-concepts/offer]] and [[law-concepts/acceptance]] doctrines directly into the electronic environment. The ETA does not create *new* contract law; it **confirms (for the avoidance of doubt)** that the traditional doctrines operate in the electronic medium.
- **Timing of acceptance**: the traditional debate between the postal rule and the receipt rule is, for electronic communications, settled by the **receipt rule** in s 13 — received when capable of being retrieved at the designated address. Consistent with the instantaneous communication doctrine (*Entores*, *Brinkibon*).
- **Functional equivalence principle**: s 7 (writing) and s 8 (signature) adopt media neutrality — what matters is *function* (accessibility, identification, indication of intent), not form. Linked to the wiki's [[law-concepts/terms]] (contracts where writing requirements are in issue).
- **Relationship to mistake**: the right to withdraw an input error in s 16 is a *limited supplement* to the common law [[law-concepts/mistake]] doctrine — it provides relief for a unilateral input error in automated-system transactions, but imposes conditions of prompt notice and non-receipt.

## Related Concepts and Cases

- [[law-concepts/offer]] / [[law-concepts/acceptance]] — directly governed by s 11.
- [[law-concepts/terms]] — functional equivalence of writing/signature requirements (ss 7-8).
- [[law-concepts/mistake]] — right to withdraw an input error under s 16.
- [[statutes/evidence-act]] — admissibility and authenticity presumption of electronic records (interaction between ETA Part III and the Evidence Act; Evidence Act s 69(2) expressly applies the ETA to electronic signatures).
- Exam point: website listing = invitation to treat (s 14), the customer's order = offer, the seller's confirmation = acceptance (the traditional analysis reinforced by ss 11 and 13).

## Conflict Table

| Topic | Claim A | Claim B | Verdict | Evidence |
|---|---|---|---|---|
| Nature of a website product listing | ETA s 14: a generally accessible online proposal is an invitation to treat (unless an intention to be bound is stated). | Traditional contract law [[law-concepts/offer]]: a display of goods is not an offer but an invitation to treat. | Convergence (the ETA codifies the display doctrine online) | A: law/statutes/(2a) ETA s 14; B: [[law-concepts/offer]] |
| When acceptance by electronic communication takes effect | ETA s 13(2): when capable of being retrieved at the addressee's designated address (receipt rule). | Postal rule: acceptance takes effect on dispatch (in the postal context). | Divergence (separate rules per medium — instantaneous/electronic communication uses the receipt rule, post uses the dispatch rule) | A: same source s 13; B: [[law-concepts/acceptance]] |
