---
cascade:
    type: docs
---

{{< image-centered src="/images/aixlogosml.jpg" alt="OWASP AI Exchange Logo" >}}

{{< spacer height="40" >}}

{{< cards >}}
    {{< card link="/contact" title="Connect with us!" icon="chat" >}}
    {{< card link="/contribute" title="Contribute" icon="star" >}}
    {{< card link="https://forms.gle/XwEEK52y4iZQChuJ6" title="Register" icon="login" >}}
    {{< card link="/media" title="Check out Talks!" icon="speakerphone" >}}
    {{< card link="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewpdfv3.pdf" title="Navigator" icon="document-download">}}
{{< /cards >}}

"All security risks for all of AI, by all professionals, for all professionals. Alignment and guidance for all."

## Purpose

The OWASP AI Exchange is as an open source collaborative project to advance the development of global AI security standards and regulations. It provides a comprehensive overview of AI threats, vulnerabilities, and controls to foster alignment among different standardization initiatives. This includes the EU AI Act, ISO/IEC 27090 (AI security), the [OWASP ML top 10](https://mltop10.info/), the [OWASP LLM top 10](https://llmtop10.com/), and [OpenCRE](https://opencre.org) - which we want to use to provide the AI Exchange content through the security chatbot [OpenCRE-Chat](https://opencre.org/chatbot).

Our **mission** is to be the authoritative source for consensus, foster alignment, and drive collaboration among initiatives - NOT to set a standard, but to drive standards. By doing so, it provides a safe, open, and independent place to find and share insights for everyone. See [AI Exchange LinkedIn page](https://www.linkedin.com/company/owasp-ai-exchange/).

Maintained here at [owaspai.org](https://owaspai.org) it currently uses both a GitHub repository and a Word Document for contributions. It is is an **open-source living document** for the worldwide exchange of AI security expertise. It serves, for example, as input to security standardization for the EU AI Act. The site is maintained by OWASP as part of the [OWASP AI guide](https://owasp.org/www-project-ai-security-and-privacy-guide/) project. It will periodically publish content with credited contributions into the Guide.

## Table of Contents

- [Introduction](/#introduction)
- [Privacy](/#how-about-privacy)
- [Generative AI](/#how-about-generative-ai-eg-llm)
- [Summary](/#summary)
- [Mapping guidelines to controls](/#mapping-guidelines-to-controls)
- [1. General controls for all threats](/1_general_controls/)
- [2. Threats through use](/2_threats_through_use/)
- [3. Development-time threats](/3_development_time_threats/)
- [4. Runtime Application security threats](/4_runtime_application_security_threats/)

The navigator diagram below shows all threats, controls and how they relate, including risks and the types of controls.  
Click on the image to get a pdf with clickable links.
[![AI Exchange Navigator](/images/owaspaioverviewv2.png)](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewpdfv3.pdf)

The AI security matrix below shows all threats and risks, ordered by attack surface and lifecycle.
[![](/images/OwaspAIsecuritymatix.png)](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/OwaspAIsecuritymatix.png)

## Introduction

### Short summary: how to address AI Security

While AI offers powerful perfomance boosts, it also increases the attack surface available to bad actors. It is therefore imperative to approach AI applications with a clear understanding of potential threats and which of those threats to prioritize for each use case. Standards and governance help guide this process for individual entities leveraging AI capabilities.

- Implement **AI governance**
- **Extend security and development practices** to include data science activities especially to protect and streamline the engineering environment.
- **Improve regular application and system security** through understanding of AI particularities e.g. model parameters need protection and access to the model needs to be monitored and rate-limited.
- **Limit the impact** of AI by minimizing privileges and adding oversight, e.g. guardrails, human oversight.
- **Countermeasures in data science** through understanding of model attacks, e.g. data quality assurance, larger training sets, detecting common perturbation attacks, input filtering.

![AI Specific Security Threats](/images/owaspaimodelv1.png)

### This Document

This document discusses threats to AI cyber security and controls for those threats (i.e. countermeasures, requirements, mitigations).
Security here means preventing unauthorized access, use, disclosure, disruption, modification, or destruction. Modification includes manipulating the behaviour of an AI model in unwanted ways.

The AI Exchange initiative was taken by OWASP, triggered by [Rob van der Veer](https://www.linkedin.com/in/robvanderveer/) - bridge builder for security standards, senior director at [Software Improvement Group](https://www.softwareimprovementgroup.com), with 31 years of experience in AI & security, lead author of ISO/IEC 5338 on AI lifecycle, founding father of OpenCRE, and currently working on security requirements concerning the EU AI act in CEN/CENELEC.

This material is all draft and work in progress for others to review and amend.
It serves as input to ongoing key initiatives such as the EU AI act, ISO/IEC 27090 on AI security, ISO/IEC 27091 on AI privacy, the [OWASP ML top 10](https://mltop10.info/), [OWASP LLM top 10](https://llmtop10.com/), and many more initiatives can benefit from consistent terminology and insights across the globe.

**Sources:**

- AI security experts who contributed to this as Open Source.
- The insights of these experts were inspired by research work as mentioned in the references at the bottom of this document(ENISA, NIST, Microsoft, BIML, MITRE, etc.)

### How we organize threats and controls

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

## How to select relevant threats and controls - risk analysis
There are many threats and controls described in this document. Your situation determines which threats are relevant to you, and what controls are your responsibility. This selection process can be performed through risk analysis of the use case and architecture at hand:

1. **Threat identification**: First select the threats that apply to your case by going through the list of threats and use the _Impact_ description to see if it is applicable. For example the impact of identifying individuals in your training data would not apply to your case if your training data has no individuals. The [Navigator](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewpdfv3.pdf) shows impact in purple.

    If you use RAG (Retrieval Augmented Generation), then treat the retrieval repository (including embeddings) just like training data. Meaning:
      - Include the threats regarding data poisoning 
      - Include the threats regarding train/test data leak if the data is sensitive 

    Else, if you don’t train or finetune the model:
      - ignore the development-time threats, with the exception of supply chain management: make sure the model you obtain is not manipulated, and genuine.
      - ignore the confidentiality of train data threats
      - ignore the confidentiality of model IP threats
      - ignore the data poisoning threat
      - ignore development-time controls (e.g. filtering sensitive training data)

    These are the responsbilities of the model maker, but be aware you may be effected by the unwanted results. The maker may take the blame for any issue, which would take care of confidentiality issues, but you would suffer effectively from any manipulated model behaviour.

    If your train data is not sensitive: ignore the confidentiality of train data threats

    If your model is a GenAI model, ignore the following threats: evasion, model inversion. Also ignore prompt injection and insecure output handling if your GenAI model is NOT an LLM
    If your model is not a GenAI model, ignore (direct) prompt injection, and insecure output handling

    If your input data is not sensitive, ignore ‘leaking input data’. If you use RAG, consider data you retrieve also as input data.

2. **Arranging responsibility**: For each selected threat, determine who is responsible to address it. By default, the organization that builds and deploys the AI system is responsible, but building and deploying may be done by different organizations, and some parts of the building and deployment may be deferred to other organizations, e.g. hosting the model, or providing a cloud environment for the application to run. Some aspects are shared responsibilities.

    If components of your AI system are hosted, then you share responsibility regarding all controls for the relevant threats with the hosting provider. This needs to be arranged with the provider, using for example a responsibility matrix. Components can be the model, model extensions, your application, or your infrastructure.

3. **Verify external responsibilities:** For the threats that are the responsibility of other organisations: attain assurance whether these organisations take care of it. This would involve the controls that are linked to these threats.
4. **Control selection**: Then, for the threats that are relevant to you and for which you are responsible: consider the various controls listed with that threat (or the parent section of that threat) and the general controls (they always apply). When considering a control, look at its purpose and determine if you think it is important enough to implement it and to what extent. This depends on the cost of implementation compared to how the purpose mitigates the threat, and the level of risk of the threat.
5. **Use references**: When implementing a control, consider the references and the links to standards. You may have implemented some of these standards, or the content of the standards may help you to implement the control.
6. **Risk acceptance**: In the end you need to be able to accept the risks that remain regarding each threat, given the controls that you implemented.
7. **Further management of these controls** (see SECPROGRAM), which includes continuous monitoring, documentation, reporting, and incident response.

For more information on risk analysis, see the SECPROGRAM control.

## How about privacy?

AI Privacy can be divided into two parts:

1. The AI security threats and controls in this document that are about confidentiality and integrity of (personal) data (e.g. model inversion, leaking training data), plus the integrity of the model behaviour
2. Threats and controls with respect to rights of the individual, as covered by privacy regulations such as the GDPR, including use limitation, consent, fairness, transparency, data accuracy, right of correction/objection/reasure/access. For an overview, see the [Privacy part of the OWASP AI guide](https://owasp.org/www-project-ai-security-and-privacy-guide/)

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
|6| Leaking input data: GenAI models mostly live in the cloud - often managed by an external party, which may increase the risk of leaking training data and leaking prompts. This issue is not limited to GenAI, but GenAI has 2 particular risks here: 1) model use involves user interaction through prompts, adding user data and corresponding privacy/sensitivity issues, and 2) GenAI model input (prompts) can contain rich context information with sensitive data (e.g. company secrets). The latter issue occurs with *in context learning* or *Retrieval Augmented Generation(RAG)* (adding background information to a prompt): for example data from all reports ever written at a consultancy firm. First of all, this information will travel with the prompt to the cloud, and second: the system will likely not respect the original access rights to the information. See the threat [Leak sensitive input data](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/owaspaiexchange.md#47-leak-sensitive-input-data).| |
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
