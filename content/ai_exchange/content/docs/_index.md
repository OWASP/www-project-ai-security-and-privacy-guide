---
title: AI Exchange
---

<!-- TODO: Fix external and internal URLs -->

[Contribute Now!](#how-to-contribute)&nbsp;&nbsp;&nbsp;[Register with the Exchange](https://forms.gle/XwEEK52y4iZQChuJ6)&nbsp;&nbsp;&nbsp;[Navigator](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewpdfv3.pdf)  
[HTML version](https://owasp.org/www-project-ai-security-and-privacy-guide/owaspaiexchange.html)&nbsp;&nbsp;&nbsp;[Github version](https://owaspai.org)&nbsp;&nbsp;&nbsp;[Older Word version](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/owaspaiexchangeWORD.docx)

## Purpose

The OWASP AI Exchange is as an open source collaborative document to advance the development of global AI security standards and regulations. It provides a comprehensive overview of AI threats, vulnerabilities, and controls to foster alignment among different standardization initiatives. This includes the EU AI Act, ISO/IEC 27090 (AI security), the [OWASP ML top 10](https://mltop10.info/), the [OWASP LLM top 10](https://llmtop10.com/), and [OpenCRE](https://opencre.org) - which we want to use to provide the AI Exchange content through the security chatbot [OpenCRE-Chat](https://opencre.org/chatbot).

Our **mission** is to be the authoritative source for consensus, foster alignment, and drive collaboration among initiatives - NOT to set a standard, but to drive standards. By doing so, it provides a safe, open, and independent place to find and share insights for everyone. See [AI Exchange LinkedIn page](https://www.linkedin.com/company/owasp-ai-exchange/).

Maintained here at [owaspai.org](https://owaspai.org) it currently uses both a GitHub repository and a Word Document for contributions. It is is an **open-source living document** for the worldwide exchange of AI security expertise. It serves, for example, as input to security standardization for the EU AI Act towards mid-December (your help is urgently needed!). The document is maintained by OWASP as part of the [OWASP AI guide](https://owasp.org/www-project-ai-security-and-privacy-guide/) project. It will periodically publish content with credited contributions into the Guide.

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://owaspai.org">OWASP AI Exchange</a> by <span property="cc:attributionName">The AI security community</span> is marked with <a href="http://creativecommons.org/publicdomain/zero/1.0?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC0 1.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/zero.svg?ref=chooser-v1"></a> meaning you can use any part freely, without attribution. If possible, it would be nice if the OWASP AI Exchange is credited and/or linked to, for readers to find more information.</p>

Table of contents:

- [How to contribute](/security_controls#how-to-contribute)
- [Introduction](/security_controls#introduction)
- [Privacy](/security_controls#how-about-privacy)
- [Generative AI](/security_controls#how-about-generative-ai-eg-llm)
- [Summary](/security_controls#summary)
- [Mapping guidelines to controls](/security_controls#mapping-guidelines-to-controls)
- [1. General controls for all threats](/security_controls/general_controls)
- [2. Threats through use](/security_controls/threats_through_use)
- [3. Development-time threats](/security_controls/development_time_threats)
- [4. Runtime Application security threats](/security_controls/runtime_application_security_threats)
- [References](/security_controls#references)
- [Expanded Table of contents](/security_controls#expanded-table-of-contents)

The navigator diagram below shows all threats, controls and how they relate, including risks and the types of controls.  
Click on the image to get a pdf with clickable links.
[![AI Exchange Navigator](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewv2.png)](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewpdfv3.pdf)

---

## How to contribute

---

**If you're an AI security expert, please contribute now as standard makers are using this document as input as we speak:**

- Provide comments or suggestions to the mot recent and typically outdated [Word version of this document](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/owaspaiexchangeWORD.docx) and send it to [rob.vanderveer@owasp.org](mailto:rob.vanderveer@owasp.org)
- Start a [GitHub dicussion](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/discussions) or join **#project-ai** at the [OWASP Slack workspace](https://owasp.org/slack/invite)
- Post remarks as [GitHub issues](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/issues)
- Fork the respository and suggest changes to this document using Pull requests (only do this if you are familiar with it)
- Discuss with the project leader how to become part of the writing group, so you can edit the document directly
- Email the project leader your input: [rob.vanderveer@owasp.org](mailto:rob.vanderveer@owasp.org)

**TODOs - the most urgent on top:**

- Elaborate on POISONROBUSTMODEL
- Change navigator: 1) "deal with conidentiality issues" -> "minimize data to help confidentiality", 2) remove ADDTRAINNOISE
- Elaborate on "Choose a model type resilient against a transfer learning attack"
- Under DATAQUALITCONTROL: Elaborate on that method to detect statistical deviation by training models on random selections of the training dataset and then feeding each training sample to those models and compare results.
- Add 'Leak sensitive input data' to threat diagram and check further for any gaps with this document
- Check if OBFUSCATETRAININGDATA has strategies (anonymization, tokenization) that are covered in ISO/IEC standards and add references to those standards
- Under DATAQUALITCONTROL: elaborate on RONI and tRONI training sample selection
- Elaborate on the various methods and the general approach of TRAINDATADISTORTION to prevent data poisoning
- Create a way to link to Controls and to Threats with permanent links (we probably need to generate html from the md)
- Create a layout that is less list-like and more of a read
- Add attribute inference attacks and consider making that part of 'data reconstruction', together with model inversion, although it is a different approach
- Work with the LLM top 10 team to make sure that the LLM top 10 entries link back to the AI Exchange
- Under TRAINADVERSARIAL: Elaborate - See Annex C of ENISA Secure machine learning algorithms 2021.
- Add references to reputable resources for the controls, especially where there are no or hardly any references. Either use a 'References' section or the 'Links to standards'.
- Under DETECTADVERSARIALINPUT: elaborate on detector subnetworks in Annex C of ENISA 2021 and on the references in that section
- Under EVASIONROBUSTMODEL: See Annex C in ENISA 2021 document to cover Stability terms, adversarial regulaiser, input gradient regularisation, defenisvie distillation and Random feature nullification.
- Under INPUTDISTORTION: See ENISA Annex C to add data randomisation, input transformation and input denoising.
- Under INPUTDISTORTION: add Gradient masking - Annex C ENISA 2021
- Cover integrity checks in development pipeline (build, deploy, supply chain) - under supplychainmanage and/or secdevprogram
- In general: add more info on how to practically implement the controls. Integration. Monitorin. Best practides. Real world exampels. potential challenges

Todos requiring access to ISO/IEC documents:

- Do gap analysis and elaborate on ISO/IEC 27563 on AI use case security & privacy (search for it in this document)
- Do gap analysis and elaborate on ISO/IEC 23894 on Risk analysis (search for it in this document)
- Do gap analysis and elaborate on ISO/IEC 27115 on Cybersecurity evaluation of complex systems (search for it in this document)
- Do gap analysis and elaborate on ISO/IEC TR 24029 on Assessment of the robustness of neural networks (search for it in this document)

Anything is welcome: more controls, improved descriptions, examples, references, etc. We will make sure you get credit for your input.

**Contributions:**

- Yiannis Kanellopoulos and team (Code4thought, Greece) - evasion robustness
- Annegrit Seyerlein-Klug (TH Brandenburg, Germany) - mapping with misc. standards
- Wei Wei (IBM, Germany) - mapping with ISO/IEC 42001
- Roger Sanz (Universidad Isabel, Spain)
- Angie Qarry (QDeepTech, Austria) - several elaborations and references on datascience defence mechanisms
- Behnaz Karimi (Accenture, Germany)- misc. contributions including model obfuscation and explanation
- Sean Oesch (Oak Ridge National Laboratory, US) - BLUF, Adversarial Training, OOD detection, NISTIR 8269, Guide Usability/Structure
- Anthony Glynn (CapitalOne, US) - many textual improvements & link to LLM top 10
- Zoe Braiterman (Mutual Knowledge Systems, US) - Many markdown improvements
- Niklas Bunzel (Fraunhofer institute, Germany) - datascience discussion and references around evasion attacks
- Marko Lihter (Endava Adriatic, Croatia) - various textual improvements
