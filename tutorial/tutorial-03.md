# A Beginner's Guide to Working with OCLC APIs
## OCLC DEVCONNECT 2018: Pre-Conference Workshop
### Tutorial Part 3 - Dependency Management

1. We'll be using a tool called [NPM](https://www.npmjs.com) to manage our project's dependencies. By "dependencies" we mean the code libraries and other external resources that our project requires in order to run. This includes the OCLC PHP Authentication Library, the MVC framework Slim, the MARC record parser we'll need, and so on.
2. In your project file, create a file called `package.json`.
	1. `$ touch package.json`
3. Open `package.json` in your text editor.
4. Copy and paste [this text](https://raw.githubusercontent.com/OCLC-Developer-Network/devconnect2018precon/master/package.json) into the file.
5. Save the file.
6. Create the following directories:
```bash
$ mkdir src
$ mkdir views
$ mkdir tests
```
7. Run NPM to install your dependencies:
```bash
$ npm install
```
8. Now, we want to commit our `package.json` file to our GitHub repository, but there is some prep we must do first. You'll notice that the command in the previous step created a `/node_modules/` directory in your project that contains all of the external resources you installed. We do *not* want to put these files in version control.
	1. To tell git to ignore the `/node_modules/` directory, create a `.gitignore` file:
		1. `$ touch .gitignore`
	2. Open `.gitignore` in your text editor.
	3. Copy and paste [this text](https://github.com/OCLC-Developer-Network/devconnnect2018precon/blob/master/.gitignore) into the file.
		1. (This includes a few resources other than `/node_modules/`, but we'll get to those later. :wink:)
	4. Save the file.
9. We're now ready to commit our changes to GitHub. To view local changes not yet commited, enter this command:
	1. `$ git status`
	2. This command should output text telling you that your composer.json and .gitignore files are not yet committed.
10. Add these files to the repository:
	1. `$ git add --all`
11. Commit your changes:
	1. `$ git commit -m "added package.json and .gitignore"`
	2. In between the quotes, you can enter whatever description of the changes you would like.
12. Push your changes to your remote repository:
	1. `$ git push origin master`

**[on to Part 4](tutorial-04.md)**

**[back to Part 2](tutorial-02.md)**