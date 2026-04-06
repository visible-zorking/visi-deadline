# The Visible Zorker 3: an interactive fiction visualizer

- Designed by Andrew Plotkin <erkyrath@eblong.com>
- Web site: https://eblong.com/infocom/visi-zork3/

This is a web app that plays Zork, and simultaneously displays the code that runs the game under the hood. It allows you to explore the implementation of the game in the same way that you explore the game world. Call it an exercise in exploratory coding.

To try the Visible Zorker 3, [play it here][visizork]. For more about the intent and origins of the project, see my [blog post on the subject][post].

[post]: https://blog.zarfhome.com/2025/01/the-visible-zorker
[visizork]: https://eblong.com/infocom/visi-zork3/

## This README is included by reference

I intend to make many Visible Infocom games available. But I'm too lazy to copy and update a whole big README every time. So you should go look at the [README for Visible Zork 1][z1readme]. This one is pretty much the same deal.

[z1readme]: https://github.com/visible-zorking/visi-zork1

## Sources and acknowledgements

The Visible Zorker is built on a seriously customized version of the [Parchment][] Z-machine interpreter by Marnanel Thurman, Atul Varma, and Dannii Willis.

[Parchment]: https://github.com/curiousdannii/parchment

Some of the files in [`gamedat`](./gamedat) were created by Allen Garvin, Ben Rudiak-Gould, and Ethan Dicks.

The fonts used are Courier Prime, Lato, and Libre Baskerville. The header background is copied from Infocom's [Zork hint maps][zorkmap].

[zorkmap]: https://infodoc.plover.net/maps/zork1.pdf

Zork itself was originally written by Tim Anderson, Marc Blank, Bruce Daniels, and Dave Lebling. The commercial versions are copyright 1981 (etc) by Infocom, then Activision, then renamed to Mediagenic, then Bobby Kotick bought it and renamed it Activision, then Vivendi bought it and merged it with Blizzard, then Microsoft consumed the lot.

Thus, the Zork 3 source code is copyright 2025 by Microsoft. As of November 2025, it is [open source][oz] under the MIT license. Thanks to Microsoft for making this project completely legal!

[oz]: https://opensource.microsoft.com/blog/2025/11/20/preserving-code-that-shaped-generations-zork-i-ii-and-iii-go-open-source

Aside from the above, the Visible Zorker is copyright 2025-2026 by Andrew Plotkin. My work on this project is under the MIT license.


