const React = (function(){
    //let _value;
    let hooks = [];
    let index = 0;
    function useState(initValue) {        
        const state = hooks[index] || initValue; 
        let _index = index;
        const setState = newValue => {
            hooks[_index] = newValue;
        };
        index++;
        
        return [state, setState];
    }

    function useEffect(callback, depthArray) {
        const lastDepth = hooks[index];
        let hasChanged = true;

        if (lastDepth) {
            hasChanged = depthArray.some(
                (depth, i) => !Object.is(depth, lastDepth[i])
            );
        }
        if (hasChanged) { 
            callback() 
        };
        hooks[index] = depthArray;
        index++;
    }

    function render(Component) {
        index = 0;
        const _component = Component();
        _component.render();
        return _component;
    }
    
    return { useState, render, useEffect };

    
    
})();

function Component() {
    const [ count, setCount ] = React.useState(0);
    const [ message, setMessage ] = React.useState('apple')

    React.useEffect(() => {
        console.log("useEffect!");
    });

    return {
        render: () => console.log({ count, message }),
        click: () => setCount(count + 1),
        text: (message) => setMessage(message)
    }
}

let App = React.render(Component);
App.click();
App = React.render(Component);
App.text('pear');
App = React.render(Component);