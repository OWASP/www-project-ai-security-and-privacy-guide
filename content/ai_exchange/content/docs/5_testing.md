---
title: 5. AI security testing
weight: 6
---
> Category: discussion  
> Permalink: https://owaspai.org/goto/testing/

Testing AI system’s resilience and security relies on three pillars:
1.	**Conventional security testing** (i.e. _pentesting_). See the [secure software developmentcontrol](/goto/secdevprogram/).
2.	**Model performance validation** (see [continuous validation](/goto/continuousvalidation/)): testing if the model behaves according to its specified acceptance criteria isusing a validation set with inputs outputs that represent the intended behaviour of the model. For security,this is to detect if the model behaviour has been altered permanently through data poisoning or model poisoning. For non-security, it is for testing functional correctness, model drift etc.
3.	**AI security testing** (this section), a part of _AI read teaming_ which tests if the AI model can withstand certain attacks, by simulating these attacks.

AI security tests simulate adversarial behaviors to uncover vulnerabilities, weaknesses, and risks in AI systems. While the focus areas of traditional AI testing are functionality and performance, the focus areas of AI Red Teaming go beyond standard validation and include intentional stress testing, attacks, and attempts to bypass safeguards. While the focus of red teaming can extend beyond Security, in this document, we focus primarily on “AI Red Teaming for AI Security”.

In this document, we differentiate AI Red Teaming for Predictive and Generative AI due to their distinct nature, risks, and applications. While some threats, such as development-time supply chain threats, could be common to both types of AI, the way they manifest in their applications can differ significantly.

A systematic approach to AI Red Teaming involves a few key steps, listed below:

- **Define Objectives and Scope**: Identification of objectives, alignment with organizational, compliance, and risk management requirements.
- **Understand the AI System:** Details about the model, use cases, and deployment scenarios.
- **Identify Potential Threats:** Threat modeling, identification of attack surface, exploration, and threat actors.
- **Develop Attack Scenarios:** Design of attack scenarios and edge cases.
- **Test Execution:** Conduct manual or automated tests for the attack scenarios.
- **Risk Assessment:** Documentation of the identified vulnerabilities and risks.
- **Prioritization and Risk Mitigation:** Develop an action plan for remediation, implement mitigation measures, and calculate residual risk.
- **Validation of Fixes:** Retest the system post-remediation.

A comprehensive list of threats and controls coverage based on assets, impact, and attack surfaces is available as a [Periodic Table of AI Security](/goto/periodictable/). In this section, we provide a list of tools for AI Red Teaming Predictive and Generative AI systems, aiding steps such as Attack Scenarios, Test Execution through automated red teaming, and, oftentimes, Risk Assessment through risk scoring.

Each listed tool addresses a subset of the threat landscape of AI systems. Below, we list some key threats to consider:

**Predictive AI:** Predictive AI systems are designed to make predictions or classifications based on input data. Examples include fraud detection, image recognition, and recommendation systems.

**Key Threats to Predictive AI:**

