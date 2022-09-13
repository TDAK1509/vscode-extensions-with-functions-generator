# with-functions-generator

https://user-images.githubusercontent.com/10008800/175754932-80503d62-77b5-4e90-8039-8075e30e83ea.mp4


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

1. Without type (`Generate withFunctions` command)

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

2. With type (`Generate withFunctions with types` command)

```ts
class MyModelMock {
  private id = 1;
  private name = "Michael Jackson";
  private email = "test@gmail.com";

	public withId(id: PleaseRenameThisType['id']) {
		this.id = id;
		return this;
	}

	public withName(name: PleaseRenameThisType['name']) {
		this.name = name;
		return this;
	}

	public withEmail(email: PleaseRenameThisType['email']) {
		this.email = email;
		return this;
	}
}
```

## How to use

- Hold `Alt` and `double-click` each private variable to multi-select them.
- Press `Ctrl + Shift + P` to open the command palette.
- Type `Generate withFunctions` or `Generate withFunctions with type` and press `Enter`.

## Contribution

Please refer [CONTRIBUTION.md](https://github.com/TDAK1509/vscode-extensions-with-functions-generator/blob/main/CONTRIBUTION.md)
