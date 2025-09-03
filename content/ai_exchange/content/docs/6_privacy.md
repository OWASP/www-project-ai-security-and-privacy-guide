---
title: 6. AI privacy
weight: 7
---
> Category: discussion  
> Permalink: https://owaspai.org/goto/aiprivacy/

## Introduction

This section of the AI Exchange covers how privacy principles apply to AI systems. The rest of the AI Exchange covers the security of AI systems, including the protection of personal data, but there is more to privacy than just that - which is the topic of this section.

### Privacy concerns of AI systems
Just like any system that processes data, AI systems can have privacy risks. There are specific privacy concerns associated with AI:
- AI systems are data-intensive and typically present additional risks regarding data collection and retention. Personal data may be collected from various sources, each subject to different levels of **sensitivity and regulatory constraints**. Legislation often requires a **legal basis and/or consent** for the collection and use of personal data, and specifies **rights to individuals** to correct, request, and remove their own data.
- **Protecting training data** is a challenge, especially because it typically needs to be retained for long periods - as many models need to be retrained. Often, the actual identities of people involved are irrelevant for the model, but privacy risks still remain even if identity data is removed because it might be possible to deduce individual identities from the remaining data. This is where differential privacy becomes crucial: by altering the data to make it sufficiently unrecognizable, it ensures individual privacy while still allowing for valuable insights to be derived from the data. Alteration can be achieved, for example, by adding noise or using aggregation techniques.
- An additional complication in the protection of training data is that the **training data is accessible in the engineering environment**, which therefore needs more protection than it usually does - since conventional systems normally don't have personal data available to technical teams.
- The nature of machine learning allows for certain **unique strategies** to improve privacy, such as federated learning: splitting up the training set in different separated systems - typically aligning with separated data collection.
- AI systems **make decisions** and if these decisions are about people they may be discriminating regarding certain protected attributes (e.g. gender, race), plus the decisions may result in actions that invade privacy, which may be an ethical or legal concern. Furthermore, legislation may prohibit some types of decisions and sets rules regarding transparency about how these decisions are made, and about how individuals have the right to object.
- Last but not least: AI models suffer from **model attack risks** that allow attackers to extract training data from the model, e.g. model inversion, membership inference, and disclosing sensitive data in large language models


### Privacy = personal data protection + respect for further individual rights
AI Privacy can be divided into two parts:  
1. The threats to AI security and their controls (see the other sections of the AI Exchange), including:
  - Confidentiality and integrity protection of personal data in train/test data, model input or output - which consists of:
    - 'Conventional' security of personal data in transit and in rest
    - Protecting against model attacks that try to retrieve personal data (e.g. model inversion)
    - Personal data minimization / differential privacy, including minimized retention
  - Integrity protection of the model behaviour if that behaviour can hurt privacy of individuals. This happens for example when individuals are unlawfully discriminated or when the model output leads to actions that invade privacy (e.g. undergoing a fraud investigation).
2. Threats and controls that are not about security, but about further rights of the individual, as covered by privacy regulations such as the GDPR, including use limitation, consent, fairness, transparency, data accuracy, right of correction/objection/erasure/request. 

