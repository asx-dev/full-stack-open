```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: Status Code 201
    deactivate server

    Note right of browser: The new note added is render on the page without making a full reload.
```
