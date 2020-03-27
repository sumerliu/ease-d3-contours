<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo, twitter_handle, email
-->





<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">ease-d3-contours</h3>

  <p align="center">
    A easeily to add a contours to page by d3
    <br />
    <br />
    <br />
    <a href="https://github.com/sumerliu/ease-d3-contours/blob/master/example/example.html">View Demo</a>
    ·
    <a href="https://github.com/sumerliu/ease-d3-contours/issues">Report Bug</a>
    ·
    <a href="https://github.com/sumerliu/ease-d3-contours/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/sumerliu/ease-d3-contours/blob/master/example/example.html)

> 基于d3-contours官方示例封装可配置的contours<br>
> version:  0.0.01<br>
> lastDate: 2020/3/26<br>
> Author:  Sumer Liu<br>


### Built With

* [d3](https://github.com/d3/d3)
* [TypeScript](https://github.com/Microsoft/TypeScript)
* [webpack](https://github.com/webpack/webpack)



<!-- GETTING STARTED -->
## Installation
 
* npm
```sh
    npm install ease-d3-contours d3 --save
```



<!-- USAGE EXAMPLES -->
## Usage

```js

    var config = {
        el: "#test",
        xAlias: 'X轴',
        yAlias: 'Y轴',
        width: 1280,
        height: 1280,
        title: "等值线",
        data:data
    };
    new EaseD3Contours(config);

```




<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Sumer Liu - 843627979@qq.com

Project Link: [https://github.com/sumerliu/ease-d3-contours](https://github.com/sumerliu/ease-d3-contours)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [d3-contour](https://github.com/d3/d3-contour)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/sumerliu/ease-d3-contours.svg?style=flat-square
[license-url]: https://github.com/sumerliu/ease-d3-contours/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/%E5%A4%A9%E9%AA%84-%E5%88%98-4038528a/
[product-screenshot]: screenshot/1.png
