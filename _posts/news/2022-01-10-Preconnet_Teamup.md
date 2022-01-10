---
title: Ignition Computing & Plasma Matters team up to accelerate simulations
layout: featured
author: daan_van_vugt
image: /assets/img/news/nasa-dCgbRAQmTQA-unsplash.jpg
categories: news
---
**Multiphysics simulations with plasmas are computationally very difficult. In many cases extremely long calculation times prevent the study of interesting phenomena. Ignition Computing is developing PreconNet to generate preconditioners, a kind of ‘pseudo-solutions’ that can be used with an iterative approach to speed up equation solving. Our new collaboration aims to speed up PLASIMO simulations using PreconNet, leading to enormous speed-ups of 30% or more.**

In physics simulation with implicit time-stepping schemes, typically a problem matrix representing the change in a single time step is constructed and then solved with either a direct or an iterative method. For large and complicated problems, usually direct methods are not accessible. Iterative methods have the additional advantage of supporting arbitrary required accuracies and supporting the use of preconditioners to speed up the solution.

Choosing a useful preconditioner is one of the arts of simulation engineering. It depends on the code, the simulated problem and several other parameters. Many of the preconditioners used now are generated with standard mathematical tools and are not specialised to a single simulation code or even to a specific simulated problem.

 An improvement can be made by generating preconditioners based on the stored results of earlier simulation timesteps. Our viability study resulted in a working proof-of-principle and strong indications of scaling and applicability.

This is why we’re happy to be moving to the Proof of Concept phase, which we will build together with Plasma Matters, the developers of the PLASIMO software that is used in several high-tech industries.

This project is supported by a grant from Dutch government entity RVO.
