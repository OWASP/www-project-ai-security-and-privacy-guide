---
title: AI Security Overview
weight: 1
---
## Summary - How to address AI Security?
>See [home](https://owaspai.org/) for more information about this initiative, the OWASP AI Exchange, how to contribute or connect.  
>Category: discussion  
>Permalink: https://owaspai.org/goto/summary/

While AI offers tremendous opportunities, it also brings new risks including security threats. It is therefore imperative to approach AI applications with a clear understanding of potential threats and the controls against them. In a nutshell, the main steps to address AI security are: 

- Implement **AI governance**.
- **Extend your security practices** with the AI security assets, threats and controls from this document.
- If you develop AI systems (even if you don't train your own models):
  - Involve your data and AI engineering into your traditional **(secure) software development practices**.
  - Apply appropriate process **controls** and technical controls through understanding of the threats as discussed in this document.
- Make sure your AI **suppliers** applied the appropriate controls.
- **Limit the impact** of AI by minimizing data and privileges, and by adding oversight, e.g. guardrails, human oversight.

Note that an AI system can for example be a Large Language Model, a linear regression function, a rule-based system,or a lookup table based on statistics. Throughout this document it is made clear when which threats and controls play a role.

---

## About this Document
>Category: discussion  
>Permalink: https://owaspai.org/goto/about/

This page contains an overview of AI security and the next pages provide the main content about security threats to AI and controls against them, organized by attack surface:
1. [General controls, such as AI governance](/goto/generalcontrols/)
2. [Threats through use, such as Evasion attacks](/goto/threatsuse/)
3. [Development-time threats, such as data poisoning](/goto/developmenttime/)
4. [Runtime security threats, such as insecure output](/goto/runtimeappsec/)

You can navigate through pages at the bottom of every page, or in the left sidebar. The right sidebar shows the different sections on a page. On small screens you can navigate through the menu.  

Security here means preventing unauthorized access, use, disclosure, disruption, modification, or destruction. Modification includes manipulating the behaviour of an AI model in unwanted ways.

The AI Exchange initiative was taken by OWASP, triggered by [Rob van der Veer](https://www.linkedin.com/in/robvanderveer/) - bridge builder for security standards, senior director at [Software Improvement Group](https://www.softwareimprovementgroup.com), with 31 years of experience in AI & security, lead author of ISO/IEC 5338 on AI lifecycle, founding father of OpenCRE, and currently working on security requirements concerning the EU AI act in CEN/CENELEC.

This material is evolving constantly through open source continuous delivery. The authors group consists of 50 experts (researchers, practitioners, vendors, data scientists, etc.) and other people in the community are welcome to provide input too. See the [contribute page](/contribute).
It serves as input to ongoing key initiatives such as the EU AI act, ISO/IEC 27090 on AI security, ISO/IEC 27091 on AI privacy, the [OWASP ML top 10](https://mltop10.info/), [OWASP LLM top 10](https://llmtop10.com/), and many more initiatives can benefit from consistent terminology and insights across the globe.

This page will continue about:
- Threats high-over
- Various overviews of threats and controls: the matrix, the periodic table, and the navigator
- Risk analysis to select relevant threats and controls
- Discussion (how about ...) of various topics: heuristic systems, responsible AI, privacy, generative AI, the NCSC/CISA guidelines,and copyright
---

## Threats overview
>Category: discussion  
>Permalink: https://owaspai.org/goto/threatsoverview/

### Threat model
We distinguish three types of threats:
1. during development-time (when data is obtained and prepared, and the model is trained/obtained),
2. through using the model (providing input and reading the output), and
3. by attacking the system during runtime (in production).

In AI we distinguish 6 types of impacts, for three types of attacker goals (disrupt, deceive and disclose):
1. disclose: hurt confidentiality of train/test data
2. disclose: hurt confidentiality of model Intellectual property (the _model parameters_ or the process and data that led to them)
3. disclose: hurt confidentiality of input data
4. deceive: hurt integrity of model behaviour (the model is manipulated to behave in an unwanted way to deceive)
5. disrupt: hurt availability of the model (the model either doesn't work or behaves in an unwanted way - not to deceive but to disrupt)
6. confidentiality, integrity, and availability of non AI-specific assets

The threats that create these impacts use different attack surfaces. For example: the confidentiality of train data can be compromised by hacking into the database during development-time, but it can also leak by a _membership inference attack_ that can find out whether a certain individual was in the train data, simply by feeding that person's data into the model and looking at the details of the model output.

The diagram shows the threats as arrows. Each threat has a specific impact, indicated by letters referring to the Impact legend. The control overview section contains this diagram with groups of controls added.
[![](/images/threats.png)](/images/threats.png)

### AI Security Matrix
>Category: discussion  
>Permalink: https://owaspai.org/goto/aisecuritymatrix/

The AI security matrix below (click to enlarge) shows all threats and risks, ordered by type and impact.
[![](/images/OwaspAIsecuritymatix.png)](/images/OwaspAIsecuritymatix.png)

---

## Controls overview
>Category: discussion  
>Permalink: https://owaspai.org/goto/controlsoverview/

### Threat model with controls - general
The below diagram puts the controls in the AI Exchange into groups and places these groups in the right lifecycle with the corresponding threats.
[![](/images/threatscontrols.png)](/images/threatscontrols.png)
The groups of controls form a summary of how to address AI security (controls are in capitals):
1. **AI Governance**: implement governance processes for AI risk, and include AI into your processes for information security and software lifecycle:  
   >( [AIPROGRAM](/goto/aiprogram/ ), [SECPROGRAM](/goto/secprogram/), [DEVPROGRAM](/goto/devprogram/), [SECDEVPROGRAM](/goto/secdevprogram/), [CHECKCOMPLIANCE](/goto/checkcompliance/), [SECEDUCATE](/goto/seceducate/))
2. Apply conventional **technical IT security controls** risk-based, since an AI system is an IT system:
    - 2a Apply **standard** conventional IT security controls (e.g. 15408, ASVS, OpenCRE, ISO 27001 Annex A, NIST SP800-53) to the complete AI system and don't forget the new AI-specific assets :
      - Development-time: model & data storage, model & data supply chain, data science documentation:  
        >([DEVSECURITY](/goto/devsecurity/), [SEGREGATEDATA](/goto/segregatedata/), [SUPPLYCHAINMANAGE](/goto/supplychainmanage/), [DISCRETE](/goto/discrete/))
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

[![AI Security Threats and controls - GenAI trained or fine tuned](/images/threatscontrols-genainotready.png)](/images/threatscontrols-genainotready.png)

### Threat model with controls - GenAI as-is
Below diagram restricts the threats and controls to Generative AI only where the model is used **as-is** by the organization. The provider (e.g. OpenAI) has done the training/fine tuning. Therefore, some threats are the responsibility of the model provider (sensitive/copyrighted data, manipulation at the provider). Nevertheless, the organization that uses the model should take these risks into account and gain assurance about them from the provider.

In many situation, the as-is model will be hosted externally and therefore security depends on how the supplier is handling the data, including the security configuration. How is the API protected? What is virtual private cloud? The entire external model, or just the API? Key management? Data retention? Logging? Does the model reach out to third party sources by sending out sensitive input data?

[![AI Security Threats and controls - GenAI as-is](/images/threatscontrols-readymodel.png)](/images/threatscontrols-readymodel.png)

### Periodic table of AI security
>Category: discussion  
>Permalink: https://owaspai.org/goto/periodictable/

The table below, created by the OWASP AI Exchange, shows the various threats to AI and the controls you can use against them – all organized by asset, impact and attack surface, with deeplinks to comprehensive coverage here at the AI Exchange website.  
Note that [general governance controls](/goto/governancecontrols/) apply to all threats.

<table><thead>
<tr><th>Asset &amp; Impact</th><th>Attack surface with lifecycle</th><th>Threat/Risk category</th><th>Controls</th></tr>
</thead><tbody>
<tr><td rowspan="7">Model behaviour Integrity</td><td rowspan="3">Runtime -Model use (provide input/ read output)</td><td><a href="/goto/directpromptinjection/">Direct prompt injection</a></td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>, <a href="/goto/promptinputvalidation/">Input validation</a>, further controls implemented in the model itself</td></tr>
<tr>                                         <td><a href="/goto/indirectpromptinjection/">Indirect prompt injection</a></td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>, <a href="/goto/promptinputvalidation/">Input validation</a>, <a href="/goto/inputsegregation/">Input segregation</a></td></tr>
<tr>                                         <td><a href="/goto/evasion/">Evasion</a> (e.g. adversarial examples)</td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>, <a href="/goto/monitoruse/">Monitor</a>, <a href="/goto/ratelimit/">rate limit</a>, <a href="/goto/modelaccesscontrol/">model access control</a> plus:<br><br><a href="/goto/detectoddinput/">Detect odd input</a>, <a href="/goto/detectadversarialinput/">detect adversarial input</a>, <a href="/goto/evasionrobustmodel/">evasion robust model</a>, <a href="/goto/trainadversarial/">train adversarial</a>, <a href="/goto/inputdistortion/">input distortion</a>, <a href="/goto/adversarialrobustdistillation/">adversarial robust distillation</a></td></tr>
<tr>                                         <td>Runtime - Break into deployed model</td><td><a href="/goto/runtimemodelpoison/">Model poisoning runtime</a> (reprogramming)</td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>, <a href="/goto/runtimemodelintegrity/">Runtime model integrity</a>, <a href="/goto/runtimemodeliointegrity/">runtime model input/output integrity</a></td></tr>
<tr><td rowspan="2">Development -Engineering environment</td><td><a href="/goto/devmodelpoison/">Development-environment model poisoning</a></td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>, <a href="/goto/devsecurity/">Development environment security</a>, <a href="/goto/segregatedata/">data segregation</a>, <a href="/goto/federatedlearning/">federated learning</a>, <a href="/goto/supplychainmanage/">supply chain management</a> plus:<br><br><a href="/goto/modelensemble/">model ensemble</a></td></tr>
<tr>                                         <td><a href="/goto/datapoison/">Data poisoning of train/finetune data</a></td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>, <a href="/goto/devsecurity/">Development environment security</a>, <a href="/goto/segregatedata/">data segregation</a>, <a href="/goto/federatedlearning/">federated learning</a>, <a href="/goto/supplychainmanage/">supply chain management</a> plus:<br><br><a href="/goto/modelensemble/">model ensemble</a> plus:<br><br><a href="/goto/moretraindata/">More training data</a>, <a href="/goto/dataqualitycontrol/">data quality control</a>, <a href="/goto/traindatadistortion/">train data distortion</a>, <a href="/goto/poisonrobustmodel/">poison robust model</a>, <a href="/goto/trainadversarial/">train adversarial</a></td></tr>
<tr><td>Development - Supply chain</td><td><a href="/goto/supplymodelpoison/">Supply-chain model poisoning</a></td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>,<br>Supplier: <a href="/goto/devsecurity/">Development environment security</a>, <a href="/goto/segregatedata/">data segregation</a>, <a href="/goto/federatedlearning/">federated learning</a><br><br>Producer: <a href="/goto/supplychainmanage/">supply chain management</a> plus:<br><br><a href="/goto/modelensemble/">model ensemble</a></td></tr>
<tr><td rowspan="3">Training data Confidentiality</td><td rowspan="2">Runtime - Model use</td><td><a href="/goto/disclosureuseoutput/">Data disclosure in model output</a></td><td><a href="/goto/datalimit/">Sensitive data limitation</a> (data minimize, short retain, obfuscate training data) plus:<br><br><a href="/goto/monitoruse/">Monitor</a>, <a href="/goto/ratelimit/">rate limit</a>, <a href="/goto/modelaccesscontrol/">model access control</a> plus:<br><br><a href="/goto/filtersensitivemodeloutput/">Filter sensitive model output</a></td></tr>
<tr><td><a href="/goto/modelinversionandmembership/">Model inversion / Membership inference</a></td><td><a href="/goto/datalimit/">Sensitive data limitation</a> (data minimize, short retain, obfuscate training data) plus:<br><br><a href="/goto/monitoruse/">Monitor</a>, <a href="/goto/ratelimit/">rate limit</a>, <a href="/goto/modelaccesscontrol/">model access control</a> plus:<br><br><a href="/goto/obscureconfidence/">Obscure confidence</a>, <a href="/goto/smallmodel/">Small model</a></td></tr>
<tr><td>Development - Engineering environment</td><td><a href="/goto/devdataleak/">Training data leaks</a></td><td><a href="/goto/datalimit/">Sensitive data limitation</a> (data minimize, short retain, obfuscate training data) plus:<br><br><a href="/goto/devsecurity/">Development environment security</a>, <a href="/goto/segregatedata/">data segregation</a>, <a href="/goto/federatedlearning/">federated learning</a></td></tr>
<tr><td rowspan="3">Model confidentiality</td><td>Runtime - Model use</td><td><a href="/goto/modeltheftuse/">Model theft through use</a> (input-output harvesting)</td><td><a href="/goto/monitoruse/">Monitor</a>, <a href="/goto/ratelimit/">rate limit</a>, <a href="/goto/modelaccesscontrol/">model access control</a></td></tr>
<tr><td>Runtime - Break into deployed model</td><td><a href="/goto/runtimemodeltheft/">Direct model theft runtime</a></td><td><a href="/goto/runtimemodelconfidentiality/">Runtime model confidentiality</a>, <a href="/goto/modelobfuscation/">Model obfuscation</a></td></tr>
<tr><td>Development - Engineering environment</td><td><a href="/goto/devmodelleak/">Model theft development-time</a></td><td><a href="/goto/devsecurity/">Development environment security</a>, <a href="/goto/segregatedata/">data segregation</a>, <a href="/goto/federatedlearning/">federated learning</a></td></tr>
<tr><td>Model behaviour Availability</td><td>Model use</td><td><a href="/goto/denialmodelservice/">Denial of model service</a> (model resource depletion)</td><td><a href="/goto/monitoruse/">Monitor</a>, <a href="/goto/ratelimit/">rate limit</a>, <a href="/goto/modelaccesscontrol/">model access control</a> plus:<br><br><a href="/goto/dosinputvalidation/">Dos input validation</a>, <a href="/goto/limitresources/">limit resources</a></td></tr>
<tr><td>Model input data Confidentialiy</td><td>Runtime - All IT</td><td><a href="/goto/leakinput/">Model input leak</a></td><td><a href="/goto/modelinputconfidentiality/">Model input confidentiality</a></td></tr>
<tr><td>Any asset, CIA</td><td>Runtime-All IT</td><td><a href="/goto/insecureoutput/">Model output contains injection</a></td><td><a href="/goto/encodemodeloutput/">Encode model output</a></td></tr>
<tr><td>Any asset, CIA</td><td>Runtime - All IT</td><td>Conventional runtime security attack on conventional asset</td><td>Conventional runtime security controls</td></tr>
<tr><td>Any asset, CIA</td><td>Runtime - All IT</td><td>Conventional attack on conventional supply chain</td><td>Conventional supply chain management controls</td></tr>
</tbody></table>


### Navigator diagram
>Category: discussion  
>Permalink: https://owaspai.org/goto/navigator/

The navigator diagram below shows all threats, controls and how they relate, including risks and the types of controls.  
{{< callout type="info" >}}
  Click on the image to get a PDF with clickable links.
{{< /callout >}}
[![](/images/owaspaioverviewv2.png)](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewpdfv3.pdf)

---

## How to select relevant threats and controls? risk analysis
>Category: discussion  
>Permalink: https://owaspai.org/goto/riskanalysis/

There are many threats and controls described in this document. Your situation and how you use AI determines which threats are relevant to you, to what extent, and what controls are who's responsibility. This selection process can be performed through risk analysis (or risk assessment) in light of the use case and architecture.

**Risk management introduction**  
Organizations classify their risks into several key areas: Strategic, Operational, Financial, Compliance, Reputation, Technology, Environmental, Social, and Governance (ESG). A threat becomes a risk when it exploits one or more vulnerabilities. AI threats, as discussed in this resource, can have significant impact across multiple risk domains. For example, adversarial attacks on AI systems can lead to disruptions in operations, distort financial models, and result in compliance issues.  See the [AI security matrix](/goto/aisecuritymatrix/) for an overview of potential impact.

General risk management for AI systems is typically driven by AI governance - see [AIPROGRAM](/goto/aiprogram/) and includes both risks BY relevant AI systems and risks TO those systems. Security risk assessment is typically driven by the security management system - see [SECPROGRAM](/goto/secprogram) as this system is tasked to include AI assets, AI threats, and AI systems into consideration - provided that these have been added to the corresponding repositories.

Organizations often adopt a Risk Management framework, commonly based on ISO 31000 or similar standards such as ISO 23894. These frameworks guide the process of managing risks through four key steps as outlined below:

1. **Identifying  Risks**: Recognizing potential risks (Threats) that could impact the organization.  See “Threat through use” section to identify potential risks (Threats).
2. **Evaluating Risks by Estimating Likelihood and Impact**: To determine the severity of a risk, it is necessary to assess the probability of the risk occurring and evaluating the potential consequences should the risk materialize. Combining likelihood and impact to gauge the risk's overall severity.  This is typically presented in the form of a heatmap. See below for further details.  
3. **Deciding What to Do (Risk Treatment)**: Choosing an appropriate strategy to address the risk. These strategies include: Risk Mitigation, Transfer, Avoidance, or Acceptance. See below for further details.
4. **Risk Communication and Monitoring**: Regularly sharing risk information with stakeholders to ensure awareness and support for risk management activities. Ensuring effective Risk Treatments are applied. This requires a Risk Register, a comprehensive list of risks and their attributes (e.g. severity, treatment plan, ownership, status, etc).  See below for further details.

Let's go through the risk management steps one by one.

### 1. Identifying  Risks
Selecting potential risks (Threats) that could impact the organization requires technical and business assessment of the applicable threats. A method to do this is discussed below, for every type of risk impact:

**Unwanted model behaviour**

  Regarding model behaviour, we focus on manipulation by attackers, as the scope of this document is security. Other sources of unwanted behaviour are general inaccuracy (e.g. hallucinations) and/or unwanted bias regarding certain groups (discrimination).
    
  This will always be an applicable threat, independent of your situation, although the risk level may sometimes be accepted - see below.

  Which means that you always need to have in place:
  - [General governance controls](/goto/governancecontrols/) (e.g. having an inventory of AI use and some control over it)
  - [Controls to limit effects of unwanted model behaviour](/goto/limitunwanted/) (e.g. human oversight)

  Is the model GenAI (e.g. a Large Language Model)? 
  - Prevent [prompt injection](/goto/directpromptinjection/) (mostly done by the model supplier) in case untrusted input goes directly into the model, and it is important that the model follows its policy instructions about how it communicates. Mostly this is the case if model input is from end users and output also goes straight to end users, who could show that the model can misbehave (e.g. be politically incorrect), which can lead to reputation damage. 
  - Prevent [indirect prompt injection](/goto/indirectpromptinjection/), in case untrusted input goes somehow into the prompt e.g. you retrieve somebody's resume and include it in a prompt.

  Sometimes model training and running the model is deferred to a supplier. For generative AI, training is mostly performed by an external supplier given the cost of typically millions of dollars. Finetuning of generative AI is also not often performed by organizations given the cost of compute and the complexity involved. Some GenAI models can be obtained and run at your own premises. The reasons to do this can be lower cost (if is is an open source model), and the fact that sensitive input information does not have to be sent externally. A reason to use an externally hosted GenAI model can be the quality of the mode.
    
  Who trains/finetunes the model?
  - The supplier: you need to prevent [obtaining a poisoned model](/goto/transferlearningattack/) by proper supply chain mangement (selecting a proper supplier and making sure you use the actual model), including assuring that: the supplier prevents development-time model poisoning including data poisoning and obtaining poisoned data. If the remaining risk for data poisoning cannot be accepted, performing post-training countermeasures can be an option - see [POISONROBUSTMODEL](/goto/poisonrobustmodel/).
  - You: you need to prevent [development-time model poisoning](/goto/modelpoison/) which includes model poisoning, data poisoning and obtaining poisoned data
 
  If you use RAG (Retrieval Augmented Generation using GenAI), then your retrieval repository plays a role in determining the model behaviour.This means:
  - You need to prevent [data poisoning](/goto/datapoison/) of your retrieval repository, which includes preventing that it contains externally obtained poisoned data.

  Who runs the model?
  - The supplier: make sure the supplier prevents [runtime model poisoning](/goto/runtimemodelpoison/) just like any supplier who you expect to protect the running application from manipulation
  - You: You need to prevent [runtime model poisoning](/goto/runtimemodelpoison/)

  Is the model predictive AI?
  - Prevent an [evasion attack](/goto/evasion/) in which a user tries to fool the model into a wrong decision. Here, the level of risk is an important aspect to evaluate - see below. The risk of an evasion attack may be acceptable.
    
  In order to assess the level of risk for unwanted model behaviour through manipulation, consider what the motivation of an attacker could be. What could an attacker gain by for example sabotaging your model? Just a claim to fame? Could it be a disgruntled employee? Maybe a competitor? What could an attacker gain by a less conspicuous model behaviour attack, like an evasion attack or data poisoning with a trigger? Is there a scenario where an attacker benefits from fooling the model? An example where evasion IS interesting and possible: adding certain words in a spam email so that it is not recognized as such. An example where evasion is not interesting is when a patient gets a skin disease diagnosis based on a picture of the skin. The patient has no interest in a wrong decision, and also the patient typically has no control - well maybe by painting the skin. There are situations in which this CAN be of interest for the patient, for example to be eligible for compensation in case the (faked) skin disease was caused by certain restaurant food. This demonstrates that it all depends on the context whether a theoretical threat is a real threat or not. Depending on the probability and impact of the threats, and on the relevant policies, some threats may be accepted as risk. When not accepted, the level of risk is input to the strength of the controls. For example: if data poisoning can lead to substantial benefit for a group of attackers, then the training data needs to be get a high level of protection.

 **Leaking training data**

  Do you train/finetune the model yourself?
  - Yes: and is the training data sensitive? Then you need to prevent:
    - [unwanted disclosure in model output](/goto/disclosureuse/)
    - [model inversion](/goto/modelinversionandmembership/) (but not for GenAI)
    - [training data leaking from your engineering environment](/goto/devdataleak/).
    - [membership inference]((/goto/modelinversionandmembership/)) - but only if the **fact** that something or somebody was part of the training set is sensitive information. For example when the training set consists of criminals and their history to predict criminal careers: membership of that set gives away the person is a convicted or alleged criminal.
    
   If you use RAG: apply the above to your repository data, as if it was part of the training set: as the repository data feeds into the model and can therefore be part of the output as well.

  If you don't train/finetune the model, then the supplier of the model is responsible for unwanted content in the training data. This can be poisoned data (see above), data that is confidential, or data that is copyrighted. It is important to check licenses, warranties and contracts for these matters, or accept the risk based on your circumstances.


 **Model theft**

  Do you train/finetune the model yourself?
  - Yes, and is the model regarded intellectual poperty? Then you need to prevent:
    - [Model theft through use](/goto/modeltheftuse/)
    - [Model theft development-time](/goto/devmodelleak/)
    - [Source code/configuration leak](/goto/devcodeleak/)
    - [Runtime model theft](/goto/runtimemodeltheft/)
      
 **Leaking input data**
 
  Is your input data sensitive?
  - Prevent [leaking input data](/goto/leakinput/). Especially if the model is run by a supplier, proper care needs to be taken that this data is transferred or stored in a protected way and as little as possible. Note, that if you use RAG, that the  data you retrieve and insert into the prompt is also input data. This typically contains company secrets or personal data.


 **Misc.**

  Is your model a Large Language Model?
  - Prevent [insecure output handling](/goto/insecureoutput/), for example when you display the output of the model on a website and the output contains malicious Javascript.

  Make sure to prevent [model inavailability by malicious users](/denialmodelservice/) (e.g. large inputs, many requests). If your model is run by a supplier, then certain countermeasures may already be in place.

  Since AI systems are software systems, they require appropriate conventional application security and operational security, apart from the AI-specific threats and controls mentioned in this section.

### 2. Evaluating Risks by Estimating Likelihood and Impact
To determine the severity of a risk, it is necessary to assess the probability of the risk occurring and evaluating the potential consequences should the risk materialize.

**Estimating the Likelihood:**  
Estimating the likelihood and impact of an AI risk requires a thorough understanding of both the technical and contextual aspects of the AI system in scope. The likelihood of a risk occurring in an AI system is influenced by several factors, including the complexity of the AI algorithms, the data quality and sources, the conventional security measures in place, and the potential for adversarial attacks. For instance, an AI system that processes public data is more susceptible to data poisoning and inference attacks, thereby increasing the likelihood of such risks.  A financial institution's AI system, which assesses loan applications using public credit scores, is exposed to data poisoning attacks. These attacks could manipulate creditworthiness assessments, leading to incorrect loan decisions. 

**Evaluating the Impact:**
Evaluating the impact of risks in AI systems involves understanding the potential consequences of threats materializing. This includes both the direct consequences, such as compromised data integrity or system downtime, and the indirect consequences, such as reputational damage or regulatory penalties. The impact is often magnified in AI systems due to their scale and the critical nature of the tasks they perform. For instance, a successful attack on an AI system used in healthcare diagnostics could lead to misdiagnosis, affecting patient health and leading to significant legal, trust, and reputational repercussions for the involved entities.

**Prioritizing risks**
The combination of likelihood and impact assessments forms the basis for prioritizing risks and informs the development of Risk Treatment decisions. Commonly organizations use a risk heat map to visually categorize risks by impact and likelihood. This approach facilitates risk communication and  decision-making.  It allows the management to focus on risks with highest severity (high likelihood and high impact).

### 3. Risk Treatment
Risk treatment is about deciding what to do with the risks. It involves selecting and implementing measures to mitigate, transfer, avoid, or accept cybersecurity risks associated with AI systems.  This process is critical due to the unique vulnerabilities and threats related to AI systems such as  data poisoning, model theft, and adversarial attacks. Effective risk treatment is essential to robust, reliable, and trustworthy AI.

Risk Treatment options are:
  1. **Mitigation**: Implementing controls to reduce the likelihood or impact of a risk. This is often the most common approach for managing AI cybersecurity risks. See the many controls in this resource and the 'Select controls' subsection below.  
    - Example: Enhancing data validation processes to prevent data poisoning attacks, where malicious data is fed into the Model to corrupt its learning process and negatively impact its performance.
  2. **Transfer**: Shifting the risk to a third party, typically through transfer learning, federated learning, insurance or outsourcing certain functions. 
    - Example: Using third-party cloud services with robust security measures for AI model training, hosting, and data storage, transferring the risk of data breaches and infrastructure attacks.
  3. **Avoidance**: Changing plans or strategies to eliminate the risk altogether. This may involve not using AI in areas where the risk is deemed too high.
    - Example: Deciding against deploying an AI system for processing highly sensitive personal data where the risk of data breaches cannot be adequately mitigated.
  4. **Acceptance**: Acknowledging the risk and deciding to bear the potential loss without taking specific actions to mitigate it. This option is chosen when the cost of treating the risk outweighs the potential impact.
    - Example: Accepting the minimal risk of model inversion attacks (where an attacker attempts to reconstruct publicly available input data from model outputs) in non-sensitive applications where the impact is considered low.

### 4. Risk Communication & Monitoring
Regularly sharing risk information with stakeholders to ensure awareness and support for risk management activities. 

A central tool in this process is the Risk Register, which serves as a comprehensive repository of all identified risks, their attributes (such as severity, treatment plan, ownership, and status), and the controls implemented to mitigate them.  Most large organizations already have such a Risk Register.  It is important to align AI risks and chosen vocabularies from Enterprise Risk Management to facilitate effective communication of risks throughout the organization.  

### 5. Arrange responsibility
For each selected threat, determine who is responsible to address it. By default, the organization that builds and deploys the AI system is responsible, but building and deploying may be done by different organizations, and some parts of the building and deployment may be deferred to other organizations, e.g. hosting the model, or providing a cloud environment for the application to run. Some aspects are shared responsibilities.

If components of your AI system are hosted, then you share responsibility regarding all controls for the relevant threats with the hosting provider. This needs to be arranged with the provider, using for example a responsibility matrix. Components can be the model, model extensions, your application, or your infrastructure. See [Threat model of using a model as-is](#threat-model-with-controls---genai-as-is).

If an external party is not open about how certain risks are mitigated, consider requesting this information and when this remains unclear you are faced with either 1) accept the risk, 2) or provide your own mitigations, or 3)avoid the risk, by not engaging with the third party.

### 6. Verify external responsibilities
For the threats that are the responsibility of other organisations: attain assurance whether these organisations take care of it. This would involve the controls that are linked to these threats.

Example: Regular audits and assessments of third-party security measures.
 
### 7. Select controls
Then, for the threats that are relevant to you and for which you are responsible: consider the various controls listed with that threat (or the parent section of that threat) and the general controls (they always apply). When considering a control, look at its purpose and determine if you think it is important enough to implement it and to what extent. This depends on the cost of implementation compared to how the purpose mitigates the threat, and the level of risk of the threat. These elements also play a role of course in the order you select controls: highest risks first, then starting with the lower cost controls (low hanging fruit).

Controls typically have quality aspects to them, that need to be fine tuned to the situation and the level of risk. For example: the amount of noise to add to input data, or setting thresholds for anomaly detection. The effectiveness of controls can be tested in a simulation environement to evaluate the performance impact and security improvements to find the optimal balance. Fine tuning controls needs to continuously take place, based on feedback from testing in simulation in in production.

### 8. Residual risk acceptance
In the end you need to be able to accept the risks that remain regarding each threat, given the controls that you implemented.

### 9. Further management of the selected controls
(see [SECPROGRAM](/goto/secprogram/)), which includes continuous monitoring, documentation, reporting, and incident response.

### 10. Continuous risk assessment
Implement continuous monitoring to detect and respond to new threats. Update the risk management strategies based on evolving threats and feedback from incident response activities.  
Example: Regularly reviewing and updating risk treatment plans to adapt to new vulnerabilities.

---

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
> Category: discussion  
> Permalink: https://owaspai.org/goto/responsibleai/

There are many aspects of AI when it comes to positive outcome while mitigating risks. This is often referred to as responsible AI or trustworthy AI, where the former emphasises ethics, society, and governance, while the latter emphasises the more technical and operational aspects.

If your main responsibility is security, then the best strategy is to first focus on AI security and after that learn more about the other AI aspects - if only to help your colleagues with the corresponding responsibility to stay alert. After all, security professionals are typically good at identifying things that can go wrong. Furthermore, some aspects can be a consequence of compromised AI and are therefore helpful to understand, such as _safety_.

Let's clarify the aspects of AI and see how they relate to security:
- **Accuracy** is about the AI model being sufficiently correct to perform its 'business function'. Being incorrect can lead to harm, including (physical) safety problems (e.g. car trunk opens during driving) or other wrong decisions that are harmful (e.g. wrongfully declined loan). The link with security is that some attacks cause unwanted model behaviour which is by definition an accuracy problem. Nevertheless, the security scope is restricted to mitigating the risks of those attacks - NOT solve the entire problem of creating an accurate model (selecting representative data for the trainset etc.).
- **Safety**  refers to the condition of being protected from / unlikely to cause harm. Therefore safety of an AI system is about the level of accuracy when there is a risk of harm (typically implying physical harm but not restricted to that) , plus the things that are in place to mitigate those risks (apart from accuracy), which includes security to safeguard accuracy, plus a number of safety measures that are important for the business function of the model. These need to be taken care of and not just for security reasons because the model can make unsafe decisions for other reasons (e.g. bad training data), so they are a shared concern between safety and security:
  -  [oversight](/goto/oversight/) to restrict unsafe behaviour, and connected to that: assigning least privileges to the model,
  -  [continuous validation](/goto/continuousvalidation/) to safeguard accuracy,
  -  [transparency](/goto/aitransparency/): see below,
  -  [explainability](/goto/continuousvalidation/): see below.
- **Transparency**: sharing information about the approach, to warn users and depending systems of accuracy risks, plus in many cases users have the right to know details about a model being used and how it has been created. Therefore it is a shared concern between security, privacy and safety.
- **Explainability**: sharing infor,mation to help users validate accuracy by explaining in more detail how a specific result came to be. Apart from validating accuracy this can also support users to get transparency and to understand what needs to change to get a different outcome. Therefore it is a shared concern between security, privacy, safety and business function. A special case is when explainability is required by law separate from privacy, which adds 'compliance' to the list of aspects that share this concern.
- **Robustness** is about the ability of maintaining accuracy under expected or unexpected variations in input. The security scope is about when those variations are malicious (_adversarial robustness_) which often requires different countermeasures than those required against normal variations (_generalization robustness). Just like with accuracy, security is not involved per se in creating a robust model for normal variations. The exception to this is when generalization robustness adversarial malicious robustness , in which case this is a shared concern between safety and security. This depends on a case by case basis.
- **Free of discrimination**: without unwanted bias of protected attibutes, meaning: no systematic inaccuracy where the model 'mistreats' certain groups (e.g. gender, ethicity). Discrimination is undesired for legal and ethical reasons. The relation with security is that having detection of unwanted bias can help to identify unwanted model behaviour caused by an attack. For example, a data poisoning attack has inserted malicious data samples in the training set, which at first goes unnoticed, but then is discovered by an unexplained detection of bias in the model. Sometimes the term 'fairness' is used to refer to discrimination issues, but mostly fairness in privacy is a broader term referring to fair treatment of individuals, including transparency, ethical use, and privacy rights.
- **Empathy**. The relation of that with security is that the feasible level of security should always be taken into account when validating a certain application of AI. If a sufficient level of security cannot be provided to individuals or organizations, then empathy means invalidating the idea, or takin other precautions.
- **Accountability**. The relation of accountability with security is that security measures should be demonstrable, including the process that have led to those measures. In addition, traceability as a security property is important, just like in any IT system, in order to detect, reconstruct and respond to security incidents and provide accountability.
- **AI security**. The security aspect of AI is the central topic of the AI Exchange. In short, it can be broken down into:
  - [Input attacks](/goto/threatsuse/), that are performed by providing input to the model
  - [Model poisoning](/goto/modelpoison/), aimed to alter the model's behavior
  - Stealing AI assets, such as train data, model input, output, or the model itself, either [development time](/goto/devleak/) or runtime (see below)
  - Further [runtime conventional security attacks](/goto/generalappsecthreats/)
 
[![](/images/aiwayfinder.png)](/images/aiwayfinder.png)

### How about privacy?
> Category: discussion  
> Permalink: https://owaspai.org/goto/privacy/

Just like any system that processes data, AI systems can have privacy risks. There are some particual privacy aspects to AI:
- AI systems are data-intensive and typically present additional risks regarding data collection and retention. Personal data may be collected from various sources, each subject to different levels of **sensitivity and regulatory constraints**. Legislation often requires a **legal basis and/or consent** for the collection and use of personal data, and specifies **rights to individuals** to correct, request, and remove their own data.
- **Protecting training data** is a challenge, especially because it typically needs to be retained for long periods - as many models need to be retrained. Often, the actual identities of people involved are irrelevant for the model, but privacy risks still remain even if identity data is removed because it might be possible to deduce individual identities from the remaining data. This is where differential privacy becomes crucial: by altering the data to make it sufficiently unrecognizable, it ensures individual privacy while still allowing for valuable insights to be derived from the data. Alteration can be done by for example adding noise or aggregating.
- An additional complication in the protection of training data is that the **training data is accessible in the engineering environment**, which therefore needs more protection than it usually does - since conventional systems normally don't have personal data available to technical teams.
- The nature of machine learning allows for certain **unique strategies** to improve privacy, such as federated learning: splitting up the training set in different separated systems - typically aligning with separated data collection.
- AI systems **make decisions** and if these decisions are about people they may be discriminating regarding certain protected attributes (e.g. gender, race), plus the decisions may result in actions that invade privacy, which may be an ethical or legal concern. Furthermore, legislation may prohibit some types of decisions and sets rules regarding transparancy about how these decisions are made, and about how individuals have the right to object.
- Last but not least: AI models suffer from **model attack risks** that allow attackers to extract training data from the model, e.g. model inversion, memership inference, and disclosing sensitive data in large language models


AI Privacy can be divided into two parts:

1. The threats to AI security and their controls (this document), including:
  - Confidentiality and integrity protection of personal data in train/test data, model input or output - which consists of:
    - 'Conventional' security of personal data in transit and in rest
    - Protecting against model attacks that try to retrieve personal data (e.g. model inversion)
    - personal data minimization / differential privacy, including minimized retention
  - Integrity protection of the model behaviour if that behaviour can hurt privacy of individuals. This happens for example when individuals are unlawfully discriminated or when the model output leads to actions that invade privacy (e.g. undergoing a fraud investigation).
2. Threats and controls that are not about security, but about further rights of the individual, as covered by privacy regulations such as the GDPR, including use limitation, consent, fairness, transparency, data accuracy, right of correction/objection/erasure/request. For an overview, see the [Privacy part of the OWASP AI guide](https://owasp.org/www-project-ai-security-and-privacy-guide/)

### How about Generative AI (e.g. LLM)?
> Category: discussion  
> Permalink: https://owaspai.org/goto/genai/

Yes, GenAI is leading the current AI revolution and it's the fastest moving subfield of AI security. Nevertheless it is important to realize that other types of algorithms (let's call it _predictive AI_) will remain to be applied to many important use cases such as credit scoring, fraud detection, medical diagnosis, product recommendation, image recognition, predictive maintenance, process control, etc. Relevant content has been marked with 'GenAI' in this document.

Important note: from a security threat perspective, GenAI is not that different from other forms of AI (_predictive AI_). GenAI threats and controls largely overlap and are very similar to AI in general. Nevertheless, some risks are (much) higher. Some are lower. Only a few risks are GenAI-specific. Some of the control categories differ substantially between GenAI and predictive AI - mostly the data science controls (e.g. adding noise to the training set). In many cases, GenAI solutions will use a model as-is and not involve any training by the organization whatsoever, shifting some of the security responsibilities from the organization to the supplier. Nevertheless, if you use a ready-made model, you need still to be aware of those threats.

What is mainly new to the threat landscape because of LLMs?  
- First of all, LLMs pose new threats to security because they may be used to create code with vulnerabilities, or they may be used by attackers to create malware, or they may cause harm otherwiser through hallucinations, but these are out of scope of the AI Exchange, as it focuses on security threats TO AI systems.
- Regarding input:
  - Prompt injection is a completely new threat: attackers manipulating the behaviour of the model with crafted and sometimes hidden instructions.
  - Also new is organizations sending huge amounts of data in prompts, with company secrets and personal data.
- Regarding output: New is the fact that output can contain injection attacks, or can contain sensitive or copyrighted data (see [Copyright](/goto/copyright/)).
- Overreliance and excessive agency are issues. We let LLMs control things and may have too much trust in how correct they are, and also underestimate the risk of them being manipulated. The result is that attacks can have much impact.
- Regarding training: Since the training sets are so large and based on public data, it is easier to perform data poisoning. Poisoned foundation models are also a big supply chain issues.

GenAI security particularities are:

|Nr.| GenAI security particularities |OWASP for LLM TOP 10|
|-| ----------|-------------------|
|1| GenAI models are controlled by natural language in prompts, creating the risk of [Direct prompt injection](/goto/directpromptinjection/) and [Indirect prompt injection](/goto/indirectpromptinjection/). The former is where the user tries to fool the model to behave in unwanted ways (e.g. offensive language), whereas in the latter it is a third party that injects content into the prompt for this purpose (e.g. manipulating a decision). |  ([OWASP for LLM 01:Prompt injection](https://genai.owasp.org/llmrisk/llm01/))  | 
|2| GenAI models have typically been trained on very large datasets, which makes it more likely to output [sensitive data](/goto/disclosureuseoutput/) or [licensed data](/goto/copyright/), for which there is no control of access privileges built into the model. All data will be accessible to the model users. Some mechanisms may be in place in terms of system prompts or output filtering, but those are typically not watertight. |  ([OWASP for LLM 06: Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm06/))  |
|3|[Training data poisoning](/goto/datapoison/) is an AI-broad problem, and with GenAI the risk is generally higher since training data can be supplied from different sources that may be challenging to control, such as the internet. Attackers could for example hijack domains and place manipulated information. | ([OWASP for LLM 03: Training Data Poisoning](https://genai.owasp.org/llmrisk/llm03/))|
|4|Overreliance and Excessive agency are about having too much trust in the accuracy of a model. This is an AI-broad risk factor, and Large Language Models (GenAI) can make matters worse by coming across very confident and knowledgeable. In essence this is about the risk of underestimating the risk that the model is wrong or the model has been manipulated. This means that it is connected to each and every security control. The strongest link is with [controls that limit the impact of unwanted model behavior](/goto/limitunwanted/), in particular [Least model privilege](/goto/leastmodelprivilege/).  |([OWASP for LLM 09: Overreliance](https://genai.owasp.org/llmrisk/llm09/)) and ([OWASP for LLM 08: Excessive agency](https://genai.owasp.org/llmrisk/llm08/))|
|5| [Leaking input data](/goto/leakinput/): GenAI models mostly live in the cloud - often managed by an external party, which may increase the risk of leaking training data and leaking prompts. This issue is not limited to GenAI, but GenAI has 2 particular risks here: 1) model use involves user interaction through prompts, adding user data and corresponding privacy/sensitivity issues, and 2) GenAI model input (prompts) can contain rich context information with sensitive data (e.g. company secrets). The latter issue occurs with *in context learning* or *Retrieval Augmented Generation(RAG)* (adding background information to a prompt): for example data from all reports ever written at a consultancy firm. First of all, this information will travel with the prompt to the cloud, and second: the system will likely not respect the original access rights to the information.| Not covered in LLM top 10 |
|6|Pre-trained models may have been manipulated. The concept of pretraining is not limited to GenAI, but the approach is quite common in GenAI, which increases the risk of [supply-chain model poisoning](/goto/supplymodelpoison/).| ([OWASP for LLM 05 - Supply chain vulnerabilities](https://genai.owasp.org/llmrisk/llm05/))|
|7|The typical application of plug-ins in Large Language Models (GenAI) creates specific risks regarding the protection and privileges of these plugins - as they allow large language models (GenAI) to act outside of their normal conversation with the user. See [Least model privilege](/goto/leastmodelprivilege/).|([OWASP for LLM 07](https://genai.owasp.org/llmrisk/llm07/))|
|8|[Model inversion and membership inference](/goto/modelinversionandmembership/) are typically low to zero risks for GenAI |([OWASP for LLM 06](https://genai.owasp.org/llmrisk/llm06/))|
|9|GenAI output may contain elements that perform an [injection attack](/goto/insecureoutput/) such as cross-site-scripting.| ([OWASP for LLM 02](https://genai.owasp.org/llmrisk/llm02/))|
|10|[Denial of service](/goto/denialmodelservice/) can be an issue for any AI model, but GenAI models are extra sensitive because of the relatively high resource usage. | ([OWASP for LLM 04](https://genai.owasp.org/llmrisk/llm04/)) |

GenAI References:

- [OWASP LLM top 10](https://llmtop10.com/)
- [Demystifying the LLM top 10](https://blog.kloudzone.co.in/demystifying-the-owasp-top-10-for-large-language-model-applications/)
- [Impacts and risks of GenAI](https://arxiv.org/pdf/2306.13033.pdf)
- [LLMsecurity.net](https://llmsecurity.net/)

### How about the NCSC/CISA guidelines?
>Category: discussion  
>Permalink: https://owaspai.org/goto/jointguidelines/

Mapping of the UK NCSC /CISA [Joint Guidelines for secure AI system development](https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development) to the controls here at the AI Exchange.  
To see those controls linked to threats, refer to the [Periodic table of AI security](/goto/periodictable).

1. Secure design

- Raise staff awareness of threats and risks:  
  #[SECURITY EDUCATE](/goto/seceducate/)
- Model the threats to your system:  
  See Risk analysis under #[SECURITY PROGRAM](/goto/secprogram/)
- Design your system for security as well as functionality and performance:  
  #[AI PROGRAM](/goto/aiprogram/ ), #[SECURITY PROGRAM](/goto/secprogram/), #[DEVELOPMENT PROGRAM](/goto/devprogram/), #[SECURE DEVELOPMENT PROGRAM](/goto/secdevprogram/), #[CHECK COMPLIANCE](/goto/checkcompliance/), #[LEAST MODEL PRIVILEGE](/goto/leastmodelprivilege/), #[DISCRETE](/goto/discrete/), #[OBSCURE CONFIDENCE](/goto/obscureconfidence/), #[OVERSIGHT](/goto/oversight/), #[RATE LIMIT](/goto/ratelimit/),  #[DOS INPUT VALIDATION](/goto/dosinputvalidation/), #[LIMIT RESOURCES](/goto/limitresources/), #[MODEL ACCESS CONTROL](/goto/modelaccesscontrol/), #[AI TRANSPARENCY](/goto/aitransparency)
- Consider security benefits and trade-offs when selecting your AI model  
  All development-time data science controls (currently 13), #[EXPLAINABILITY](/goto/explainability/)

2. Secure Development

- Secure your supply chain:  
  #[SUPPLY CHAIN MANAGE](/goto/supplychainmanage/)
- Identify, track and protect your assets:  
  #[DEVELOPMENT SECURITY](/goto/devsecurity/), #[SEGREGATE DATA](/goto/segregatedata/), #[CONFIDENTIAL COMPUTE](/goto/confcompute/), #[MODEL INPUT CONFIDENTIALITY](/goto/modelinputconfidentiality/), #[RUNTIME MODEL CONFIDENTIALITY](/goto/runtimemodelconfidentiality/), #[DATA MINIMIZE](/goto/dataminimize/), #[ALLOWED DATA](/goto/alloweddata/), #[SHORT RETAIN](/goto/shortretain/), #[OBFUSCATE TRAINING DATA](/goto/obfuscatetrainingdata/) and part of #[SECURITY PROGRAM](/goto/secprogram/)
- Document your data, models and prompts:  
  Part of #[DEVELOPMENT PROGRAM](/goto/devprogram/)
- Manage your technical debt:  
  Part of #[DEVELOPMENT PROGRAM](/goto/devprogram/)

3. Secure deployment

- Secure your infrastructure:  
  Part of #[SECURITY PROGRAM](/goto/secprogram/) and see ‘Identify, track and protect your assets’
- Protect your model continuously:  
  #[INPUT DISTORTION](/goto/inputdistortion/), #[FILTER SENSITIVE MODEL OUTPUT](/goto/filtersensitivemodeloutput/), #[RUNTIME MODEL IO INTEGRITY](/goto/runtimemodeliointegrity/), #[MODEL INPUT CONFIDENTIALITY](/goto/modelinputconfidentiality/), #[PROMPT INPUT VALIDATION](/goto/promptinputvalidation/), #[INPUT SEGREGATION](/goto/inputsegregation/)
- Develop incident management procedures:  
  Part of #[SECURITY PROGRAM](/goto/secprogram/)
- Release AI responsibly:  
  Part of #[DEVELOPMENT PROGRAM](/goto/devprogram/)
- Make it easy for users to do the right things:  
  Part of #[SECURITY PROGRAM](/goto/secprogram/)

4. Secure operation and maintenance

- Monitor your system’s behaviour:  
  #[CONTINUOUS VALIDATION](/goto/continuousvalidation/), #[UNWANTED BIAS TESTING](/goto/unwantedbiastesting/)
- Monitor your system’s inputs:  
  #[MONITOR USE](/goto/monitoruse/), #[DETECT ODD INPUT](/goto/detectoddinput/), #[DETECT ADVERSARIAL INPUT](/goto/detectadversarialinput/)
- Follow a secure by design approach to updates:  
  Part of #[SECURE DEVELOPMENT PROGRAM](/goto/secdevprogram/)
- Collect and share lessons learned:  
  Part of #[SECURITY PROGRAM](/goto/secprogram/) and #[SECURE DEVELOPMENT PROGRAM](/goto/secdevprogram/)


### How about copyright?
>Category: discussion  
>Permalink: https://owaspai.org/goto/copyright/

#### Introduction
AI and copyright are two (of many) areas of law and policy, (both public and 
private), that raise complex and often unresolved questions. AI output or generated 
content is not yet protected by US copyright laws. Many other jurisdictions have yet 
to announce any formal status as to intellectual property protections for such 
materials. On the other hand, the human contributor who provides the input 
content, text, training data, etc. may own a copyright for such materials. Finally, the
usage of certain copyrighted materials in AI training may be considered [fair use](https://en.wikipedia.org/wiki/Fair_use).

#### AI & Copyright Security
In AI, companies face a myriad of security threats that could have far-reaching 
implications for intellectual property rights, particularly copyrights. As AI systems, 
including large data training models, become more sophisticated, they 
inadvertently raise the specter of copyright infringement. This is due in part to the 
need for development and training of AI models that process vast amounts of data, 
which may contain copyright works. In these instances, if copyright works were 
inserted into the training data without the permission of the owner, and without 
consent of the AI model operator or provider, such a breach could pose significant 
financial and reputational risk of infringement of such copyright and corrupt the 
entire data set itself.  

The legal challenges surrounding AI are multifaceted. On one hand, there is the
question of whether the use of copyrighted works to train AI models constitutes 
infringement, potentially exposing developers to legal claims. On the other hand, 
the majority of the industry grapples with the ownership of AI-generated works and 
the use of unlicensed content in training data. This legal ambiguity affects all 
stakeholders—developers, content creators, and copyright owners alike.

#### Lawsuits Related to AI & Copyright
Recent lawsuits (writing is April 2024) highlight the urgency of these issues. For instance, a class 
action suit filed against Stability AI, Midjourney, and DeviantArt alleges infringement
on the rights of millions of artists by training their tools on web-scraped images2.  
Similarly, Getty Images’ lawsuit against Stability AI for using images from its catalog
without permission to train an art-generating AI underscores the potential for 
copyright disputes to escalate. Imagine the same scenario where a supplier 
provides vast quantities of training data for your systems, that has been 
compromised by protected work, data sets, or blocks of materials not licensed or 
authorized for such use. 

#### Copyright of AI-generated source code
Source code constitutes a significant intellectual property (IP) asset of a 
software development company, as it embodies the innovation and creativity
of its developers. Therefore, source code is subject to IP protection, through 
copyrights, patents, and trade secrets. In most cases, human generated 
source code carries copyright status as soon as it is produced.

However, the emergence of AI systems capable of generating source code 
without human input poses new challenges for the IP regime. For instance, 
who is the author of the AI-generated source code? Who can claim the IP 
rights over it? How can AI-generated source code be licensed and exploited 
by third parties?

These questions are not easily resolved, as the current IP legal and 
regulatory framework does not adequately address the IP status of AI-
generated works. Furthermore, the AI-generated source code may not be 
entirely novel, as it may be derived from existing code or data 
sources. Therefore, it is essential to conduct a thorough analysis of the 
origin and the process of the AI-generated source code, to determine its IP 
implications and ensure the safeguarding of the company's IP assets. Legal 
professionals specializing in the field of IP and technology should be 
consulted during the process. 

As an example, a recent case still in adjudication shows the complexities of 
source code copyrights and licensing filed against GitHub, OpenAI, and 
Microsoft by creators of certain code they claim the three entities violated. 
More information is available here: [: GitHub Copilot copyright case narrowed 
but not neutered • The Register](https://www.theregister.com/2024/01/12/github_copilot_copyright_case_narrowed/)

####  Copyright damages indemnification
Note that AI vendors have started to take responsibility for copyright issues of their models, under certain circumstances. Microsoft offers users the so-called [Copilot Copyright Commitment](https://www.microsoft.com/en-us/licensing/news/microsoft-copilot-copyright-commitment), which indemnifies users from legal damages regarding copyright of code that Copilot has produced - provided [a number of things](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/customer-copyright-commitment) including that the client has used content filters and other safety systems in Copilot and uses specific services. Google Cloud offers its [Generative AI indemnification](https://cloud.google.com/blog/products/ai-machine-learning/protecting-customers-with-generative-ai-indemnification).  
Read more at [The Verge on Microsoft indemnification](https://www.theverge.com/2023/9/7/23863349/microsoft-ai-assume-responsibility-copyright-lawsuit) and [Direction Microsoft on the requirements of the indemnification](https://www.directionsonmicrosoft.com/blog/why-microsofts-copilot-copyright-commitment-may-not-mean-much-for-customers-yet/).

#### Do generative AI models really copy existing work?
Do generative AI models really lookup existing work that may be copyrighted? In essence: no. A Generative AI model does not have sufficient capacity to store all the examples of code or pictures that were in its training set. Instead, during training it extracts patterns about how things work in the data that it sees, and then later, based on those patterns, it generates new content. Parts of this content may show remnants of existing work, but that is more of a coincidence. In essence, a model doesn't recall exact blocks of code, but uses its 'understanding' of coding to create new code. Just like with human beings, this understanding may result in reproducing parts of something you have seen before, but not per se because this was from exact memory. Having said that, this remains a difficult discussion that we also see in the music industry: did a musician come up with a chord sequence because she learned from many songs that this type of sequence works and then coincidentally created something that already existed, or did she copy it exactly from that existing song?

#### Mitigating Risk
Organizations have several key strategies to mitigate the risk of copyright 
infringement in their AI systems. Implementing them early can be much more cost 
effective than fixing at later stages of AI system operations. While each comes with 
certain financial and operating costs, the “hard savings” may result in a positive 
outcome. These may include:  
1. Taking measures to mitigate the output of certain training data. The OWASP AI Exchange covers this through the corresponding threat: [data disclosure through model output](/goto/disclosureuseoutput/).
2. Comprehensive IP Audits: a thorough audit may be used to identify all 
intellectual property related to the AI system as a whole. This does not 
necessarily apply only to data sets but overall source code, systems, 
applications, interfaces and other tech stacks.
3. Clear Legal Framework and Policy: development and enforcement of legal 
policies and procedures for AI use, which ensure they align with current IP 
laws including copyright.
4. Ethics in Data Sourcing: source data ethically, ensuring all date used for 
training the AI models is either created in-house, or obtained with all 
necessary permissions, or is sourced from public domains which provide 
sufficient license for the organization’s intended use.
5. Define AI-Generated Content Ownership: clearly defined ownership of the 
content generated by AI systems, which should include under what conditions
it be used, shared, disseminated.
6. Confidentiality and Trade Secret Protocols: strict protocols will help protect 
confidentiality of the materials while preserving and maintaining trade secret 
status.
7. Training for Employees: training employees on the significance and 
importance of the organization’s AI IP policies along with implications on what
IP infringement may be will help be more risk averse.
8. Compliance Monitoring Systems: an updated and properly utilized monitoring 
system will help check against potential infringements by the AI system.
9. Response Planning for IP Infringement: an active plan will help respond 
quickly and effectively to any potential infringement claims.
10. Additional mitigating factors to consider include seeking licenses and/or warranties 
from AI suppliers regarding the organization’s intended use, as well as all future uses by the AI system. With the 
help of legal counsel the organization should also consider other contractually 
binding obligations on suppliers to cover any potential claims of infringement.


#### Helpful resources regarding AI and copyright:
- [Artificial Intelligence (AI) and Copyright | Copyright Alliance](https://copyrightalliance.org/education/artificial-intelligence-copyright/)
- [AI industry faces threat of copyright law in 2024 | Digital Watch  Observatory](https://dig.watch/updates/ai-industry-faces-threat-of-copyright-law-in-2024)
- [Using generative AI and protecting against copyright issues | World    
Economic Forum -weforum.org](https://www.weforum.org/agenda/2024/01/cracking-the-code-generative-ai-and-intellectual-property/)
- [Legal Challenges Against Generative AI: Key Takeaways | Bipartisan    
Policy Center](https://bipartisanpolicy.org/blog/legal-challenges-against-generative-ai-key-takeaways/)
- [Generative AI Has an Intellectual Property Problem - hbr.org](https://hbr.org/2023/04/generative-ai-has-an-intellectual-property-problem)
- [Recent Trends in Generative Artificial Intelligence Litigation in the    
United States | HUB | K&L Gates - klgates.com](https://www.klgates.com/Recent-Trends-in-Generative-Artificial-Intelligence-Litigation-in-the-United-States-9-5-2023)
- [Generative AI could face its biggest legal tests in 2024 | Popular    
Science - popsci.com](https://www.popsci.com/technology/generative-ai-lawsuits/)
- [Is AI Model Training Compliant With Data Privacy Laws? - termly.io](https://termly.io/resources/articles/is-ai-model-training-compliant-with-data-privacy-laws/)
- [The current legal cases against generative AI are just the beginning |    
TechCrunch](https://techcrunch.com/2023/01/27/the-current-legal-cases-against-generative-ai-are-just-the-beginning/?guccounter=1)
- [(Un)fair Use? Copyrighted Works as AI Training Data — AI: The    
Washington Report | Mintz](https://www.mintz.com/insights-center/viewpoints/54731/2024-01-10-unfair-use-copyrighted-works-ai-training-data-ai)
- [Potential Supreme Court clash looms over copyright issues in    
generative AI training data | VentureBeat](https://venturebeat.com/ai/potential-supreme-court-clash-looms-over-copyright-issues-in-generative-ai-training-data/)
- [AI-Related Lawsuits: How The Stable Diffusion Case Could Set a Legal    
Precedent | Fieldfisher](https://www.fieldfisher.com/en/insights/ai-related-lawsuits-how-the-stable-diffusion-case)
