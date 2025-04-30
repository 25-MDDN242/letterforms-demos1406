[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/m3rrFl41)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=18842564&assignment_repo_type=AssignmentRepo)
## MDDN 242 2025 Assignment 2

## TRAINSET
#### Helena Whiteford

Each of my letters is meant to resemble a line in a public transport train map, much like the London Tube map design by Harry Beck. The system is modular: each letter is made of connected stations and custom connections, and either circular or linear layouts can be decided.

The twelve parameters per letter:
  * `size` : size of the letter
  * `offsetx` : x offset of the letter from the centre
  * `offsety` : y offset of the letter from the centre
  * `numStations` : number of stations in the letter
  * `lineColour` : colour of the letter, associated with sound
  * `customStationX` : x position of a custom station away from the letter
  * `customStationY` : y position of a custom station away from the letter
  * `customConnectionX` : x position of the second station on the custom line
  * `customConnectionY` : y position of the second station on the custom line
  * `connectionStyle` : allows you to adjust how the custom stations are connected, whether horizontal then angled, angled then horizontal, vertical then angled, or angled then vertical.
  * `layout` : y offset of the second circle relative to the first one
  * `lineAngle` : y offset of the second circle relative to the first one

### My process

#### Initial exploration
I was initially inspired by organic forms, like visualizations of neural networks or cell diagrams. It took me a while to finally land on public transport maps aesthetics, but I enjoy public transport systems a lot and it is a fun nod to my first project in this course which also involved a train, only we have gone from steam-powered to underground subway.

Inspiration was drawn from Harry Beck's design of the London Tube Map and the Mini Metro mobile game by Dinosaur Polo Club.

#### Building the system
In my first attempt, I used arrays in LetterData to have full customization of what station were and were not connected. However, this went against the message of the project, and even though this possibly could have been achievable without arrays, I decided against it.

Limiting to 12 parameters was a struggle for me. Had the limit not been there, I believe a lot could have been added to my program to really enhance my lettering. But forcing a 12 parameter limit helped with coming up with creative solutions. Like how I decided instead of the custom connection line X1,Y1 and X2,Y2, and the custom station X1,X2 all being seperate parameters, I made it so the "custom connection" would be a line with parameters X1,Y1 and X2,Y2 but had a station on each end of the line, which one station could easily be hidden or shown.

#### Layout decisions
I started out with just linear and circular circuits, which worked out for `a,b,c`, but `f` is where it started to get complicated. My initial idea was to code every possible layout I would need, even if it was just for one letter. It would be `topCurveRight` for `f` and `bottomCurveLeft` for `j`, but this got messy fast. I went for a more streamlined approach by sticking to linear and circular, plus modifying the custom connections to help with complicated letters. When I got to `m` and `w`I finally had no choice but to add the last layout, a zig-zag.

#### Custom functions
I wrote custom functions for my custom connection parameters, and they ended up working really well: `drawAngularLine()` and `drawCustomConnection()`. I learned how to use `switch` statements for this, turns out they are really easy to code.

#### Interpolation
This was the hardest part for me, and I started off by over-engineering everything. My idea was to animate everything through a "hub" station, like a central station in a real city, where stations collapse inwards and emerge again. After my code breaking many times, I eventually realised simply reducing the station count down to zero then increase to next was the simplest way to achieve my desired look.

#### Numbers
Instead of designing each number to look like digits, I was given the idea to make each number a circle with that many stations (e.g. 3 has 3 stations, 7 has 7).

#### Colour coding
Instead of more accurately, a line gets a unique colour, I assigned each letter a colour based on sounds each letter makes in English speech.

| Group # | Category                      | Letters         | Notes                         |
|---------|-------------------------------|------------------|-------------------------------|
| 1       | Plosives (Stops)              | B, D, G, K, P, T | Hard hits                     |
| 2       | Fricatives                    | F, H, S, V, Z, X | Noisy / airy / sharp          |
| 3       | Nasals & Approximants         | L, M, N, R, W, Y | Flowing, smooth, resonant     |
| 4       | Vowels                        | A, E, I, O, U    | Foundation of vocal sounds    |
| 5       | Affricates / Ambiguous Sounds | C, J, Q          | Complex, hybrid sounds        |
| 6       | Glides / Outliers             | U, O, C, J, Q, Y | Flexible, usage-based visuals |

