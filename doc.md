# Pandalib Documentation

## Table of Contents
1. [panda.util](#panda-util)
    - [word](#word)
        - [multiple](#multiple)
        - [simple](#simple)
    - [log](#log)
    - [rdm](#rdm)
    - [newelem](#newelem)
    - [secondToHHMMSS](#secondToHHMMSS)
    - [normalize](#normalize)
    - [uditem](#uditem)
2. [panda.loader](#panda-loader)
3. [panda.cookie](#panda-cookie)
4. [panda.timeaction](#panda-timeaction)
5. [panda.ajax](#panda-ajax)

---

## panda.util

### word

#### multiple

- **Parameters:**
  - `item`: Target HTML element.
  - `message`: Message to display.
  - `speed`: Speed to display the message.
  
- **Description**:  
  Display multiple words in an HTML element at a given speed.

#### simple

- **Parameters:**
  - `item`: Target HTML element.
  - `message`: Message to display.
  - `speed`: Speed to display the message.
  - `width`: Width of the element.
  
- **Description**:  
  Display a simple message in an HTML element at a given speed.

### log

- **Parameters:**
  - `content`: Content to log.
  - `color`: Color of the log text.

- **Description**:  
  Log a message to the console with a specified color.

### rdm

- **Parameters:**
  - `min`: Minimum value.
  - `max`: Maximum value.

- **Description**:  
  Generate a random number between `min` and `max`.

### newelem

- **Parameters:**
  - `type`: Type of the HTML element to create.
  - `object`: Attributes to set on the element.

- **Description**:  
  Create a new HTML element with specified attributes.

### secondToHHMMSS

- **Parameters:**
  - `val`: Time in seconds.

- **Description**:  
  Convert seconds to HH:MM:SS format.

### normalize

- **Parameters:**
  - `text`: Text to normalize.

- **Description**:  
  Normalize a text by making it lowercase and removing diacritics.

### uditem

- **Methods:**
  - `add(elem, value, fuct)`: Add an element with values.
  - `set(elem, value)`: Set the value of an element.
  - `get(elem)`: Get the value of an element.

---

## panda.loader

- **Methods:**
  - `init(loader, menu)`: Initialize the loader.
  - `setmenu(menu)`: Set the menu.
  - `new(item, menu, type, ext)`: New item to load.
  - `resourceLoaded()`: Called when all resources are loaded.
  - `update(state)`: Update the loader state.

---

## panda.cookie

- **Methods:**
  - `save(parametres, emplacement)`: Save a cookie.
  - `read(emplacement)`: Read a cookie.

---

## panda.timeaction

- **Methods:**
  - `add(item, option)`: Add a timed action.
  - `pause()`: Pause the action sequence.
  - `stop()`: Stop the action sequence.
  - `clear()`: Clear all actions.
  - `initinterval()`: Initialize the action sequence interval.

---

## panda.ajax

- **Parameters:**
  - `url`: URL for the AJAX request.
  - `data`: Data to send.
  - `callback`: Callback function to handle the response.

- **Description**:  
  Perform an AJAX POST request and call the callback function with the response.

