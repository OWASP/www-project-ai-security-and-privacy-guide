---
title: 2. Threats through use
weight: 3
---
## 2.0. Threats through use - introduction

Threats through use take place through normal interaction with an AI model: providing input and receiving output. Many of these threats require experimentation with the model, which is referred to in itself as an _Oracle attack_.

**Controls for threats through use:**

- See General controls
- The below control(s), each marked with a # and a short name in capitals

#### #MONITORUSE 

(runtime appsec). Monitor the use of the model (input, date, time, user) by registering it in logs and make it part of incident detection, including:

  - inproper functioning of the model (see [CONTINUOUSVALIDATION](/goto/continuousvalidation/) and [UNWANTEDBIASTESTING](/goto/unwantedbiastesting/))
  - suspicious patterns of model use (e.g. high frequency - see [RATELIMIT](#ratelimit) and [DETECTADVERSARIALINPUT](#detectadversarialinput))
  - suspicious inputs (see [DETECTODDINPUT](#detectoddinput) and [DETECTADVERSARIALINPUT](#detectadversarialinput))

By adding details to logs on the version of the model used and the output, troubleshooting becomes easier.
  
Links to standards:

  - ISO 27002 Control 8.16 Monitoring activities. Gap: covers this control fully, with the particularity: monitoring needs to look for specific patterns of AI attacks (e.g. model attacks through use). The ISO 27002 control has no details on that.
  - ISO/IEC 42001 B.6.2.6 discusses AI system operation and monitoring. Gap: covers this control fully, but on a high abstraction level.
  - See [OpenCRE](https://www.opencre.org/cre/058-083). Idem

#### #RATELIMIT
(runtime appsec). Limit the rate (frequency) of access to the model (e.g. API) - preferably per user.

Purpose: severely delay attackers trying many inputs to perform attacks through use (e.g. try evasion attacks or for model inversion).

Particularity: limit access not to prevent system overload but to prevent experimentation.

Remaining risk: this control does not prevent attacks that use low frequency of interaction (e.g. don't rely on heavy experimentation)

Links to standards:

  - ISO 27002 has no control for this
  - See [OpenCRE](https://www.opencre.org/cre/630-573)

#### #MODELACCESSCONTROL
(runtime appsec). Model access control: Securely limit allowing access to use the model to authorized users.

Purpose: prevent attackers that are not authorized to perform attacks through use.

Remaining risk: attackers may succeed in authenticating as an authorized user, or qualify as an authorized user, or bypass the access control through a vulnerability, or it is easy to become an authorized user (e.g. when the model is publicly available)

Links to standards:

  - Technical access control: ISO 27002 Controls 5.15, 5.16, 5.18, 5.3, 8.3. Gap: covers this control fully
  - [OpenCRE on technical access control](https://www.opencre.org/cre/724-770)
  - [OpenCRE on centralized access control](https://www.opencre.org/cre/117-371)

---

## 2.1. Evasion - Model behaviour manipulation through use

Impact: Integrity of model behaviour is affected, leading to issues from unwanted model output (e.g. failing fraud detection, decisions leading to safety issues, reputation damage, liability).

Fooling models with deceptive input data). In other words: an attacker provides input that has intentionally been designed to cause a machine learning model to behave in an unwanted way. In other words, the attacker fools the model with deceptive input data.

A category of such an attack involves small perturbations leading to a large (and false) modification of its outputs. Such modified inputs are often called *adversarial examples*.

Example: let’s say a self-driving car has been taught how to recognize traffic signs, so it can respond, for example by stopping for a stop sign. It has been trained on a set of labeled traffic sign images. Then an attacker manages to secretly change the train set and add examples with crafted visual cues. For example, the attacker inserts some stop-sign images with yellow stickers and the label “35 miles an hour”. The model will be trained to recognize those cues. The stealthy thing is that this problematic behavior will not be detected in tests. The model will recognize normal stop signs and speed limit signs. But when the car gets on the road, an attacker can put inconspicuous stickers on stop signs and create terrible dangerous situations.

See [MITRE ATLAS - Evade ML model](https://atlas.mitre.org/techniques/AML.T0015)

Another categorization is to distinguish between physical input manipulation (e.g. changing the real world to influence for example a camera image) and digital input manipulation (e.g. changing the digital image).

**Controls for evasion:**

  - See General controls
  - See controls for threats through use
  - The below control(s), each marked with a # and a short name in capitals

  
#### #DETECTODDINPUT 
(runtime data science).
Detect odd input: implement tools to detect whether input is odd: significantly different from the training data or even invalid - also called input validation - without knowledge on what malicious input looks like.

Purpose: Odd input can result in unwanted model behaviour because the model by definition has not seen this data before and will likely produce false results, whether the input is malicious or not. When detected, the input can be logged for analysis and optionally discarded. It is important to note that not all odd input will be malicious and not all malicious input will be odd. There are examples of adversarial input specifically crafted to bypass detection of odd input. Nevertheless, detecting odd input is critical to maintaining model integrity, addressing potential concept drift, and preventing adversarial attacks that may take advantage of model behaviors on out of distribution data.

**Types of detecting odd input**  
Out-of-Distribution Detection (OOD), Novelty Detection (ND), Outlier Detection (OD), Anomaly Detection (AD), and Open Set Recognition (OSR) are all related and sometimes overlapping tasks that deal with unexpected or unseen data. However, each of these tasks has its own specific focus and methodology. In practical applications, the techniques used to solve the problems may be similar or the same. Which task or problem should be addressed and which solution is most appropriate also depends on the definition of in-distribution and out-of-distribution. We use an example of a machine learning system designed for a self-driving car to illustrate all these concepts.

**Out-of-Distribution Detection (OOD)** - the broad category of detecting odd input:  
Identifying data points that differ significantly from the distribution of the training data. OOD is a broader concept that can include aspects of novelty, anomaly, and outlier detection, depending on the context.

Example: The system is trained on vehicles, pedestrians, and common animals like dogs and cats. One day, however, it encounters a horse on the street. The system needs to recognize that the horse is an out-of-distribution object.

Methods for detecting out-of-distribution (OOD) inputs incorporate approaches from outlier detection, anomaly detection, novelty detection, and open set recognition, using techniques like similarity measures between training and test data, model introspection for activated neurons, and OOD sample generation and retraining. Approaches such as thresholding the output confidence vector help classify inputs as in or out-of-distribution, assuming higher confidence for in-distribution examples. Techniques like supervised contrastive learning, where a deep neural network learns to group similar classes together while separating different ones, and various clustering methods, also enhance the ability to distinguish between in-distribution and OOD inputs. For more details, one can refer to the survey by [Yang et al.](https://arxiv.org/pdf/2110.11334.pdf) and other resources on the learnability of OOD: [here](https://arxiv.org/abs/2210.14707).

**Outlier Detection (OD)** - a form of OOD:  
Identifying data points that are significantly different from the majority of the data. Outliers can be a form of anomalies or novel instances, but not all outliers are necessarily out-of-distribution.

Example: Suppose the system is trained on cars and trucks moving at typical city speeds. One day, it detects a car moving significantly faster than all the others. This car is an outlier in the context of normal traffic behavior.

**Anomaly Detection (AD)** - a form of OOD:  
Identifying abnormal or irregular instances that raise suspicions by differing significantly from the majority of the data. Anomalies can be outliers, and they might also be out-of-distribution, but the key aspect is their significance in terms of indicating a problem or rare event.

Example: The system might flag a vehicle going the wrong way on a one-way street as an anomaly. It's not just an outlier; it's an anomaly that indicates a potentially dangerous situation.

**Open Set Recognition (OSR)** - a way to perform Anomaly Detection):  
Classifying known classes while identifying and rejecting unknown classes during testing. OSR is a way to perform anomaly detection, as it involves recognizing when an instance does not belong to any of the learned categories. This recognition makes use of the decision boundaries of the model.

Example: During operation, the system identifies various known objects such as cars, trucks, pedestrians, and bicycles. However, when it encounters an unrecognized object, such as a fallen tree, it must classify it as "unknown. Open set recognition is critical because the system must be able to recognize that this object doesn't fit into any of its known categories.

**Novelty Detection (ND)** - OOD input that is recognized as not malicious:  
OOD input data can sometimes be recognized as not malicious and relevant or of interest. The system can decide how to respond: perhaps trigger another use case, or log is specifically, or let the model process the input if the expectation is that it can generalize to produce a sufficiently accurate result.

Example: The system has been trained on various car models. However, it has never seen a newly released model. When it encounters a new model on the road, novelty detection recognizes it as a new car type it hasn't seen, but understands it's still a car, a novel instance within a known category.


Links to standards:

  - Not covered yet in ISO/IEC standards

  - ENISA Securing Machine Learning Algorithms Annex C: "Ensure that the model is sufficiently resilient to the environment in which it will operate."

References:

  - Hendrycks, Dan, and Kevin Gimpel. "A baseline for detecting misclassified and out-of-distribution examples in neural networks." arXiv preprint arXiv:1610.02136 (2016). ICLR 2017.
    
  - Yang, Jingkang, et al. "Generalized out-of-distribution detection: A survey." arXiv preprint arXiv:2110.11334 (2021).
    
  - Khosla, Prannay, et al. "Supervised contrastive learning." Advances in neural information processing systems 33 (2020): 18661-18673.

  - Sehwag, Vikash, et al. "Analyzing the robustness of open-world machine learning." Proceedings of the 12th ACM Workshop on Artificial Intelligence and Security. 2019.


#### #DETECTADVERSARIALINPUT
(runtime data science). Detect adversarial input: Implement tools to detect specific evasions in input (e.g. patches in images).

The main concepts of adversarial attack detectors include:
  - Activation Analysis: Examining the activations of different layers in a neural network can reveal unusual patterns or anomalies when processing an adversarial input. These anomalies can be used as a signal to detect potential attacks.
  - Statistical Analysis: This involves examining the statistical properties of the input data. Adversarial attacks often leave statistical anomalies in the data, which can be detected through various statistical tests or anomaly detection techniques. Sometimes this involves statistical properties of input from a specific user, for example to detect series of small deviations in the input space, indicating a possible attack.
  - Input Distortion Based Techniques (IDBT): A function is used to modify the input to remove any adversarial data. The model is applied to both versions of the image, the original input and the modified version. The results are compared to detect possible attacks.
  - Detection of adversarial patches: These patches are localized, often visible modifications that can even be placed in the real world. The techniques mentioned above can detect adversarial patches, yet they often require modification due to the unique noise pattern of these patches, particularly when they are used in real-world settings and processed through a camera. In these scenarios, the entire image includes benign camera noise (camera fingerprint), complicating the detection of the specially crafted adversarial patches.
  
  
Links to standards:

  - Not covered yet in ISO/IEC standards

  - ENISA Securing Machine Learning Algorithms Annex C: "Implement tools to detect if a data point is an adversarial example or not"

References:

  - [Feature squeezing](https://arxiv.org/pdf/1704.01155.pdf) (IDBT) compares the output of the model against the output based on a distortion of the input that reduces the level of detail. This is done by reducing the number of features or reducing the detail of certain features (e.g. by smoothing). This approach is like [INPUTDISTORTION](#inputdistortion), but instead of just changing the input to remove any adversarial data, the model is also applied to the original input and then used to compare it, as a detection mechanism.

  - [MagNet](https://arxiv.org/abs/1705.09064) and [here](https://www.mdpi.com/2079-9292/11/8/1283)

  - [DefenseGAN](https://arxiv.org/abs/1805.06605) and Goodfellow, I.; Pouget-Abadie, J.; Mirza, M.; Xu, B.; Warde-Farley, D.; Ozair, S.; Courville, A.; Bengio, Y. Generative adversarial networks. Commun. ACM 2020, 63, 139–144.

  - [Local intrinsic dimensionality](https://www.ijcai.org/proceedings/2021/0437.pdf)

  -  Hendrycks, Dan, and Kevin Gimpel. "Early methods for detecting
adversarial images." arXiv preprint arXiv:1608.00530 (2016).

  - Kherchouche, Anouar, Sid Ahmed Fezza, and Wassim Hamidouche. "Detect
and defense against adversarial examples in deep learning using natural
scene statistics and adaptive denoising." Neural Computing and
Applications (2021): 1-16.

  - Roth, Kevin, Yannic Kilcher, and Thomas Hofmann. "The odds are odd: A
statistical test for detecting adversarial examples." International
Conference on Machine Learning. PMLR, 2019.

  - Bunzel, Niklas, and Dominic Böringer. "Multi-class Detection for Off
The Shelf transfer-based Black Box Attacks." Proceedings of the 2023
Secure and Trustworthy Deep Learning Systems Workshop. 2023.

  - Xiang, Chong, and Prateek Mittal. "Detectorguard: Provably securing
object detectors against localized patch hiding attacks." Proceedings of
the 2021 ACM SIGSAC Conference on Computer and Communications Security. 2021.

  - Bunzel, Niklas, Ashim Siwakoti, and Gerrit Klause. "Adversarial Patch
Detection and Mitigation by Detecting High Entropy Regions." 2023 53rd
Annual IEEE/IFIP International Conference on Dependable Systems and
Networks Workshops (DSN-W). IEEE, 2023.

  - Liang, Bin, Jiachun Li, and Jianjun Huang. "We can always catch you:
Detecting adversarial patched objects with or without signature." arXiv
preprint arXiv:2106.05261 (2021).

  - Chen, Zitao, Pritam Dash, and Karthik Pattabiraman. "Jujutsu: A
Two-stage Defense against Adversarial Patch Attacks on Deep Neural
Networks." Proceedings of the 2023 ACM Asia Conference on Computer and
Communications Security. 2023.

  - Liu, Jiang, et al. "Segment and complete: Defending object detectors
against adversarial patch attacks with robust patch detection."
Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern
Recognition. 2022.

#### #EVASIONROBUSTMODEL
(development-time data science). Choose an evasion-robust model design, configuration and/or training approach to maximize resilience against evasion (Data science).

A robust model in the light of evasion is a model that does not display significant changes in output for minor changes in input.

Example approach: Measure model robustness by trying minor input deviations to detect meaningful outcome variations that undermine the model's reliability. If these variations are undetectable to the human eye but can produce false or incorrect outcome descriptions, they may also significantly undermine the model's reliability. Such cases indicate lack of model resilience to input variance resulting in sensitivity to evasion attacks and require detailed investigation.  

If we interpret the model with its inputs as a "system" and the sensitivity to evasion attacks as the "system fault" then this sensitivity may also be interpreted as (local) lack of graceful degradation. Such issues can be addressed by, for example, increasing training samples for that part of the input domain and tuning/optimising the model for variance.

Another example approach: _Randomisation_ by injecting noise during training. The primary objective of this technique is to enhance the network's resilience to evasion attacks, especially those triggered by subtle, carefully crafted perturbations to input data that may result in misclassification or inaccurate predictions. See also [TRAINDATADISTORTION](/goto/traindatadistortion/) against data poisoning and [OBFUSCATETRAININGDATA](/goto/c12/) to minimize sensitive data through randomisation.

Yet another approach is _gradient masking_: a technique employed to defend machine learning models against adversarial attacks. This involves altering the gradients of a model during training to increase the difficulty of generating adversarial examples for  attackers. Methods like adversarial training and ensemble approaches are utilized for gradient masking, but it comes with limitations, including computational expenses and potential in effectiveness against all types of attacks.

Adversarial robustness (the senstitivity to adversarial examples) can be assessed with tools like [IBM Adversarial Robustness Toolbox](https://research.ibm.com/projects/adversarial-robustness-toolbox), [CleverHans](https://github.com/cleverhans-lab/cleverhans), or [Foolbox](https://github.com/bethgelab/foolbox).

Care must be taken when considering robust model designs, as security concerns have arisen about their effectiveness.

  Links to standards:

  - ISO/IEC TR 24029 (Assessment of the robustness of neural networks) Gap: this standard discusses general robustness and does not discuss robustness against adversarial inputs explicitly.

  - ENISA Securing Machine Learning Algorithms Annex C: "Choose and define a more resilient model design"

  - ENISA Securing Machine Learning Algorithms Annex C: "Reduce the information given by the model"

  References:

  -  Xiao, Chang, Peilin Zhong, and Changxi Zheng. "Enhancing Adversarial
Defense by k-Winners-Take-All." 8th International Conference on Learning
Representations. 2020.

  - Liu, Aishan, et al. "Towards defending multiple adversarial
perturbations via gated batch normalization." arXiv preprint
arXiv:2012.01654 (2020).

  - You, Zhonghui, et al. "Adversarial noise layer: Regularize neural
network by adding noise." 2019 IEEE International Conference on Image
Processing (ICIP). IEEE, 2019.

  - Athalye, Anish, Nicholas Carlini, and David Wagner. "Obfuscated
gradients give a false sense of security: Circumventing defenses to
adversarial examples." International conference on machine learning.
PMLR, 2018.

#### #TRAINADVERSARIAL
(development-time data science). Train adversarial: Add adversarial examples to the training set to make the model more resilient (Data science). While adversarial training does make a model more robust against specific attacks, it is important to note that it also adds significant training overhead, does not scale well with model complexity / input dimension, can lead to overfitting, and may not generalize well to new attack methods. For a general summary of adversarial training, see [Bai et al.](https://arxiv.org/pdf/2102.01356.pdf)

  Links to standards:

  - Not covered yet in ISO/IEC standards

  - ENISA Securing Machine Learning Algorithms Annex C: "Add some adversarial examples to the training dataset"
  
  References:

  - Goodfellow, I.J.; Shlens, J.; Szegedy, C. Explaining and harnessing adversarial examples. arXiv 2014, arXiv:1412.6572.
  - Lyu, C.; Huang, K.; Liang, H.N. A unified gradient regularization family for adversarial examples. In Proceedings of the 2015 ICDM.
  - Papernot, N.; Mcdaniel, P. Extending defensive distillation. arXiv 2017, arXiv:1705.05264.
  - Vaishnavi, Pratik, Kevin Eykholt, and Amir Rahmati. "Transferring adversarial robustness through robust representation matching." 31st USENIX Security Symposium (USENIX Security 22). 2022.

#### #INPUTDISTORTION
(runtime data science). Input distortion: Lightly modify the input with the intention to distort the adversarial attack causing it to fail, while maintaining sufficient model correctness. Modification can be done by e.g. adding noise (randomization), smoothing or JPEG compression.

Maintaining model correctness can be improved by performing multiple random modifications (e.g. randomized smoothing) to the input and then comparing the model output (e.g. best of three).  

The security of these defenses often relies on gradient masking (sometimes called gradient obfuscation) when the functions are non-differentiable (shattered gradients). These defenses can be attacked by approximating the gradients, e.g., using BPDA. Systems that use defenses based on randomness to mask the gradients (stochastic gradients) can be attacked by combining the attack with EOT.
A set of defense techniques called Random Transfomations (RT) defends neural networks by implementing enough randmoness that computing adversarial examples using EOT is computationally inefficient. This randomness is typically achieved by using a random subset of input transformations with random parameters. Since multiple transformations are applied to each input sample, the benign accuracy drops significantly, thus the network must be trained with the RT in place.

Note that black-box or closed-box attacks do not rely on the gradients and are therefore not affected by shattered gradients, as they do not use the gradients to calculate the attack. Black box attacks use only the input and the output of the model or whole AI system to calculate the adversarial input. For a more detailed discussion of these attacks see Closed-box evasion.
  
See [DETECTADVERSARIALINPUT](#detectadversarialinput) for an approach where the distorted input is used for detecting an adversarial attack.

Links to standards:

  - Not covered yet in ISO/IEC standards

  - ENISA Securing Machine Learning Algorithms Annex C: "Apply modifications on inputs"

References:
  - Weilin Xu, David Evans, Yanjun Qi. Feature Squeezing: Detecting Adversarial Examples in Deep Neural Networks. 2018 Network and Distributed System Security Symposium. 18-21 February, San Diego, California.
  - Das, Nilaksh, et al. "Keeping the bad guys out: Protecting and vaccinating deep learning with jpeg compression." arXiv preprint arXiv:1705.02900 (2017).
  - He, Warren, et al. "Adversarial example defense: Ensembles of weak defenses are not strong." 11th USENIX workshop on offensive technologies (WOOT 17). 2017.
  - Xie, Cihang, et al. "Mitigating adversarial effects through randomization." arXiv preprint arXiv:1711.01991 (2017).
  - Raff, Edward, et al. "Barrage of random transforms for adversarially robust defense." Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition. 2019.
  - Mahmood, Kaleel, et al. "Beware the black-box: On the robustness of recent defenses to adversarial examples." Entropy 23.10 (2021): 1359.
  - Athalye, Anish, et al. "Synthesizing robust adversarial examples." International conference on machine learning. PMLR, 2018.
  - Athalye, Anish, Nicholas Carlini, and David Wagner. "Obfuscated gradients give a false sense of security: Circumventing defenses to adversarial examples." International conference on machine learning. PMLR, 2018.

  
#### #ADVERSARIALROBUSTDISTILLATION
(development-time data science). Adversarial-robust distillation: defensive distillation involves training a student model to replicate the softened outputs of the *teacher* model, increasing the resilience of the *student* model to adversarial examples by smoothing the decision boundaries and making the model less sensitive to small perturbations in the input. Care must be taken when considering defensive distillation techniques, as security concerns have arisen about their effectiveness.

Links to standards:

  - Not covered yet in ISO/IEC standards

  - ENISA Securing Machine Learning Algorithms Annex C: "Choose and define a more resilient model design"
 
 References

  - Papernot, Nicolas, et al. "Distillation as a defense to adversarial
perturbations against deep neural networks." 2016 IEEE symposium on
security and privacy (SP). IEEE, 2016.

  - Carlini, Nicholas, and David Wagner. "Defensive distillation is not
robust to adversarial examples." arXiv preprint arXiv:1607.04311 (2016).

### 2.1.1. Closed-box evasion


Black box or closed-box attacks are methods where an attacker manipulates the input to exploit a model without having any internal knowledge or access to that model's implementation, including code, training set, parameters, and architecture. The term "black box" reflects the attacker's perspective, viewing the model as a 'closed box' whose internal workings are unknown. This approach often requires experimenting with how the model responds to various inputs, as the attacker navigates this lack of transparency to identify and leverage potential vulnerabilities.
Since the attacker does not have access to the inner workings of the model, he cannot calculate the gradients to create the adversarial inputs. Therefore, the attacks do not rely on the actual gradients of the network, in contrast to white-box or open-box attacks (see 2.1.2. Open-box evasion).

Black box attack strategies are:
- Transferability-Based Attacks:
  Attackers can execute a transferability-based black box attack by first creating adversarial examples using a surrogate model, a copy or approximation of the closed-box target model, and then applying these adversarial examples to the target model. This approach leverages the concept of an open-box evasion attack, where the attacker utilizes the internals of a surrogate model to construct a successful attack. The goal is to create adversarial examples that will 'hopefully' transfer to the original target model, even though the surrogate may be internally different from the target. The likelihood of a successful transfer is generally higher when the surrogate model closely resembles the target model in terms of complexity and structure. However, it's noted that even attacks developed using simpler surrogate models tend to transfer effectively. To maximize similarity and therefore the effectiveness of the attack, one approach is to reverse-engineer a version of the target model, creating a surrogate that mirrors the target as closely as possible. This strategy is grounded in the rationale that many adversarial examples are inherently transferable across different models, particularly when they share similar architectures or training data. This method of attack, including the creation of a surrogate model through model theft, is detailed in resources such as [this article](https://arxiv.org/abs/1602.02697), which describes this approach in depth.

- Query-Based Attacks:
  In query-based black box attacks, an attacker systematically queries the target model using carefully designed inputs and observes the resulting outputs to infer the model's decision-making process.
This approach enables the attacker to indirectly reconstruct or estimate the model's decision boundaries, thereby facilitating the creation of inputs that can mislead the model.
These attacks are categorized based on the type of output the model provides:
  - Desicion-based (or Label-based) attacks: where the model only reveals the top prediction label
  - Score-based attacks: where the model discloses a score (like a softmax score), often in the form of a vector indicating the top-k predictions.In research typically models which output the whole vector are evaluated, but the output could also be restricted to e.g. top-10 vector. The confidence scores provide more detailed feedback about how close the adversarial example is to succeeding, allowing for more precise adjustments. In a score-based scenario an attacker can for example approximate the gradient by evaluating the objective function values at two very close points.

<p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/inputblack3.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/inputblack3.png?raw=true"/></a></p>

Example 1: slightly changing traffic signs so that self-driving cars may be fooled.

Example 2: crafting an e-mail text by carefully choosing words to avoid triggering a spam detection algorithm.

Example 3: fooling a large language model (GenAI) by circumventing mechanisms to protect against unwanted answers, e.g. "How would I theoretically construct a bomb?". This can be seen as social engineering of a language model. It is referred to as a *jailbreak attack*. ([OWASP for LLM 01: Prompt injection](https://llmtop10.com/llm01/)).

Example 4: aiming to trick an online image classification service, first craft adversarial images using a locally trained surrogate neural network to misclassify images of cats as dogs. These modified images, when uploaded to the online service, exploit the transferability of adversarial examples, successfully deceiving the service into incorrectly classifying cats as dogs.

  References:

  - Papernot, Nicolas, Patrick McDaniel, and Ian Goodfellow.
"Transferability in machine learning: from phenomena to black-box
attacks using adversarial samples." arXiv preprint arXiv:1605.07277 (2016).

  - Papernot, Nicolas, et al. "Practical black-box attacks against machine
learning." Proceedings of the 2017 ACM on Asia conference on computer and
communications security. 2017.

  - Demontis, Ambra, et al. "Why do adversarial attacks transfer?
explaining transferability of evasion and poisoning attacks." 28th
USENIX security symposium (USENIX security 19). 2019.

  - Andriushchenko, Maksym, et al. "Square attack: a query-efficient
black-box adversarial attack via random search." European conference on
computer vision. Cham: Springer International Publishing, 2020.

  - Guo, Chuan, et al. "Simple black-box adversarial attacks."
International Conference on Machine Learning. PMLR, 2019.

  - Bunzel, Niklas, and Lukas Graner. "A Concise Analysis of Pasting
Attacks and their Impact on Image Classification." 2023 53rd Annual
IEEE/IFIP International Conference on Dependable Systems and Networks
Workshops (DSN-W). IEEE, 2023.

  - Chen, Pin-Yu, et al. "Zoo: Zeroth order optimization based black-box
attacks to deep neural networks without training substitute models."
Proceedings of the 10th ACM workshop on artificial intelligence and security. 2017.

  - Guo, Chuan, et al. "Simple black-box adversarial attacks." International
Conference on Machine Learning. PMLR, 2019.

  - Andriushchenko, Maksym, et al. "Square attack: a query-efficient
black-box adversarial attack via random search." European conference on
computer vision. Cham: Springer International Publishing, 2020.

**Controls:**

- See General controls
- See controls for threats through use

### 2.1.2. Open-box evasion

When attackers have access to a models' implementation (code, training set, parameters, architecture), they can be enabled to craft input manipulations (often referred to as _adversarial examples_).

<p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/inputwhite3.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/inputwhite3.png?raw=true"/></a></p>
    <br/>

**Controls:**

- See General controls
- See controls for threats through use

References:

- Madry, Aleksander, et al. "Towards deep learning models resistant to
adversarial attacks." arXiv preprint arXiv:1706.06083 (2017).
- [Traffic signs](https://openaccess.thecvf.com/content_cvpr_2018/papers/Eykholt_Robust_Physical-World_Attacks_CVPR_2018_paper.pdf)
- [Panda images](https://arxiv.org/pdf/1412.6572.pdf)

### 2.1.3. Evasion after data poisoning

After training data has been poisoned (see corresponding section), specific input can lead to unwanted decisions, sometimes referred to as _backdoors_.

---

## 2.2. Sensitive data disclosure through use

Impact: Confidentiality breach of sensitive training data.

The model discloses sensitive training data or is abused to do so.

### 2.2.1. Sensitive data output from model

The output of the model may contain sensitive data from the training set, for example a large language model (GenAI) generating output including personal data that was part of its training set. Furthermore, GenAI can output other types of sensitive data, such as copyrighted text or images. Once training data is in a GenAI model, original variations in access rights do not apply anymore. ([OWASP for LLM 06](https://llmtop10.com/llm06/))

The disclosure is caused by an unintentional fault of including this data, and exposed through normal use or through provocation by an attacker using the system. See [MITRE ATLAS - LLM Data Leakage](https://atlas.mitre.org/techniques/AML.T0057)

**Controls specific for sensitive data output from model:**

- See General controls, in particular data minimization
- See controls for threats through use
- The below control(s), each marked with a # and a short name in capitals

#### #FILTERSENSITIVEMODELOUTPUT 
(runtime appsec). Filter sensitive model output: actively censor sensitive data by detecting it when possible (e.g. phone number)

Links to standards:

  - Not covered yet in ISO/IEC standards

### 2.2.2. Model inversion and Membership inference

Model inversion (or _data reconstruction_) occurs when an attacker reconstructs a part of the training set by intensive experimentation during which the input is optimized to maximize indications of confidence level in the output of the model.

  <p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/inversion3.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/inversion3.png?raw=true"/></a></p>
  <br />

Membership inference is presenting a model with input data that identifies something or somebody (e.g. a personal identity or a portrait picture), and using any indication of confidence in the output to infer the presence of that something or somebody in the training set.

  <p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/membership3.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/membership3.png?raw=true"/></a></p>
  <br />

References:

- [Article on membership inference](https://medium.com/disaitek/demystifying-the-membership-inference-attack-e33e510a0c39)

The more details a model is able to learn, the more it can store information on individual training set entries. If this happens more than necessary, this is called _overfitting_, which can be prevented by configuring smaller models.

Controls for Model inversion and membership inference:

- See General controls, in particular data minimization
- See controls for threats through use
- The below control(s), each marked with a # and a short name in capitals

#### #OBSCURECONFIDENCE 
(runtime data science). Obscure confidence: exclude indications of confidence in the output, or round confidence so it cannot be used for optimization.

Links to standards:

  - Not covered yet in ISO/IEC standards

#### #SMALLMODEL 
(development-time data science). Small model: overfitting can be prevented by keeping the model small so it is not able to store detail at the level of individual training set samples.

Links to standards:

  - Not covered yet in ISO/IEC standards

---

## 2.3. Model theft through use

Impact: Confidentiality breach of model intellectual property.

This attack is known as model stealing attack or model extraction attack. It occurs when an attacker collects inputs and outputs of an existing model and uses those combinations to train a new model, in order to replicate the original model.

<p align="center"><a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/theft3.png?raw=true" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/theft3.png?raw=true"/></a></p>
<br />

**Controls:**

- See General controls
- See controls for threats through use

References

- [Article on model theft through use](https://www.mlsecurity.ai/post/what-is-model-stealing-and-why-it-matters)
- ['Thieves on Sesame street' on model theft of large language models](https://arxiv.org/abs/1910.12366) (GenAI)

---

## 2.4. Failure or malfunction of AI-specific elements through use

Impact: The AI systems is unavailable, leading to issues with processes, organizations or individuals that depend on the AI system (e.g. business continuity issues, safety issues in process control, unavailability of services)

This threat refers to application failure (i.e. denial of service) typically caused by excessive resource usage, induced by an attacker through use (i.e. providing input). The failure occurs from frequency, volume, or the content of the input. See [MITRE ATLAS - Denial of ML service](https://atlas.mitre.org/techniques/AML.T0029).

**Controls:**

- See General controls
- See Controls for threats through use
- The below control(s), each marked with a # and a short name in capitals

  
#### #DOSINPUTVALIDATION
(runtime appsec). Denial-of-service input validation: input validation and sanitization to reject or correct malicious (e.g. very large) content

Links to standards:

  - ISO 27002 has no control for this
  - Not covered yet in ISO/IEC standards
  - [OpenCRE on input validation](https://www.opencre.org/cre/010-308)


#### #LIMITRESOURCES
(runtime). Limit resource usage for a single model input, to prevent resource overuse.

  Links to standards:

  - ISO 27002 has no control for this, except for Monitoring (covered in Controls for threats through use)
  - Not covered yet in ISO/IEC standards

### 2.4.1. Denial of model service due to inconsistent data or a sponge example

A denial of service could be caused by input data with an inappropriate format, and causing malfunctioning of the model or its input logic.
A _sponge attack_ provides input that is designed to increase the computation time of the model, potentially causing a denial of service.
