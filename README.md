# with-functions-generator

## What this extension does

Create `with-functions` for a class, usually used for mocking class for unit test.

**Original**

```ts
class MyModelMock {
  private id = 1;
  private name = "Michael Jackson";
  private email = "test@gmail.com";
}
```

**After**

```ts
class MyModelMock {
  private id = 1;
  private name = "Michael Jackson";
  private email = "test@gmail.com";

  public withId(id) {
    this.id = id;
    return this;
  }

  public withName(name) {
    this.name = name;
    return this;
  }

  public withEmail(email) {
    this.email = email;
    return this;
  }
}
```

## How to use

- Hold `Alt` and `double-click` each private variable to multi-select them.
- Press `Ctrl + Shift + P` to open the command palette.
- Type `Generate withFunctions` and press `Enter`.
