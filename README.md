#### What is Template Specialization ?
Template specialization is a way to dynamically switch partials in your views, to some other partial, based on some rules that you can specify in the form of a json config in you app.

#### Why would you want to do this ?
This may become important and very handy when:
* you are writing apps that need to be supported for multiple locales and parts of it can look different in different country/regions
* you want part of your views to look completely different across various devices (an alternate, more flexible solution to adaptive/responsive designs)
* you want to A/B test
..... Or any other creative way you'd like to use it.

# specialization-example

An example express 4.0 demonstrating template specialization with dustjs.

To see it working:

#### To start the app:
* In you console
```
$ node .
```
* In your browser:
```
http://localhost:8000
```
#### To see specialization at work
* Setting an experiment will show a different layout for your page with partials arranged differently
```
http://localhost:8000/setCustom?experiment=exp1
```

* Setting a country will change the signup form to cater to that country

```
http://localhost:8000/setCustom?country=uk
```


You will see that the specialization rules will be set in the session and you will be redirected to the index page with the right specialization rules.

* To see client side template specialization, <TBD>

###What does the sample app demonstrate ?

You can play with the specialization rules in the config + what you set in the context to see how dust partials gets specialized. Have Fun!!
