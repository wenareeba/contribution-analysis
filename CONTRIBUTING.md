# Contributing

Thank you for helping keep this library accurate and useful. Three kinds of contribution help most.

## 1. Suggest a source

Open an issue with the **Suggest a source** form. Include:

- the full citation, with DOI or a stable link;
- where you checked it (publisher page, repository record, Crossref);
- which bibliography section it belongs in, and one sentence on what it is for.

A source is added only after its title, year and pages (or report series) are confirmed at source. Published CAs from Africa, Asia and Latin America are especially welcome.

## 2. Report a citation error

Open an issue with the **Report a citation error** form, giving the source, the two versions in circulation, and where you checked. Confirmed corrections go into [`bibliography/errata.md`](bibliography/errata.md).

## 3. Propose a change to the content

Open an issue first for anything larger than a typo, so we can agree the change before you write it. Then:

1. Fork the repository and make your change on a new branch.
2. For the bibliography, edit `bibliography/build_bibliography.py` and run `python3 bibliography/build_bibliography.py`. Do not edit the generated files (`annotated-bibliography.md`, `references.bib`, `sources.csv`, `verification-queue.md`) by hand.
3. Open a pull request using the template.

## Standards every change must meet

- **Verified at source.** No source enters the bibliography on the strength of someone else's reference list.
- **Page-cited.** Any statement about what an author says carries a page number.
- **Exact quotations.** A quotation is word for word; otherwise paraphrase without quotation marks.
- **Plain writing.** Short, direct sentences.
- **Nothing confidential.** No unpublished material shared in confidence, no private correspondence, no evaluation reports that are not public.

## Licensing of contributions

By contributing, you agree that written contributions are licensed under [CC BY 4.0](LICENSE) and code under [MIT](LICENSE-CODE), the same as the rest of the repository.
