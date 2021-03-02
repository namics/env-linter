# LTS

This warning means, that the Node Version which is installed on your machine is not an LTS Node Version. To change the Node version on your machine, consider using a Node Version Manager such as [NVS](https://github.com/jasongin/nvs).

LTS stands for Long Term Support. LTS versions guarantee, that critical bugs will be fixed for a total of 30 months. Therefore it makes sense to use them in production application. 

Even-numbered Node releases (10, 12, etc.) become Active LTS versions after six months of their initial release. From then on they are ready for general use. 

To find the newest, active LTS version, have a look at the following table: [https://nodejs.org/en/about/releases](https://nodejs.org/en/about/releases). The one with the status `Active LTS` is the one you are looking for.

Note: EnvLinter does not check, if the version is as ACTIVE LTS version. It only checks, if the version is an LTS version.
