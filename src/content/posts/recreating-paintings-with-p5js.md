---
title: Recreating paintings with Generative Art, using p5.js
date: "2019-04-07T23:46:37.121Z"
template: "post"
draft: false
slug: "recreating-paintings-with-p5js"
category: "Generative Art"
tags:
  - "generative art"
  - "p5js"
description: "Generating paintings using Random Walk with Perlin Noise"
socialImage: "/media/recreating_paintings/vg_f-2-1-.png"
---
![Random Walk In Progress](/media/recreating_paintings/vg_1.png "Random Walk In Progress")

![Random Walk In Progress](/media/recreating_paintings/vg_2.png "Random Walk In Progress")

*A bunch of random, squiggly lines being drawn to generate a portrait of Van Gogh.*

The above method uses two concepts - **Random Walk**, and **Perlin Noise**.

Imagine you are walking down an empty road, it's a holiday, and you have all the time in the world. Every 10 seconds, you flip a coin. Heads, you take a step forward. Tails, it's a step backwards. This is essentially what a random walk is - a path defined by a series of random steps.

Now instead of an empty road, suppose it's a maze, where you have options to take a step to your left and right, along with forward and backward directions. So now you take 2 coins and based on their flip you decide a step direction, e.g. if it is Head and Head, maybe you take 1 step forward, 1 step left, and so on.

This is similar to what the algorithm above is doing. Lines are drawn between two points - starting from an initial point, `(x1, y1)` , the destination point `(x2, y2)`  is chosen based on some randomness. In the next iteration, the initial point now becomes the past `(x2, y2)` and the whole thing repeats all over again.

To get the colour, we take the RGB value of the destination point here `(x2, y2)`. We could take the initial pixel value as well, but since the distance between the points are large, and a lot of times it starts from the background, taking the destination pixel value made more sense. Purely a personal preference.

Now we come to the randomness part.

Almost all programming languages and libraries have a *random()* function. We could have used that to get a random direction and drawn lines accordingly, but the problem with it is, the result we get is just ...too random.[](https://github.com/unography/personal-blog/blob/master/content/blog/recreating-paintings-with-generative-art/vg_r_2.png)

![Random Noise](/media/recreating_paintings/vg_r_0.png "Random Noise")

![Random Noise](/media/recreating_paintings/vg_r_2.png "Random Noise")

An interesting effect, but not quite what we want.

We want our lines to be random, but also to have some kind of pattern to them, so the end result isn't quite as chaotic.

- - -

Enter **Perlin Noise**.

Invented by Ken Perlin, It's a way to get points in a random fashion, but, which also follow a certain pattern

![white noise](/media/recreating_paintings/whitenoise.png "white noise")

*This is what random noise looks like - consecutive points fetched after calling a random function and then plotting them*

![perlin noise](/media/recreating_paintings/perlinnoise.png "perlin noise")



*This is what Perlin Noise looks like - consecutive points fetched after calling 2D Perlin Noise function and then plotting them.*

The points in both the cases are random, yet in the second image they have a visual aesthetic to it.

In p5.js, simply calling `noise()` instead of `random()` gives this type of pattern, which is what we used to get the semi-random destination points

<figure>
<video autoplay loop muted playsinline>
  <source src="/media/recreating_paintings/vangoghgenerative-1f14226fa7fbce3ab1236133995b81bf.webm" type="video/webm" />
  <source src="/media/recreating_paintings/vangoghgenerative-1f14226fa7fbce3ab1236133995b81bf.mp4" type="video/mp4" />
</video>
<figcaption>Generative art creating Van Gogh portrait</figcaption>
</figure>

In case you're bored with just seeing Van Gogh - the code is deployed live here, where each time you refresh the page, you get a new, random painting!

~ <https://unographymag.com/void>

*A few resources to check out!:*

1. [Daniel Shiffman on Random Walk](https://www.youtube.com/watch?v=l__fEY1xanY&)
2. [Daniel Shiffman's introduction to Perlin Noise](https://www.youtube.com/watch?v=Qf4dIN99e2w)
