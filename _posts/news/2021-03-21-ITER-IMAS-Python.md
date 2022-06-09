---
title: Building a novel dynamic interface for ITER simulation and sensor data
layout: featured
author: daan_van_vugt
image: /assets/img/news/tkmandplant_2016_72dpi.jpg
categories: news
---
**DIFFER PhD student Karel van de Plassche came up with a clever approach to improve the system that is crucial for sharing information and performing experiments in the international ITER Organization. Together with the company Ignition Computing and ITER Organization his proof-of-concept has been successfully incorporated in the ITER dynamic Python interface to better store and retrieve sensor data and involved calculations.**

The international organization ITER is building the largest tokamak in the world in France. This "big science" project aims to prove useful power generation with nuclear fusion. At a total cost of over 25 billion USD and built by partners in 35 nations the ITER tokamak is one of the most complex machines ever built. One of the challenges in conducting experiments with this complex machine is organizing all sensor data and associated calculations, simulations and forecasts.

For this purpose ITER Organization and its partners are developing the Integrated Modeling and Analysis System (IMAS). In this system all relevant information can be stored and retrieved by researchers within and outside the organization. IMAS is built on the concept of a common Data Dictionary (DD), which stores information about the machine in a structured format, to enable interoperability between software tools. These DDs are complex, with tens of thousands of quantities that can be filled in with time and/or location-dependent data.

<img src="/assets/img/news/imaspy.png" style="max-width: 100%;" alt="IMASPy Layer Structure">

The IMAS infrastructure consists of a low-level layer, which can use several backends, and for which interfaces exist in Fortran, C++, Matlab, Java and Python. These interfaces are statically generated from the IMAS-DD definitions. A dynamic interpretation of the IMAS-DD definitions would improve the user experience and allow for faster development.
Together with DIFFER, Ignition Computing has developed a dynamic interface to IMAS in Python. This is based on an early proof-of-concept by the DIFFER researcher Karel van de Plassche. ITER Organization recognized the potential of the new approach, and has worked  with Karel at DIFFER and Daan van Vugt at Ignition Computing to improve the dynamic Python interface.

By just-in-time reading of the IMAS-DD definitions at runtime, datasets with different versions can be imported at the same time. Annotations within the schema have enabled the transparent data-conversion between different versions to be developed, avoiding extra copies in memory. The new interface has been extensively tested against the currently available storage backends. Performance has been optimized by reducing unnecessary allocations, smart memory usage and caching and by manually optimizing hot code paths.

Next steps will include the development of further proofs-of-concepts that are enabled by this flexible approach. These will be developed in-house at DIFFER and also with partners in the wider fusion community.

<small>Images Credit © ITER Organization, [iter.org/](https://iter.org), DIFFER. TM - ITER is a trademark of the ITER Organization. This is not an official ITER Organization product. The ITER logo is used here by courtesy of the ITER Organization and does not imply endorsement by ITER Organization</small>

[![ITER](/assets/img/clients/iter.png)](https://iter.org)
&nbsp;
[![DIFFER](/assets/img/clients/differ.png)](https://www.differ.nl)
