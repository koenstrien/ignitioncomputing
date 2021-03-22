---
title: Integrated modelling Python support for ITER
layout: featured
author: daan_van_vugt
image: /assets/img/news/tkmandplant_2016_72dpi.jpg
categories: news
---

The international organization ITER is building the largest tokamak in the world in France. This "big science" project aims to prove useful power generation with nuclear fusion. At a total cost of over 25 billion USD and built by partners in 35 nations the ITER tokamak is one of the most complex objects ever built. One of the challenges in conducting experiments with this complex machine is organizing all sensor data and associated calculations, simulations and forecasts.

For this purpose ITER Organization is developing the Integrated Modeling and Analysis System (IMAS). In this system all relevant information can be stored and retrieved by researchers within and outside the organization. IMAS is built on the concept of Data Dictionaries (DDs), which store information about the tokamak in a structured format, to enable interoperability between software tools. These DDs are complex, with tens of thousands of quantities that can be filled in with time and/or location-dependent data.

The complexity of the system has so far forced development in a static, code-generation style. The generated code is complex and very large. This led to usability issues, especially when considering data stored in different versions of the IMAS system.

Together with DIFFER, Ignition Computing has developed a dynamic interface to IMAS in Python. This is based on an early proof-of-concept by the DIFFER employee Karel van de Plassche. ITER Organization recognized the potential of the new approach, and has funded the rest of this work, which was finished on-time and in-budget.

By just-in-time reading in the IMAS-DD definitions at runtime, datasets with different versions can be imported at the same time. Based on annotations of the schema transparent data-conversion between different versions has been developed, avoiding extra copies in memory. The new interface has been extensively tested against available storage backends. Performance has been optimized by reducing unnecessary allocations, smartly using memoization and caching and by manually optimizing hot code paths.

As next steps proof of concepts newly enabled by the flexibility of this approach will be developed in-house at DIFFER and with partners in the wider fusion community.

<small>Images Credit © ITER Organization, [iter.org/](https://iter.org), DIFFER</small>

[![ITER](/assets/img/clients/iter.png)](https://iter.org)
&nbsp;
[![DIFFER](/assets/img/clients/differ.png)](https://www.differ.nl)
