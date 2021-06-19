<h1 align="center">JFlow-Core Documentation</h1>

## Where to start:

```bash
npm install @farvell/jflow-core
```

## The way you will work with:

- Import constructor objects, when needed.

```javascript

    import { 

        Handler,
        Style,
        Parallax,
        
    } from "@farvell/jflow-core";

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

- All behaviours / handlers must be wrapped inside a function.

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

## Custom Build Examples.

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

- Trigger events must be returned in a execution context.

```javascript

    // Click event
    return htmlElement.onClick( "trigger-className" );

    // Timeout event
    const time = 1200;
    return htmlElement.onTimeout( time );

    // Scroll event
    const offsetToTrigger = 100;
    return htmlElement.onScroll( offsetToTrigger  )

```

### Create a custom Style object:

```javascript

    // Set js styles with a className
    // returns the array of elements
    const styledElement = new Style({

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "tomato"

    }).setStyle( "htmlClassName" );

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