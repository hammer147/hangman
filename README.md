# Mobile devices not supported

The problem is the on screen keyboard for two reasons:

1. It only gets triggered when the **user** presses a *text input field*.
2. using the keyboard doesn't seem to trigger the keydown events

It does **NOT** get triggered when we focus the text input programmatically.

This means that the following approaches **are not a solution**:

- creating a ref to the text input and setting the focus in a useEffect

- adding an onClick to another element to set the focus to the inputRef

Since the user has to press the input field, it is not possible to hide it via css.

Even if the user presses a text input and types letters on the keyboard, the keydown events are not triggered.
