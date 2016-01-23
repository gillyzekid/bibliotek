Router.configure({
    layoutTemplate: 'main',
    notFoundTemplate: 'notfound',
});

Router.route('home', {
    path: '/',
    template: 'home'
});

Router.route('search', {
    path: '/search',
    template: 'search'
});
