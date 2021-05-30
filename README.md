# JFlow-Core Documentation
### A NPM package that exports jflow-core classes to your project.

# Where to start:

```bash
npm install @farvell/jflow-core
```

# The way you will work with:

* Import constructor objects, when needed.

```javascript

    const { 

        Handle, 
        Lightbox, 
        Parallax 
        
    } = require( "@farvell/jflow-core" );

```

```javascript

    const behaviour = () => {
        // Get constructor object
        const object = new JFlow({
            configParam: "this is a config param"
        })

        // Returns a promise, don't blocks execution
        return object.listener( controlParams );
    }

```

### The way you initialize main method and call all handle functions:

* All behaviours / handlers must be wrapped into a function and return a listener.

```javascript

    // Main method
    window.addEventListener("load", () => {
        initLogicApp()
            .then( initSomeMenu() )
            .then( initLightbox() )
            .then( 
                console.log( "And you are ready to use JFlow!" ) 
             );
    });

```


# Custom Build Examples

### Create a custom Handle object:

* Can pass multiple config objects for trigger it at the same time.

```javascript

    // Object constructor waits for objects
    // with element id and css className
    const htmlElement = new Handler({
        element: "idString1",
        css: [ "className1", "className2" ]
    },
    {
        element: "idString2",
        css: "uniqueAnimation"
    });

```

### The constructed Handler object returns a list of methods for trigger events that returns a Promise not resolved:

* Trigger events must be returned in a execution context.

```javascript

    // Click event
    return htmlElement.onClick( "trigger-className" );

    // Timeout event
    const time = 1200;
    return htmlElement.onTimeout( time );

    // Scroll event
    const offsetToTrigger = 100;
    // direction moves target on Y exe;
    return htmlElement.onScroll( offsetToTrigger  )

```

### Create a custom Parallax object

```javascript

    // direction can be negative
    // offset specifies minOffset to trigger
    // can ba multiple objects
    const htmlElement = new Parallax({
        target: "targetId",
        direction: -1.2,
        offset: 100
    });

    // starts event listener
    return htmlElement.listen();

```

### Create a custom Lightbox object

* All id's and classNames are required! You can copy and paste.

```html

    <section id="lightbox">
        <span class="lightbox-close lightbox-control">x</span>
            
        <figure>
            <span class="previous-button lightbox-control"><</span>
            <img id="lightbox-photo" src="#" alt="lightbox-main-photo">
            <span class="next-button lightbox-control"><</span>
        </figure>

        <p id="lightbox-caption" class="caption"></p>
        <nav id="lightbox-roullette" class="roullette"></nav>
    </section>

```

* You must put lightbox-control class to trigger lightbox.

```html

    <figure class="grid-container lightbox-control">
        <img class="grid-image" src="images/port_01.jpg" alt="port_01">
        <figcaption class="grid-caption">Lorem ipsum dolor sit amet.</figcaption>
    </figure>

```

```javascript

    // Only pass your image css class
    // and captions associated to it
    const lightbox = new Lightbox({
        images: ".grid-image",
        texts: ".grid-caption",
        css: [ "disappear", "appear" ]
    });
    
    return lightbox.listen();

```



Questions?
----------

If you have any questions, please feel free to send me an email;

