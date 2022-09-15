## Cypress tests

1. Create a cypress.env.json file in the root of the folder and add an env variable for the login password.

```
{
  "PASSWORD": "put password here"
}
```

3. Run tests using GUI - `yarn cypress:open`
4. Run tests in headless mode - `yarn test`
