---
title: AI Security Overview
weight: 1
---
## Summary - How to address AI Security?
>See [home](https://owaspai.org/) for more information about this initiative, how to contribute or connect.  
This page contains an overview of AI security and the next pages provide the main content: details on security threats to AI and controls against them. You can navigate through  pages at the bottom of every page, or in the left sidebar. The right sidebar shows the different sections on a page. On small screens you can navigate through the menu.  
>Category: discussion  
>Permalink: https://owaspai.org/goto/summary/

While AI offers powerful performance boosts, it also increases the attack surface available to bad actors. It is therefore imperative to approach AI applications with a clear understanding of potential threats and which of those threats to prioritize for each use case. Standards and governance help guide this process for individual entities leveraging AI capabilities.

- Implement **AI governance**
- **Extend security and development practices** to include data science activities especially to protect and streamline the engineering environment.
- **Improve regular application and system security** through understanding of AI particularities e.g. model parameters need protection and access to the model needs to be monitored and rate-limited.
- **Limit the impact** of AI by minimizing privileges and adding oversight, e.g. guardrails, human oversight.
- **Countermeasures in data science** through understanding of model attacks, e.g. data quality assurance, larger training sets, detecting common perturbation attacks, input filtering.

## Threats overview
>Category: discussion  
>Permalink: https://owaspai.org/goto/threatsoverview/

### Threat model
We distinguish three types of threats: during development-time (when data is obtained and prepared, and the model is trained/obtained), through using the model (providing input and reading the output), and by attacking the system during runtime (in production).
The diagram shows the threats in these three groups as arrows. Each threat has a specific impact, indicated by letters referring to the Impact legend. The control overview section contains this diagram with groups of controls added.
![AI Security Threats](/images/threats.png)

### AI Security Matrix
>Category: discussion  
>Permalink: https://owaspai.org/goto/aisecuritymatrix/

The AI security matrix below (click to enlarge) shows all threats and risks, ordered by type and impact.
[![](/images/OwaspAIsecuritymatix.png)](/images/OwaspAIsecuritymatix.png)

## Controls overview
>Category: discussion  
>Permalink: https://owaspai.org/goto/controlsoverview/

### Threat model with controls - general
The below diagram puts the controls in the AI Exchange into groups and places these groups in the right lifecycle with the corresponding threats.
![AI Security Threats and controls](/images/threatscontrols.png)
The groups of controls form a summary of how to address AI security (controls are in capitals):
1. **AI Governance**: implement governance processes for AI risk, and include AI into your processes for information security and software lifecycle:  
   >( [AIPROGRAM](/goto/aiprogram/ ), [SECPROGRAM](/goto/secprogram/), [DEVPROGRAM](/goto/devprogram/), [SECDEVPROGRAM](/goto/secdevprogram/), [CHECKCOMPLIANCE](/goto/checkcompliance/), [SECEDUCATE](/goto/seceducate/))
2. Apply conventional **technical IT security controls** risk-based, since an AI system is an IT system:
    - 2a Apply **standard** conventional IT security controls (e.g. 15408, ASVS, OpenCRE, ISO 27001 Annex A, NIST SP800-53) to the complete AI system and don't forget the new AI-specific assets :
      - Development-time: model & data storage, model & data supply chain, data science documentation:  
        >([DEVDATAPROTECT](/goto/devdataprotect/), [DEVSECURITY](/goto/devsecurity/), [SEGREGATEDATA](/goto/segregatedata/), [SUPPLYCHAINMANAGE](/goto/supplychainmanage/), [DISCRETE](/goto/discrete/))
      - Runtime: model storage, model use, plug-ins, and model input/output:  
        >([RUNTIMEMODELINTEGRITY](/goto/runtimemodelintegrity/), [RUNTIMEMODELIOINTEGRITY](/goto/runtimemodeliointegrity/), [RUNTIMEMODELCONFIDENTIALITY](/goto/runtimemodelconfidentiality/), [MODELINPUTCONFIDENTIALITY](/goto/modelinputconfidentiality/), [ENCODEMODELOUTPUT](/goto/encodemodeloutput/), [LIMITRESOURCES](/goto/limitresources/))
    - 2b **Adapt** conventional IT security controls to make them more suitable for AI (e.g. which usage patterns to monitor for):  
      >([MONITORUSE](/goto/monitoruse/), [MODELACCESSCONTROL](/goto/modelaccesscontrol/), [RATELIMIT](/goto/ratelimit/))
    - 2c Adopt **new** IT security controls:  
      >([CONFCOMPUTE](/goto/confcompute/), [MODELOBFUSCATION](/goto/modelobfuscation/), [PROMPTINPUTVALIDATION](/goto/promptinputvalidation/), [INPUTSEGREGATION](/goto/inputsegregation/))
3. Data scientists apply **data science security controls** risk-based :
    - 3a Development-time controls when developing the model:  
      >([FEDERATEDLEARNING](/goto/federatedlearning/), [CONTINUOUSVALIDATION](/goto/continuousvalidation/), [UNWANTEDBIASTESTING](/goto/unwantedbiastesting/), [EVASIONROBUSTMODEL](/goto/evasionrobustmodel/), [POISONROBUSTMODEL](/goto/poisonrobustmodel/), [TRAINADVERSARIAL](/goto/trainadversarial/), [TRAINDATADISTORTION](/goto/traindatadistortion/), [ADVERSARIALROBUSTDISTILLATION](/goto/adversarialrobustdistillation/), [MODELENSEMBLE](/goto/modelensemble/), [MORETRAINDATA](/goto/moretraindata/), [SMALLMODEL](/goto/smallmodel/), [DATAQUALITYCONTROL](/goto/dataqualitycontrol/))
    - 3b Runtime controls to filter and detect attacks:  
      >([DETECTODDINPUT](/goto/detectoddinput/), [DETECTADVERSARIALINPUT](/goto/detectadversarialinput/), [DOSINPUTVALIDATION](/goto/dosinputvalidation/), [INPUTDISTORTION](/goto/inputdistortion/), [FILTERSENSITIVEMODELOUTPUT](/goto/filtersensitivemodeloutput/), [OBSCURECONFIDENCE](/goto/obscureconfidence/))
4. **Minimize data:** Limit the amount of data in rest and in transit, and the time it is stored, development-time and runtime:  
   >([DATAMINIMIZE](/goto/dataminimize/), [ALLOWEDDATA](/goto/alloweddata/), [SHORTRETAIN](/goto/shortretain/), [OBFUSCATETRAININGDATA](/goto/obfuscatetrainingdata/))
5. **Control behaviour impact** as the model can behave in unwanted ways - by mistake or by manipulation:  
   >([OVERSIGHT](/goto/oversight/), [LEASTMODELPRIVILEGE](/goto/leastmodelprivilege/), [AITRANSPARENCY](/goto/aitransparency/), [EXPLAINABILITY](/goto/explainability/), [CONTINUOUSVALIDATION](/goto/continuousvalidation/), [UNWANTEDBIASTESTING](/goto/unwantedbiastesting/))


All threats and controls are discussed in the further content of the AI Exchange.

### Threat model with controls - GenAI trained/fine tuned
Below diagram restricts the threats and controls to Generative AI only, for situations in which **training or fine tuning** is done by the organization (note: this is not very common given the high cost and required expertise).

![AI Security Threats and controls - GenAI trained or fine tuned](/images/threatscontrols-genainotready.png)

### Threat model with controls - GenAI as-is
Below diagram restricts the threats and controls to Generative AI only where the model is used **as-is** by the organization. The provider (e.g. OpenAI) has done the training/fine tuning. Therefore, some threats are the responsibility of the model provider (sensitive/copyrighted data, manipulation at the provider). Nevertheless, the organization that uses the model should take these risks into account and gain assurance about them from the provider.

In many situation, the as-is model will be hosted externally and therefore security depends on how the supplier is handling the data, including the security configuration. How is the API protected? What is virtual private cloud? The entire external model, or just the API? Key management? Data retention? Logging? Does the model reach out to third party sources by sending out sensitive input data?

![AI Security Threats and controls - GenAI as-is](/images/threatscontrols-readymodel.png)


### Navigator diagram
>Category: discussion  
>Permalink: https://owaspai.org/goto/navigator/

The navigator diagram below shows all threats, controls and how they relate, including risks and the types of controls.  
{{< callout type="info" >}}
  Click on the image to get a PDF with clickable links.
{{< /callout >}}
[![](/images/owaspaioverviewv2.png)](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewpdfv3.pdf)


## About this Document
>Category: discussion  
>Permalink: https://owaspai.org/goto/about/

This document discusses threats to AI cyber security and controls for those threats (i.e. countermeasures, requirements, mitigations).
Security here means preventing unauthorized access, use, disclosure, disruption, modification, or destruction. Modification includes manipulating the behaviour of an AI model in unwanted ways.

The AI Exchange initiative was taken by OWASP, triggered by [Rob van der Veer](https://www.linkedin.com/in/robvanderveer/) - bridge builder for security standards, senior director at [Software Improvement Group](https://www.softwareimprovementgroup.com), with 31 years of experience in AI & security, lead author of ISO/IEC 5338 on AI lifecycle, founding father of OpenCRE, and currently working on security requirements concerning the EU AI act in CEN/CENELEC.

This material is all draft and work in progress for others to review and amend.
It serves as input to ongoing key initiatives such as the EU AI act, ISO/IEC 27090 on AI security, ISO/IEC 27091 on AI privacy, the [OWASP ML top 10](https://mltop10.info/), [OWASP LLM top 10](https://llmtop10.com/), and many more initiatives can benefit from consistent terminology and insights across the globe.

### Sources

- AI security experts who contributed to this as Open Source.
- The insights of these experts were inspired by research work as mentioned in the references at the bottom of this document(ENISA, NIST, Microsoft, BIML, MITRE, etc.)

### How we organized threats and controls

The threats are organized by attack surface (how and where does the attack take place?), and not by impact. This means that for example model theft is mentioned in three different parts of the overview:

1. model theft by stealing model parameters from a live system, e.g. breaking into the network and reading the parameters from a file,
2. model theft by stealing the modeling process or parameters from the engineering environment, e.g. stored in the version management system of a data scientist, and
3. model theft by reverse engineering from using the AI system. These are three very different attacks, with similar impacts. This way of organizing is helpful because the goal is to link the threats to controls, and these controls vary per attack surface.

## How to select relevant threats and controls? risk analysis
>Category: discussion  
>Permalink: https://owaspai.org/goto/riskanalysis/

There are many threats and controls described in this document. Your situation determines which threats are relevant to you, and what controls are your responsibility. This selection process can be performed through risk analysis (or risk assessment) of the use case and architecture at hand:

1. **Risk identification and estimation**: First select the threats that are relevant to your situation and estimate their level of impact and probability.  

    You can do this by going through the list of threats and use the _Impact_ description to see if it is applicable. For example the impact of identifying individuals in your training data would not apply to your case if your training data has no individuals. The [Navigator](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewpdfv3.pdf) shows impact in purple. A bief overview of all impact can be found in the [AI security matrix](/goto/aisecuritymatrix).

    Next, you can walk by the remaining threats and look at the attack surface to see if that is relevant. For example, if you don't use an external model, then the model supply chain is not a relevant attack surface and neither are the connected threats.

    You can use the following decision steps to further select relevant threats:

    If your train data is not sensitive: ignore the confidentiality of train data threats. A special case is the threat of _membership inference_: this threat only applies when the **fact** that a person was part of the training set is harmful information about the person, for example when the training set consists of criminals and their history to predict criminal careers: membership of that set gives away the person is a convicted or alleged criminal.

    If your model is a GenAI model, ignore the following threats: evasion, model inversion. Also ignore prompt injection and insecure output handling if your GenAI model is NOT an LLM

    If your model is not a GenAI model, ignore (direct) prompt injection, and insecure output handling.

    If your input data is not sensitive, ignore ‘leaking input data’. If you use RAG, consider data you retrieve also as input data.

    If you use RAG (Retrieval Augmented Generation), then treat the retrieval repository (including embeddings) just like training data. Meaning:
      - Include the threats regarding data poisoning
      - Include the threats regarding train/test data leak if the data is sensitive

    Else, if you don’t train or fine tune the model:
      - Ignore the development-time threats, with the exception of supply chain management: make sure the model you obtain is not manipulated, and genuine
      - Ignore the confidentiality of train data threats
      - Ignore the confidentiality of model IP threats
      - Ignore the data poisoning threat
      - Ignore development-time controls (e.g. filtering sensitive training data)

    These are the responsibilities of the model maker, but be aware you may be effected by the unwanted results. The maker may take the blame for any issue, which would take care of confidentiality issues, but you would suffer effectively from any manipulated model behaviour.

    If threats are remaining that effect the behaviour of the model (e.g. evasion, data poisoning), then consider what the motivation of an attacker could be. What could an attacker gain by for example sabotaging your model? Just a claim to fame? Could it be a disgruntled employee? Maybe a competitor? What could an attacker gain by a less conspicuous model behaviour attack, like an evasion attack or data poisoning with a trigger? Is there a scenario where an attacker benefits from fooling the model? An example where evasion IS interesting and possible: adding certain words in a spam email so that it is not recognized as such. An example where evasion is not interesting is when a patient gets a skin disease diagnosis based on a picture of the skin. The patient has no interest in a wrong decision, and also the patient typically has no control - well maybe by painting the skin. There are situations in which this CAN be of interest for the patient, for example to be eligible for compensation in case the (faked) skin disease was caused by certain restaurant food. This demonstrates that it all depends on the context whether a theoretical threat is a real threat or not. Depending on the probability and impact of the threats, and on the relevant policies, some threats may be accepted as risk. When not accepted, the level of risk is input to the strength of the controls. For example: if data poisoning can lead to substantial benefit for a group of attackers, then the training data needs to be get a high level of protection.

3. **Arrange responsibility**: For each selected threat, determine who is responsible to address it. By default, the organization that builds and deploys the AI system is responsible, but building and deploying may be done by different organizations, and some parts of the building and deployment may be deferred to other organizations, e.g. hosting the model, or providing a cloud environment for the application to run. Some aspects are shared responsibilities.

    If components of your AI system are hosted, then you share responsibility regarding all controls for the relevant threats with the hosting provider. This needs to be arranged with the provider, using for example a responsibility matrix. Components can be the model, model extensions, your application, or your infrastructure. See [Threat model of using a model as-is](#threat-model-with-controls---genai-as-is).

   If an external party is not open about how certain risks are mitigated, consider requesting this information and when this remains unclear you are faced with either 1) accept the risk, 2) or provide your own mitigations, or 3)avoid the risk, by not engaging with the third party.

4. **Verify external responsibilities:** For the threats that are the responsibility of other organisations: attain assurance whether these organisations take care of it. This would involve the controls that are linked to these threats.
5. **Select controls**: Then, for the threats that are relevant to you and for which you are responsible: consider the various controls listed with that threat (or the parent section of that threat) and the general controls (they always apply). When considering a control, look at its purpose and determine if you think it is important enough to implement it and to what extent. This depends on the cost of implementation compared to how the purpose mitigates the threat, and the level of risk of the threat. These elements also play a role of course in the order you select controls: highest risks first, then starting with the lower cost controls (low hanging fruit).
6. **Use references**: When implementing a control, consider the references and the links to standards. You may have implemented some of these standards, or the content of the standards may help you to implement the control.
7. **Risk acceptance**: In the end you need to be able to accept the risks that remain regarding each threat, given the controls that you implemented.
8. **Further management of these controls** (see [SECPROGRAM](/goto/secprogram/)), which includes continuous monitoring, documentation, reporting, and incident response.

For more information on risk analysis, see the [SECPROGRAM](/goto/secprogram/) control.

## How about ...
### How about AI outside of machine learning?
A helpful way to look at AI is to see it as consisting of machine learning (the current dominant type of AI) models and _heuristic models_. A model can be a machine learning model which has learned how to compute based on data, or it can be a heuristic model engineered based on human knowledge, e.g. a rule-based system. Heuristic models still need data for testing, and sometimes to perform analysis for further building and validating the human knowledge.  
This document focuses on machine learning. Nevertheless, here is a quick summary of the machine learning threats from this document that also apply to heuristic systems:

- Model evasion is also possible for heuristic models, -trying to find a loophole in the rules
- Model theft through use - it is possible to train a machine learning model based on input/output combinations from a heuristic model
- Overreliance in use - heuristic systems can also be relied on too much. The applied knowledge can be false
- Data poisoning and model poisoning is possible by manipulating data that is used to improve knowledge and by manipulating the rules development-time or runtime
- Leaks of data used for analysis or testing can still be an issue
- Knowledge base, source code and configuration can be regarded as sensitive data when it is intellectual property, so it needs protection
- Leak sensitive input data, for example when a heuristic system needs to diagnose a patient

### How about responsible or trustworthy AI?

Where do you draw the line when it comes to AI topics you want to master?  
There are many types of risks involved with AI, apart from security risks. It can be tempting to go down the so-called _rabbit hole_ and learn about these matters. People are curious about AI in the broad sense. At the same time this can be distracting from our primary goal as professionals. If our main responsibility is security, then the best strategy is to first focus on AI security and after that learn the details on the other AI aspects - which are helpful for us to understand, if only to help our colleagues to stay alert.  
Therefore, it is important for leaders and stakeholders to be explicit about responsiblities, including those about privacy, legal and governance. Otherwise, security people may tend to take on too much responsibilities (e.g. accuracy of the model) and be overwhelmed, as they often care about the good of the organisation.

Responsible or trustworthy AI includes security, but not the other way around: there are many more aspects of responsible/trustworthy AI than just security, and to make matters confusing, each of these aspects has a link with security. Let's try to clarify:
- **Accuracy** is about the AI model being sufficiently correct to perform its 'business function'. Being incorrect can lead to physical safety problems (e.g. car trunk opens during driving) or other wrong decisions that are harmful (e.g. wrongfully declined loan). The link with security is that some attacks cause unwanted model behaviour which is by definition an accuracy problem. Nevertheless, the security scope is restricted to mitigating the risks of those attacks - NOT solve the entire problem of creating an accurate model (selecting representative data for the trainset etc.).
- **Safety** (also _reliability_) is about the level of accuracy when there is a risk of harm (typically implying physical harm but not restricted to that) , plus the things that are in place to mitigate those risks (apart from accuracy), which included security to safeguard accuracy, plus a number of safety measures that are important for the business function of the model. These need to be taken care of not just for security reasons because the model can make unsafe decisions for other reasons (e.g. bad training data), so they are a shared concern between safety and security:
  -  oversight to restrict unsafe behaviour, and connected to that: assigning least privileges to the model,
  -  continuous validation to safeguard accuracy,
  -  transparency to warn users and depending systems of accuracy risks,
  -  explainability to help users validate accuracy
- **Transparency**: see above, plus in many cases users have the right to know details about a model being used and how it has been created. Therefore it is a shared concern between security, privacy and safety.
- **Explainability**: see above, and apart from validating accuracy this can also support users to get transparency and also understand what needs to change to get a different outcome. Therefore it is a shared concern between security, privacy, safety and business function. A special case is when explainability is required by law separate from privacy, which adds 'compliance' to the list of aspects that share this concern.
- **Robustness** is about the ability of maintaining accuracy under expected or unexpected variations in input. The security scope is about when those variations are malicious which often requires different countermeasures than those required for robustness against benign variations. Just like with accuracy, security is not involved per se in creating a robust model for benign variations. The exception to this is when benign robustness supports malicious robustness, in which case this is a shared concern between safety and security. This depends on a case by case basis.
- **Fairness** as in 'free of unwanted bias' where the model 'mistreats' certain groups. This is undesired for legal and ethical reasons and primarily therefore a business concern. The relation with security is that having detection of unwanted bias can help to identify unwanted model behaviour caused by an attack. For example, a data poisoning attack has inserted malicious data samples in the training set, which at first goes unnoticed, but then is discovered by an unexplained detection of bias in the model.
- **Empathy**. The relation of that with security is that the feasible level of security should always be taken into account when validating a certain application of AI. If a sufficient level of security cannot be provided to individuals or organizations, then empathy means invalidating the idea, or takin other precautions.
- **Accountability**. The relation of accountability with security is that security measures should be demonstrable, including the process that have led to those measures. In addition, traceability as a security property is important, just like in any IT system, in order to detect, reconstruct and respond to security incidents and provide accountability.

### How about privacy?
> Category: discussion  
> Permalink: https://owaspai.org/goto/privacy/

AI Privacy can be divided into two parts:

1. The AI security threats and controls in this document that are about confidentiality and integrity of (personal) data (e.g. model inversion, leaking training data), plus the integrity of the model behaviour
2. Threats and controls with respect to rights of the individual, as covered by privacy regulations such as the GDPR, including use limitation, consent, fairness, transparency, data accuracy, right of correction/objection/reassure/access. For an overview, see the [Privacy part of the OWASP AI guide](https://owasp.org/www-project-ai-security-and-privacy-guide/)

### How about Generative AI (e.g. LLM)?

Yes, GenAI is leading the current AI revolution and it's the fastest moving subfield of AI security. Nevertheless it is important to realize that other types of algorithms (let's call it _predictive AI_) will remain to be applied to many important use cases such as credit scoring, fraud detection, medical diagnosis, product recommendation, image recognition, predictive maintenance, process control, etc. Relevant content has been marked with 'GenAI' in this document.

Important note: from a security threat perspective, GenAI is not that different from other forms of AI (_predictive AI_). GenAI threats and controls largely overlap and are very similar to AI in general. Nevertheless, some risks are (much) higher. Some are lower. Only a few risks are GenAI-specific. Some of the control categories differ substantially between GenAI and predictive AI - mostly the data science controls (e.g. adding noise to the training set). In many cases, GenAI solutions will use a model as-is and not involve any training by the organization whatsoever, shifting some of the security responsibilities from the organization to the supplier.

What is mainly new to the threat landscape because of LLMs?  
- First of all, LLMs pose new threats to security because they may be used to create code with vulnerabilities, or they may be used by attackers to create malware, or they may cause harm otherwiser through hallucinations, but these are out of scope of the AI Exchange, as it focuses on security threats TO AI systems.
- Regarding input:
  - Prompt injection is a completely new threat: attackers manipulating the behaviour of the model with crafted and sometimes hidden instructions.
  - Also new is organizations sending huge amounts of data in prompts, with company secrets and personal data.
- Regarding output: New is the fact that output can contain injection attacks, or can contain sensitive or copyrighted data.
- Overreliance and excessive agency are issues. We let LLMs control things and may have too much trust in how correct they are, and also underestimate the risk of them being manipulated. The result is that attacks can have much impact.
- Regarding training: Since the training sets are so large and based on public data, it is easier to perform data poisoning. Poisoned foundation models are also a big supply chain issues.

GenAI security particularities are:

|Nr.| GenAI security particularities |OWASP for LLM TOP 10|
|-| ----------|-------------------|
|1| Evasion attacks in general are about fooling a model using crafted input to make an unwanted decision, whereas for GenAI it is about fooling a model using a crafted prompt to circumvent behavioral policies (e.g. preventing offensive output or prevent leaking secrets). |  ([OWASP for LLM 01:Prompt injection](https://llmtop10.com/llm01/))  |
|2| Unwanted output of sensitive training data is an AI-broad issue, but more likely to be a high risk with GenAI systems that typically output rich content, and have been trained on a large variety of data sets.  |  ([OWASP for LLM 06](https://llmtop10.com/llm06/))  |
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
- [Demystifying the LLM top 10](https://blog.kloudzone.co.in/demystifying-the-owasp-top-10-for-large-language-model-applications/)
- [Impacts and risks of GenAI](https://arxiv.org/pdf/2306.13033.pdf)

### How about the NCSC/CISA guidelines?

Mapping of the UK/US [Guidelines for secure AI
system development](https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development) to the controls here at the AI Exchange:  
(Search for them in this document or use the [Navigator](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewpdfv3.pdf))

1. Secure design

- Raise staff awareness of threats and risks:  
  #[SECEDUCATE](/goto/seceducate/)
- Model the threats to your system:  
  See Risk analysis under #[SECPROGRAM](/goto/secprogram/)
- Design your system for security as well as functionality and performance:  
  #[AIPROGRAM](/goto/aiprogram/ ), #[SECPROGRAM](/goto/secprogram/), #[DEVPROGRAM](/goto/devprogram/), #[SECDEVPROGRAM](/goto/secdevprogram/), #[CHECKCOMPLIANCE](/goto/checkcompliance/), #[LEASTMODELPRIVILEGE](/goto/leastmodelprivilege/), #[DISCRETE](/goto/discrete/), #[OBSCURECONFIDENCE](/goto/obscureconfidence/), #[OVERSIGHT](/goto/oversight/), #[RATELIMIT](/goto/ratelimit/),  #[DOSINPUTVALIDATION](/goto/dosinputvalidation/), #[LIMITRESOURCES](/goto/limitresources/), #[MODELACCESSCONTROL](/goto/modelaccesscontrol/), #AITRANSPRENCY
- Consider security benefits and trade-offs when selecting your AI model  
  All development-time data science controls (currently 13), #[EXPLAINABILITY](/goto/explainability/)

2. Secure Development

- Secure your supply chain:  
  #[SUPPLYCHAINMANAGE](/goto/supplychainmanage/)
- Identify, track and protect your assets:  
  #[DEVDATAPROTECT](/goto/devdataprotect/), #[DEVSECURITY](/goto/devsecurity/), #[SEGREGATEDATA](/goto/segregatedata/), #[CONFCOMPUTE](/goto/confcompute/), #[MODELINPUTCONFIDENTIALITY](/goto/modelinputconfidentiality/), #[RUNTIMEMODELCONFIDENTIALITY](/goto/runtimemodelconfidentiality/), #[DATAMINIMIZE](/goto/dataminimize/), #[ALLOWEDDATA](/goto/alloweddata/), #[SHORTRETAIN](/goto/shortretain/), #[OBFUSCATETRAININGDATA](/goto/obfuscatetrainingdata/) and part of #[SECPROGRAM](/goto/secprogram/)
- Document your data, models and prompts:  
  Part of #[DEVPROGRAM](/goto/devprogram/)
- Manage your technical debt:  
  Part of #[DEVPROGRAM](/goto/devprogram/)

3. Secure deployment

- Secure your infrastructure:  
  Part of #[SECPROGRAM](/goto/secprogram/) and see ‘Identify, track and protect your assets’
- Protect your model continuously:  
  #[INPUTDISTORTION](/goto/inputdistortion/), #[FILTERSENSITIVEMODELOUTPUT](/goto/filtersensitivemodeloutput/), #[RUNTIMEMODELIOINTEGRITY](/goto/runtimemodeliointegrity/), #[MODELINPUTCONFIDENTIALITY](/goto/modelinputconfidentiality/), #[PROMPTINPUTVALIDATION](/goto/promptinputvalidation/), #[INPUTSEGREGATION](/goto/inputsegregation/)
- Develop incident management procedures:  
  Part of #[SECPROGRAM](/goto/secprogram/)
- Release AI responsibly:  
  Part of #[DEVPROGRAM](/goto/devprogram/)
- Make it easy for users to do the right things:  
  Part of #[SECPROGRAM](/goto/secprogram/)

4. Secure operation and maintenance

- Monitor your system’s behaviour:  
  #[CONTINUOUSVALIDATION](/goto/continuousvalidation/), #[UNWANTEDBIASTESTING](/goto/unwantedbiastesting/)
- Monitor your system’s inputs:  
  #[MONITORUSE](/goto/monitoruse/), #[DETECTODDINPUT](/goto/detectoddinput/), #[DETECTADVERSARIALINPUT](/goto/detectadversarialinput/)
- Follow a secure by design approach to updates:  
  Part of #[SECDEVPROGRAM](/goto/secdevprogram/)
- Collect and share lessons learned:  
  Part of #[SECDEVPROGRAM](/goto/secprogram/) and #[SECDEVPROGRAM](/goto/secdevprogram/)

## References
>Category: discussion  
>Permalink: https://owaspai.org/goto/references/

See the [Media page](/media) for several webinars and podcast by and about the AI Exchange.

Overviews of AI security threats:

- [OWASP LLM top 10](https://llmtop10.com/)
- [ENISA ML threats and countermeasures 2021](https://www.enisa.europa.eu/publications/securing-machine-learning-algorithms)
- [MITRE ATLAS framework for AI threats](https://atlas.mitre.org/)
- [NIST threat taxonomy](https://csrc.nist.gov/publications/detail/white-paper/2023/03/08/adversarial-machine-learning-taxonomy-and-terminology/draft)
- [ETSI SAI Problem statement Section 6](https://www.etsi.org/committee/1640-sai#)
- [Microsoft AI failure modes](https://docs.microsoft.com/en-us/security/failure-modes-in-machine-learning)
- [NIST](https://csrc.nist.gov/pubs/ai/100/2/e2023/final)
- [NISTIR 8269 - A Taxonomy and Terminology of Adversarial Machine Learning](https://csrc.nist.rip/external/nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8269-draft.pdf)
- [OWASP ML top 10](https://mltop10.info/)
- [BIML](https://berryvilleiml.com/taxonomy/)
- [PLOT4ai threat library](https://plot4.ai/library)

Overviews of AI security/privacy incidents:

- [AVID AI Vulnerability database](https://avidml.org/)
- [OECD AI Incidents Monitor (AIM)](https://oecd.ai/en/incidents)

Misc.:

- [ENISA AI security standard discussion](https://www.enisa.europa.eu/publications/cybersecurity-of-ai-and-standardisation)
- [ENISA's multilayer AI security framework](https://www.enisa.europa.eu/publications/multilayer-framework-for-good-cybersecurity-practices-for-ai)
- [Alan Turing institute's AI standards hub](https://aistandardshub.org)
- [Microsoft/MITRE tooling for ML teams](https://www.mitre.org/news-insights/news-release/microsoft-and-mitre-create-tool-help-security-teams-prepare-attacks?sf175190906=1)
- [Google's Secure AI Framework](https://blog.google/technology/safety-security/introducing-googles-secure-ai-framework/)
- [NIST AI Risk Management Framework 1.0](https://doi.org/10.6028/NIST.AI.100-1)
- [ETSI GR SAI 002 V 1.1.1 Securing Artificial Intelligence (SAI) – Data Supply Chain Security](https://www.etsi.org/deliver/etsi_gr/SAI/001_099/002/01.01.01_60/gr_SAI002v010101p.pdf)
- [ISO/IEC 20547-4 Big data security](https://www.iso.org/standard/71278.html)
- [IEEE 2813 Big Data Business Security Risk Assessment](https://standards.ieee.org/ieee/2813/7535/)