- [Evasion Attacks:](https://owaspai.org/goto/evasion/) These attacks occur when an attacker crafts inputs that mislead the model, causing it to perform its task incorrectly.
- [Model Theft](https://owaspai.org/goto/modeltheftuse/): In this attack, the model’s parameters or functionality are stolen. This enables the attacker to create a replica model, which can then be used as an oracle for crafting adversarial attacks and other compounded threats.
- [Model Poisoning](https://owaspai.org/goto/modelpoison/): This involves the manipulation of data, the data pipeline, or the model training supply chain during the training phase (development phase). The attacker’s goal is to alter the model’s behavior which could result in undesired model operation.

**Generative AI:** Generative AI systems produce outputs such as text, images, or audio. Examples include large language models (LLMs) like ChatGPT and large vision models (LVMs) like DALL-E and MidJourney.

**Key Threats to Generative AI**:

- [Prompt Injection](https://owaspai.org/goto/promptinjection/): In this type of attack, the attacker provides the model with manipulative instructions aimed at achieving malicious outcomes or objectives.
- [Direct Runtime Model Theft](https://owaspai.org/goto/runtimemodeltheft/): Attackers target parts of the model or critical components like the system prompt. By doing so, they gain the ability to craft sophisticated inputs that bypass guardrails.
- [Insecure Output Handling](https://owaspai.org/goto/insecureoutput/): Generative AI systems can be vulnerable to traditional injection attacks, leading to risks if the outputs are improperly handled or processed.

While we have mentioned the key threats for each of the AI Paradigm, we strongly encourage the reader to refer to all threats at the AI Exchange, based on the outcome of the Objective and scope definition phase in AI Red Teaming.

## **Red Teaming Tools for AI and GenAI**

The mind map provides an overview of open-source tools for AI Red Teaming, categorized into Predictive AI Red Teaming and Generative AI Red Teaming, highlighting examples like ART, Armory, TextAttack, and Promptfoo. These tools represent current capabilities but are not exhaustive or ranked by importance, as additional tools and methods will likely emerge and be integrated into this space in the future.

[![](https://owaspai.org/images/testtoolstoattacks.png)](https://owaspai.org/images/testtoolstoattacks.png)

This diagram categorizes threats in AI systems and maps them to relevant open-source tools designed to address these threats.

[![](https://owaspai.org/images/attackstotesttools.jpg)](https://owaspai.org/images/attackstotesttools.jpg)

In this list, you see five predictive AI red teaming tools:

## **Open source Tools for Predictive AI Red Teaming**

**Adversarial Robustness Toolbox (ART), Armory, Foolbox**, **DeepSec**, and **TextAttack**.

### **Tool Name: The Adversarial Robustness Toolbox (ART)**

| **Tool Name: The Adversarial Robustness Toolbox (ART)** |  |
| --- | --- |
| Developer/ Source | IBM Research / the Linux Foundation AI & Data Foundation (LF AI & Data) |
| Github Reference | https://github.com/Trusted-AI/adversarial-robustness-toolbox |
| Language | Python |
| Licensing | Open-source under the MIT License. |
| Provides Mitigation | Prevention: No ❌ Detection: Yes ✅ |
| API Availability | Yes ✅ |

| Factor | Details |
| --- | --- |
| **Popularity** | - **GitHub Stars:** ~4.9K stars (as of 2024) |
|  | - **GitHub Forks:** ~1.2K forks |
|  | - **Number of Issues:** ~131 open issues, 761 closed issues |
|  | - **Trend:** Steady growth, with consistent updates and industry adoption for adversarial robustness. |
| **Community Support** | - **Active Issues:** Responsive team, typically addressing issues within a week. |
|  | - **Documentation:** Detailed and regularly updated, with comprehensive guides and API documentation on IBM's website. |
|  | - **Discussion Forums:** Primarily discussed in academic settings, with some presence on Stack Overflow and GitHub. |
|  | - **Contributors:** Over 100 contributors, including IBM researchers and external collaborators. |
| **Scalability** | - **Framework Support:** Scales across TensorFlow, Keras, and PyTorch with out-of-the-box support. |
|  | - **Large-Scale Deployment:** Proven to handle large, enterprise-level deployments in industries like healthcare, finance, and defense. |
| **Integration** | - **Compatibility:** Works with TensorFlow, PyTorch, Keras, MXNet, and Scikit-learn. |

**Tool Rating**

| **Criteria** | **High** | **Medium** | **Low** |
| --- | --- | --- | --- |
| **Popularity** | ✅ |  |  |
| **Community Support** | ✅ |  |  |
| **Scalability** | ✅ |  |  |
| **Ease of Integration** | ✅ |  |  |

**Data Modality**

| Data Modality | Supported |
| --- | --- |
| Text | ✅ |
| Image | ✅ |
| Audio | ✅ |
| Video | ✅ |
| Tabular data | ✅ |

**Machine Learning Tasks**

| Task Type | Data Modality | Supported |
| --- | --- | --- |
| Classification | All (See Data modality section) | ✅ |
| Object Detection | Computer Vision | ✅ |
| Speech Recognition | Audio | ✅ |

**Framework Applicability**

| Framework / Tool | Category | Supported |
| --- | --- | --- |
| Tensorflow | DL, GenAI | ✅ |
| Keras | DL, GenAI | ✅ |
| PyTorch | DL, GenAI | ✅ |
| MxNet | DL | ✅ |
| Scikit-learn | ML | ✅ |
| XGBoost | ML | ✅ |
| LightGBM | ML | ✅ |
| CatBoost | ML | ✅ |
| GPy | ML | ✅ |

**OWASP AI Exchange Threat Coverage**

| Topic | Coverage |
| --- | --- |
| Development time model poisoning | ✅ |
| Runtime model poisoning |  |
| Model theft by use | ✅ |
| Training data poisoning |  |
| Training data leak |  |
| Runtime model theft |  |
| Evasion (Tests model performance against adversarial inputs) | ✅ |
| Model inversion / Membership inference | ✅ |
| Denial of model service |  |
| Direct prompt injection |  |
| Data disclosure |  |
| Model input leak |  |
| Indirect prompt injection |  |
| Development time model theft |  |
| Output contains injection |  |

Notes:

- Development-time Model poisoning: Simulates attacks during development to evaluate vulnerabilities[*https://owaspai.org/goto/modelpoison/*](https://owaspai.org/goto/modelpoison/)
- Evasion:Tests model performance against adversarial inputs  [*https://owaspai.org/goto/evasion/*](https://owaspai.org/goto/evasion/)
- Model theft through use:Evaluates risks of model exploitation during usage  [*https://owaspai.org/goto/modeltheftuse*](https://owaspai.org/goto/modeltheftuse/)
- Model inference: *Assesses exposure to membership and inversion attacks*
*[https://owaspai.org/goto/modelinversionandmembership/](https://owaspai.org/goto/modelinversionandmembership/)*

### **Tool Name: Armory**

| **Tool Name: Armory** |  |
| --- | --- |
| Developer/ Source | MITRE Corporation |
| Github Reference | [https://github.com/twosixlabs/armory-library](https://github.com/twosixlabs/armory-library)[https://github.com/twosixlabs/armory](https://github.com/twosixlabs/armory) |
| Language | Python |
| Licensing | Open-source under the MIT License. |
| Provides Mitigation | Prevention: No ❌Detection: Yes ✅ |
| API Availability | Yes ✅ |

| Factor | Details |
| --- | --- |
| **Popularity** | - **GitHub Stars:**  ~176 stars (as of 2024) |
|  | - **GitHub Forks:**  ~67 forks |
|  | - **Number of Issues:** ~ 59 open issues, 733 closed, 26 contributors |
|  | - **Trend:** Growing, particularly within defense and cybersecurity sectors. |
| **Community Support** | - **Active Issues:**  Fast response to issues (typically resolved within days to a week). |
|  | - **Documentation:** Comprehensive, but more security-focused, with advanced tutorials on adversarial attacks and defenses. |
|  | - **Discussion Forums:** Active GitHub discussions, some presence on security-specific forums (e.g., in relation to DARPA projects). |
|  | - **Contributors:** Over 40 contributors, mostly security experts and researchers. |
| **Scalability** | - **Framework Support:** Supports TensorFlow and Keras natively, with some integration options for PyTorch. |
|  | - **Large-Scale Deployment:** Mostly used in security-related deployments; scalability for non-security tasks is less documented. |
| **Integration** | - **Compatibility:** Works well with TensorFlow and Keras; IBM ART integration for enhanced robustness |
|  | - **API Availability**: Limited compared to IBM ART, but sufficient for adversarial ML use cases. |

**Tool Rating**

| **Criteria** | **High** | **Medium** | **Low** |
| --- | --- | --- | --- |
| **Popularity** |  |  | ✅ |
| **Community Support** |  | ✅ |  |
| **Scalability** |  | ✅ |  |
| **Ease of Integration** | ✅ |  |  |

**Data Modality**

| Data Modality | Supported |
| --- | --- |
| Text | ✅ |
| Image | ✅ |
| Audio | ✅ |
| Video | ✅ |
| Tabular data | ✅ |

**Machine Learning Tasks**

| Task Type | Data Modality | Supported |
| --- | --- | --- |
| Classification | All (See Data modality section) | ✅ |
| Object Detection | Computer Vision | ✅ |
| Speech Recognition | Audio | ✅ |

**Framework Applicability**

| Framework / Tool | Category | Supported |
| --- | --- | --- |
| Tensorflow | DL, GenAI | ✅ |
| Keras | DL, GenAI |  |
| PyTorch | DL, GenAI | ✅ |
| MxNet | DL |  |
| Scikit-learn | ML |  |
| XGBoost | ML |  |
| LightGBM | ML |  |
| CatBoost | ML |  |
| GPy | ML |  |

**OWASP AI Exchange Threat Coverage**

| Topic | Coverage |
| --- | --- |
| Development time model poisoning | ✅ |
| Runtime model poisoning |  |
| Model theft by use |  |
| Training data poisoning |  |
| Training data leak |  |
| Runtime model theft |  |
| Evasion (Tests model performance against adversarial inputs) | ✅ |
| Model inversion / Membership inference |  |
| Denial of model service |  |
| Direct prompt injection | ✅ |
| Data disclosure |  |
| Model input leak |  |
| Indirect prompt injection |  |
| Development time model theft |  |
| Output contains injection |  |

Notes:

- Development-time Model poisoning: Simulates attacks during development to evaluate vulnerabilities[*https://owaspai.org/goto/modelpoison/*](https://owaspai.org/goto/modelpoison/)
- Evasion:Tests model performance against adversarial inputs  [*https://owaspai.org/goto/evasion/*](https://owaspai.org/goto/evasion/)
- Prompt Injection: Evaluates the robustness of generative AI models by exploiting weaknesses in prompt design, leading to undesired outputs or bypassing model safeguards.
*https://owaspai.org/goto/promptinjection/*

### **Tool Name: Foolbox**

| **Tool Name: Foolbox** |  |
| --- | --- |
| Developer/ Source | Authors/Developers of Foolbox |
| Github Reference | [https://github.com/bethgelab/foolbox](https://github.com/bethgelab/foolbox) |
| Language | Python |
| Licensing | Open-source under the MIT License. |
| Provides Mitigation | Prevention: No ❌Detection: Yes ✅ |
| API Availability | Yes ✅ |

| Factor | Details |
| --- | --- |
| **Popularity** | - **GitHub Stars:**  ~2,800 stars (as of 2024) |
|  | - **GitHub Forks:** ~428 forks |
|  | - **Number of Issues:** ~21 open issues, 350 closed issues |
|  | - **Trend:** Steady, with consistent updates from the academic community. |
| **Community Support** | - **Active Issues:** Typically resolved within a few weeks. |
|  | - **Documentation:** Moderate documentation with basic tutorials; more research-focused. |
|  | - **Discussion Forums:** Primarily discussed in academic settings, with limited industry forum activity. |
|  | - **Contributors:** Over 30 contributors, largely from academia. |
| **Scalability** | - **Framework Support:** Framework Support: Compatible with TensorFlow, PyTorch, and JAX |
|  | - **Large-Scale Deployment:**  Limited scalability for large-scale industry deployments, more focused on research and experimentation. |
| **Integration** | - **Compatibility:**  Strong integration with TensorFlow, PyTorch, and JAX. |

**Total Rating**

| **Criteria** | **High** | **Medium** | **Low** |
| --- | --- | --- | --- |
| **Popularity** |  | ✅ |  |
| **Community Support** |  | ✅ |  |
| **Scalability** |  |  | ✅ |
| **Ease of Integration** |  | ✅ |  |

**Data Modality**

| Data Modality | Supported |
| --- | --- |
| Text | ✅ |
| Image | ✅ |
| Audio |  |
| Video |  |
| Tabular data |  |

**Machine Learning Tasks**

| Task Type | Data Modality | Supported |
| --- | --- | --- |
| Classification | All (See Data modality section) | ✅ |
| Object Detection | Computer Vision | ✅ |
| Speech Recognition | Audio |  |

**Framework Applicability**

| Framework / Tool | Category | Supported |
| --- | --- | --- |
| Tensorflow | DL, GenAI | ✅ |
| Keras | DL, GenAI | ✅ |
| PyTorch | DL, GenAI | ✅ |
| MxNet | DL |  |
| Scikit-learn | ML |  |
| XGBoost | ML |  |
| LightGBM | ML |  |
| CatBoost | ML |  |
| GPy | ML |  |

**OWASP AI Exchange Threat Coverage**

| Topic | Coverage |
| --- | --- |
| Development time model poisoning |  |
| Runtime model poisoning |  |
| Model theft by use |  |
| Training data poisoning |  |
| Training data leak |  |
| Runtime model theft |  |
| Evasion (Tests model performance against adversarial inputs) | ✅ |
| Model inversion / Membership inference |  |
| Denial of model service |  |
| Direct prompt injection |  |
| Data disclosure |  |
| Model input leak |  |
| Indirect prompt injection |  |
| Development time model theft |  |
| Output contains injection |  |

Notes:

Evasion:Tests model performance against adversarial inputs

[*https://owaspai.org/goto/evasion/*](https://owaspai.org/goto/evasion/)

**Tool Name: DeepSec**

| **Tool Name: DeepSec** |  |
| --- | --- |
| Developer/ Source | Developed by a team of academic researchers in collaboration with the National University of Singapore. |
| Github Reference | [https://github.com/ryderling/DEEPSEC](https://github.com/ryderling/DEEPSEC) |
| Language | Python |
| Licensing | Open-source under the Apache License 2.0. |
| Provides Mitigation | Prevention: No ❌Detection: Yes ✅ |
| API Availability | Yes ✅ |

| Factor | Details |
| --- | --- |
| **Popularity** | - **GitHub Stars:** 209 (as of 2024) |
|  | - **GitHub Forks:** ~70 |
|  | - **Number of Issues:** ~15 open issues |
|  | - **Trend:** Stable with a focus on deep learning security |
| **Community Support** | - **Active Issues:** Currently has ongoing issues and updates, suggesting active maintenance. |
|  | - **Documentation:** Available through GitHub, covering setup, use, and contributions. |
|  | - **Discussion Forums:**  GitHub Discussions section and community channels support developer interactions. |
|  | - **Contributors:**  A small but dedicated contributor base. |
| **Scalability** | - **Framework Support:**  Primarily supports PyTorch and additional libraries like TorchVision. |
|  | - **Large-Scale Deployment:** Suitable for research and testing environments but may need adjustments for production-grade scaling |
| **Integration** | - **Compatibility:** Compatible with machine learning libraries in Python. |

**Tool Rating**

| **Criteria** | **High** | **Medium** | **Low** |
| --- | --- | --- | --- |
| **Popularity** |  |  | ✅ |
| **Community Support** |  |  | ✅ |
| **Scalability** |  |  | ✅ |
| **Ease of Integration** |  |  | ✅ |

**Data Modality**

| Data Modality | Supported |
| --- | --- |
| Text | ✅ |
| Image | ✅ |
| Audio |  |
| Video |  |
| Tabular data |  |

**Machine Learning Tasks**

| Task Type | Data Modality | Supported |
| --- | --- | --- |
| Classification | All (See Data modality section) | ✅ |
| Object Detection | Computer Vision |  |
| Speech Recognition | Audio |  |

**Framework Applicability**

| Framework / Tool | Category | Supported |
| --- | --- | --- |
| Tensorflow | DL, GenAI | ✅ |
| Keras | DL, GenAI |  |
| PyTorch | DL, GenAI | ✅ |
| MxNet | DL |  |
| Scikit-learn | ML |  |
| XGBoost | ML |  |
| LightGBM | ML |  |
| CatBoost | ML |  |
| GPy | ML |  |

**OWASP AI Exchange Threat Coverage**

| Topic | Coverage |
| --- | --- |
| Development time model poisoning |  |
| Runtime model poisoning |  |
| Model theft by use |  |
| Training data poisoning |  |
| Training data leak |  |
| Runtime model theft |  |
| Evasion (Tests model performance against adversarial inputs) | ✅ |
| Model inversion / Membership inference |  |
| Denial of model service |  |
| Direct prompt injection |  |
| Data disclosure |  |
| Model input leak |  |
| Indirect prompt injection |  |
| Development time model theft |  |
| Output contains injection |  |

Notes:

Evasion:Tests model performance against adversarial inputs

[*https://owaspai.org/goto/evasion/*](https://owaspai.org/goto/evasion/)

### Tool Name: TextAttack

| **Tool Name: TextAttack** |  |
| --- | --- |
| Developer/ Source | Developed by researchers at the University of Maryland and Google Research. |
| Github Reference | [https://github.com/QData/TextAttack](https://github.com/QData/TextAttack) |
| Language | Python |
| Licensing | Open-source under the MIT License. |
| Provides Mitigation | Prevention: No ❌ Detection: Yes ✅ |
| API Availability | Yes ✅ |

| Factor | Details |
| --- | --- |
| **Popularity** | - **GitHub Stars:** ~3.7K (as of 2024) |
|  | - **GitHub Forks:** ~455 |
|  | - **Number of Issues:** ~130 open issues |
|  | - **Trend:** Popular with ongoing updates and regular contributions |
| **Community Support** | - **Active Issues:**  Issues are actively managed with frequent bug fixes and improvements. |
|  | - **Documentation:** Detailed documentation is available, covering everything from attack configuration to custom dataset integration |
|  | - **Discussion Forums:** GitHub Discussions are active, with support for technical queries and community interaction. |
|  | - **Contributors:** Over 20 contributors, reflecting diverse input and enhancements. |
| **Scalability** | - **Framework Support:** Supports NLP models in PyTorch and integrates well with Hugging Face’s Transformers and Datasets libraries, making it compatible with a broad range of NLP tasks. |
|  | - **Large-Scale Deployment:** Primarily designed for research and experimentation; deployment at scale would likely require customization. |
| **Integration** | - **Compatibility:** Model-agnostic, allowing use with various NLP model architectures as long as they meet the interface requirements. |

**Tool Rating**

| **Criteria** | **High** | **Medium** | **Low** |
| --- | --- | --- | --- |
| **Popularity** | ✅ |  |  |
| **Community Support** | ✅ |  |  |
| **Scalability** |  | ✅ |  |
| **Ease of Integration** | ✅ |  |  |

**Data Modality**

| Data Modality | Supported |
| --- | --- |
| Text | ✅ |
| Image |  |
| Audio |  |
| Video |  |
| Tabular data |  |

**Machine Learning Tasks**

| Task Type | Data Modality | Supported |
| --- | --- | --- |
| Classification | All (See Data modality section) | ✅ |
| Object Detection | Computer Vision |  |
| Speech Recognition | Audio |  |

**Framework Applicability**

| Framework / Tool | Category | Supported |
| --- | --- | --- |
| Tensorflow | DL, GenAI | ✅ |
| Keras | DL, GenAI |  |
| PyTorch | DL, GenAI | ✅ |
| MxNet | DL |  |
| Scikit-learn | ML |  |
| XGBoost | ML |  |
| LightGBM | ML |  |
| CatBoost | ML |  |
| GPy | ML |  |

**OWASP AI Exchange Threat Coverage**

| Topic | Coverage |
| --- | --- |
| Development time model poisoning | ✅ |
| Runtime model poisoning |  |
| Model theft by use |  |
| Training data poisoning |  |
| Training data leak |  |
| Runtime model theft |  |
| Evasion (Tests model performance against adversarial inputs) | ✅ |
| Model inversion / Membership inference |  |
| Denial of model service |  |
| Direct prompt injection |  |
| Data disclosure |  |
| Model input leak |  |
| Indirect prompt injection |  |
| Development time model theft |  |
| Output contains injection |  |

Notes:

- Development-time Model poisoning: Simulates attacks during development to evaluate vulnerabilities[*https://owaspai.org/goto/modelpoison/*](https://owaspai.org/goto/modelpoison/)
- Evasion:Tests model performance against adversarial inputs[*https://owaspai.org/goto/evasion/*](https://owaspai.org/goto/evasion/)

## Open source Tools for Generative AI Red Teaming


### Tool Name: PyRIT

| **Tool Name: PyRIT** |  |
| --- | --- |
| Developer/ Source | Microsoft |
| Github Reference | [https://github.com/Azure/PyRIT](https://github.com/Azure/PyRIT) |
| Language | Python |
| Licensing | Open-source under the MIT License. |
| Provides Mitigation | Prevention: No ❌ Detection: Yes ✅ |
| API Availability | Yes ✅ , library based |

| Factor | Details |
| --- | --- |
| **Popularity** | - **GitHub Stars:** ~2k (as of Dec-2024) |
|  | - **GitHub Forks:** ~384forks |
|  | - **Number of Issues:** ~63 open issues, 79 closed issues |
|  | - **Trend:** Steady growth, with consistent updates and industry adoption for adversarial robustness. |
| **Community Support** | - **Active Issues:** Issues are being addressed within a week. |
|  | - **Documentation:** Detailed and regularly updated, with comprehensive guides and API documentation. |
|  | - **Discussion Forums:** Active GitHub issues |
|  | - **Contributors:** Over 125 contributors. |
| **Scalability** | - **Framework Support:** Scales across TensorFlow, PyTorch and supports models on local like ONNX |
|  | - **Large-Scale Deployment:** Can be extended to Azure pipeline. |
| **Integration** | - **Compatibility:** Compatible with majority of LLMs |

**Tool Rating**

| **Criteria** | **High** | **Medium** | **Low** |
| --- | --- | --- | --- |
| **Popularity** |  | ✅ |  |
| **Community Support** | ✅ |  |  |
| **Scalability** | ✅ |  |  |
| **Ease of Integration** |  | ✅ |  |

**Data Modality**

| Data Modality | Supported |
| --- | --- |
| Text | ✅ |
| Image |  |
| Audio |  |
| Video |  |
| Tabular data |  |

**Machine Learning Tasks**

| Task Type | Data Modality | Supported |
| --- | --- | --- |
| Classification | All (See Data modality section) | ✅ |
| Object Detection | Computer Vision | ✅ |
| Speech Recognition | Audio | ✅ |

**Framework Applicability**

| Framework / Tool | Category | Supported |
| --- | --- | --- |
| Tensorflow | DL, GenAI | ✅ |
| PyTorch | DL, GenAI | ✅ |
| Azure OpenAI | GenAI | ✅ |
| Huggingface | ML, GenAI | ✅ |
| Azure managed endpoints | Machine Learning Deployment | ✅ |
| Cohere | GenAI | ✅ |
| Replicate Text Models	 | GenAI | ✅ |
| OpenAI API | GenAI | ✅ |
| GGUF (Llama.cpp) | GenAI, Lightweight Inference | ✅ |

**OWASP AI Exchange Threat Coverage**

| Topic | Coverage |
| --- | --- |
| Development time model poisoning |  |
| Runtime model poisoning |  |
| Model theft by use |  |
| Training data poisoning |  |
| Training data leak |  |
| Runtime model theft |  |
| Evasion Tests model performance against adversarial inputs | ✅ |
| Model inversion / Membership inference |  |
| Denial of model service |   |
| Direct prompt injection |  ✅ |
| Data disclosure |   |
| Model input leak |   |
| Indirect prompt injection |  |
| Development time model theft |  |
| Output contains injection |  |

Notes:

- Evasion:Tests model performance against adversarial inputs  [*https://owaspai.org/goto/evasion/*](https://owaspai.org/goto/evasion/)
- Prompt Injection: Evaluates the robustness of generative AI models by exploiting weaknesses in prompt design, leading to undesired outputs or bypassing model safeguards.*https://owaspai.org/goto/promptinjection/*

### Tool Name: Garak

| **Tool Name: Garak** |  |
| --- | --- |
| Developer/ Source | NVIDIA |
| Github Reference | https://docs.garak.ai/garak  moved to https://github.com/NVIDIA/garak
Literature: https://arxiv.org/abs/2406.11036
https://github.com/NVIDIA/garak |
| Language | Python |
| Licensing | Apache 2.0 License |
| Provides Mitigation | Prevention: No ❌ Detection: Yes ✅ |
| API Availability | Yes ✅ |

| Factor | Details |
| --- | --- |
| **Popularity** | - **GitHub Stars:** ~3,5K stars (as of Dec 2024) |
|  | - **GitHub Forks:** ~306forks |
|  | - **Number of Issues:** ~303 open issues, 299 closed issues |
|  | - **Trend:** Growing, particularly with in attack generation, and LLM vulnerability scanning. |
| **Community Support** | - **Active Issues:** Actively responds to the issues and try to close it within a week |
|  | - **Documentation:** Detailed documentation with guidance and example experiments. |
|  | - **Discussion Forums:**  Active GitHub discussions, as well as discord. |
|  | - **Contributors:** Over 27 contributors. |
| **Scalability** | - **Framework Support:** Supports various LLMs from hugging face, openai api, litellm.   |
|  | - **Large-Scale Deployment:** Mostly used in attack LLM, detect LLM failures and assessing LLM security. Can be integrated with NeMo Guardrails |
| **Integration** | - **Compatibility:**  All LLMs, Nvidia models |

**Tool Rating**

| **Criteria** | **High** | **Medium** | **Low** |
| --- | --- | --- | --- |
| **Popularity** | ✅ |  |  |
| **Community Support** |  | ✅ |  |
| **Scalability** |  | ✅ |  |
| **Ease of Integration** |  | ✅ |  |

**Data Modality**

| Data Modality | Supported |
| --- | --- |
| Text | ✅ |
| Image |  |
| Audio |  |
| Video |  |
| Tabular data |  |

**Machine Learning Tasks**

| Task Type | Data Modality | Supported |
| --- | --- | --- |
| Classification | All (See Data modality section) | ✅ |
| Object Detection | Computer Vision | ✅ |
| Speech Recognition | Audio |  |

**Framework Applicability**

| Framework / Tool | Category | Supported |
| --- | --- | --- |
| Tensorflow | DL, GenAI |  |
| PyTorch | DL, GenAI | ✅ |
| Azure OpenAI | GenAI |  |
| Huggingface | ML, GenAI | ✅ |
| Azure managed endpoints | Machine Learning Deployment |  |
| Cohere | GenAI | ✅ |
| Replicate Text Models	 | GenAI | ✅ |
| OpenAI API | GenAI | ✅ |
| GGUF (Llama.cpp) | GenAI, Lightweight Inference | ✅ |
| OctoAI | GenAI | ✅ |

**OWASP AI Exchange Threat Coverage**

| Topic | Coverage |
| --- | --- |
| Development time model poisoning |  |
| Runtime model poisoning |  |
| Model theft by use |  |
| Training data poisoning |  |
| Training data leak |  |
| Runtime model theft |  |
| Evasion (Tests model performance against adversarial inputs) | ✅ |
| Model inversion / Membership inference |  |
| Denial of model service |  |
| Direct prompt injection | ✅ |
| Data disclosure |  |
| Model input leak |  |
| Indirect prompt injection |  |
| Development time model theft |  |
| Output contains injection |  |
- Evasion:Tests model performance against adversarial inputs  [*https://owaspai.org/goto/evasion/*](https://owaspai.org/goto/evasion/)
- Prompt Injection: Evaluates the robustness of generative AI models by exploiting weaknesses in prompt design, leading to undesired outputs or bypassing model safeguards.
*https://owaspai.org/goto/promptinjection/*

### Tool Name: Prompt Fuzzer

| **Tool Name: Prompt Fuzzer** |  |
| --- | --- |
| Developer/ Source | Prompt Security |
| Github Reference | [https://github.com/prompt-security/ps-fuzz](https://github.com/prompt-security/ps-fuzz) |
| Language | Python |
| Licensing | Open-source under the MIT License. |
| Provides Mitigation | Prevention: No ❌ Detection: Yes ✅ |
| API Availability | Yes ✅ |

| Factor | Details |
| --- | --- |
| **Popularity** | - **GitHub Stars:** ~427 stars (as of Dec 2024) |
|  | - **GitHub Forks:** ~56 forks |
|  | - **Number of Issues:**  ~10 open issues, 6 closed issues |
|  | - **Trend:** Not updating since Aug |
| **Community Support** | - **Active Issues:** Not updated or solved bugs since July. |
|  | - **Documentation:** Moderate documentation with few examples |
|  | - **Discussion Forums:**  GitHub issue forums |
|  | - **Contributors:** Over 10 contributors. |
| **Scalability** | - **Framework Support:** Python and docker image. |
|  | - **Large-Scale Deployment:** It only assesses the security of your GenAI application's system prompt against various dynamic LLM-based attacks, so can be integrated with current env. |
| **Integration** | - **Compatibility:**  Any device. |

**Tool Rating**

| **Criteria** | **High** | **Medium** | **Low** |
| --- | --- | --- | --- |
| **Popularity** |  |  | ✅ |
| **Community Support** |  |  | ✅ |
| **Scalability** |  | ✅ |  |
| **Ease of Integration** |  | ✅ |  |

**Data Modality**

| Data Modality | Supported |
| --- | --- |
| Text | ✅ |
| Image |  |
| Audio |  |
| Video |  |
| Tabular data |  |

**Machine Learning Tasks**

| Task Type | Data Modality | Supported |
| --- | --- | --- |
| Classification | All (See Data modality section) | ✅ |
| Object Detection | Computer Vision |  |
| Speech Recognition | Audio |  |

**Framework Applicability**

*(LLM Model agnostic in the API mode of use)*

| Framework / Tool | Category | Supported |
| --- | --- | --- |
| Tensorflow | DL, GenAI |  |
| PyTorch | DL, GenAI |  |
| Azure OpenAI | GenAI |  |
| Huggingface | ML, GenAI |  |
| Azure managed endpoints | Machine Learning Deployment |  |
| Cohere | GenAI |  |
| Replicate Text Models | GenAI |  |
| OpenAI API | GenAI | ✅ |
| GGUF (Llama.cpp) | GenAI, Lightweight Inference |  |
| OctoAI | GenAI |  |

**OWASP AI Exchange Threat Coverage**

| Topic | Coverage |
| --- | --- |
| Development time model poisoning |  |
| Runtime model poisoning |  |
| Model theft by use |  |
| Training data poisoning |  |
| Training data leak |  |
| Runtime model theft |  |
| Evasion (Tests model performance against adversarial inputs) | ✅ |
| Model inversion / Membership inference |  |
| Denial of model service |  |
| Direct prompt injection | ✅ |
| Data disclosure |  |
| Model input leak |  |
| Indirect prompt injection |  |
| Development time model theft |  |
| Output contains injection |  |

Notes:

- Evasion:Tests model performance against adversarial inputs  [*https://owaspai.org/goto/evasion/*](https://owaspai.org/goto/evasion/)
- Prompt Injection: Evaluates the robustness of generative AI models by exploiting weaknesses in prompt design, leading to undesired outputs or bypassing model safeguards. *https://owaspai.org/goto/promptinjection/*

### Tool Name: Guardrail

| **Tool Name: Guardrail** |  |
| --- | --- |
| Developer/ Source | Guardrails AI |
| Github Reference | [GitHub - guardrails-ai/guardrails: Adding guardrails to large language models.](https://github.com/guardrails-ai/guardrails) | [Guardrails Hub | Guardrails AI](https://hub.guardrailsai.com/) |
| Language | Python |
| Licensing | Apache 2.0 License |
| Provides Mitigation | Prevention: Yes ✅ Detection: Yes ✅ |
| API Availability |  |

| Factor | Details |
| --- | --- |
| **Popularity** | - **GitHub Stars:** ~4,3K (as 2024) |
|  | - **GitHub Forks:** ~326 |
|  | - **Number of Issues:**  ~296 Closed, 40 Open.  |
|  | - **Trend:** Steady growth with consistent and timely updates. |
| **Community Support** | - **Active Issues:** Issues are mostly solved within weeks. |
|  | - **Documentation:** Detailed documentation with examples and user guide |
|  | - **Discussion Forums:**  Primarily github issue and also support available on discord Server and twitter. |
|  | - **Contributors:** Over 60 contributors |
| **Scalability** | - **Framework Support:** Supports Pytorch. Language: Python and Javascript. Working to add more support |
|  | - **Large-Scale Deployment:** Can be extended to Azure, langchain. |
| **Integration** | - **Compatibility:**  Compatible with various open source LLMs like OpenAI, Gemini, Anthropic. |

**Tool Rating**

| **Criteria** | **High** | **Medium** | **Low** |
| --- | --- | --- | --- |
| **Popularity** | ✅ |  |  |
| **Community Support** | ✅ |  |  |
| **Scalability** |  | ✅ |  |
| **Ease of Integration** | ✅ |  |  |

**Data Modality**

| Data Modality | Supported |
| --- | --- |
| Text | ✅ |
| Image |  |
| Audio |  |
| Video |  |
| Tabular data |  |

**Machine Learning Tasks**

| Task Type | Data Modality | Supported |
| --- | --- | --- |
| Classification | All (See Data modality section) | ✅ |
| Object Detection | Computer Vision |  |
| Speech Recognition | Audio |  |

**Framework Applicability**

| Framework / Tool | Category | Supported |
| --- | --- | --- |
| Tensorflow | DL, GenAI |  |
| PyTorch | DL, GenAI | ✅ |
| Azure OpenAI | GenAI | ✅ |
| Huggingface | ML, GenAI | ✅ |
| Azure managed endpoints | Machine Learning Deployment |  |
| Cohere | GenAI | ✅ |
| Replicate Text Models | GenAI |  |
| OpenAI API | GenAI | ✅ |
| GGUF (Llama.cpp) | GenAI, Lightweight Inference |  |
| OctoAI | GenAI |  |

**OWASP AI Exchange Threat Coverage**

| Topic | Coverage |
| --- | --- |
| Development time model poisoning |  |
| Runtime model poisoning |  |
| Model theft by use |  |
| Training data poisoning |  |
| Training data leak |  |
| Runtime model theft |  |
| Evasion (Tests model performance against adversarial inputs) | ✅ |
| Model inversion / Membership inference |  |
| Denial of model service |  |
| Direct prompt injection | ✅ |
| Data disclosure |  |
| Model input leak |  |
| Indirect prompt injection |  |
| Development time model theft |  |
| Output contains injection |  |

Notes:

- Evasion:Tests model performance against adversarial inputs  [*https://owaspai.org/goto/evasion/*](https://owaspai.org/goto/evasion/)
- Prompt Injection: Evaluates the robustness of generative AI models by exploiting weaknesses in prompt design, leading to undesired outputs or bypassing model safeguards.   *https://owaspai.org/goto/promptinjection/*

### Tool Name: Promptfoo

| **Tool Name: Promptfoo** |  |
| --- | --- |
| Developer/ Source | Promptfoo comunity |
| Github Reference | [https://github.com/promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) | [Types of LLM vulnerabilities | promptfoo](https://www.promptfoo.dev/docs/red-team/llm-vulnerability-types/) |
| Language | Python, NodeJS |
| Licensing | Open-source under the MIT License.  |
|  | This project is licensed under multiple licenses:

1. The main codebase is licensed under the MIT License (see below)
2. The `/src/redteam/` directory is proprietary and licensed under the Promptfoo Enterprise License
3. Some third-party components have their own licenses as indicated by LICENSE files in their respective directories |
| Provides Mitigation | Prevention: Yes ✅ Detection: Yes ✅ |
| API Availability | Yes ✅  |

| Factor | Details |
| --- | --- |
| **Popularity** | - **GitHub Stars:** ~4.3K stars (as of 2024) |
|  | - **GitHub Forks:**  ~320 forks |
|  | - **Number of Issues:** ~523 closed, 108 open |
|  | - **Trend:** Consistent update |
| **Community Support** | - **Active Issues:** Issues are  addressed within acouple of days. |
|  | - **Documentation:** Detailed documentation with user guide and examples. |
|  | - **Discussion Forums:** Active Github issue and also support available on Discord |
|  | - **Contributors:** Over 113 contributors. |
| **Scalability** | - **Framework Support:**  Language: JavaScript |
|  | - **Large-Scale Deployment:** Enterprise version avaiable, that supports cloud deployment. |
| **Integration** | - **Compatibility:** Compatible with majoirty of the LLMs |

**Tool Rating**

| **Criteria** | **High** | **Medium** | **Low** |
| --- | --- | --- | --- |
| **Popularity** | ✅ |  |  |
| **Community Support** | ✅ |  |  |
| **Scalability** |  | ✅ |  |
| **Ease of Integration** |  | ✅ |  |

**Data Modality**

| Data Modality | Supported |
| --- | --- |
| Text | ✅ |
| Image |  |
| Audio |  |
| Video |  |
| Tabular data |  |

**Machine Learning Tasks**

| Task Type | Data Modality | Supported |
| --- | --- | --- |
| Classification | All (See Data modality section) | ✅ |
| Object Detection | Computer Vision |  |
| Speech Recognition | Audio |  |

**Framework Applicability**

| Framework / Tool | Category | Supported |
| --- | --- | --- |
| Tensorflow | DL, GenAI |  |
| PyTorch | DL, GenAI |  |
| Azure OpenAI | GenAI | ✅ |
| Huggingface | ML, GenAI | ✅ |
| Azure managed endpoints | Machine Learning Deployment |  |
| Cohere | GenAI | ✅ |
| Replicate Text Models | GenAI | ✅ |
| OpenAI API | GenAI | ✅ |
| GGUF (Llama.cpp) | GenAI, Lightweight Inference | ✅ |
| OctoAI | GenAI |  |

**OWASP AI Exchange Threat Coverage**

| Topic | Coverage |
| --- | --- |
| Development time model poisoning |  |
| Runtime model poisoning |  |
| Model theft by use |  |
| Training data poisoning |  |
| Training data leak |  |
| Runtime model theft |  |
| Evasion (Tests model performance against adversarial inputs) | ✅ |
| Model inversion / Membership inference |  |
| Denial of model service |   |
| Direct prompt injection |   |
| Data disclosure |   |
| Model input leak |   |
| Indirect prompt injection | ✅ |
| Development time model theft |  |
| Output contains injection |  |

Notes:

- Model theft through use:Evaluates risks of model exploitation during usage  [*https://owaspai.org/goto/modeltheftuse/*](https://owaspai.org/goto/modeltheftuse/)
- Prompt Injection: Evaluates the robustness of generative AI models by exploiting weaknesses in prompt design, leading to undesired outputs or bypassing model safeguards.
*[https://owaspai.org/goto/promptinjection/](https://owaspai.org/goto/promptinjection/)*

## Tool Ratings by Popularity, Community Support, Scalability and Integration

[![](https://owaspai.org/images/testtoolrating.png)](https://owaspai.org/images/testtoolrating.png)

| **Attribute** | High | Medium | Low |
| --- | --- | --- | --- |
| Popularity | >3,000 stars | 1,000–3,000 stars | <1,000 stars |
| Community Support | >100 contributors, quick response (<3 days) | 50–100 contributors, response in 3–14 days | <50 contributors, slow response (>14 days) |
| Scalability | Proven enterprise-grade, multi-framework | Moderate scalability, limited frameworks | Research focused, small-scale |
| Integration | Broad compatibility | Limited compatibility, narrow use-case | Minimal or no integration, research tools only |

Disclaimer on the use of the Assessment:

- ***Scope of Assessment: This review exclusively focuses on open-source RedTeaming tools. Proprietary or commercial solutions were not included in this evaluation.***
- ***Independent Review: The evaluation is independent and based solely on publicly available information from sources such as GitHub repositories, official documentation, and related community discussions.***
- ***Tool Version and Relevance: The information and recommendations provided in this assessment are accurate as of September 2024. Any future updates, enhancements, or changes to these tools should be verified directly via the provided links or respective sources to ensure continued relevance.***

***Tool Fit and Usage:***

*The recommendations in this report should be considered based on your organization's specific use case, scale, and security posture. Some tools may offer advanced features that may not be necessary for smaller projects or environments, while others may be better suited to specific frameworks or security goals.*
