[https://justin-calleja.github.io/ggmovies/#/discover/1](https://justin-calleja.github.io/ggmovies/#/discover/1)

## Decisions made along the way

I decided to use Mobx for state management as I think using Redux would have taken me more time.

I tried to avoid using React's state. Not so much at first, but as soon as I hit my first issue, I aggressively put everything I could in Mobx "stores". My first issue with React state was when I had triggered a `setState` (which is async), and unmounted a component (the Autocomplete). I thought simply `unsubscribing` from the Rxjs Observable in the component's `componentWillUnmount` hook would be enough to avoid triggering any setState on an unmounted component. However, this approach resulted in just that if you hit the escape key fast enough (before the last autocomplete network call finishes).

Re Mobx, many people (myself included) usually enable decorator support to more easily use Mobx's features. CRA (create react app), does not come with decorator support ([ref](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#can-i-use-decorators)). I am aware that it is possible to fork CRA or eject or a number of other open source hacks to change CRA's config without ejecting. Being time constrained, I decided to not use decorators.

I decided to use Material-UI. I never used it before but I needed a fast way to get the app looking presentable. I like it a lot. I had used Bootstrap React components in the past. Material-UI was easier to use (once you get the hang of it) and more versatile.

The Autosuggest remains open with suggestions when you navigate back to it (i.e. you select a movie, go to its page, click search again, and the Autosuggest appears with an empty text field and the previous list of suggestions). I am aware of this. I thought it was quite handy at the time (saving me having to type a movie again and the network call - though I never had a problem with the request limit imposed by "The Movie DB"). I left it for later… and later I ran out of time. My initial approach would be to instantiate a new (idle) Loadable when the `MovieSearchDialog` is made hidden. That way, next time it's made visible, the Autosuggest will be empty.

Due to running out of time, I decided to not implement the following requirement: _Filter movies by different genres_. The [/discover/movie](https://developers.themoviedb.org/3/discover/movie-discover) call supports `with_genres`. I would have added genres as query parameters to the app's `/discover/:page` path (e.g. `/discover/12?genres=action,science%20fiction,adventure`) and added these genres in `with_genres` when making the `/discover/movie` call to The Movie DB's API. I also wanted to add another Toolbar with Chips for each genre in the filter and be able to click an X button to remove the genre from the filter (from the query params).

The project's git history was a mess. I decided to re-commit everything in a more sensible fashion after nearing completion of the project (this took longer than expected). I am aware of re-writing history through interactive rebasing. However, I had many "saving state" commits which would look ugly and could not be easily fixed with a rebase.

Again, due to running out of time, I did not manage to add UI controls to paginate in the app's `/discover/:id` page. You will need to change the id in the browser's address bar (for some reason, I usually end up hitting enter twice to get it to actually load - maybe it's the HashRouter. I used the HashRouter because of hosting on Github pages).
