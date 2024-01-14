---
title: AI Security
---

## Introduction

### BLUF: How to Deal with AI Security

While AI offers powerful perfomance boosts, it also increases the attack surface available to bad actors. It is therefore imperative to approach AI applications with a clear understanding of potential threats and which of those threats to prioritize for each use case. Standards and governance help guide this process for individual entities leveraging AI capabilities.

- Implement **AI governance**
- **Extend security and development practices** to include data science activities especially to protect and streamline the engineering environment.
- **Improve regular application and system security** through understanding of AI particularities e.g. model parameters need protection and access to the model needs to be monitored and rate-limited.
- **Limit the impact** of AI by minimizing privileges and adding oversight, e.g. guardrails, human oversight.
- **Countermeasures in data science** through understanding of model attacks, e.g. data quality assurance, larger training sets, detecting common perturbation attacks, input filtering.

![AI Specific Security Threats](/images/owaspaimodelv1.png)

### About this Document

This document discusses threats to AI cybersecurity and controls for those threats (i.e. countermeasures, requirements, mitigations).
Security here means preventing unauthorized access, use, disclosure, disruption, modification, or destruction. Modification includes manipulating the behaviour of an AI model in unwanted ways.

The AI Exchange initiative was taken by OWASP, triggered by [Rob van der Veer](https://www.linkedin.com/in/robvanderveer/) - bridge builder for security standards, senior director at [Software Improvement Group](https://www.softwareimprovementgroup.com), with 31 years of experience in AI & security, lead author of ISO/IEC 5338 on AI lifecycle, founding father of OpenCRE, and currently working on security requirements concerning the EU AI act in CEN/CENELEC.

This material is all draft and work in progress for others to review and amend.
It serves as input to ongoing key initiatives such as the EU AI act, ISO/IEC 27090 on AI security, ISO/IEC 27091 on AI privacy, the [OWASP ML top 10](https://mltop10.info/), [OWASP LLM top 10](https://llmtop10.com/), and many more initiatives can benefit from consistent terminology and insights across the globe.

**Sources:**

- AI security experts who contributed to this as Open Source.
- The insights of these experts were inspired by research work as mentioned in the references at the bottom of this document(ENISA, NIST, Microsoft, BIML, MITRE, etc.)

### Organizing threats and controls

The threats are organized by attack surface (how and where does the attack take place?), and not by impact. This means that for example model theft is mentioned in three different parts of the overview:

1. model theft by stealing model parameters from a live system, e.g. breaking into the network and reading the parameters from a file,
2. model theft by stealing the modeling process or parameters from the engineering environment, e.g. stored in the version management system of a data scientist, and
3. model theft by reverse engineering from using the AI system. These are three very different attacks, with similar impacts. This way of organizing is helpful because the goal is to link the threats to controls, and these controls vary per attack surface.

**How about AI outside of machine learning?**  
A helpful way to look at AI is to see it as consisting of machine learning (the current dominant type of AI) models and _heuristic models_. A model can be a machine learning model which has learned how to compute based on data, or it can be a heuristic model engineered based on human knowledge, e.g. a rule-based system. Heuristic models still need data for testing, and sometimes to perform analysis for further building and validating the human knowledge.  
This document focuses on machine learning. Nevertheless, here is a quick summary of the machine learning threats from this document that also apply to heuristic systems:

- Model evasion is also possible for heuristic models, -trying to find a loophole in the rules
- Model theft through use - it is possible to train a machine learning model based on input/output combinations from a heuristic model
- Overreliance in use - heuristic systems can also be relied on too much. The applied knowledge can be false
- Data poisoning and model poisoning is possible by manipulating data that is used to improve knowledge and by manipulating the rules development-time or runtime
- Leaks of data used for analysis or testing can still be an issue
- Knowledgebase, source code and configuration can be regarded as sensitive data when it is intellectual property, so it needs protection
- Leak sensitive input data, for example when a heuristic system needs to diagnose a patient

### Applying threats and controls - risk analysis

1. Threat identification: First select the threats that apply to your case by going through the list of threats and use the _Impact_ description to see if it is applicable. For example the impact of identifying individuals in your training data may not apply to your case. Risk assessment is a helpful exercise to support this selection, and the consideration of controls and risks further on in this process.
2. Control selection: Then, for the selected threats consider the various controls listed with that threat (or the parent section of that threat) and the general controls (they always apply). When considering a control, look at its purpose and determine if you think it is important enough to implement it and to what extent. This depends on the cost of implementation compared to how the purpose mitigates the threat, and the level of risk of the threat.
3. Use references: When implementing a control, consider the references and the links to standards. You may have implemented some of these standards, or the content of the standards may help you to implement the control.
4. Risk acceptance: In the end you need to be able to accept the risks that remain regarding each threat, given the controls that you implemented.
5. Further management of these controls (see SECPROGRAM), which includes continuous monitoring, documentation, reporting, and incident response.

For more information on risk analysis, see the SECPROGRAM control.

## How about privacy?

AI Privacy can be divided into two parts:

1. The AI security threats and controls in this document that are about confidentiality and integrity of (personal) data (e.g. model inversion, leaking training data), plus the integrity of the model behaviour
2. Threats and controls with respect to rights of the individual, as covered by privacy regulations such as the GDPR, including use limitation, consent, fairness, transparency, data accuracy, right of correction/objection/reasure/access. For an overview, see the [Privacy part of the OWASP AI guide](/docs/privacy/#how-to-deal-with-ai-privacy)

## How about Generative AI (e.g. LLM)?

Yes, GenAI is leading the current AI revolution and it's the fastest moving subfield of AI security. Nevertheless it is important to realize that other types of algorithms will remain to be applied to many important use cases such as credit scoring, fraud detection, medical diagnosis, product recommendation, image recognition, predictive maintenance, process control, etc. Relevant content has been marked with 'GenAI' in this document.

Important note: from a security framework perspective, GenAI is not that different from other forms of AI. GenAI threats and controls largely overlap and are very similar to AI in general. Nevertheless, some risks are (much) higher. Some are lower. Only a few risks are GenAI-specific.

GenAI security particularities are:

|Nr.| GenAI security particularities |OWASP for LLM TOP 10|
|-| ----------|-------------------|
|1| Evasion attacks in general are about fooling a model using crafted input to make an unwanted decision, whereas for GenAI it is about fooling a model using a crafted prompt to circumvent behavioral policies (e.g. preventing offensive output). |  ([OWASP for LLM 01](https://llmtop10.com/llm01/))  |
|2| Unwanted output of sensitive training data is an AI-broad issue, but more likely to be a high risk with GenAI systems that typically output rich content, and have been trained on a large varietey of data sets such.  |  ([OWASP for LLM 06](https://llmtop10.com/llm06/))  |
|3|A GenAI model will not respect any variations in access privileges of training data. All data will be accessible to the model users.|([OWASP for LLM 06: Sensitive Information Disclosure](https://llmtop10.com/llm06/)) |
|4|Training data poisoning is an AI-broad problem, and with GenAI the risk is generally higher since training data can be supplied from different sources that may be challenging to control, such as the internet. Attackers could for example hijack domains and place manipulated information. | ([OWASP for LLM 03: Training Data Poisoning](https://llmtop10.com/llm03/))|
|5|Overreliance is an AI-broad risk factor, and in addition Large Language Models (GenAI) can make matters worse by coming across very confident and knowledgeable. |([OWASP for LLM 09: Overreliance](https://llmtop10.com/llm09/)) and ([OWASP for LLM 08: Excessive agency](https://llmtop10.com/llm08/))|
|6| Leaking input data: GenAI models mostly live in the cloud - often managed by an external party, which may increase the risk of leaking training data and leaking prompts. This issue is not limited to GenAI. Additional risks that are typical for GenAI are: 1) model use involves user interaction through prompts, adding user data and corresponding privacy issues, and 2) GenAI model input (prompts) can contain rich context information with sensitive data (e.g. company secrets). The latter issue occurs with _in context learning_ (adding background information to a prompt): for example data from all reports ever written at a consultancy firm. First of all, this information will travel with the prompt to the cloud, and second: the system will likely not respect the original access rights to the information.|           |
|7|Pre-trained models may have been manipulated. The concept of pretraining is not limited to GenAI, but the approach is quite common in GenAI, which increases the risk of transfer learning attacks.| ([OWASP for LLM 05 - Supply chain vulnerabilities](https://llmtop10.com/llm05/))|
|8|The typical application of plug-ins in Large Language Models (GenAI) creates specific risks regarding the protection and privileges of these plugins - as they allow large language models (GenAI) to act outside of their normal conversation with the user.|([OWASP for LLM 07](https://llmtop10.com/llm07/))|
|9| Prompt injection  is a GenAI specific threat, listed under Application security threats|([OWASP for LLM 01](https://llmtop10.com/llm01/))|
|10|Model inversion and membership inference are low to zero risks for GenAI |([OWASP for LLM 06](https://llmtop10.com/llm06/))|
|11|GenAI output may contain elements that perform an injection attack such as cross-site-scripting.| ([OWASP for LLM 02](https://llmtop10.com/llm02/))|
|12|Denial of service can be an issue for any AI model, but GenAI models are extra sensitive because of the relatively high resource usage. | ([OWASP for LLM 04](https://llmtop10.com/llm04/)) |

GenAI References:

- [OWASP LLM top 10](https://llmtop10.com/)
- [Impacts and risks of GenAI](https://arxiv.org/pdf/2306.13033.pdf)

## Summary

The AI security controls (in capitals - and discussed further on in the document) can be grouped along meta controls:

1. Apply **AI governance** (AIPROGRAM)
2. Apply **information security management** (SECPROGRAM), with AI attention points:
   - New assets: training/test data , input data, output data, model parameters, technical information about the model, and also code and configuration. This depends on if they represent important intellectual property, or if the data is sensitive, or if the data can help attackers to design an attack (DISCRETE).
   - New threats: ISO/IEC 27563 (on AI use cases security & privacy) describes security of some AI use cases to assist in risk analysis, and ISO/IEC 23894 elaborates on risk management. The AI Exchange and the upcoming ISO 27090 (AI security) are more comprehensive sources for threats and controls.
   - AI regulation needs to be taken into account (CHECKCOMPLIANCE)
   - Awareness training needs to include AI threats and controls (SECEDUCATE)
   - The information security controls in this document fall under the security management activity (e.g. model privileges, monitoring, access control, data protection, supply chain)
3. Apply **professional software engineering practices** to the AI lifecycle (DEVPROGAM).
4. Apply **secure software development** to AI engineering (SECDEVPROGRAM), and when developing securely, use standards that cover technical application security controls and operational security, (e.g. 15408, ASVS, OpenCRE). AI attention points:
   - Make sure to protect the runtime model and its IO (RUNTIMEMODELINTEGRITY, RUNTIMEMODELIOINTEGRITY, RUNTIMEMODELCONFIDENTIALITY, MODELINPUTCONFIDENTIALITY, MODELOBFUSCATION)
   - Control model use (MONITORUSE, MODELACCESSCONTROL, RATELIMIT)
   - ENCODEMODELOUTPUT if it is text based
   - LIMITRESOURCES to protect against denial of service
5. **Development-time protection**:
   - DEVDATAPROTECT (Protection of train/testdata, parameters, code and config)
   - DEVSECURITY (further information security including screening of engineers)
   - SEGREGATEDATA
   - CONFCOMPUTE
   - FEDERATIVELEARNING
   - SUPPLYCHAINMANAGE
6. Completely **new application security controls** are MODELOBFUSCATION and protection against indirect prompt injection of GenAI: PROMPTINPUTVALIDATION plus INPUTSEGREGATION
7. **Limit the amount of data and the time it is stored**, if it is sensitive (DATAMINIMIZE, ALLOWEDDATA, SHORTRETAIN, OBFUSCATETRAININGDATA)
8. **Limit the effect** of unwanted model behaviour (OVERSIGHT, LEASTMODELPRIVILEGE, AITRAINSPARENCY, EXPLAINABILITY)
9. **Datascience runtime** controls when using the model:
   - CONTINUOUSVALIDATION
   - UNWANTEDBIASTESTING
   - DETECTODDINPUT
   - DETECTADVERSARIALINPUT
   - DOSINPUTVALIDATION
   - INPUTDISTORTION
   - FILTERSENSITIVEMODELOUTPUT
   - OBSCURECONFIDENCE (to prevent reconstructing train data)
10. **Datascience development-time** controls:
    - CONTINUOUSVALIDATION
    - UNWANTEDBIASTESTING
    - EVASIONROBUSTMODEL
    - POISIONROBUSTMODEL
    - TRAINADVERSARIAL
    - TRAINDATADISTORTION
    - ADVERSARIALROBUSTDISTILLATION (if you apply distillation)
    - FILTERSENSITIVETRAINDATA
    - MODELENSEMBLE
    - MORETRAINDATA
    - SMALLMODEL (to prevent reconstructing train data)
    - DATAQUALITYCONTROL (covered in 5259 but not aimed at data manipulation)

---

## Mapping guidelines to controls

Mapping of the UK/US [Guidelines for secure AI
system development](https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development) to the controls here at the AI Exchange:  
(Search for them in this document or use the [Navigator](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewpdfv3.pdf))

1. Secure design

- Raise staff awareness of threats and risks:  
  #SECEDUCATE
- Model the threats to your system:  
  See Risk analysis under #SECPROGRAM
- Design your system for security as well as functionality and performance:  
  #AIPROGRAM, #SECPROGRAM, #DEVPROGRAM, #SECDEVPROGRAM, #CHECKCOMPLIANCE, #LEASTMODELPRIVILEGE, #DISCRETE, #OBSCURECONFIDENCE, #OVERSIGHT, #RATELIMIT,  #DOSINPUTVALIDATION, #LIMITRESOURCES, #MODELACCESSCONTROL, #AITRANSPRENCY
- Consider security benefits and trade-offs when selecting your AI model  
  All development-time datascience controls (currently 13), #EXPLAINABILITY

2. Secure Development

- Secure your supply chain:  
  #SUPPLYCHAINMANAGE
- Identify, track and protect your assets:  
  #DEVDATAPROTECT, #DEVSECURITY, #SEGREGATEDATA, #CONFCOMPUTE, #MODELINPUTCONFIDENTIALITY, #RUNTIMEMODELCONFIDENTIALITY, #DATAMINIMIZE, #ALLOWEDDATA, #SHORTRETAIN, #OBFUSCATETRAININGDATA and part of #SECPROGRAM
- Document your data, models and prompts:  
  Part of #DEVPROGRAM
- Manage your technical debt:  
  Part of #DEVPROGRAM

3. Secure deployment

- Secure your infrastructure:  
  Part of #SECPROGRAM and see ‘Identify, track and protect your assets’
- Protect your model continuously:  
  #INPUTDISTORTION, #FILTERSENSITIVEMODELOUTPUT, #RUNTIMEMODELIOINTEGRITY, #MODELINPUTCONFIDENTIALITY, #PROMPTINPUTVALIDATION, #INPUTSEGREGATION
- Develop incident management procedures:  
  Part of #SECPROGRAM
- Release AI responsibly:  
  Part of #DEVPROGRAM
- Make it easy for users to do the right things:  
  Part of #SECPROGRAM

4. Secure operation and maintenance

- Monitor your system’s behaviour:  
  #CONTINUOUSVALIDATION, #UNWANTEDBIASTESTING
- Monitor your system’s inputs:  
  #MONITORUSE, #DETECTODDINPUT, #DETECTADVERSARIALINPUT
- Follow a secure by design approach to updates:  
  Part of #SECDEVPROGRAM
- Collect and share lessons learned:  
  Part of #SECPROGAM and #SECDEVPROGRAM

## References

References on the OWASP AI guide (a project of which this document is part):

- [Recording](https://www.youtube.com/watch?v=ABmWHnFrMqI) or [slides](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/20230215-Rob-AIsecurity-Appsec-ForSharing.pdf?raw=true) from [Rob van der Veer's talk](https://sched.co/1F9DT) at the OWASP Global appsec event in Dublin on February 15 2023, during which the OWASP AI guide was launched.
- Appsec Podcast episode on the OWASP AI guide ([audio](https://www.buzzsprout.com/1730684/12313155-rob-van-der-veer-owasp-ai-security-privacy-guide),[video](https://www.youtube.com/watch?v=SLdn3AwlCAk&))
- The [September 2023 MLSecops Podcast](https://mlsecops.com/podcast/a-holistic-approach-to-understanding-the-ai-lifecycle-and-securing-ml-systems-protecting-ai-through-people-processes-technology), and If you want the short story, check out [the 13 minute AI security quick-talk](https://www.brighttalk.com/webcast/19697/586526).

Overviews of model attacks:

- [ENISA ML threats and countermeasures 2021](https://www.enisa.europa.eu/publications/securing-machine-learning-algorithms)
- [MITRE ATLAS framework for AI threats](https://atlas.mitre.org/)
- [ETSI SAI Problem statement Section 6](https://www.etsi.org/committee/1640-sai#)
- [Microsoft AI failure modes](https://docs.microsoft.com/en-us/security/failure-modes-in-machine-learning)
- [NIST](https://csrc.nist.gov/publications/detail/white-paper/2023/03/08/adversarial-machine-learning-taxonomy-and-terminology/draft)
- [OWASP ML top 10](https://mltop10.info/)
- [OWASP LLM top 10](https://llmtop10.com/)
- [BIML](https://berryvilleiml.com/taxonomy/)

Misc.:

- [ENISA AI security standard discussion](https://www.enisa.europa.eu/publications/cybersecurity-of-ai-and-standardisation)
- [ENISA's multilayer AI security framework](https://www.enisa.europa.eu/publications/multilayer-framework-for-good-cybersecurity-practices-for-ai)
- [Alan Turing institute's AI standards hub](https://aistandardshub.org)
- [Microsoft/MITRE tooling for ML teams](https://www.mitre.org/news-insights/news-release/microsoft-and-mitre-create-tool-help-security-teams-prepare-attacks?sf175190906=1)
- [Google's Secure AI Framework](https://blog.google/technology/safety-security/introducing-googles-secure-ai-framework/)
- [NIST AI Risk Management Framework 1.0](https://doi.org/10.6028/NIST.AI.100-1)
- [NIST threat taxonomy](https://csrc.nist.gov/publications/detail/white-paper/2023/03/08/adversarial-machine-learning-taxonomy-and-terminology/draft)
- [NISTIR 8269 - A Taxonomy and Terminology of Adversarial Machine Learning](https://csrc.nist.rip/external/nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8269-draft.pdf)
- [PLOT4ai threat library](https://plot4.ai/library)
- [ETSI GR SAI 002 V 1.1.1 Securing Artificial Intelligence (SAI) – Data Supply Chain Security](https://www.etsi.org/deliver/etsi_gr/SAI/001_099/002/01.01.01_60/gr_SAI002v010101p.pdf)
- [ISO/IEC 20547-4 Big data security](https://www.iso.org/standard/71278.html)
- [IEEE 2813 Big Data Business Security Risk Assessment](https://standards.ieee.org/ieee/2813/7535/)

## Expanded table of contents

- [How to contribute](/contribute)
- [Introduction](/docs/security/#introduction)
- [Summary](/docs/security/#summary)

- [1. General controls for all threats](/docs/security/1_general_controls)

  1.1 Governance controls:

  - AIPROGRAM (management)
  - SECPROGRAM (management)
  - SECDEVPROGRAM (management)
  - SECDEVPROGRAM (management)
  - DEVPROGRAM (management)
  - CHECKCOMPLIANCE (management)
  - SECEDUCATE (management)
    1.2 Controls for sensitive data limitation:
  - DATAMINIMIZE (development-time and runtime)
  - ALLOWEDDATA (development-time and runtime)
  - SHORTRETAIN (development-time and runtime)
  - OBFUSCATETRAININGDATA (development-time datascience).
  - DISCRETE (management, development-time and runtime)

    1.3. Controls to limit the effects of unwanted behaviour from threats:

  - OVERSIGHT (runtime)
  - LEASTMODELPRIVILEGE (runtime infosec)
  - AITRANSPARENCY (runtime, management)
  - CONTINUOUSVALIDATION (runtime datascience)
  - EXPLAINABILITY (runtime datascience)
  - UNWANTEDBIASTESTING (datascience)

  Related threats that increase the effects of unwanted behaviour:

  - Overreliance
  - Excessive agency

- [2. Threats through use](/docs/security/2_threats_through_use)

  - See General controls
  - MONITORUSE (runtime appsec)
  - RATELIMIT (runtime appsec)
  - MODELACCESSCONTROL (runtime appsec)

    2.1. Evasion - Model behaviour manipulation through use  
    Impact: Integrity of model behaviour is affected, leading to issues from unwanted model output (e.g. failing fraud detection, decisions leading to safety issues, reputation damage, liability).

  - See General controls
  - See controls for threats through use
  - DETECTODDINPUT (runtime datascience)
  - DETECTADVERSARIALINPUT (runtime datascience)
  - EVASIONROBUSTMODEL (development-time datascience)
  - TRAINADVERSARIAL (development-time datascience)
  - INPUTDISTORTION (runtime datascience)
  - ADVERSARIALROBUSTDISTILLATION (development-time datascience)

  2.2. Sensitive data disclosure through use  
  Impact: Confidentiality breach of sensitive train data.

  ...2.2.1. Sensitive data output from model

  - See General controls, in particular data minimization
  - See controls for threats through use
  - FILTERSENSITIVETRAINDATA (development-time appsec)
  - FILTERSENSITIVEMODELOUTPUT (runtime appsec)

  ...2.2.2. Model inversion and Membership inference

  - See General controls
  - See controls for threats through use
  - OBSCURECONFIDENCE (runtime datascience)
  - SMALLMODEL (development-time datascience)
  
    2.3. Model theft through use  
    Impact: Confidentiality breach of intellectual property.
  - See General controls
  - See controls for threats through use

    2.4. Failure or malfunction of AI-specific elements through use  
    Impact: The AI systems is unavailable, leading to issues with processes, organizations or individuals that depend on the AI system

  - See General controls
  - See Controls for threats through use
  - DOSINPUTVALIDATION (runtime appsec)
  - LIMITRESOURCES (runtime)

- [3. Development-time threats](/docs/security/3_development_time_threats)

  - See General controls
  - DEVDATAPROTECT (development-time infosec)
  - DEVSECURITY (management)
  - SEGREGATEDATA (development-time infosec)
  - CONFCOMPUTE (development-time infosec)
  - FEDERATIVELEARNING (development-time datascience)
  - SUPPLYCHAINMANAGE (development-time infosec)

    3.1. Broad model poisoning: model behaviour manipulation by altering data, engineering, or model  
    Impact: see ‘Evasion’, plus two extra manipulations: unavailability and backdoors

  - See General controls
  - See controls for development-time protection
  - MODELENSEMBLE (development-time datascience)

  ...3.1.1. Data poisoning by changing data development-time or supply chain

  - See General controls
  - See controls for development-time protection
  - MORETRAINDATA (development-time datascience)
  - DATAQUALITYCONTROL (development-time datascience)
  - TRAINDATADISTORTION (development-time datascience)
  - POISONROBUSTMODEL (development-time datascience)

  ...3.1.2. Development-time model poisoning

  - See General controls
  - See controls for development-time protection

  ...3.1.3 Transfer learning attack

  - See General controls
  - See controls for development-time protection
  - Choose a model type resilient against a transfer learning attack

    3.2. Sensitive data leak development-time

  ...3.2.1. Development-time data leak  
  Impact: Confidentiality breach of sensitive data.

  ...3.2.2. Model theft through development-time model parameter leak  
  Impact: Confidentiality breach of intellectual property.

  ...3.2.3. Source code/configuration leak  
  Impact: Confidentiality breach of intellectual property.

- [4. Runtime Application security threats](/docs/security/4_runtime_application_security_threats)

  4.1. Non AI-specific application security threats  
  Impact: General application security threats can impact confidentiality, integrity and availability of all assets.

  - See general controls - in particular SECDEVPROGRAM
  - Technical application security controls
  - Operational security

    4.2. Runtime model poisoning (manipulating the model itself or its input/output logic)  
    Impact: see Broad model poisoning.

  - See General controls
  - RUNTIMEMODELINTEGRITY (runtime appsec)
  - RUNTIMEMODELIOINTEGRITY (runtime appsec)

    4.3. Runtime model theft  
    Impact: Confidentiality breach of model intellectual property.

  - See general controls
  - RUNTIMEMODELCONFIDENTIALITY (runtime appsec)
  - MODELOBFUSCATION (runtime appsec)

    4.4. Insecure output handling  
    Impact: Textual model output may contain 'traditional' injection attacks such as XSS-Cross site scripting, which can create a vulnerability when processed (e.g. shown on a website, execute a command).

  - See general controls
  - ENCODEMODELOUTPUT (runtime appsec)

    4.5. Direct prompt injection  
    Impact: Getting unwanted answers or actions by manipulating through prompts how a large language model(GenAI) has been instructed.

  - See General controls
  - Mostly embedded in the Large Language Model (LLM, a GenAI) itself

    4.6. Indirect prompt injection  
    Impact: Getting unwanted answers or actions from hidden instructions in a prompt.

  - See General controls, in particular Controls to limit effects of unwanted model behaviour
  - PROMPTINPUTVALIDATION (runtime appsec)
  - INPUTSEGREGATION (runtime appsec)

    4.7. Leak sensitive input data  
    Impact: Confidentiality breach of sensitive input data.

  - See General controls
  - MODELINPUTCONFIDENTIALITY (runtime appsec)

- [References](/docs/security/#references)
- [Expanded Table of contents](/docs/security/#expanded-table-of-contents)
