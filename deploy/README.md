# Deploy

Basic deployment command is as follows. It runs all the tasks and is generally what you want to do unless you're trying to perform a specific action.

```
$ ansible-playbook -i hosts [playbook.yml]
```

Choose your playbook from either: `staging.yml` or `production.yml`

## Tags

### Specify tags

You can choose which tags to perform:

```
$ ansible-playbook -i hosts playbook.yml [--tags "comma,separated,tags"]
```

### Skip tags

Alternatively, skip over some tags:

```
$ ansible-playbook -i hosts playbook.yml [--skip-tags "comma,separated,tags"]
```

### Deploy tags

* `deploy` - Runs everything
* `ssh` - Copies deploy ssh key to server and clones repo
* `install` - Performs npm/gulp/bower install
* `nginx` - Creates virtualhost file, enables vhost file and restarts nginx
* `server` - Stops the app server, then starts it (effective restart).
  * `server-stop` - Stops server
  * `server-start` - Starts server

__Note__: `server` and `server-start` only start an **existing** server. to create the server for the first time, you need to pass in the extra variable:

```
$ ansible-playbook -i hosts playbook.yml --extra-vars "create=true"
```

This will run an extra command `server-create` to get the process up for the first time.

## Delete the application

```
$ ansible-playbook -i hosts playbook.yml --tags "destroy" --extra-vars "destroy=true"
```
