# Contribution analysis

[![Content licence: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-lightgrey.svg)](LICENSE)
[![Code licence: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE-CODE)

A working library for contribution analysis (CA): a verified bibliography, design templates, a red team protocol for checking that a CA was done properly, and a short course.

Every source listed here was checked at the publisher, repository or Crossref. Statements about what CA authors say carry page numbers. Sources that cannot yet be verified are held back until they can be.

## What contribution analysis is

CA is a theory-based approach to impact evaluation. It tests whether an intervention was a *contributory cause* of an observed change: a necessary part of a package of factors that, together, brought the change about (Mayne 2019, p. 174).

A good contribution claim says two things. The intervention contributed, and here is how it did so (p. 182).

## Who this is for

- **Evaluators** designing or running a CA
- **Commissioners and reviewers** judging whether a CA report stands up
- **Students and researchers** learning the method or studying how it is used

## Start here

| If you want to... | Go to |
|---|---|
| Learn CA from the ground up | [`course/lessons/0001-read-the-question-first.html`](course/lessons/0001-read-the-question-first.html) |
| Design a CA for an evaluation | [`templates/ca-evaluation-design-template.md`](templates/ca-evaluation-design-template.md) |
| Check a CA design or report | [`red-team/ca-red-team-protocol.md`](red-team/ca-red-team-protocol.md) |
| Find the right reading | [`bibliography/annotated-bibliography.md`](bibliography/annotated-bibliography.md) |
| Cite a CA source correctly | [`bibliography/errata.md`](bibliography/errata.md) |

## What is in the repository

| Folder | Contents |
|---|---|
| [`bibliography/`](bibliography/) | 83 sources in seven sections, all verified at source, with BibTeX (`references.bib`) and CSV. An errata page records 13 errors and discrepancies found in published CA reference lists. Unverified sources wait in a separate queue. |
| [`templates/`](templates/) | Five tools: a CA design template, a theory of change and assumptions worksheet, an other factors register, an evidence plan matrix, and a contribution claim checklist |
| [`red-team/`](red-team/) | A 38-check audit protocol (8 critical) following Mayne's seven steps and five verification questions |
| [`course/`](course/) | Eight lessons with retrieval quizzes, practice tasks and model answers, eight reference cards, a glossary and a resources page |

## How the pieces fit

1. **Learn** the method with the course and its reference cards.
2. **Design** a CA with the template and its worksheets before fieldwork.
3. **Check** the design, and later the draft report, against the red team protocol.
4. **Read further** using the bibliography's "where to start" list.

## Quality standards

- **Verified sources only.** A source enters the bibliography once its title, year and pages (or report series) are confirmed at the publisher, repository or Crossref. Authors are recorded with initials, so no unconfirmed first name is published.
- **Page-cited claims.** Statements about the method cite the page they come from.
- **Checked.** Content is checked for fidelity to sources, citation accuracy and completeness of the method before it is added.
- **Corrections are public.** Errors found in other reference lists go in the errata, with the evidence for each correction.

## Course status

| Lesson | Topic | Status |
|---|---|---|
| 1 | [Read the question first](course/lessons/0001-read-the-question-first.html): contributory cause, two-part claims, question scope | Done |
| 2 | [Theories of change that can carry a claim](course/lessons/0002-theories-of-change-that-carry-a-claim.html) | Done |
| 3 | [Building the causal case](course/lessons/0003-building-the-causal-case.html): Mayne's evidence tools and process tracing tests | Done |
| 4 | [Other factors and alternative explanations](course/lessons/0004-other-factors-and-alternative-explanations.html) | Done |
| 5 | [Size and relative importance](course/lessons/0005-size-and-relative-importance.html) | Done |
| 6 | [Running a CA in practice](course/lessons/0006-running-a-ca-in-practice.html) | Done |
| 7 | [Critiques and responses](course/lessons/0007-critiques-and-responses.html) | Done |
| 8 | [CA among theory-based approaches](course/lessons/0008-ca-among-theory-based-approaches.html) | Done |

## Viewing the lessons

The lessons are HTML pages. GitHub shows their source code, not the page. To see them as intended, download or clone the repository and open the `.html` files in a browser, keeping the `course/` folder structure so the shared stylesheet and quiz load.

## Contributing

Suggestions are welcome, especially published CAs from Africa, Asia and Latin America, which are under-represented. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to suggest a source, report a citation error or propose a change. Everyone taking part is expected to follow the [code of conduct](CODE_OF_CONDUCT.md).

## How to cite

Suggested credit: Wenareeba, Morris. (2026). *Contribution analysis: course, bibliography, templates and red team protocol*. GitHub repository. https://github.com/wenareeba/contribution-analysis

Citation metadata is in [`CITATION.cff`](CITATION.cff); GitHub's "Cite this repository" button uses it.

## Licence

- **Written material** (lessons, reference cards, protocol, templates, bibliography notes): [Creative Commons Attribution 4.0 International](LICENSE) (CC BY 4.0). You may share and adapt it, including commercially, if you give credit.
- **Code** (`bibliography/build_bibliography.py`, `course/assets/quiz.js`): [MIT](LICENSE-CODE).
- **Third-party material** quoted or cited here, such as passages from Mayne (2019), stays under its own licence and copyright.


## Key reference

Mayne, J. (2019). Revisiting contribution analysis. *Canadian Journal of Program Evaluation*, 34(2), 171 to 191. https://doi.org/10.3138/cjpe.68004 (open access)
