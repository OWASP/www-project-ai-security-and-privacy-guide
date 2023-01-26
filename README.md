
[![Issues](https://img.shields.io/github/issues/owasp/ www-project-ai-security-and-privacy-guide)](https://github.com/OWASP/ www-project-ai-security-and-privacy-guide/issues)  
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
![GitHub contributors](https://img.shields.io/github/contributors/ www-project-ai-security-and-privacy-guide)
![GitHub last commit](https://img.shields.io/github/last-commit/owasp/ www-project-ai-security-and-privacy-guide)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/owasp/ www-project-ai-security-and-privacy-guide)

AI security and privacy guide
===============================
AI applications are on the rise and so are the concerns regarding safety, privacy, ethicality, fairness, trustworthiness, robustness, security etc. This guide wants to provide clear and actionable insights on designing, creating, testing and procuring secure and privacy-preserving AI systems. 

Project status
==============
This project was founded in January 2023 by Rob van der Veer, senior director at Software Improvement Group, lead author of the [ISO/IEC 5338](https://www.iso.org/standard/81118.html) standard on AI engineering, with 30 years experience in AI, security and privacy. Rob also contributes to [OWASP SAMM](https://owaspsamm.org/guidance/agile/) and is co-lead of the Integration standards project - known for its [Wayfinder](https://owasp.org/www-project-integration-standards/) and [OpenCRE.org](https://www.opencre.org/). Contact: rob.vanderveer AT owasp.org

The purpose is to collect and present the state of the art on the topic through community collaboration. First in the form of this README, and later probably in other document forms.

How to deal with AI security?
=============================
1. Keep on doing everything you are already doing for cybersecurity
2. Incorporate AI developers, data scientists, and AI-related applications and infrastructure into your security programs: training, requirements, static analysis, code review, pentesting, etc.
3. Go beyond security by applying good software engineering protocols to your AI practices, such as versioning, documentation, unit testing, integration testing, performance testing, and code quality. See the [ISO/IEC 5338](https://www.iso.org/standard/81118.html) standard for guidelines. This way, AI systems will become easier to maintain, transfer, be reliable, and future-proof.
4. Make sure that everybody involved is aware of ‘special’ AI security risks, including:
* Data and data processing need protection
* AI model attacks: data poisoning, input manipulation, data reverse engineering, and model theft, which all require deep machine learning knowledge and not security expertise per se. Read more at [BIML](https://berryvilleiml.com/taxonomy/), [ENISA](https://www.enisa.europa.eu/publications/securing-machine-learning-algorithms), and [Microsoft](https://docs.microsoft.com/en-us/security/failure-modes-in-machine-learning).
* More aspects can be found in ISO/IEC 5338 and the upcoming ISO/IEC 27090 on AI security and 27091 on AI privacy. 

5. Avoid dragging every ‘popular’ AI risk into the security activity, such as transparency, fairness, and correctness. They are important, but it’s better to divide and conquer AI issues in an organization, instead of letting everybody worry about everything.

In other words, the main recommendation to security officers and development teams is to treat AI pragmatically. No need to be philosophical or overwhelmed. AI is software with a few extra aspects that we are becoming increasingly familiar with. 

This part of the guide was initally published as a [blog](https://www.softwareimprovementgroup.com/resources/how-artificial-intelligence-attacked-my-family-and-other-ai-security-lessons/).

How to deal with AI privacy
===========================
Coming soon
