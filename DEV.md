
# Development Environment Setup

## initialize submodules
```Gitbash
git submodule update --init --recursive
git submodule foreach --recursive git fetch
git submodule foreach --recursive git checkout main
```

```Gitbash
git submodule sync
git submodule update --remote --recursive
```

## Update submodules to latest main
```Gitbash
git submodule foreach --recursive git pull origin main
```

## commit changes all submodules
```Gitbash
./tools/commit-submodules
```


