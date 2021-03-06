# CSS Element Query Experiments

Experimental exercises to play with and demonstrate the use cases of CSS Element Queries.

### Running this project

This project site is a Harp app. Harp is an __Asset Pipeline Framework__ for developers, designers and writers. It makes it insanely easy to develop and maintain web applications.

Install Harp ([more details](http://harpjs.com/))

```
$ sudo npm install -g harp
```

Running the project locally:

```
// ~/projects/css-element-query-experiments/
$ harp server -p 9966
// Open http://localhost:9966/
```

### Online demo

http://css-element-query-experiments.harpapp.io/

---

## Experiments

### 1st. Experiment:

__Extending/removing styles/functionality of a component depending on its size__

http://css-element-query-experiments.harpapp.io/demo1.html

This experiment plays with the idea that components should add/remove functionality and styles depending on their own size.

For example, if I have a widget showing me the number of visitors I have in my site, I would want it to show/behave differently depending on the space that it has available.

### 2nd. Experiment:

__A testimonial component that looks different depending on the space it has available__

http://css-element-query-experiments.harpapp.io/polyfill.html

This is in response to [Ian's post](http://ianstormtaylor.com/media-queries-are-a-hack/) to his article "Media Queries are a Hack". The example that he describes is a perfect use case for CSS Element Queries.

The goal of this experiment is to display the same `testimonial` component in a thin container (sidebar) and in a wider container (footer). The component should automatically change its appearance depending on how much room it has available.

---

## Curious Findings

### Be careful with widths
While playing with the 1st experiment I hit one of those weird loops that [some people](http://www.xanthir.com/b4PR0) have been talking about.

For example in experiment 1, go to `test.less` and try setting `post--large` to `600px`, and it'll fall into an endless loop between the `post--large` and `post--med` rules:

```css
.post--large {
  padding: 10px;
  background: yellow;
  max-width: 600px;  <-- This will cause an endless loop
}
```