Mapstory Developer Tools
========================

*WIP*

About
-----

A tool for mapstory developers. Misc helpers.

Install
-------

1. Clone this repo
2. Run `install.sh` script locally

`./install.sh`

Usage
-----

> Note: Mapstory server needs to be running (`vagrant reload`)

> Note: You need to have selenium running (`webdriver-manager start`)

Once you have both servers running, then :

Run `devhelper --help` to view usage

Run `devhelper` to automatically install test data on local server.


Creating test data
==================

To automatically create test data : 

Run `devhelper`

Create users
------------

Add users to be created inside file `src/data/users.yaml`

Using this format:

```
-   username: user01
    name:     Test
    lastName: Testerson
    email:    user01@tester.com
    password: password1234
```

A new user will be created for each entry as long as the email and username are unique.

Layer uploads
-------------

The layer files go inside `src/files`

Then you need to add the file to `src/data/all_layer_files.yaml` with the following structure:

```
 -  title: americancivilwar
    filename: american_civil_war.zip
    start_time: BeginDate
    upload_time: 100000
    published: YES
```

####Where: 

- *title*: The layer title
- *filename*: Layer filename and extension
- *start_time*: Name of the start date field
- *upload_time*: Larger files need to wait longer. (in milliseconds)
- *published*: Should publish layer after upload


