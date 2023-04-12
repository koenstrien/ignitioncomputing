---
title: Persistent Actor Framework - Training Week
layout: featured
author: maarten_sebregts
image: /assets/img/news/Tokamak_pit_ITER_worksite_VR_tour.jpg
categories: news
tags: MUSCLE3, ITER, Persistent Actor Framework

---

Last January 24th to 27th we organised a training for the IMAS Persistent Actor Framework at ITER Organization. For many participants this was the first interaction with MUSCLE3, the multiscale coupling library that forms the basis of the Persistent Actor Framework. Benefits of an actor-based model coupling paradigm over integrating models in a single Python program or workflow system are:

> - Easier when starting from simulation programs
>   - No need to reorganise
>   - No need to translate to Python
> - Better modularity
>   - Swap out submodels without copying code
> - Better scalability and efficiency
>   - No restart/reload state from disk while running
>   - Peer-to-peer communication
>   - Optimised resource management

The training started with an introduction to MUSCLE3 by its main developer Lourens Veen. This was followed by a hands-on training session where participants learned to couple example models in the framework. In the last presentation of the day Maarten Sebregts explained how to use MUSCLE3 in an IMAS context.

During the remainder of the week our team has supported ITER staff in integrating existing workflows with MUSCLE3. We also presented the new distributed checkpointing features of MUSCLE3 that were developed by the consortium. This enables complex workflows to periodically create a snapshot of their state, which can be used for analysis and/or restarting the workflow from this state.

The participants were very enthusiastic about the training, and gave much constructive feedback on the training and on MUSCLE3.

[![ITER](/assets/img/clients/iter.png)](https://iter.org)

<small>The opinions expressed in this article are those of Ignition Computing only and do not represent the ITER Organization’s official position. Cover image: 2023 photo of the in-construction tokamak pit at the ITER site. Image credit © ITER Organization, http://www.iter.org/</small>
