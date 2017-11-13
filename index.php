<?php ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>NovLang, a dumbass project by Ben Jyring</title>
	<link href="https://fonts.googleapis.com/css?family=Raleway:400,400i,800,800i" rel="stylesheet">
	<link href="css/app.min.css" rel="stylesheet">
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>

<body>
	<div class="wrapper">
		<header>
			<div class="container">
				<h1>NovLang, a dumbass project by Ben Jyring</h1>
			</div>
		</header>

	<div class="container">
		<div id="lexicon">
			<h2>Lexicon</h2>

			<div class="row form-group">
				<div class="col-sm-4">
					<input class="form-control" type="text" id="searchInput" onkeyup="searchLexicon()" placeholder="Search by English word..">
				</div>

				<div class="col-sm-4">
					<select class="form-control" id="partOfSpeech">
						<option value="all">View All</option>
						<option value="noun">Nouns</option>
						<option value="pronoun">Pronouns</option>
						<option value="verb">Verbs</option>
						<option value="modifier">Modifiers</option>
						<option value="preposition">Prepositions</option>
						<option value="conjunction">Conjunctions</option>
					</select>
				</div>

				<div class="col-sm-4">
					<select id="noun" class="form-control subCategory" class="form-control subCategory">
						<option value="all">View All</option>
						<option value="proper">Proper</option>
						<option value="common">Common</option>
						<option value="abstract">Abstract</option>
						<option value="collective">Collective</option>
					</select>
				</div>

				<div class="col-sm-4">
					<select id="pronoun" class="form-control subCategory">
						<option value="all">View All</option>
						<option value="personal">Personal</option>
						<option value="relative">Relative</option>
						<option value="demonstrative">Demonstrative</option>
						<option value="indefinite">Indefinite</option>
					</select>
				</div>

				<div class="col-sm-4">
					<select id="verb" class="form-control subCategory">
						<option value="all">View All</option>
						<option value="transitiveintentional">Transitive Intentional</option>
						<option value="transitiveexperiential">Transitive Experiential</option>
						<option value="linking">Linking</option>
					</select>
				</div>

				<div class="col-sm-4">
					<select id="modifier" class="form-control subCategory">
						<option value="all">View All</option>
						<option value="descriptive">Descriptive</option>
						<option value="possessive">Possessive</option>
						<option value="demonstrative">Demonstrative</option>
						<option value="interrogative">Interrogative</option>
						<option value="indefinite">Indefinite</option>
					</select>
				</div>
			</div>

			<table id="lexicon">
				<thead>
					<tr>
						<th>Word</th>
						<th>English Translation</th>
						<th>Part of Speech</th>
						<th>Subcategory</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>

			<button id="plus" class="btn btn-default">+</button>
			<button id="minus" class="btn btn-default">-</button>
			<button id="convert" class="btn btn-default">Convert</button>
			<a id="save" class="btn btn-default" href="">Save</a>

			<script>
				// =======
				// Search Engine
				// =======
				function searchLexicon() {
					// Declare variables
					var input, filter, table, tr, td, i;
					input = document.getElementById("searchInput");
					filter = input.value.toUpperCase();
					table = document.getElementById("lexicon");
					tr = table.getElementsByTagName("tr");

					// Loop through all table rows, and hide those who don't match the search query
					for (i = 0; i < tr.length; i++) {
						td = tr[i].getElementsByTagName("td")[1];
						if (td) {
							if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
								tr[i].style.display = "";
							} else {
								tr[i].style.display = "none";
							}
						}
					}
				}
			</script>
		</div>

<?php include "grammar-cases.php" ?>

<?php include "verb-tenses.php" ?>

<?php include "pronoun-correlations.php" ?>

<?php include "sample-translations.php" ?>

	</div> <!-- END CONTAINER -->

	<footer>
		<div class="container">
			<p class="copyright">Copyright 2017 Ben Jyring</p>
		</div>
	</footer>

</div> <!-- END WRAPPER -->

<!-- SCRIPTS -->
<script type="text/javascript" src="js/app.min.js"></script>
</body>
</html>
<?php
