<p align="center">
    <img src="/src/logo.svg" width="250" alt="Vector image of Niwa Watch">
</p>

<h1 align="center">
    Niwa Practicer
</h1>

This application is used for practicing reading the [NIWA Lunokhod watch](https://niwa.watch/collections/niwa-lunokhod-watches).

It includes with nice animations, a repeating never-ending challenge and point scoring. See how much you can gain!

The traced image is located in [niwa.kra](./niwa.kra). Open it with [Krita](https://krita.org).

## Timings

Timings are taken from a real example, showing the following timings:

| Num           | Timing | Description                                                                                           |
|---------------|--------|-------------------------------------------------------------------------------------------------------|
| 1.            | 1000ms | The first timing is when it's showing the hours. This lasts for exactly 1 second.                     |
| 2.            | 400ms  | It is then off for 400ms, while the green light on the right is still on.                             |
| 3.            | 1300ms | It then shows the minutes for 1.3 seconds.                                                            |
| 4.            | 800ms  | Then it turns blank again for 800ms, only having the green light on.                                  |
| \> 5 && odd.  | 600ms  | Now it shows the seconds for 600ms, it will alternate between showing seconds forever from this point |
| \> 6 && even. | 400ms  | Turns blank for 400ms, going back to showing seconds afterwards.                                      |