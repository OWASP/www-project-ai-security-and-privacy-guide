---
title: 'Contribute to the OWASP AI Exchange'
excludeSearch: true
---

{{< cards >}}
  {{< card link="https://github.com/OWASP/www-project-ai-security-and-privacy-guide" title="GitHub Repo" icon="github" >}}
{{< /cards >}}

&nbsp;{{< github-stars user="OWASP" repo="www-project-ai-security-and-privacy-guide" repo_url="https://github.com/OWASP/www-project-ai-security-and-privacy-guide" >}}

{{< tabs items="Guidelines,Team of Experts,Contributors,Organizations,TODOs" >}}

{{< tab >}}

The OWASP projects are an open source effort, and we enthusiastically welcome all forms of contributions and feedback.

## Participate in Content Development

- 📥 Send your suggestion to the [project leader](/connect/#owasp-ai-project-leader).
- 👋 Join `#project-ai` in our [Slack](https://owasp.slack.com/join/shared_invite/zt-g398htpy-AZ40HOM1WUOZguJKbblqkw#) workspace.
- 🗣️ Discuss with the [project leader](/connect/#owasp-ai-project-leader) how to become part of the writing group.
- 💡Propose your [concepts](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/discussions/categories/ideas), or submit an [issue](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/issues).
- 📄 Fork our repo and submit a [Pull Request](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/pulls) for concrete fixes (e.g. grammar/typos) or content already approved by the core team.
- 🙌 Showcase your [contributions](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/discussions/categories/show-and-tell).
- 🐞 Identify an [issue](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/issues) or fix it on a [Pull Request](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/pulls).
- 💬 Provide your insights in [GitHub Discussions](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/discussions/categories/general).
- 🙏 Pose your [questions](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/discussions/categories/q-a).

## What to Avoid

We value every contribution to our project, but it's important to be aware of certain guidelines:

- **Avoid Advertising**: The OWASP AI projects should not be a medium for promoting commercial tools, companies, or individuals. The focus should be on free and open-source tools when discussing the implementation of techniques or tests. While commercial tools generally aren't included, they may be mentioned in specific, relevant instances.
- **Refrain from Unnecessary Self-Promotion**: If you're referencing tools or articles you're affiliated with, please disclose this relationship in your pull request. This transparency helps us ensure that the content aligns with the overall objectives of the guide.

If you're unsure about anything, feel free to [reach out to us](/connect) with your questions.
{{< /tab >}}

{{< tab >}}

<!-- TODO: Transform to table -->
- Adelin Travers - Trail of Bits
- Alon Tron
- Anthony Glynn - Capital One
- Behnaz Karimi - Accenture
- Feiyang Tang - Software Improvement Group (SIG)
- John Sotiropoulos - Kainos
- Marko Lihter - SplxAI
- Niklas Bunzel - Fraunhofer SIT
- Rob van - der Veer|Software Improvement Group (SIG)
- Roger Sanz - SIA Group
- Sandy Dunn - Boise State University, AI Cyber Advisors
- Srajan Gupta - Dave
- Steve Francolla - Workforce Tech LLC

{{< /tab >}}
{{< tab >}}

<!-- TODO: Transform to table -->
- Rob van der Veer (SIG, Netherlands) - results from AI security research at SIG: threat model, risks, navigator, matrix, risk approach, controls, gap analysis with ISO
- Yiannis Kanellopoulos and team (Code4thought, Greece) - evasion robustness
- Annegrit Seyerlein-Klug (TH Brandenburg, Germany) - mapping with misc. standards
- Wei Wei (IBM, Germany) - mapping with ISO/IEC 42001
- Roger Sanz (Universidad Isabel, Spain)
- Angie Qarry (QDeepTech, Austria) - some elaborations and references on datascience defence mechanisms
- Behnaz Karimi (Accenture, Germany)- misc. contributions including model obfuscation and explanation
- Sean Oesch (Oak Ridge National Laboratory, US) - BLUF, Adversarial Training, OOD detection, NISTIR 8269, Guide Usability/Structure
- Anthony Glynn (CapitalOne, US) - many textual improvements & link to LLM top 10
- Zoe Braiterman (Mutual Knowledge Systems, US) - Many markdown improvements
- Niklas Bunzel (Fraunhofer institute, Germany) - datascience discussion and references around evasion attacks
- Marko Lihter (SplxAI, Croatia) - various textual improvements & the Exchange website
- Milad Masoodi (SIG, Netherlands) - restructured document to put controls in sections, visible in the TOC


{{< /tab >}}
{{< tab >}}

<!-- Add a grid of copmany logos-->

{{< /tab >}}

{{< tab >}}

> Tasks are sorted by urgency, with the top item being the most urgent.

- POISONROBUSTMODEL: elaborate
- Tweak navigator: 1) "deal with conidentiality issues" -> "minimize data to help confidentiality", 2) remove ADDTRAINNOISE
- Futureproof hyperlinks: Create a way to link to Controls and to Threats with permanent links (we probably need to generate html from the md)
- Update hyperlinks in navigator, taking into account the 'futureproof hyperlinks'
- Elaborate on "Choose a model type resilient against a transfer learning attack"
- Under DATAQUALITCONTROL: Elaborate on that method to detect statistical deviation by training models on random selections of the training dataset and then feeding each training sample to those models and compare results.
- BIG ONE- DISTRIBUTE: Each section (threat, control):
  - review on clarity,
  - grammar & spelling
  - completeness. Goal: offer a clear summary to non AI security experts, mention important attention points/potential challenges, and refer them to other work for more details.
  - examples needed?
  - visualisation needed?
  - sufficiently practical: make clear what needs to be done. Best practices.
  - sufficient references.  Use a 'References' section and/or a 'Links to standards' section.
 
- Create a visualisation of the new Summary with controls, perhaps combine it with the new threat model diagram ideas and replace the current one
- BIG ONE: Risk analysis: Further design the risk analysis process and especially make responsiblity assignment more clear. Include for example: when is evasion really a problem in practice
- BIG ONE: Write more of a step-by-step guide for organizations to start with AI (security)
- BIG ONE: high level sanity check with NIST adversarial machine learning document
- BIG ONE: high level sanity check with MITRE ATLAS
- Add 'Leak sensitive input data' to threat diagram and check further for any gaps with this document
- Check if OBFUSCATETRAININGDATA has strategies (anonymization, tokenization) that are covered in ISO/IEC standards and add references to those standards
- Under DATAQUALITCONTROL: elaborate on RONI and tRONI training sample selection
- Elaborate on the various methods and the general approach of TRAINDATADISTORTION to prevent data poisoning
- Add attribute inference attacks and consider making that part of 'data reconstruction', together with model inversion, although it is a different approach
- Work with the LLM top 10 team to make sure that the LLM top 10 entries link back to the AI Exchange
- Under TRAINADVERSARIAL: Elaborate - See Annex C of ENISA Secure machine learning algorithms 2021.
- Under DETECTADVERSARIALINPUT: elaborate on detector subnetworks in Annex C of ENISA 2021 and on the references in that section
- Under EVASIONROBUSTMODEL: See Annex C in ENISA 2021 document to cover Stability terms, adversarial regulaiser, input gradient regularisation, defenisvie distillation and Random feature nullification.
- Under INPUTDISTORTION: See ENISA Annex C to add data randomisation, input transformation and input denoising.
- Under INPUTDISTORTION: add Gradient masking - Annex C ENISA 2021
- Cover integrity checks in development pipeline (build, deploy, supply chain) - under supplychainmanage and/or secdevprogram

## TODOs requiring access to ISO/IEC documents

- Do gap analysis and elaborate on ISO/IEC 27563 on AI use case security & privacy (search for it in this document)
- Do gap analysis and elaborate on ISO/IEC 23894 on Risk analysis (search for it in this document)
- Do gap analysis and elaborate on ISO/IEC 27115 on Cybersecurity evaluation of complex systems (search for it in this document)
- Do gap analysis and elaborate on ISO/IEC TR 24029 on Assessment of the robustness of neural networks (search for it in this document)

Anything is welcome: more controls, improved descriptions, examples, references, etc. We will make sure you get credit for your input.
{{< /tab >}}
{{< /tabs >}}
