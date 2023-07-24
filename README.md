# lemmyscorecard

Gets the total post and comment karma for a Lemmy user.

## Usage

Run it with the username and instance of the user you want to calculate the scorecard for

```shell
dpx lemmyscorecard -u <your username> -i <your instance url>
```

Outputs a little scorecard like this

```shell
Counts for CombatWombatEsq
                                         count                                   score
                               post                          139                           4493
                               comment                       135                           249
```

We also take `-h, --help` and `-v, --version` flags to show a help message and the current version, respectively.

```shell
dpx lemmyscorecard -h
dpx lemmyscorecard -v
```