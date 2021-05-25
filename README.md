# DarkCSS
> Better CSS 

Made by [@darkdarcool](https://github.com/darkdarcool) and [@RayhanADev](https://github.com/RayhanADev).

# What **IS** DarkCSS

DarkCSS is an alternitive for people who DON'T like normal CSS. It offers different syntax, and will ouput the CSS into a file to import into HTML, JS, and anything with CSS support!

Here is sample DarkCSS, and the compiled CSS

### **DarkCSS**
-------
```
p {
  content.color = red;
}
```
### **CSS**
-------
``` css
p {
  color: red;
}
```
Spaces are optional in DarkCSS.

---------

If you would like to try DarkCSS, it's simple! Please have node and npx if you need it installed and do the following in the terminal:

```
npm i -g darkcss
```

After that, for proper DarkCSS, please make a `main.dark` file, and if you want to make a `package.json` file, in scripts make a `build:css`, and put in the following. Also put he following in the terminal if you do not want a `package.json`, (if you need it put npx as the first arg):
```
darkcss main.dark -o main.css
```