### Legislation
Privacy principles and requirements come from different legislations (e.g. GDPR, LGPD, PIPEDA, etc.) and privacy standards (e.g. ISO 31700, ISO 29100, ISO 27701, FIPS, NIST Privacy Framework, etc.). This guideline does not guarantee compliance with privacy legislation and it is also not a guide on privacy engineering of systems in general. For that purpose, please consider work from [ENISA](https://www.enisa.europa.eu/publications/data-protection-engineering), [NIST](https://nvlpubs.nist.gov/nistpubs/ir/2017/NIST.IR.8062.pdf), [mplsplunk](https://github.com/mplspunk/awesome-privacy-engineering), [OWASP](https://owasp.org/www-project-top-10-privacy-risks/) and [OpenCRE](https://www.opencre.org/cre/362-550). The general principle for engineers is to regard personal data as 'radioactive gold'. It's valuable, but it's also something to minimize, carefully store, carefully handle, limit its usage, limit sharing, keep track of where it is, etc.

### Assessments
Organizations often conduct Privacy Impact Assessments (PIAs) on systems to identify and manage privacy risks (also referred to as Data Protection Impact Assessments). This is a good idea for AI systems as well. It evaluates data flows, use cases, and AI behaviors against applicable privacy laws and ethical standards. This proactive assessment guides the implementation of privacy controls and helps embed privacy by design principles, ensuring privacy risks are minimized from the outset. Do note that PIAs are not per se specialized in AI systems and may overlook typical AI risks regarding:
- AI input attacks with privacy risks, such as Model inversion, membership inference, or sensitive data output from model.
- Bias and fairness risks (systematic discrimination from training data).
- Ongoing learning or retraining (new accuracy and bias risks can appear after deployment).
- Explainability and accountability gaps (harder to trace decisions back).

There are dedicated AI impact assessment methods available, such as:
- [AI impact assessment from the Netherlands](https://ecp.nl/publicatie/artificial-intelligence-impact-assessment-english-version/)
- [UK government overview of assessment techniques](https://www.gov.uk/ai-assurance-techniques)

## 1. Use Limitation and Purpose Specification
 
Essentially, you should not simply use data collected for one purpose (e.g. safety or security) as a training dataset to train your model for other purposes (e.g. profiling, personalized marketing, etc.) For example, if you collect phone numbers and other identifiers as part of your MFA flow (to improve security ), that doesn't mean you can also use it for user targeting and other unrelated purposes. Similarly, you may need to collect sensitive data under KYC requirements, but such data should not be used for ML models used for business analytics without proper controls.

Some privacy laws require a lawful basis (or bases if used for more than one purpose) for processing personal data (See GDPR's Art 6 and 9). 
Here is a link with certain restrictions on the purpose of an AI application, like for example the [prohibited practices in the European AI Act](https://artificialintelligenceact.eu/article/5) such as using machine learning for individual criminal profiling. Some practices are regarded as too risky when it comes to potential harm and unfairness towards individuals and society.

Note that a use case may not even involve personal data, but can still be potentially harmful or unfair to indiduals. For example: an algorithm that decides who may join the army, based on the amount of weight a person can lift and how fast the person can run. This data can not be used to reidentify individuals (with some exceptions), but still the use case may be unrightfully unfair towards gender (if the algorithm for example is based on an unfair training set).

In practical terms, you should reduce access to sensitive data and create anonymized copies for incompatible purposes (e.g. analytics). You should also document a purpose/lawful basis before collecting the data and communicate that purpose to the user in an appropriate way. 

New techniques that enable use limitation include:

* data enclaves: store pooled personal data in restricted secure environments 
* federated learning:  decentralize ML by removing the need to pool data into a single location. Instead, the model is trained in multiple iterations at different sites.



## 2. Fairness

Fairness means handling personal data in a way individuals expect and not using it in ways that lead to unjustified adverse effects. The algorithm should not behave in a discriminating way. (See also [this article](https://iapp.org/news/a/what-is-the-role-of-privacy-professionals-in-preventing-discrimination-and-ensuring-equal-treatment/)). Furthermore: accuracy issues of a model becomes a privacy problem if the model output leads to actions that invade privacy (e.g. undergoing fraud investigation). Accuracy issues can be caused by a complex problem, insufficient data, mistakes in data and model engineering, and manipulation by attackers. The latter example shows that there can be a relation between model security and privacy.
 
GDPR's Article 5 refers to "fair processing" and EDPS' [guideline](https://edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_201904_dataprotection_by_design_and_by_default_v2.0_en.pdf) defines fairness as the prevention of "unjustifiably detrimental, unlawfully discriminatory, unexpected or misleading" processing of personal data. GDPR does not specify how fairness can be measured, but the EDPS recommends the right to information (transparency), the right to intervene (access, erasure, data portability, rectify), and the right to limit the processing (right not to be subject to automated decision-making and non-discrimination) as measures and safeguards to implement the principle of fairness. 

In the [literature](http://fairware.cs.umass.edu/papers/Verma.pdf), there are different fairness metrics that you can use. These range from group fairness, false positive error rate,  unawareness, and counterfactual fairness. There is no industry standard yet on which metric to use, but you should assess fairness especially if your algorithm is making significant decisions about the individuals (e.g. banning access to the platform, financial implications, denial of services/opportunities, etc.). There are also efforts to test algorithms using different metrics. For example,  NIST's [FRVT project](https://pages.nist.gov/frvt/html/frvt11.html) tests different face recognition algorithms on fairness using different metrics.

The elephant in the room for fairness across groups (protected attributes) is that in situations a model is more accurate if it DOES discriminate protected attributes. Certain groups have in practice a lower success rate in areas because of all kinds of societal aspects rooted in culture and history. We want to get rid of that. Some of these aspects can be regarded as institutional discrimination. Others have more practical background, like for example that for language reasons we see that new immigrants statistically tend to be hindered in getting higher education.
Therefore, if we want to be completely fair across groups, we need to accept that in many cases this will be balancing accuracy with discrimination. In the case that sufficient accuracy cannot be attained while staying within discrimination boundaries, there is no other option than to abandon the algorithm idea. For fraud detection cases, this could for example mean that transactions need to be selected randomly instead of by using an algorithm.

A machine learning use case may have unsolvable bias issues, that are critical to recognize before you even start. Before you do any data analysis, you need to think if any of the key data elements involved have a skewed representation of protected groups (e.g. more men than women for certain types of education). I mean, not skewed in your training data, but in the real world. If so, bias is probably impossible to avoid - unless you can correct for the protected attributes. If you don't have those attributes (e.g. racial data) or proxies, there is no way. Then you have a dilemma between the benefit of an accurate model and a certain level of discrimination. This dilemma can be decided on before you even start, and save you a lot of trouble.

Even with a diverse team, with an equally distributed dataset, and without any historical bias, your AI may still discriminate. And there may be nothing you can do about it.  
For example: take a dataset of students with two variables: study program and  score on a math test. The goal is to let the model select students good at math for a special math program. Let's say that the study program 'computer science' has the best scoring students. And let's say that much more males then females are studying computer science. The result is that the model will select more males than females. Without having gender data in the dataset, this bias is impossible to counter.

## 3. Data Minimization and Storage Limitation

This principle requires that you should minimize the amount, granularity and storage duration of personal information in your training dataset. To make it more concrete:

* Do not collect or copy unnecessary attributes to your dataset if this is irrelevant for your purpose
* Anonymize the data where possible. Please note that this is not as trivial as "removing PII". See [WP 29 Guideline](https://ec.europa.eu/justice/article-29/documentation/opinion-recommendation/files/2014/wp216_en.pdf)
* If full anonymization is not possible, reduce the granularity of the data in your dataset if you aim to produce aggregate insights (e.g. reduce lat/long to 2 decimal points if city-level precision is enough for your purpose or remove the last octets of an ip address, round timestamps to the hour)
* Use less data where possible (e.g. if 10k records are sufficient for an experiment, do not use 1 million)
* Delete data as soon as possible when it is no longer useful (e.g. data from 7 years ago may not be relevant for your model)
* Remove links in your dataset (e.g. obfuscate user id's, device identifiers, and other linkable attributes)
* Minimize the number of stakeholders who accesses the data on a "need to know" basis

There are also privacy-preserving techniques being developed that support data minimization:

* distributed data analysis: exchange anonymous aggregated data
* secure multi-party computation: store data distributed-encrypted
    
Further reading:
* [ICO guidance on AI and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/)
* [FPF case-law analysis on automated decision making](https://fpf.org/blog/fpf-report-automated-decision-making-under-the-gdpr-a-comprehensive-case-law-analysis/)


## 4. Transparency
Privacy standards such as FIPP or ISO29100 refer to maintaining privacy notices, providing a copy of user's data upon request, giving notice when major changes in personal data processing occur, etc.

GDPR also refers to such practices but also has a specific clause related to algorithmic-decision making. 
GDPR's [Article 22](https://ec.europa.eu/newsroom/article29/items/612053) allows individuals specific rights under specific conditions. This includes getting a human intervention to an algorithmic decision, an ability to contest the decision, and get a meaningful information about the logic involved. For examples of "meaningful information", see EDPS's [guideline](https://ec.europa.eu/newsroom/article29/items/612053).  The US [Equal Credit Opportunity Act](https://www.consumerfinance.gov/about-us/newsroom/cfpb-acts-to-protect-the-public-from-black-box-credit-models-using-complex-algorithms/) requires detailed explanations on individual decisions by algorithms that deny credit. 

Transparency is not only needed for the end-user. Your models and datasets should be understandable by internal stakeholders as well: model developers, internal audit, privacy engineers, domain experts, and more. This typically requires the following:

* proper model documentation: model type, intent, proposed features, feature importance, potential harm, and bias
* dataset transparency: source, lawful basis, type of data, whether it was cleaned, age. Data cards is a popular approach in the industry to achieve some of these goals. See Google Research's [paper](https://arxiv.org/abs/2204.01075) and Meta's [research](https://ai.facebook.com/research/publications/system-level-transparency-of-machine-learning).    
* traceability: which model has made that decision about an individual and when?
* explainability: several methods exist to make black-box models more explainable. These include LIME, SHAP, counterfactual explanations, Deep Taylor Decomposition, etc. See also [this overview of machine learning interpretability](https://github.com/jphall663/awesome-machine-learning-interpretability) and [this article on the pros and cons of explainable AI](https://www.softwareimprovementgroup.com/resources/unraveling-the-incomprehensible-the-pros-and-cons-of-explainable-ai/).

## 5. Privacy Rights
Also known as "individual participation" under privacy standards, this principle allows individuals to submit requests to your organization related to their personal data. Most referred rights are: 

1. right of access/portability: provide a copy of user data, preferably in a machine-readable format. If data is properly anonymized, it may be exempted from this right. 
2. right of erasure: erase user data unless an exception applies. It is also a good practice to re-train your model without the deleted user's data.
3. right of correction: allow users to correct factually incorrect data. Also, see accuracy below
4. right of object: allow users to object to the usage of their data for a specific use (e.g. model training)

## 6. Data accuracy
You should ensure that your data is correct as the output of an algorithmic decision with incorrect data may lead to severe consequences for the individual. For example, if the user's phone number is incorrectly added to the system and if such number is associated with fraud, the user might be banned from a service/system in an unjust manner. You should have processes/tools in place to fix such accuracy issues as soon as possible when a proper request is made by the individual. 

To satisfy the accuracy principle, you should also have tools and processes in place to ensure that the data is obtained from reliable sources, its validity and correctness claims are validated and data quality and accuracy are periodically assessed.

## 7. Consent
Consent may be used or required in specific circumstances. In such cases, consent must satisfy the following:

  1. obtained before collecting, using, updating, or sharing the data
  2. consent should be recorded and be auditable
  3. consent should be granular (use consent per purpose, and avoid blanket consent)
  4. consent should not be bundled with T&S
  5. consent records should be protected from tampering
  6. consent method and text should adhere to specific requirements of the jurisdiction in which consent is required (e.g. GDPR requires unambiguous, freely given, written in clear and plain language, explicit and withdrawable)
  7. Consent withdrawal should be as easy as giving consent
  8. If consent is withdrawn, then all associated data with the consent should be deleted and the model should be re-trained.
  
Please note that consent will not be possible in specific circumstances (e.g. you cannot collect consent from a fraudster and an employer cannot collect consent from an employee as there is a power imbalance). If you must collect consent, then ensure that it is properly obtained, recorded and proper actions are taken if it is withdrawn. 


## 8. Model attacks
See the security section for security threats to data confidentiality, as they of course represent a privacy risk if that data is personal data. Notable: membership inference, model inversion, and training data leaking from the engineering process. In addition, models can disclose sensitive data that was unintendedly stored during training.


## Scope boundaries of AI privacy
As said, many of the discussion topics on AI are about human rights, social justice, safety and only a part of it has to do with privacy. So as a data protection officer or engineer it's important not to drag everything into your responsibilities. At the same time, organizations do need to assign those non-privacy AI responsibilities somewhere.


## Before you start: Privacy restrictions on what you can do with AI
The GDPR does not restrict the applications of AI explicitly but does provide safeguards that may limit what you can do, in particular regarding lawfulness and limitations on purposes of collection, processing, and storage - as mentioned above. For more information on lawful grounds, see [article 6](https://gdpr.eu/article-6-how-to-process-personal-data-legally/)

The [US Federal Trade Committee](https://www.ftc.gov/business-guidance/blog/2023/02/keep-your-ai-claims-check) provides some good (global) guidance in communicating carefully about your AI, including not to overpromise.

The [EU AI act](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:52021PC0206&from=EN) does pose explicit application limitations, such as mass surveillance, predictive policing, and restrictions on high-risk purposes such as selecting people for jobs. In addition, there are regulations for specific domains that restrict the use of data, putting limits to some AI approaches (e.g. the medical domain). 

**The EU AI Act in a nutshell:**

Safety, health and fundamental rights are at the core of the AI Act, so risks are analyzed from a perspective of harmfulness to people.

The Act identifies four risk levels for AI systems:
  * **Unacceptable risk**: will be banned. Includes: Manipulation of people, social scoring, and real-time remote biometric identification (e.g. face recognition with cameras in public space).
  * **High risk**: products already under safety legislation, plus eight areas (including critical infrastructure and law enforcement). These systems need to comply with a number of rules including the a security risk assessment and conformity with harmonized (adapted) AI security standards OR the essential requirements of the Cyber Resilience Act (when applicable). 
  * **Limited risk**: has limited potential for manipulation. Should comply with minimal transparency requirements to users that would allow users to make informed decisions. After interacting with the applications, the user can then decide whether they want to continue using it.
  * **Minimal/non risk**: the remaining systems.

So organizations will have to know their AI initiatives and perform high-level risk analysis to determine the risk level.

AI is broadly defined here and includes wider statistical approaches and optimization algorithms.

Generative AI needs to disclose what copyrighted sources were used, and prevent illegal content. To illustrate: if OpenAI for example would violate this rule, they could face a 10 billion dollar fine.

Links:
* [AI Act](https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence)
* [Guidelines on prohibted AI](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act)
* [AI Act page of te EU](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)

## Further reading on AI privacy

* [NIST AI Risk Management Framework 1.0](https://doi.org/10.6028/NIST.AI.100-1)
* [PLOT4ai threat library ](https://plot4.ai/library)
* [Algorithm audit non-profit organisation](https://algorithmaudit.eu/)
* For pure security aspects: see the 'Further reading on AI security' above in this document
