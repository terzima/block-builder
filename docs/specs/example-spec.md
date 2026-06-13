# A1 Memory-Led Coordinator Island Progression Design

Date: 2026-06-01
Status: Hardened stakeholder spec for implementation planning

## Purpose

Kalami normal Focus must become a memory-led conversation assembly system. The app should not merely produce a lesson that is different from the last lesson. It should use the learner's proved memory to choose what to strengthen, what to introduce, what can become support, and what coherent conversation route can teach the next step.

The target product shape is:

```text
memory profile
-> learning pressure
-> support/growth/refresh target bundle
-> composition memory index
-> composition opportunity and dialogue operation
-> route frame and information-focus candidate
-> semantic compatibility and grammar-safety check
-> coherence validation
-> compiler materialization check
-> dialogue candidate scoring
-> selected lesson or actionable owned blocker
```

The learner experience should feel like this:

- lessons use words the learner knows as support;
- new high-utility words enter gradually;
- returning to a familiar area feels richer, not stale;
- separately learned words can combine into new coherent thoughts;
- the same known words can appear in meaningfully different sentence and dialogue shapes;
- growth can be lexical, form-based, relational, or thought-depth based;
- conversations sound like exchanges a person would actually have;
- memory and progress visibly affect future lessons;
- repeated content is allowed only when it is clearly refresh/review or when the same route returns with real growth;
- every failure produces a repair path, not a vague "known blocker."

This spec is intended to drive the next implementation plan. It must be precise enough that the plan can split the work into small, verifiable slices without losing the product shape.

## Current Evidence And Active Gap

The surface-aware memory branch established these facts:

- final conversation proof can be written through backend and UI paths;
- proof reaches surface-aware memory rollups;
- Progress and coordinator-facing memory can see proof;
- recent A1 visible identity can affect later lesson selection;
- surface, phrase, and generated-form metadata gaps can be audited and repaired;
- perceived-diversity auditing can distinguish some lesson movement from exact repetition.

The active blocker is:

```text
coordinatorPolicy.composition_no_support_growth_available
```

This means memory persistence is no longer the main suspected failure. The current system can rotate to fresh growth targets, but it does not reliably use known material as support while growing the same conversational island. It can also produce lessons that are technically valid lesson shapes but do not feel like coherent human conversation.

The next phase must determine how far each layer is from the target shape, then convert those findings into concrete implementation work.

## Relationship To Existing Docs

This spec extends, but does not replace:

- `docs/superpowers/specs/2026-05-28-surface-aware-mastery-memory-design.md`
- `docs/superpowers/specs/2026-05-30-backend-focus-repetition-audit-design.md`
- `docs/superpowers/notes/2026-05-28-surface-aware-memory-final-gate.md`
- `docs/superpowers/notes/2026-06-01-a1-focus-perceived-diversity-audit-report.md`

The memory spec defines the learner-memory state machine. This spec defines how coordinator, generator, compiler, metadata, and coherence validation must consume that memory to build better lessons.

## Non-Negotiable Product Principles

### Memory Leads

Normal Focus must start from derived memory meaning, not from a random arc or a fixed lesson shell. The coordinator must first determine the learner's current pressure:

- what is known enough to support;
- what is weak and should be practiced;
- what is saturated and should cool down;
- what needs refresh;
- which slot families are thin;
- which frames are stable enough for an upgrade;
- which route shapes were recently used and should not be repeated without growth.

### Coherence Beats Variety

A lesson that changes many words but forms a nonsense exchange is not acceptable. Coherence validation must reject candidate chains where the question, answer, follow-up, and learner response do not logically belong together.

Example of a failing chain:

```text
enta bethebb eh?
ana bahebb el madina.
tayyib, el kitab?
el kitab helw.
```

This is not a real conversational progression unless there is an explicit bridge that connects the city preference to the book.

### Productive Route Return Is Allowed

The same route may return, but only when the learner-visible payload has genuinely grown or when memory calls for refresh.

Allowed productive return examples:

```text
first:
  enta bethebb eh?
  ana bahebb el madina.

later, with context:
  huwa biyhebb eh fil madrasa?
  huwa biyhebb el kitab el gedid.

later, with choice:
  enta bethebb el madrasa wala el beit?
  ana bahebb el beit aktar.

later, with reason:
  enta bethebb el bahr leih?
  ana bahebb el bahr 3ashan hadi.
```

The same broad preference route is returning, but the learner-visible task changed through context, subject, detail, choice, reason, or another explicit axis.

### Surface-Only Variation Is Not Enough

Changing only one content word, one pronoun, or one time word does not automatically count as productive progression.

This is weak unless the selected rung is explicitly slot variation or pronoun/tense practice:

```text
enta bethebb eh?
ana bahebb el madina.

huwa biyhebb eh?
huwa biyhebb el bahr.
```

The coordinator must classify this as stale or surface-only unless memory says the intended upgrade axis is pronoun practice and the lesson provides enough support for that axis.

### No Fallback Dependency

Owned blockers are required for safety, but they are not the product strategy. Normal A1 Focus is not production-ready if it routinely depends on blockers, all-growth island hopping, or tiny route pools.

If an island has only one materializable route, it must be marked as incomplete for rotation rather than silently reused until the learner feels stuck.

### Every Blocker Must Be Repairable

No blocker is acceptable unless it names the missing contract and the next concrete repair action. A blocker without a repair recommendation is itself a failing audit condition.

### Global Contracts Over Local Tweaks

Coordinator, generator, compiler, metadata, and audit behavior must be controlled through shared contracts, registries, policy bundles, and reusable scripts where practical. This work is expected to need iteration. The implementation must avoid burying important behavior in scattered one-off constants or local conditionals that are hard to find later.

When a future stakeholder review says "support/growth is moving too slowly," "route returns are too strict," "preference islands need more context variation," or "this route should be production-ready now," the fix should usually be a policy, registry, metadata, capability-map, or audit-script update rather than hunting through several unrelated files.

## Definitions

- **Island**: a reusable conversational area, such as preferences, daily activity/time, possessions, descriptions, social routines, school, home, shopping, or repair.
- **Route**: the learner-visible question/answer/follow-up pattern inside an island, such as open preference, yes/no possession, choice, reason follow-up, detail follow-up, time plan, or ask-back.
- **Rung**: the learner's progression step inside an island, such as first contact, revisit with support, slot variation, one expansion, surface upgrade, coherent follow-up, linked sequence, ask-back, or refresh.
- **Upgrade axis**: the single intended dimension of growth for a lesson, such as location context, time context, adjective detail, intensifier, reason, choice, connector, sequence, pronoun, tense, or ask-back.
- **Support target**: a target the learner has enough proof to reuse inside a richer sentence without making it the main focus.
- **Growth target**: a new, weak, or under-touched target selected as the primary learning focus.
- **Refresh target**: a previously known target that memory says needs review because of misses, reveals, age, or weak final proof.
- **Target bundle**: the coordinator's selected support, growth, refresh, anchor, and blocked targets for one candidate.
- **Capability map**: the generator's declaration of which islands, routes, rungs, target roles, slot families, and coherence relations it can materialize.
- **Materialization**: compiler proof that the selected candidate can render correct lesson stages and learner-facing surfaces.
- **Productive diversity**: learner-visible difference that teaches a meaningful new conversational move, not merely a swapped noun.

## Product Model: Islands With Rungs

The coordinator may move between islands. The learner can work on a weak island at a beginner rung and later return to a stronger island at a higher rung. This is desired. The key contract is:

```text
When Focus returns to an island, the lesson must advance, refresh, or block.
It must not quietly repeat the same learner-visible route with only surface changes.
```

The first implementation should support this rung vocabulary:

| Rung | Purpose | Minimal Requirements |
|---|---|---|
| `first_contact` | Introduce a new island or route with low learner load. | Mostly growth allowed; support may be minimal; must be coherent. |
| `revisit_support` | Return to a known island using proved targets as support. | At least one support target and at least one growth or refresh target. |
| `slot_variation` | Teach that a known frame can accept different fillers. | Prior frame support, new filler from same slot family, explicit slot-variation trace. |
| `context_variation` | Keep a familiar route but add context such as place, time, person, or setting. | Context target must be growth or refresh; base route support must be known. |
| `one_expansion` | Add one detail, adjective, intensifier, reason, or choice. | Exactly one primary upgrade axis unless depth policy permits more. |
| `paradigm_or_surface_upgrade` | Practice pronoun, tense, number, or form movement. | Exact surface/paradigm cells must be ready; generic labels cannot render. |
| `coherent_followup` | Ask a follow-up that depends on the prior answer. | Prior claim metadata and allowed follow-up relation required. |
| `linked_or_sequence_thought` | Combine two simple thoughts with a connector or sequence. | Connector readiness and compatible frames required. |
| `ask_back_or_choice` | Teach learner to choose or ask back within the same topic. | Choice/ask-back route capability and valid answer relation required. |
| `refresh` | Review because memory says repair is needed. | Trace must say refresh/review; repeated material cannot pretend to be new growth. |

These are product rungs, not hard-coded sentence tracks. The implementation may start with a smaller audited subset, but the audit must explicitly name which rungs are production-ready per island.

## Memory-Led Lesson Assembly Pipeline

The implementation must make each stage explicit. Each stage has inputs, outputs, tests, and owned blockers.

### Stage 1: Memory Profile Projection

Input:

- surface-aware evidence events;
- memory policy bundle;
- recent lesson identity;
- progress rollups;
- metadata concept/surface aliases.

Output:

```text
CoordinatorMemoryProfile
```

Required fields:

```text
policyBundleId
policyVersion
policySnapshotHash
islandStateByFamily
frameStateByFamily
routeStateByFamily
slotBreadthByFamily
supportCandidatesByFamily
growthCandidatesByFamily
refreshTargetsByFamily
saturatedTargetsByFamily
eligibleRungsByFamily
blockedRungsByFamily
eligibleUpgradeAxesByFamily
recentUpgradeAxes
recentIslandRouteHistory
surfaceReadinessByTarget
paradigmReadinessByTarget
topicContinuityReadiness
askBackReadiness
compositionReadiness
```

The profile must separate:

- lexical concept knowledge;
- article/surface/form knowledge;
- exact paradigm cells;
- frame memory;
- route memory;
- slot-family breadth;
- phrase/idiom memory;
- dialogue-move memory;
- composition readiness;
- recent saturation;
- spaced mastery.

Failure owner: `memoryProfile`.

### Stage 2: Learning Pressure Selection

The coordinator must choose the purpose of the next lesson before selecting a specific route.

Allowed learning pressure types:

```text
new_island_first_contact
same_island_revisit_support
slot_family_growth
context_variation
frame_strengthening
surface_or_paradigm_upgrade
coherent_followup_growth
linked_sequence_growth
ask_back_or_choice_growth
refresh_due_to_memory
route_cooldown_rotation
```

Inputs:

- `CoordinatorMemoryProfile`;
- current depth policy;
- recent route/island history;
- generator capability summary.

Output:

```text
LearningPressureDecision
```

Required trace:

- selected pressure type;
- memory signals that caused it;
- rejected pressure types and why;
- recent cooldown effects;
- required support/growth/refresh mix;
- expected route/rung shape.

Failure owner: `coordinatorPolicy`.

### Stage 3: Target Bundle Selection

The coordinator must select target roles before route materialization.

Every candidate target must be classified:

```text
support
growth
anchor
refresh
blocked
```

Required target bundle fields:

```text
bundleId
islandId
pressureType
rung
primaryUpgradeAxis
supportTargetIds
growthTargetIds
refreshTargetIds
anchorTargetIds
blockedTargetIds
growthSource
growthCandidateTrace
selectedGrowthCandidateIds
rejectedGrowthCandidateIds
supportGrowthRatio
learnerLoadScore
utilityScoreTrace
surfaceReadinessTrace
memoryReasonTrace
```

Rules:

- first-contact beginner islands may be mostly growth;
- revisits must include support unless the route is explicitly refresh;
- known support must come from can-say/stable/mastered or another policy-approved support state;
- saturated targets cannot be primary growth unless refresh/review is selected;
- high-utility vocabulary should beat niche vocabulary unless a learner goal or topic explicitly promotes the niche word;
- support breadth must not be faked by alias duplicates such as `kitab` and `el kitab`;
- when memory exposes support but no usable growth or refresh target, the coordinator must source a growth candidate from A1-ready metadata and curriculum pools before returning a no-growth blocker;
- sourced growth must be high-utility, A1-appropriate, island-compatible, route-compatible, learner-load safe, and not recently saturated;
- sourced growth must include complete learner-facing metadata before it can enter a target bundle;
- once a target bundle exists, candidate scoring must score candidates against the bundle's intended support/growth/refresh roles, not only against the arc thread's raw target ids;
- if the bundle names a growth or refresh target but no candidate route can materialize that target in the selected island, the blocker owner must move to `arcCoverage` with the missing target and route, not remain as generic coordinator ratio math.

Failure owner: `coordinatorPolicy` or `metadataReadiness`.

### Stage 3A: A1 Growth Candidate Sourcing

Support memory must create room for growth, not a dead end. If the learner has known support targets in an island but memory does not yet expose a usable growth or refresh target, the coordinator must actively source growth from the A1-ready metadata/curriculum layer before it can block.

Inputs:

- `A1CoordinatorMemoryProfile`;
- selected learning pressure;
- eligible island, rung, route, slot-family, and upgrade-axis constraints;
- A1 metadata and curriculum utility rankings;
- route capability registry;
- recent lesson, target, route, and exact-surface history;
- shared support/growth, learner-load, saturation, and cooldown policy;
- metadata readiness and compiler readiness helpers.

Output:

```text
A1GrowthCandidateSourceResult
```

Each sourced candidate must expose:

```text
targetId
canonicalConceptId
islandId
targetRole
slotFamily
upgradeAxis
utilityScore
learnerLoadScore
readinessStatus
readinessReasons
compatibleRouteIds
compatibleUpgradeAxes
requiredSurfaceIds
metadataNodeId
recentSaturationState
blockerCode
repairAction
```

Selection rules:

- source only from shared A1-ready metadata/curriculum pools, not from ad hoc hardcoded coordinator literals;
- prefer high-utility conversational words before niche words unless a learner goal explicitly boosts the niche term;
- prefer candidates that can combine with current support targets into a coherent route;
- allow one or two sourced growth targets by default, controlled by shared learner-load policy;
- reject alias-only growth where the learner would experience the same word as progress;
- reject candidates whose exact surface, gloss, phrase meaning, paradigm cell, or UI teaching data is missing;
- reject candidates that require unverified conjugation, tense/aspect, person, number, possession, or gender forms;
- reject candidates that would force the route into a logically incoherent question/answer/follow-up chain;
- if no growth target can be sourced for the current island, try a policy-approved neighboring island, route, or return path before emitting a blocker;
- if a candidate can be sourced but no route can materialize it with the support bundle, ownership moves to `arcCoverage`;
- if a candidate can be sourced and routed but cannot be taught/rendered, ownership moves to `metadataReadiness`, `compilerReadiness`, or `arcCoherence`.

Failure codes must be precise:

```text
coordinatorPolicy.no_memory_growth_or_refresh_candidate
metadataReadiness.no_growth_pool_for_island
metadataReadiness.growth_candidate_missing_definition
metadataReadiness.growth_candidate_missing_surface
metadataReadiness.growth_candidate_missing_teaching_metadata
metadataReadiness.growth_candidate_unverified_form
coordinatorPolicy.growth_candidate_recently_saturated
arcCoverage.no_route_for_growth_target
arcCoverage.support_growth_bundle_no_registered_route
arcCoherence.no_coherent_growth_route
compilerReadiness.growth_candidate_not_materializable
```

`coordinatorPolicy.no_memory_growth_or_refresh_candidate` is only valid after the growth source has checked metadata/curriculum pools and found no eligible source path. It is not valid when A1-ready metadata contains a usable target that the coordinator simply failed to consider.

Validation requirement:

- backend tests must seed support-only memory and prove the coordinator sources growth from metadata/curriculum;
- backend tests must prove missing definitions, surfaces, forms, route coverage, and coherence each produce the correct owner-coded blocker;
- production gateway audits must show whether growth came from memory, metadata/curriculum sourcing, refresh policy, route return, or owned blocker;
- browser/UI Start Focus validation must show either a renderable support-plus-sourced-growth lesson or a precise blocked card naming the missing owner and repair action;
- after a sourced growth target is practiced in the UI, completion evidence must write it into memory so a later lesson can treat it as proved growth, support, or refresh according to policy.

### Stage 3B: Canonical A1 Proof Contract Alignment

The lesson contract, compiler output, UI submission path, repository writes, surface-aware rollups, progress projection, and coordinator memory profile must agree on what the learner proved. The UI is not the owner of proof semantics. The UI may be an old renderer and submission surface, but it must conform to the canonical contract emitted by `learning_core`.

Observed failure that this stage must repair:

```text
lesson contract final proof target: daily.activity
actual UI completion row: daily.action.study
surface-aware rollup: daily.action.study
missing rollup: daily.activity
```

Both target ids are meaningful, but they have different roles. `daily.activity` is the canonical proof target that should affect coordinator progression. `daily.action.study` is the concrete surface/component target the learner used in that lesson. The system must record both when both are true, and it must never allow the concrete target to replace the canonical proof target.

Inputs:

- selected A1 arc thread;
- `MasteryLessonSelectionSignature.finalProofTargetIds`;
- `FocusLessonPlan.finalConversationReturnTargetIds`;
- bound final-conversation stage `memoryTargets`;
- plan `memoryWriteRequirements`;
- stage `memoryEvidenceProduced`;
- final-conversation typing boxes and learner cue metadata;
- UI/controller `FocusSequenceSubmission`;
- `LearningEvent.masteryEvidenceRecorded`;
- `LearnerMemoryRepository` persistence;
- surface-aware graph projection;
- progress projection and coordinator profile builders.

Output:

```text
A1LessonProofContract
```

The contract must expose:

```text
lessonId
candidateId
canonicalProofTargetIds
surfaceProofTargetIds
componentTargetIdsByCanonicalTargetId
grammarTargetIdsByCanonicalTargetId
frameTargetIdsByCanonicalTargetId
phraseTargetIdsByCanonicalTargetId
supportOnlyTargetIds
stageIdByCanonicalTargetId
boxIdsByCanonicalTargetId
evidenceKindByCanonicalTargetId
coordinatorProgressionTargetIds
progressDisplayTargetIds
trace
```

Rules:

- canonical proof targets drive coordinator progression and progress-bucket proof;
- concrete/component/surface targets record exactly what was typed or practiced;
- earlier lesson stages may write exposure, recognition, guided use, bounded typing, misses, reveals, and partial production, but only final-conversation proof writes the strongest canonical proof;
- a concrete component target may strengthen its own memory, but it must not erase or replace the canonical proof target;
- abstract canonical targets such as `daily.activity` must be written when the final proof contract says they were proved;
- concrete descendants such as `daily.action.study`, verb forms such as `verb.walk.i`, and grammar/form targets must be recorded as component, surface, grammar, phrase, or frame evidence according to the contract;
- `finalConversationReturnTargetIds`, final stage `memoryTargets`, `memoryWriteRequirements`, and final stage `memoryEvidenceProduced` must derive from the same proof contract, not from parallel local lists;
- the UI/controller path must resolve submissions against the contract and produce canonical `targetId` plus detail target arrays; it must not infer proof semantics from a UI box id alone;
- if a submitted final-conversation box cannot be mapped to a canonical proof target, the evidence is rejected with an owned `uiEvidenceLoop.proof_box_missing_contract` blocker;
- if a canonical final proof target is not present in surface-aware rollups after UI completion, the failure is `uiEvidenceLoop.canonical_proof_missing_from_rollups`, not a coordinator or route-capability failure;
- backend audit helpers must use the same contract as UI completion, not a cleaner synthetic final-proof path.

Failure codes must be precise:

```text
proofContract.final_target_mismatch
proofContract.memory_write_requirement_mismatch
proofContract.bound_stage_target_mismatch
proofContract.stage_evidence_mismatch
uiEvidenceLoop.proof_box_missing_contract
uiEvidenceLoop.canonical_proof_missing_from_event
uiEvidenceLoop.canonical_proof_missing_from_rollups
progressAlignment.canonical_proof_not_visible
coordinatorMemory.canonical_proof_not_profiled
```

Validation requirement:

- a core compiler test must prove one selected A1 lesson emits a single proof contract and all derived plan fields match it;
- a core compiler or coordinator test must prove abstract canonical and concrete component targets are preserved together for an activity lesson;
- a mobile UI/controller test must complete several Focus lessons and verify every canonical final proof target reaches target memory and surface-aware rollups;
- the same test must verify concrete component/form targets are also preserved as detail evidence;
- the next Focus start must read the canonical proof targets through the production gateway and either render a memory-led lesson or return a precise downstream blocker;
- the audit must fail if `daily.activity` is in the lesson contract but only `daily.action.study` reaches rollups.

### Stage 4: Composition Memory Index

The coordinator must project proved memory into composable semantic roles before it asks the generator for route candidates. Target ids alone are not enough; the system must know what kind of thought each known target can support.

Input:
- `A1CoordinatorMemoryProfile`;
- surface-aware memory rollups;
- route/frame metadata;
- verified form metadata;
- recent visible dialogue-shape history.

Output:

```text
A1CompositionMemoryIndex
```

Required fields:

```text
knownPredicatesByFamily
knownObjectsByFamily
knownPeopleByFamily
knownPlacesByFamily
knownTimesByFamily
knownTopicsByFamily
knownAttributesByFamily
knownConnectorsByFunction
knownReasonOrConstraintFacts
knownSequenceFacts
knownSafeReferencePatterns
knownVerifiedFormFamilies
knownDialogueShapeTargets
recentOperationHistory
recentFocusPlanHistory
recentRelationSequenceHistory
recentThoughtDepthHistory
```

The index must support cross-island composition. A learner may have learned `study`, `school`, `tomorrow`, `work`, and `because` in separate lessons; the system must be able to recognize that these can form a new integrated thought only when metadata and compatibility rules prove the combination.

Failure owner: `memoryProfile` when proved shape/role data is not projected, or `metadataReadiness` when a target lacks the metadata needed to classify it.

### Stage 5: Composition Opportunity And Operation Selection

The coordinator must decide whether the next lesson should grow vocabulary, forms, relations, or thought depth. Growth is not always a new word.

Allowed growth modes:

```text
lexical_growth
form_growth
relation_growth
composition_growth
thought_depth_growth
refresh_or_repair
```

The first implementation must support these dialogue operations:

```text
add_time
add_place
add_topic
attribute_embed
reason_constraint
contrast
sequence_two_event
need_vs_have
```

Each operation must declare:

```text
operationId
allowedFamilies
requiredKnownRoles
allowedGrowthRoles
requiredConnectors
requiredCoherenceRelations
requiredMetadataFields
maxNewLexicalItems
maxNewFormItems
learnerLoadCost
compatibleInformationFocusPlans
shapeTargetIds
```

Required route frames for the first production slice:

```text
activity.time_place
activity.time_place_reason
activity.sequence
preference.reason
preference.contrast
possession.attribute
possession.need_vs_have
person.activity_context
```

If vocabulary support is rich enough, the coordinator must consider composition/thought-depth growth before simply sourcing another noun. A lesson may be productively new even when every learner-facing word is already known.

Failure owner: `coordinatorPolicy` when the system fails to consider composition growth from available memory; `arcCoverage` when no registered route frame can express the requested operation.

### Stage 6: Semantic Compatibility And Grammar-Safety Check

Before surface generation, the system must prove selected words can coherently combine.

The semantic compatibility registry must support at least:

```text
predicate.study -> place.school
predicate.study -> topic.history
predicate.work -> time.today
predicate.work -> time.tomorrow
predicate.go -> place.school
predicate.go -> place.home
predicate.like -> preference.item
predicate.want -> preference.item
predicate.have -> possession.object
possession.object -> description.size
person.relationship -> activity.predicate
```

Unknown combinations are not allowed to pass by default. Missing compatibility is an owned blocker:

```text
metadataReadiness.semantic_compatibility_missing
```

Grammar-safety metadata must gate:
- grammatical gender and number;
- safe object/person reference patterns;
- adjective agreement surfaces;
- negation patterns;
- connector/discourse function;
- verified tense/aspect/person forms;
- article/definiteness behavior;
- route role compatibility.

The generator must not guess object pronouns, adjective agreement, or connector use. If metadata is missing, it must choose a simpler compatible candidate or return an owned blocker.

Allowed owner codes include:

```text
metadataReadiness.semantic_compatibility_missing
metadataReadiness.reference_pattern_missing
metadataReadiness.adjective_agreement_missing
metadataReadiness.connector_function_missing
metadataReadiness.negation_pattern_missing
metadataReadiness.paradigm_form_unverified
```

### Stage 7: Typed Dialogue Candidate Generation

The generator must output a typed dialogue plan before it outputs text. The typed plan is the source of truth for coherence, scoring, proof, and compiler materialization.

Each candidate must declare:

```text
candidateId
familyId
routeFrameId
arcId
rung
growthMode
operationIds
informationFocusPlanId
thoughtDepthRung
semanticFacts
supportTargetIds
growthTargetIds
refreshTargetIds
shapeTargetIds
relationSequence
surfacePatternIds
cannedPhraseIds
learnerLoadScore
requiredMetadataIds
requiredSurfaceCells
requiredCompilerStageIds
```

Each turn in the plan must declare:

```text
speaker
dialogueAct
relationId
semanticFrameId
questionFocus
answerFocus
introducedEntityIds
referencedEntityIds
subjectRef
predicateRef
objectRefs
timeRef
placeRef
topicRef
attributeRef
offeredChoiceRefs
connectorRefs
requiredPriorClaimIds
allowedAnswerRelationIds
allowedFollowupRelationIds
bridgeRelationIds
surfacePatternId
```

The existing text-first A1 arc instantiator may remain only as legacy comparison evidence. It must not be a product-runtime consumer, materializer, or fallback for these typed candidates. The route shape must be represented in typed data first, and product materialization must flow through the typed compiler/realizer boundary.

Failure owner: `arcCoverage` when the generator cannot produce a typed candidate for a registered route frame; `metadataReadiness` when the plan needs missing target metadata.

#### Typed Route Packet Contract

Reusable route capacity may be expressed as typed route packets. A route packet is not a transcript template. It is a compact, metadata-backed declaration of the route family, supported islands, required role classes, required fact relations, allowed dialogue obligations, move-template ids, surface-pattern ids, proof/writeback targets, maturity upgrades, readiness gates, and stable route fingerprints.

Route packets exist to harvest useful behavior from older arc work without bringing old arc runtime dependencies back into the product path. Product runtime must not import or instantiate the legacy arc catalog, legacy arc instantiator, bridge transcript harness, seed/routine fallback, or transcript-parsing rescue path.

Typed route packets must remain reusable:
- a packet should generalize across more than one island, predicate/entity family, or growth mode unless it is explicitly a starter bootstrap bridge;
- packet registries may store ids, compatibility requirements, and proof targets, but not complete learner-facing conversations;
- the move realizer and compiler are responsible for turning typed move sequences into surfaces and failing closed with owned blocker codes when a safe surface is missing;
- route-packet selection must preserve visible-repeat cooldown. If two different internal packets collapse into the same learner-visible transcript, scoring must reject the later candidate with an owned blocker such as `sameVisibleTranscriptRecent`;
- route-packet reports must expose packets considered, packets selected, owned rejections, question-focus-safe turn counts, and generic prompt fallback counts.

The first production-readiness target for typed route packets is not perfect naturalness. It is enough typed route capacity for rich saved memory to produce at least six clean, non-repeating typed-composition lessons across at least five islands, with no `eh`/`emta`/`leh` generic prompt fallback and no first blocker from `arcCoherence.question_focus_unanswered`.

### Stage 7A: Dialogue Obligation And Move-Sequence Planning

Typed candidates must produce conversational paths, not isolated question/answer cards. The seeded typed generator may prove proposition coverage, surface realization, and coherence, but it is not product-shaped until it can turn the same known words into varied, contextual, multi-exchange dialogue paths.

The current implementation boundary is:

```text
seeded typed/global composition first
organic UI/backend memory writeback later
```

Seeded success proves the generator spine can work from the intended memory contract. It does not prove that normal lesson completion writes the same memory. Organic writeback must later write the same semantic roles, facts, shape memory, and surface readiness described below before the UI path can be called fully integrated.

The dialogue planner must sit between proposition construction and surface realization:

```text
proposition graph
-> dialogue obligations
-> eligible dialogue moves
-> move-sequence planner
-> move-by-move surface realizer
-> coherence/obligation validator
-> repetition and shape scoring
```

This layer must not become the old arc generator under a new name. Islands provide facts, compatibility, situation rules, and surface families. They do not provide fixed scripts such as `study_tomorrow_where_then_why`. The same global obligation and move inventory must work across daily activities, food/drink, shopping, people, movement, feelings, preferences, and repair when those islands expose compatible facts.

The planner input must include:

```text
A1PropositionGraph
A1CompositionMemoryIndex
A1IslandCompositionManifest
A1QuestionDemandContract
A1AnswerShapeSchema
A1ThoughtDepthPlanner output
recent move-sequence history
recent question-demand history
recent second-half shape fingerprints
required semantic facts and roles
verified forms and surface pattern families
coherence/situation rule readiness
```

The planner output must be typed data, not text:

```text
A1DialogueMoveSequencePlan:
  sequenceId
  candidateId
  islandId
  questionDemandId
  answerShapeId
  thoughtDepthRung
  requiredObligationIds
  moveIds
  anchorMoveIds
  answerMoveIds
  minimumExchangeCount
  propositionIdsByMoveId
  relationIdsByMoveId
  requiredSemanticRoleIds
  requiredSemanticFactIds
  requiredSurfacePatternIds
  requiredVerifiedFormIds
  forbiddenBarePromptIds
  fallbackTier
  ownerBlockerCodes
  shapeFingerprint
  naturalnessAdapterRequestPreview
```

The first global obligation set must include:

```text
ask_why_reason:
  requires anchored claim, contextual why question, reason answer, reason connector, minimum two tutor/learner exchanges

ask_where_detail:
  requires contextual place question, place-bearing answer, target claim or activity anchor

ask_when_detail:
  requires contextual time question, time-bearing answer, target claim or activity anchor

ask_choice_contrast:
  requires contrastable facts or contrastable slot values and an answer that selects, rejects, or contrasts

ask_sequence_next:
  requires two compatible event propositions and a sequence connector or ordering relation

ask_supporting_fact:
  requires a follow-up that asks for a missing support role, not a canned acknowledgement

ask_repair_request:
  requires confusion/repair state and repair action/request; short clarification moves are allowed only inside repair
```

The first global move inventory must include:

```text
ask_claim
answer_claim
ask_supporting_fact
answer_supporting_fact
ask_contextual_reason
answer_reason
ask_detail
answer_detail
ask_choice
answer_choice
ask_sequence_next
answer_sequence_next
repair_request
repair_response
confirm_or_correct
answer_confirmation_or_correction
```

Normal seeded composition must produce at least two tutor/learner exchanges unless the selected obligation explicitly marks itself as a short repair or bounded confirmation. Bare prompts such as `leh?`, `eh?`, or `feen?` are forbidden as first prompts for normal demands. A short prompt may appear only when the immediately previous turn already anchored the missing role or when the move is a repair/clarification move whose obligation allows it.

For example, a reason demand cannot realize as:

```text
tutor: leh?
learner: I study tomorrow because I work today.
```

It must instead anchor the reason demand in a proposition, such as:

```text
tutor asks a claim/detail about studying tomorrow
learner answers the claim/detail
tutor asks why the learner will study tomorrow
learner answers with the work-today reason
```

The exact wording may vary by surface family and verified forms. The obligation is the stable product behavior, not the English example.

The same proposition graph must be able to yield multiple valid move sequences when metadata permits. A `study tomorrow because work today` graph could validly select:

```text
ask_claim -> answer_claim -> ask_contextual_reason -> answer_reason
ask_when_detail -> answer_detail -> ask_contextual_reason -> answer_reason
ask_supporting_fact -> answer_supporting_fact -> ask_claim -> answer_claim_with_reason
```

The planner must score against stale move paths. If the same words return, freshness should come from a different opening move, different question demand, different second-half shape, different relation sequence, or higher thought-depth rung.

Allowed fallback tiers are:

```text
contextual_multi_exchange
simpler_contextual_multi_exchange
contextual_two_exchange
owned_blocker
```

Generic one-word prompt fallback is not a valid fallback tier outside repair. If the planner cannot create a contextual path, it must return an owner-coded blocker rather than silently producing a shallow lesson:

```text
dialogueObligation.anchor_missing
dialogueObligation.minimum_exchange_missing
dialogueObligation.bare_prompt_forbidden
dialogueMovePlanner.no_eligible_sequence
dialogueMovePlanner.stale_sequence_only
surfaceRealization.contextual_prompt_missing
metadataReadiness.verified_form_missing
arcCoherence.required_relation_missing
```

### Direct-Claim Follow-Up Opportunity Contract

Direct claims must not satisfy multi-exchange product shape by appending a generic confirmation such as:

```text
tutor: tab keda tamam?
learner: ah, tamam.
```

That exchange may exist only as an explicit bounded confirmation obligation. It is not a valid default follow-up for a normal direct claim such as `have(book)`, `like(book)`, or `have(big book)`.

The missing layer is a global `followUpOpportunity` planner between semantic memory and candidate construction:

```text
base proposition graph
+ composition memory index
+ semantic affordance registry
+ shared selection/cooldown policy
+ coherence/situation rules
+ surface/form readiness
-> ranked follow-up opportunities or owned blockers
```

The planner must use the same freshness, cooldown, mastery, support/growth, and stale-shape pressure as dialogue sequence selection. It must not simply choose the first possible follow-up. A mastered or overused predicate such as `predicate.like` remains available as support/refresh, but should be deprioritized as the main follow-up when a coherent, renderable, less-practiced alternative is available.

The first global affordance set should be small but typed:

```text
possession_to_preference:
  base: have(self, object)
  followUp: like(self, same object)
  requires: predicate.have, predicate.like, same object fact, verified forms

possession_to_use:
  base: have(self, object)
  followUp: use/read/carry/study-with same object when object metadata allows that affordance
  requires: compatible predicate, same object fact, verified forms

possession_to_attribute:
  base: have(self, object)
  followUp: attribute of same object
  requires: object attribute fact and safe adjective surface

possession_to_constraint:
  base: have(self, object + attribute)
  followUp: need/carry/store related object because of the base object/attribute
  requires: constraint relation, reason connector, compatible support object

activity_to_detail:
  base: activity predicate
  followUp: place, time, topic, person, or object detail already present in memory
  requires: answerable missing detail role and verified surface

state_to_reason_or_action:
  base: state or feeling
  followUp: compatible action/reason relation
  requires: state-to-action situation rule and verified forms
```

The system must be global. A new noun, predicate, or island becomes eligible by adding metadata and memory facts, not by adding a candidate-id branch. For any object or activity, the planner should evaluate affordance rows by role kind, relation type, required fact ids, required surface cells, and compatibility edges.

The memory contract must support object-linked facts, not only broad role presence:

```text
fact.have.self.book.big
fact.like.self.book
fact.read.self.book
fact.need.self.bag.big
fact.study.self.topic.history
```

Broad facts such as `fact.like.self.preference.item` may remain for older paths, but they cannot prove a same-object follow-up unless the planner can resolve the actual object id. If `like(book)` or `read(book)` is missing, the planner must not invent that thought.

### Follow-Up Metadata Readiness Matrix Contract

The follow-up planner must not infer global readiness from affordance ids alone. Every follow-up affordance family used in the 24-round audit must have an explicit metadata readiness row. This row proves that memory facts, role metadata, compatibility, situation logic, verified forms, surface patterns, and answer expectations all exist before the planner can select that shape.

Required row shape:

```text
A1FollowUpMetadataReadinessRow:
  rowId
  islandId
  affordanceFamilyId
  affordanceId
  basePredicateIds
  baseRoleKinds
  followUpPredicateIds
  followUpRoleKinds
  requiredSemanticFactPatterns
  requiredAnySemanticFactPatternGroups
  requiredObjectLinkedFactPatterns
  requiredCompatibilityEdgeIds
  requiredSituationRuleIds
  requiredConnectorFunctionIds
  requiredVerifiedFormIds
  requiredSurfacePatternIds
  requiredAnswerExpectationIds
  requiredQuestionDemandIds
  supportedThoughtDepthRungs
  missingOwnerCodeByRequirement
  readinessStatus: renderable | blocked
```

The first matrix must include at least these rows:

```text
shopping_possession.preference_same_object:
  family: possession_to_preference
  proves: have(object) can expand to like(same object)
  required: same-object fact, like/object compatibility, preference surface, direct preference answer expectation

shopping_possession.use_same_object:
  family: possession_to_use
  proves: have(object) can expand to read/use/carry/study-with same object when object metadata allows it
  required: same-object fact, predicate/object compatibility, use/read surface, use answer expectation

shopping_possession.constraint_reason:
  family: possession_to_constraint
  proves: have(object + attribute) can expand to need(related object) because of that object/attribute
  required: attribute fact, related-object compatibility, situation rule, reason connector, constraint surface, reason answer expectation

daily_activity.detail:
  family: activity_to_detail
  proves: activity can expand to time/place/topic detail
  required: activity detail fact, predicate/detail compatibility, detail question demand, detail surface, answer expectation

feelings_state.reason_or_action:
  family: state_to_reason_or_action
  proves: state/feeling can expand to compatible action or reason
  required: state fact, state-action situation rule, reason/action compatibility, connector when reason is used, surface, answer expectation
```

This matrix is the gate that prevents a book-only implementation. A new island should become eligible by adding rows to the matrix plus the referenced facts/forms/surfaces, not by adding planner branches. If a row is incomplete, the planner must emit the first missing owner code rather than selecting a shallow fallback.

The planner output must explain every opportunity:

```text
A1FollowUpOpportunity:
  opportunityId
  affordanceId
  metadataReadinessRowId
  baseCandidateId
  relationType
  basePropositionIds
  followUpProposition
  requiredSemanticFactIds
  requiredRoleIds
  requiredCompatibilityEdgeIds
  requiredSurfacePatternIds
  requiredVerifiedFormIds
  score
  scoreTerms
  cooldownPenaltyTerms
  ownerBlockerCodes
```

Required owner blockers:

```text
followUpOpportunity.none_available
followUpOpportunity.affordance_metadata_missing
followUpOpportunity.required_fact_missing
followUpOpportunity.same_object_fact_missing
followUpOpportunity.overused_predicate_deprioritized
followUpOpportunity.all_candidates_stale
metadataReadiness.follow_up_affordance_missing
metadataReadiness.follow_up_metadata_matrix_missing
metadataReadiness.follow_up_metadata_matrix_blocked
metadataReadiness.follow_up_compatibility_missing
metadataReadiness.follow_up_situation_rule_missing
metadataReadiness.follow_up_answer_expectation_missing
surfaceRealization.follow_up_surface_missing
arcCoherence.follow_up_relation_invalid
```

Candidate construction must treat direct claims this way:

```text
one-proposition direct claim + ranked follow-up opportunity
  -> expanded proposition graph
  -> real multi-exchange candidate

one-proposition direct claim + no follow-up opportunity
  -> one-exchange direct candidate only when explicitly allowed
  -> otherwise owned blocker

one-proposition direct claim + generic confirmation fallback
  -> invalid for selected normal multi-exchange output
```

The seeded audit for this stage must run 24 selected rounds, not only 12. It must print every selected transcript and prove:

```text
selectedTranscriptCount >= 24
representedIslands >= 6
representedQuestionDemands >= 5
representedMoveSequences >= 5
representedFollowUpAffordances >= 4
representedFollowUpAffordanceFamilies >= 3
followUpAffordanceIslands >= 2
metadataReadinessRowsRepresented >= 5
renderableMetadataReadinessRowsRepresented >= 5
objectLinkedFollowUpsSelected >= 4
sameObjectFollowUpsSelected >= 1
nonPossessionFollowUpsSelected >= 1
selectedFollowUpsMissingMetadataRows == 0
genericConfirmationFallbackCount == 0
semanticLessonRepeats == 0
repeatedExchangePairsWithinSelectedTranscripts == 0
sameMainPredicateWithinCooldown == 0 unless explicit owner
overusedPredicateChosenAsGrowth == 0 unless no alternative owner
followUpOpportunityRejectedNearRepeats is not empty
```

This is a global scaling gate, not proof that the book/possession example works. The selected or renderable inventory must prove at least three follow-up affordance families across at least two islands. It must include at least one same-object object-linked expansion, such as `have(book) -> read(book)`, and at least one non-possession expansion, such as activity detail or state-to-reason/action. If those gates fail, Task 22F remains incomplete even if direct-claim fallback removal passes.

Freshness is measured at the semantic lesson level, not only the transcript text level. A repeated proposition graph with a different move sequence is still stale and cannot count toward the selected 24-round proof. This prevents `claim_then_reason`, `detail_then_reason`, and `support_then_claim_with_reason` variants from spending the same underlying lesson multiple times.

The 24-round audit must include seeded cases for:

```text
have(book) + like(book) -> possession_to_preference
have(book) + read(book) -> possession_to_use
have(big book) + need(bag) -> possession_to_constraint
study(history/school/tomorrow) -> activity_to_detail
state/thirst/hunger/tired -> state_to_reason_or_action
have(book) only -> blocks selected multi-exchange fallback with followUpOpportunity.none_available
like(book) over-practiced + read(book) available -> read/use is preferred over like as growth
```

The AI augmenter may later improve awkward deterministic surfaces, but it must be downstream of this planner. AI may polish an approved follow-up transcript; it must not decide which follow-up fact exists, override cooldown/mastery pressure, or create object-linked facts that memory did not prove.

The seeded memory required for this stage is:

```text
semantic role memory:
  predicate, object, person, place, time, topic, attribute, state, connector

semantic fact memory:
  direct claim facts
  support/reason facts
  contrastable facts or slot values
  sequence-compatible event facts
  repair/confusion/request facts

shape memory:
  recent move-sequence ids
  recent opening move ids
  recent question-demand ids
  recent answer-shape ids
  recent second-half shape fingerprints
  recent thought-depth rungs

surface readiness memory:
  verified forms by person/tense/polarity
  safe reference patterns
  surface pattern family ids
  contextual prompt pattern ids
  connector surface ids
```

This memory may be seeded for the current generator proof. Later organic writeback must write the same contract after lesson completion. Until then, audits must separate:

```text
seededTypedStart: proves generator product shape from intended memory
organicLegacyStart: proves or blocks normal empty/startup memory path
organicTypedStart: proves UI/backend writeback has unlocked typed generation
```

The AI augmenter seam must be downstream of deterministic planning. The planner/realizer may emit an `A1NaturalnessRewriteRequest`, but runtime AI must not choose propositions, move sequences, thought-depth rung, memory, or coherence outcomes.

Request preview fields:

```text
propositionGraph
moveSequencePlan
questionDemandId
answerShapeId
learnerLevel
allowedTargetIds
allowedSurfaceForms
forbiddenTargetIds
requiredRelationIds
targetThoughtDepthRung
surfaceVariants
```

An AI augmenter may later reorder or polish an already-approved surface variant within the allowed vocabulary, forms, and relations. Its output must pass deterministic obligation, vocabulary, form, proposition, and coherence validation before it can reach a learner.

New failure owners introduced by this stage:

```text
dialogueObligation
dialogueMovePlanner
surfaceRealization
arcCoherence
metadataReadiness
memoryProfile
coordinatorPolicy
naturalnessAdapter
```

### Stage 8: Coherence Validation

Coherence must validate typed plans, not patch strings after generation. A candidate can surface only after the same validator used by audits accepts it.

The validator must prove:
- every question focus is answered by the learner response;
- follow-ups ask a missing fact, confirm an embedded fact, request a reason, introduce a contrast, continue a sequence, or ask back;
- reason requires a prior reason-bearing claim;
- sequence requires two compatible events;
- contrast requires contrastable facts;
- choice requires a selected or contrasted offered choice;
- pronoun/reference resolves to an introduced entity with metadata-approved person/gender/number;
- connector role matches the discourse function;
- canned acknowledgement such as `tamam` cannot satisfy a content question;
- evaluation answer cannot satisfy a size/time/place question.

Reject these failures:

```text
arcCoherence.answer_relation_invalid
arcCoherence.followup_relation_invalid
arcCoherence.bridge_missing
arcCoherence.choice_mismatch
arcCoherence.reason_precondition_missing
arcCoherence.sequence_precondition_missing
arcCoherence.contrast_precondition_missing
arcCoherence.topic_shift_unbridged
arcCoherence.entity_agreement_mismatch
arcCoherence.question_focus_unanswered
arcCoherence.same_route_stale_repeat
```

### Stage 9: Compiler Materialization And Shape Proof

The compiler must prove the selected dialogue plan can render the full lesson and that the planned shape reaches proof/memory.

The materialization check must verify:
- goal conversation surfaces;
- matching entries for selected lexical/form/shape targets when appropriate;
- role-building entries for required chunks and relation structure;
- bounded typing targets for learner production;
- final conversation cue text;
- definitions, phrase meanings, and connector meanings;
- exact surface/paradigm cells;
- no placeholder definitions;
- no generic fallback surfaces;
- no unverified forms;
- final proof includes canonical lexical targets and detail shape targets.

The proof contract must carry shape evidence:

```text
a1.operation.*
a1.focus.*
a1.frame.*
a1.relation.*
a1.thought.*
a1.dialogue_obligation.*
a1.move_sequence.*
```

Preferred proof mapping:
- `frameTargetIds`: route frame, relation ids, thought-depth rung, dialogue obligation id, move-sequence id;
- `scenarioTargetIds`: dialogue operation ids and information-focus id;
- `grammarTargetIds`: verified form or agreement targets;
- `phraseTargetIds`: connector/discourse phrase targets.

The UI evidence path and surface-aware evidence loader must preserve these detail targets. If a completed lesson writes only lexical targets while dropping operation/focus/relation/shape targets, the next-start selection cannot perform composition growth and the failure owner is `uiEvidenceLoop`.

Allowed owner codes include:

```text
compilerMaterialization.progression_surface_missing
compilerMaterialization.lesson_stage_missing_target
compilerMaterialization.shape_target_missing
compilerMaterialization.generic_surface_fallback
compilerMaterialization.bounded_typing_target_missing
uiEvidenceLoop.shape_target_missing_from_event
uiEvidenceLoop.shape_target_missing_from_rollups
surfaceRealization.paradigm_cell_missing
surfaceRealization.renderable_variant_missing
```

### Stage 10: Dialogue Candidate Scoring And Selection Trace

The coordinator must select the highest-scoring valid candidate after compatibility, metadata, coherence, compiler, and evidence-shape gates pass. Scoring must prefer lessons that feel productively different even when many words are reused.

Positive score terms:

```text
crossIslandComposition
thoughtDepthGrowth
newInformationFocus
newRelationSequence
sameWordsNewShape
supportGrowthBlend
visibleGrowth
underusedRouteFrame
underusedOperation
underusedDialogueObligation
underusedMoveSequence
contextualPromptUsed
minimumExchangeSatisfied
compilerPreflightPassed
coherencePassed
```

Blocking or negative score terms:

```text
coherenceInvalid
semanticCompatibilityMissing
metadataRequiredMissing
compilerPreflightFailed
sameSecondHalfShape
sameRouteFrameRecent
sameOperationRecent
sameDialogueObligationRecent
sameMoveSequenceRecent
barePromptOutsideRepair
minimumExchangeMissing
cannedPhraseOveruse
slotOnlyNovelty
learnerLoadTooHigh
repeatedSupportSurface
```

A new noun in the same stale skeleton must score lower than known support words in a new operation, focus order, relation sequence, or thought-depth rung.

The final trace must include:
- selected growth mode;
- selected operation ids;
- selected route frame;
- selected information focus plan;
- selected thought-depth rung;
- selected dialogue obligation ids;
- selected move-sequence id;
- selected move ids;
- selected fallback tier;
- selected semantic compatibility edges;
- support/growth/refresh targets;
- shape target ids;
- scoring terms;
- rejected candidates grouped by first failing owner;
- policy version and memory profile hash.

If no candidate passes, the returned blocker must name the first failing layer and the exact missing route frame, operation, compatibility edge, metadata field, coherence relation, compiler stage, or evidence path.

## Composition Engine Behavioral Contract

The composition engine must create the feeling that the learner is repeatedly unlocking new conversational paths with words they already know. It must not work by picking a static template and swapping a noun. It must build a typed semantic thought from proved memory, choose a conversational path into that thought, prove the path is plausible and renderable, and only then materialize learner-facing text.

Required candidate search order:

```text
known memory roles
-> possible semantic facts
-> possible micro-situations
-> possible dialogue operations
-> possible information-focus plans
-> possible thought-depth rungs
-> semantic compatibility and grammar-safety gates
-> typed coherence gate
-> compiler/materialization gate
-> candidate scoring
```

The search must be bounded and deterministic. It must cap candidate count by policy, prefer higher-value memory roles first, and record every pruned layer in the trace. If a learner knows many words, the system should produce more possible candidates, not become random or incoherent.

### Audit-First Growth And Capacity Contract

Typed composition must not keep expanding by assumption. Before adding route packets, growth policies, or new realization paths, the product must audit whether the current system is blocked by missing capacity, over-strict validation, missing metadata/forms, insufficient memory projection, weak scoring, or poor surface quality. The audit must produce actionable owners before implementation begins.

The audit must distinguish these failure modes:

```text
not_enough_usable_candidates
capacity_exists_but_not_selected
capacity_exists_but_not_compilable
capacity_exists_but_visible_repeat
growth_axis_ready_but_no_route_capacity
growth_axis_selected_but_unrenderable
route_outputs_many_lessons_but_shallow
memory_write_not_consumed_by_next_lesson
coherence_or_proof_rules_overconstrain
quality_rules_too_weak_to_stop_slot_swaps
```

Every failure mode must map to a concrete next action:

```text
routeCapacity.* -> add or generalize typed route packets / move sequences
metadataReadiness.* -> add metadata, role pools, compatibility, or verified forms
compiler.* -> add typed realizer/compiler support or fail closed earlier
coherence.* / arcCoherence.* -> adjust typed coherence, answer-demand rules, or bridge requirements
sameVisibleTranscriptRecent -> add learner-visible route alternatives or route-capacity-aware fallback
growthController.* -> adjust pressure, cooldown, readiness, or capacity scoring
memoryProjection.* -> fix write/read projection before adding more candidates
qualityExpansion.* -> add expansion metrics or quality blockers before accepting more output
```

The growth controller must choose an axis together with renderable candidate capacity, not as an abstract goal. A growth axis is selectable only when at least one candidate for that axis can pass metadata, route capacity, coherence, compiler, proof-burden, and recent-history gates. The controller may prefer an axis, but the generator must be able to degrade intentionally:

```text
preferred thought-depth
-> relation/composition if thought-depth has no renderable candidates
-> form growth if verified forms are available and route capacity is sufficient
-> lexical/contextual bootstrap when advanced axes are blocked
-> owned blocker only when no safe teaching route exists
```

The controller must use pressure and cooldown rather than a fixed rotation. Each axis can build pressure from memory state, target priority, weakness/staleness, unused forms, unused connectors, route capacity, and recent under-use. After an axis is selected, that axis receives a temporary cooldown so the learner sees varied growth. The controller trace must show the per-axis score, readiness, valid candidate count, selected candidate, and blocked alternatives.

The product must measure expansion quality, not only lesson count. A backend run that completes many lessons still fails the product contract if it stays in shallow slot-swaps. Product-shaped audits must track:

```text
completed lesson count
first blocker owner
first thought-depth lesson
growth axis distribution
unique route packet families
unique question demands
unique move sequences
unique relation types
unique thought-depth rungs
verified form/pronoun/tense/polarity coverage
connector usage
visible transcript repeats
generic prompt fallback count
route family dominance
memory writes consumed by later lessons
```

The intended improvement target for the next deterministic phase is continuous, expanding output: the brand-new learner backend audit should continue beyond the current visible-repeat ceiling while showing lexical breadth, relation variety, form coverage, thought-depth growth, route diversity, and memory-led progression. The target is not infinite lesson count alone.

### Semantic Fact Contract

The engine must distinguish a known word from a known fact. A learner may know `study`, `school`, `tomorrow`, `work`, `today`, and `because`, but the engine still needs typed facts before it can compose them.

Required fact fields:

```text
factId
predicateRef
subjectRef
objectRefs
timeRef
placeRef
topicRef
attributeRef
polarity
certainty
sourceTargetIds
requiredFormIds
requiredSurfacePatternIds
```

Example derived facts:

```text
fact.study.self
fact.study.self.place.school
fact.study.self.time.tomorrow
fact.work.self.time.today
```

The engine may compose a larger thought such as `I study tomorrow at school because I work today` only when the source facts, connector function, route frame, surface patterns, and coherence preconditions are all present.

### Thought-Depth Ladder

Thought depth must be a typed ladder, not a vague score.

```text
depth_0_label_or_fragment
depth_1_direct_clause
depth_2_clause_with_detail
depth_3_clause_with_time_place_topic
depth_4_reason_or_constraint
depth_5_contrast
depth_6_two_event_sequence
depth_7_multi_sentence_connected_answer
```

Depth progression rules:
- `depth_0` and `depth_1` can introduce early vocabulary and direct answers.
- `depth_2` adds one attribute, object detail, or role detail.
- `depth_3` combines a direct clause with time, place, or topic.
- `depth_4` requires a reason or constraint connector and a prior compatible claim.
- `depth_5` requires contrastable facts.
- `depth_6` requires two compatible event facts and a sequence connector or sequence surface pattern.
- `depth_7` requires at least two coherent sentence-level facts, a discourse relation between them, and answer validation that can accept a connected response.

When memory concentration is high enough, the coordinator must allow `composition_growth` or `thought_depth_growth` even if no new lexical target is introduced. A learner can grow by saying a longer, more thoughtful thing with known words.

### Information-Focus Inventory

Information focus is the main mechanism for making the same semantic material feel different. The same composed thought must be reachable through multiple focus plans.

Required first-slice focus plans:

```text
focus.when
focus.where
focus.what_topic
focus.why_reason
focus.confirm_time
focus.confirm_place
focus.confirm_topic
focus.choice_attribute
focus.contrast_choice
focus.sequence_next
focus.ask_back
```

Each focus plan must declare:

```text
focusPlanId
questionFocusRole
answerFocusRole
requiredKnownRoles
allowedGrowthRoles
compatibleOperations
compatibleThoughtDepthRungs
requiredRelationIds
forbiddenRecentFocusWindow
surfacePatternFamilies
shapeTargetIds
```

Example: the thought `I will study tomorrow at school` can enter through `focus.when`, `focus.where`, `focus.confirm_time`, or `focus.confirm_place`. Returning to the same cluster should prefer a different focus plan when coherence and learner load allow it.

### Micro-Situation Graph

Semantic compatibility edges prove that roles can combine. Micro-situations prove that the combination forms a small plausible scene.

Required first-slice micro-situations:

```text
micro.activity.study_at_school
micro.activity.study_topic_at_school
micro.activity.work_today_study_tomorrow
micro.activity.go_home_after_school
micro.preference.like_item_with_reason
micro.preference.contrast_two_items
micro.possession.have_object_with_attribute
micro.possession.need_object_because_constraint
micro.person.person_does_activity
```

Each micro-situation must declare:

```text
microSituationId
requiredSemanticFacts
optionalSemanticFacts
requiredKnownRoles
allowedGrowthRoles
compatibleOperations
allowedInformationFocusPlans
allowedThoughtDepthRungs
requiredConnectors
semanticCompatibilityEdges
grammarSafetyRequirements
surfacePatternFamilies
blockedWhenMissingMetadata
shapeTargetIds
```

Micro-situations are not hard-coded lesson scripts. They are typed plausibility contracts that let separately learned pieces combine into a new thought when memory makes the pieces available.

### Practiced Fact And Shape Memory

The memory profile must preserve enough detail for later composition. In addition to lexical and form targets, it must track:

```text
practicedSemanticFactIds
practicedMicroSituationIds
practicedOperationIds
practicedInformationFocusPlanIds
practicedRelationSequenceIds
practicedThoughtDepthRungs
recentSecondHalfShapeFingerprints
recentSurfacePatternFamilies
```

This memory should answer product questions such as:
- Which facts can the learner already express directly?
- Which facts have never been combined before?
- Which operation/focus/relation shapes have been overused recently?
- Is the learner ready for longer thought growth instead of another new noun?

If UI completion drops practiced fact or shape evidence, the next lesson cannot select fresh composition reliably and the failure owner is `uiEvidenceLoop`.

### Candidate Repair Ladder

A rich candidate that almost works should simplify deterministically before the system gives up or returns to a stale shell.

Required repair order:

```text
remove_unsafe_reference
use_explicit_noun_reference
simplify_thought_depth
change_information_focus
remove_optional_reason_or_contrast
swap_compatible_time_place_or_topic
change_dialogue_operation
change_route_frame
return_owned_blocker
```

Every repair attempt must preserve trace evidence:

```text
repairActionId
sourceCandidateId
failedOwnerCode
removedRoleIds
replacementRoleIds
resultCandidateId
resultOwnerCode
```

The repair ladder must not hide missing metadata by silently generating guessed language. For example, missing object reference metadata should first remove the pronoun and use an explicit noun; if explicit noun rendering is unavailable, it should simplify or block.

### Freshness Thresholds

The audit and scorer must enforce measurable freshness, not only subjective variety.

Required first-slice thresholds:

```text
maxSameSecondHalfShapeWindow = 3
minDistinctOperationsPerFiveValidStarts = 2
minDistinctInformationFocusPlansPerFiveValidStarts = 2
minDistinctRelationSequencesPerFiveValidStarts = 2
compositionGrowthAfterKnownRoleConcentration = required_if_available
sameRouteRequiresShapeChange = true
knownWordsNewShapeBeatsNewNounStaleShell = true
```

Allowed owner-coded exceptions:

```text
arcCoverage.operation_inventory_too_small
arcCoverage.focus_inventory_too_small
arcCoverage.relation_sequence_inventory_too_small
metadataReadiness.semantic_compatibility_missing
metadataReadiness.surface_pattern_missing
arcCoherence.no_coherent_repair_candidate
compilerMaterialization.shape_target_missing
```

### Surface Pattern Inventory

Typed candidates must render through verified surface patterns. The system must not free-compose Arabic strings from abstract roles.

Each surface pattern must declare:

```text
surfacePatternId
operationId
informationFocusPlanId
thoughtDepthRung
requiredRoleRefs
requiredFormIds
requiredConnectorIds
requiredAgreementFeatures
acceptedLearnerAliasGroups
renderableExampleIds
blockedMetadataCodes
```

Required first-slice pattern families:

```text
pattern.activity.when_answer_time_place
pattern.activity.where_answer_place_time
pattern.activity.confirm_time_negative_corrected_time
pattern.activity.reason_constraint
pattern.activity.sequence_two_event
pattern.preference.reason
pattern.preference.contrast
pattern.possession.attribute
pattern.possession.need_because_constraint
pattern.person.activity_context
```

If a typed candidate has no verified surface pattern, the owner is `surfaceRealization.renderable_variant_missing` or `metadataReadiness.surface_pattern_missing`.

### Answer Expectation Contract

Longer generated answers require richer validation. Every learner-facing prompt must declare what kind of answer can satisfy it.

Required fields:

```text
answerExpectationId
expectedAnswerRelation
requiredSemanticFactIds
optionalSemanticFactIds
requiredRoleRefs
allowedShortAnswerRoles
requiredConnectorIds
acceptedAliasGroups
rejectCannedAckOnly
rejectEvaluationOnly
minimumThoughtDepthRung
```

Examples:
- a `why` prompt requires a reason relation and cannot be satisfied by `tamam`;
- a `where` prompt requires a place role and cannot be satisfied by only `yes`;
- a `confirm_time` prompt may accept a short correction such as `tomorrow` when the expected time role is present;
- a `depth_7` prompt must validate at least two semantic facts and their discourse relation.

### Global Proposition-First Composition Contract

The deterministic composition system must be global by construction. It must not become a growing list of examples such as `where_will_you_study`, `do_you_like_meat`, or `need_book_because_space`. Those examples may remain golden fixtures, but the production generator must create them from shared contracts:

```text
semantic memory inventory
-> proposition graph
-> island composition manifest
-> global operation schema
-> question demand contract
-> thought-depth planner
-> coherent candidate factory
-> surface pattern realizer
-> typed coherence confirmation
-> scoring and coordinator selection
```

If adding a new noun, food, drink, place, person, object, feeling, activity, or connector requires editing the generator branch list, the implementation has failed the globality contract. Adding vocabulary should usually mean adding metadata rows, verified forms/surfaces, slot-family membership, and small reusable compatibility/coherence relations. Adding code should be reserved for new global operations, new answer-shape schemas, new thought-depth rungs, or new audit infrastructure.

The generator must build meaning before text. A candidate plan must contain proposition-level data such as:

```text
candidatePlanId
islandId
targetThoughtDepthRung
questionDemandId
propositions:
  - propositionId
  - predicateRef
  - subjectRef
  - objectRefs
  - timeRef
  - placeRef
  - topicRef
  - attributeRefs
  - stateRefs
  - polarity
  - sourceFactIds
relations:
  - relationId
  - sourcePropositionId
  - targetPropositionId
  - relationType
  - requiredConnectorFunction
surfacePlan:
  - surfacePatternFamilyId
  - requiredVerifiedFormIds
  - allowedAliasGroupIds
```

Surface text is a rendering of the proposition plan, not the source of truth. The typed coherence validator confirms that the plan is still valid after realization, but coherence must be created during proposition construction. Repair and downgrade are safety rails, not the main strategy.

### Island Composition Manifest Contract

Every production A1 island must declare an `A1IslandCompositionManifest`. The manifest makes global operations concrete inside an island without turning the island into a script.

Required fields:

```text
islandId
familyIds
slotPoolIds
semanticRoleRequirements
compatiblePredicateFamilies
compatibleObjectFamilies
compatiblePlaceFamilies
compatibleTimeFamilies
compatiblePersonFamilies
compatibleStateFamilies
allowedOperationIds
allowedQuestionDemandIds
allowedThoughtDepthRungs
routeFrameIds
surfacePatternFamilyIds
coherenceRelationIds
situationRuleIds
metadataRequirementIds
minimumRotationCoverage
```

The first production manifests must cover at least these islands:

```text
daily_activities
food_and_drink
preferences_opinions
shopping_possessions
people_relationships
movement_places
feelings_states
conversation_repair
```

Each manifest must prove that the same global operation can work in multiple islands. For example, `ask_why` must be able to target food/drink desire, shopping need, people state/activity, feelings state, and movement/activity when each island has compatible facts and connector metadata. `ask_where` must work for study, eating/drinking, shopping, people location, and movement only when place-compatible predicates and surface patterns exist.

### Question Demand And Thought Growth Contract

Complex answers are unlocked by questions that demand a larger answer shape. The system must not wait for complexity to emerge from a simple prompt. A lesson targeting a higher rung must select a question demand that requires the intended proposition structure.

Question demand examples:

```text
ask_what_direct:
  requires: direct claim
ask_where_detail:
  requires: claim + place
ask_when_detail:
  requires: claim + time
ask_what_topic:
  requires: claim + topic/object
ask_why_reason:
  requires: claim + reason proposition + reason connector
ask_choice_contrast:
  requires: contrastable facts or contrastable slot values
ask_confirm_or_correct:
  requires: confirmation or correction role
ask_sequence_next:
  requires: two compatible event propositions
ask_repair_request:
  requires: repair state + repair action or request
```

The thought-depth planner must use memory concentration, recent success, connector availability, verified forms, and coherence readiness to select a stretch rung. Growth may be lexical, compositional, or thought-depth based. Once a learner has enough known roles in an island, the scorer must consider larger thought shapes even when no new word is introduced.

Example global rung progressions:

```text
food_and_drink:
depth_1: I want tea.
depth_2: I want hot tea.
depth_3: I want tea now at the cafe.
depth_4: I want tea now because I am thirsty.
depth_5: I do not want coffee. I want tea because I am thirsty.

shopping_possessions:
depth_1: I need a bag.
depth_2: I need a big bag.
depth_3: I need a big bag for the book.
depth_4: I need a big bag because I have a big book.
depth_5: I do not need a small bag. I need a big bag because I have a big book.

people_relationships:
depth_1: My brother works.
depth_2: My brother works today.
depth_3: My brother works at home today.
depth_4: My brother is at home because he is tired.
depth_5: He is not working today. He is at home because he is tired.

movement_places:
depth_1: I go home.
depth_2: I go home today.
depth_3: I go home after school.
depth_4: I go home because I work tomorrow.
depth_6: I go to school, then I go home.

feelings_states:
depth_1: I am tired.
depth_2: I am tired today.
depth_3: I am tired after work.
depth_4: I am tired because I worked today.
depth_5: I am not sick. I am tired because I worked today.
depth_7: I am tired because I worked today. I want to go home now.

conversation_repair:
depth_1: I do not understand.
depth_2: I do not understand now.
depth_4: I do not understand because it is hard.
depth_5: I do not understand, but I want to try again.
depth_7: I do not understand because it is hard. Please say it again slowly.
```

These examples are acceptance examples, not hard-coded tracks. The audit should include them as seeded fixtures and also prove that nearby vocabulary can use the same operation/focus/rung path without generator edits.

### Coherence By Construction

Coherence must be first class in the generator. The system must not depend on frequent downgrade to produce safe lessons. The candidate factory must consult compatibility, situation, discourse, answer-shape, and surface-safety rules before it emits a candidate.

Required coherence layers:

```text
slotCompatibility:
  verifies predicate/object/place/time/topic/person/state roles can combine
situationLogic:
  verifies reusable real-world support relations, such as thirsty -> drink, hungry -> food, big object -> big container
discourseRelation:
  verifies the question demand is answered and follow-up depends on prior claim
thoughtRungFit:
  verifies the answer contains the proposition count and relation demanded by the target rung
grammarSurfaceSafety:
  verifies reference, agreement, negation, connector, and verb form metadata before surface realization
```

The validator still matters, but it is confirmation and defense. It must not be the first place coherence is attempted. Repair and downgrade must be tracked as health metrics:

```text
coherenceFirstPassTarget = high
repairAllowed = true
downgradeAllowed = true
downgradeCommonPath = failing_product_signal
legacyFallbackAllowedForStarter = true
legacyFallbackAllowedAfterTypedEligibility = only_with_owned_blocker
```

If a 12+ lesson seeded audit shows repeated downgrade because rich candidates are incoherent, the first failing owner is not "product acceptable downgrade." It must be one of:

```text
arcCoherence.situation_rule_missing
arcCoherence.discourse_relation_missing
metadataReadiness.semantic_compatibility_missing
metadataReadiness.surface_pattern_missing
metadataReadiness.verified_form_missing
arcCoverage.global_operation_inventory_too_small
surfaceRealization.renderable_variant_missing
```

### Metadata Boundary

Metadata must not become an infinite encyclopedia. The product needs reusable constraints, not a handcrafted world model for every possible story.

Metadata should cover:

```text
semantic class and role
slot pool membership
compatible predicate/frame families
safe reference and agreement features
verified forms and surfaces
connector function
high-value situation relations
substitution and contrast families
learner utility ranking
```

Metadata should not try to cover:

```text
every possible reason a learner might do something
all real-world object containment cases
all social interpretations of a sentence
one-off stories for every noun or person
runtime naturalness judgment
```

When metadata cannot prove a rich relation, the deterministic system should choose a simpler coherent proposition, not invent a plausible story.

### AI Insertion Points

The deterministic system must work without runtime AI. AI may be added later only as an assistant around the spine:

```text
offlineAuthoringAssistant:
  proposes metadata tags, island manifests, situation rules, surface patterns, negative fixtures
auditJudge:
  reviews printed 12+ lesson transcripts for naturalness, repetition, level fit, and awkward logic
naturalnessRewriteAdapter:
  rewrites an already-approved proposition plan into more natural A1/A2 surface variants
```

Runtime AI must not own memory projection, typed eligibility, proposition selection, thought-depth planning, scoring, or coherence gates. If used for naturalness later, it receives a constrained proposition plan, learner level, allowed vocabulary/forms, forbidden vocabulary, and target answer shape. Its output must pass deterministic validation before it can reach the learner.

Example allowed future use:

```text
deterministic plan:
  intent = repair/confusion
  proposition = learner does not understand
  target relation = repair_request
  allowed words = understand, again, slowly, please

AI may propose:
  I do not understand. Please say it again slowly.

Validator must prove:
  allowed vocabulary only
  target rung preserved
  repair request relation present
  no unsupported grammar
```

### Product Shape Risk Gates

The global composition work is not complete because named components exist. It is complete only when the product-shape risk gates prove the components interact correctly. Every implementation slice in the global composition phase must report these gates before the next slice begins:

```text
memoryProjectionGate
seededVsOrganicGate
globalityGate
surfaceBottleneckGate
coherenceTooStrictGate
coherenceTooLooseGate
scoringRepetitionGate
thoughtDepthProgressionGate
metadataIslandReadinessGate
fallbackMaskingGate
dialogueObligationGate
moveSequenceDiversityGate
contextualPromptGate
seededMemoryContractGate
naturalnessSeamGate
```

Each gate must report:

```text
gateId
status: pass | warning | fail | not_measured
firstFailingLayer
ownerCode
evidence
requiredNextAction
blockingForTasks
printedAuditSection
```

Gate definitions:

```text
memoryProjectionGate:
  fails when completed lessons do not expose projected semantic roles and facts.

seededVsOrganicGate:
  fails when seeded typed memory works but organic backend/UI memory still selects only legacy without an exact starter/eligibility owner.

globalityGate:
  fails when adding a metadata-only noun, food, drink, place, state, person, or object does not change candidate coverage unless generator code changes.

surfaceBottleneckGate:
  fails when proposition plans exist but renderable surface plans collapse to a small repeated set.

coherenceTooStrictGate:
  fails when rich candidates usually downgrade or block despite having compatible memory.

coherenceTooLooseGate:
  fails when situation-incoherent candidates pass, such as size/reason mismatch, reason without claim, contrast without contrastable facts, or repair flow with awkward unrelated conjunctions.

scoringRepetitionGate:
  fails when valid candidates exist but selection repeats operation, question demand, relation sequence, second-half shape, or thought rung beyond freshness thresholds.

thoughtDepthProgressionGate:
  fails when the system keeps adding lexical items while known-word thought-depth opportunities are available.

metadataIslandReadinessGate:
  fails when the global engine mostly selects one or two islands because other production islands lack manifest, metadata, form, surface, or situation-rule readiness.

fallbackMaskingGate:
  fails when legacy fallback hides typed-generation failures after typed eligibility should require an owned typed attempt.

dialogueObligationGate:
  fails when normal selected candidates do not satisfy anchoring, required answer roles, required relations, or minimum exchange count.

moveSequenceDiversityGate:
  fails when valid alternatives exist but selection repeats opening move, question demand, second-half shape, or move-sequence id beyond freshness policy.

contextualPromptGate:
  fails when normal first prompts use bare generic prompts or when contextual prompt patterns are missing without owner blockers.

seededMemoryContractGate:
  warns when seeded memory contains fields that organic writeback does not yet write; fails when seeded generator proof omits required semantic role, fact, shape, or surface-readiness fields.

naturalnessSeamGate:
  fails when the AI augmenter request lacks typed constraints needed to safely rewrite later.
```

The risk gate audit is allowed to pass while reporting `warning` or `not_measured` during early slices, but a later task may not claim product readiness while any gate required by that task is `fail` or unowned. Seeded and organic results must always be separated. A seeded pass is not evidence that UI writeback works. An organic legacy pass is not evidence that the typed system works.

## Same-Route Return Contract

A route may return when it is pedagogically useful. It must be classified before selection by route frame, operation, information focus, relation sequence, and thought-depth rung:

```text
same_route_productive_return
same_route_refresh
same_route_stale_repeat
same_route_surface_only_variation
same_route_operation_growth
same_route_focus_reorder
same_route_relation_growth
same_route_thought_depth_growth
```

`same_route_productive_return` requires at least one of:

- context changed with a meaningful role, such as location, time, person, setting, topic, reason, contrast, or purpose;
- known support targets are reused in a new operation, information-focus order, relation sequence, or thought-depth rung;
- route adds a detail, adjective, intensifier, reason, contrast, choice, connector, sequence, ask-back, or multi-sentence learner thought;
- pronoun/tense/form changes are the explicit primary upgrade axis and exact cells are ready;
- prior route was weak and current lesson is marked refresh.

`same_route_surface_only_variation` occurs when the lesson changes only a noun, pronoun, time word, or surface filler without a declared route-return purpose. This must not satisfy productive diversity. A candidate that repeats the same second-half relation shape, such as a fixed generic follow-up after every new opener, must classify as stale even if the first turn changes.

## No Fallback Dependency Gate

The implementation is not complete if the system only avoids exact repetition by cycling through a tiny set of barely viable routes.

The audit must prove:

- production A1 islands have enough route/rung coverage to avoid one-route loops;
- the coordinator can find productive alternatives from memory, not random fallbacks;
- owned blockers are rare diagnostics, not the common path;
- an island with insufficient route coverage is marked `not_production_ready_for_rotation`;
- normal Focus does not hide route scarcity behind all-growth island hopping.

## Coverage Readiness Contract

Every production A1 island must advertise a minimum viable progression map.

Required for each production-ready island:

- at least one `first_contact` route;
- at least one `revisit_support` route;
- at least one `slot_variation` or `context_variation` route;
- at least one support-growth blend shape;
- at least one refresh/review path;
- at least two compatible dialogue operations from the first production slice;
- at least two information-focus plans that can reorder question/answer emphasis without breaking semantics;
- at least one relation-growth or thought-depth route where lexical growth is optional;
- route metadata for question-answer relation and follow-up relation;
- semantic compatibility edges for the advertised route frame;
- required metadata and surface cells;
- learner-facing examples used only for audit/materialization, not as hard-coded lesson tracks.

High-priority islands should also support at least one of:

- detail/adjective;
- choice;
- reason;
- contrast;
- time/location context;
- connector/sequence;
- ask-back;
- multi-sentence learner response.

If an island cannot meet the minimum map, it remains usable only as first-contact or explicit refresh until coverage is added.

## Metadata Readiness Contract

The metadata layer must make route growth possible. It must provide:

- reviewed learner-facing meanings for all production-selectable words and phrases;
- utility tier and score breakdown;
- slot family and substitution family;
- concept aliases separated from surface/form mastery;
- article/form requirements;
- phrase/component relationships;
- route role compatibility;
- paradigm id and exact renderable cells for inflectable predicates;
- accepted variants and whether each variant is renderable or input-only;
- bridge metadata for topic shifts;
- follow-up precondition metadata for reason, choice, detail, contrast, and sequence routes;
- semantic role classification for predicate, object, person, place, time, topic, attribute, connector, and discourse function;
- semantic compatibility edges for production-selectable role combinations;
- grammatical gender/number metadata where reference or agreement could be generated;
- safe reference-pattern metadata for person/object references;
- adjective agreement metadata;
- negation metadata by route frame and verified form;
- connector function metadata for reason, contrast, sequence, condition, and repair;
- information-focus compatibility metadata.

The audit must identify metadata gaps with exact ids and route effects. A vague "metadata missing" finding is not sufficient.

## Global Policy And Shared Upgrade Contract

The next implementation must create shared places to adjust coordinator and generator behavior. The goal is not to make everything configurable for its own sake. The goal is to make future iteration safe, discoverable, and global.

Shared behavior must live in one of these forms whenever practical:

- typed policy bundles for thresholds, ratios, cooldowns, scoring weights, route-return rules, information-focus rotation, operation rotation, and thought-depth progression;
- typed capability registries for island, route, rung, route frame, dialogue operation, information focus, micro-situation, surface pattern, answer expectation, upgrade-axis, and generator support;
- metadata registries for slot families, substitution families, utility tiers, phrase relationships, semantic compatibility, safe reference patterns, bridge rules, and surface/paradigm cells;
- candidate search and repair policies for bounded enumeration, simplification, and owned blockers;
- compiler/materialization preflight helpers shared by backend tests, UI gateway tests, and audits;
- audit scripts or harnesses that read the same policies and registries used by production selection;
- stable owner codes and repair recommendation enums shared across coordinator, generator, compiler, and audit reporting.

The implementation must avoid:

- coordinator-only constants that duplicate policy bundle values;
- generator route assumptions not represented in the capability map;
- metadata readiness checks that differ between audit and production paths;
- one-off route fixes that cannot be discovered by the island coverage audit;
- test-only behavior that proves a path not available to normal Focus;
- hard-coded examples that become hidden lesson tracks.

Required shared update surfaces:

```text
Coordinator progression policy
Island/route/rung capability registry
Composition memory index
Semantic compatibility registry
Dialogue operation registry
Route frame registry
Information-focus policy
Micro-situation registry
Candidate search and repair policy
Surface pattern inventory
Answer expectation contract
Dialogue candidate scoring policy
Upgrade-axis registry
Support/growth/refresh role policy
Route-return classification policy
Coherence relation registry
Metadata readiness audit registry
Compiler preflight materialization helper
Route materialization proof helper
Shape-target proof/evidence mapping helper
Blocker owner-code and repair-action registry
Product progression audit harness
```

Each shared surface must expose:

- stable id and version where policy-sensitive;
- schema validation or audit validation;
- production consumer;
- test/audit consumer;
- examples of a behavior change that should be possible through this surface;
- failure mode when the shared surface is missing or invalid.

Examples:

- changing same-route cooldown should update `RouteReturnPolicy`, not scattered coordinator branches;
- adding `preference.location_context` should update the route frame registry, semantic compatibility registry, metadata readiness registry, and coherence relation registry;
- changing support/growth targets for revisits should update coordinator progression policy and be visible in candidate scoring traces;
- adding a new reason-follow-up route should add an operation row, route-frame row, compatibility edges, bridge/follow-up metadata, compiler preflight expectations, shape-target proof ids, and audit coverage in one discoverable path.

The plan must include a shared-surface audit before broad implementation. That audit must list current hard-coded or scattered behavior and decide whether each item should be moved into a policy, registry, shared helper, or left local with a written reason.

## Blocker Remediation Contract

Every owned blocker must include:

```text
owner
code
islandId
routeId
routeFrameId
rung
primaryUpgradeAxis
growthMode
operationIds
informationFocusPlanId
thoughtDepthRung
semanticFactIds
microSituationIds
supportTargetIds
growthTargetIds
refreshTargetIds
shapeTargetIds
missingCapability
missingMetadataIds
missingCompatibilityEdges
missingMicroSituationIds
missingSurfacePatternIds
missingAnswerExpectationIds
missingSurfaceCells
coherenceFailure
scoringFailure
recentRouteHistory
recentOperationHistory
recentFocusPlanHistory
recentSecondHalfShapeFingerprints
candidateCountBeforeFiltering
candidateCountAfterFiltering
recommendedRepair
testToUnlock
```

`recommendedRepair` must be concrete. Acceptable examples:

```text
add_route_capability: preference.reason_followup
add_route_capability: possession.choice_detail
add_surface_cell: predicate.study.future.first_person_singular
add_support_role_mapping: possessions.object_as_support
add_growth_slot_family: school.objects.core
add_arc_bridge: possession_question_to_reason_followup
add_metadata: phrase.good_luck.meaning
increase_metadata_coverage: descriptions.detail_routes
relax_policy: same_route_cooldown_after_productive_expansion
```

Audit reports must aggregate blockers into a remediation backlog:

```text
code
owner
frequency
islandsAffected
routesAffected
rootCause
recommendedRepair
implementationScope
specSection
planTask
testToUnlock
status
```

## System Maturity Assessment

The audit must grade each layer so planning knows what needs small refinement versus serious architecture work.

Layers:

```text
memoryProfile
coordinatorPolicy
arcGeneratorCoverage
metadataReadiness
compilerMaterialization
arcCoherence
productDiversity
uiEvidenceLoop
progressAlignment
```

Allowed maturity ratings:

```text
ready
minor_contract_gap
needs_targeted_remediation
underdeveloped
requires_rearchitecture
unknown_until_subaudit
```

Each layer assessment must include:

- evidence;
- distance from target;
- implementation scope: `small`, `medium`, `large`, or `unknown_until_subaudit`;
- risk if ignored;
- next repair action;
- test that proves the repair worked.

Expected initial hypothesis:

- `memoryProfile`: likely `minor_contract_gap` or `needs_targeted_remediation`;
- `coordinatorPolicy`: likely `underdeveloped`;
- `arcGeneratorCoverage`: likely `unknown_until_subaudit` or `underdeveloped`;
- `metadataReadiness`: likely `needs_targeted_remediation`;
- `compilerMaterialization`: likely `needs_targeted_remediation`;
- `arcCoherence`: likely `underdeveloped`;
- `productDiversity`: likely `needs_targeted_remediation`;
- `uiEvidenceLoop`: likely `minor_contract_gap`;
- `progressAlignment`: likely `minor_contract_gap`.

The audit must confirm or revise this hypothesis with evidence.

## Required Audit Phase Before Broad Implementation

The implementation plan must start with audits, then update this spec and the plan before broad remediation. The audit is not a passive note. It must produce the actionable backlog that drives the next tasks.

### Audit 1: Memory Profile Consumption Audit

Seed memory profiles and verify coordinator-facing output.

Cases:

- blank memory;
- one-session saturated word;
- stable support words in one island;
- thin slot family needing high-utility vocabulary;
- strong preference frame but weak location context;
- stable possession frame with object vocabulary ready for adjective/detail;
- recent route overuse;
- refresh target after miss/reveal;
- stable connector readiness;
- weak paradigm cell.

Output:

- profile fields present/missing;
- whether coordinator can consume them;
- missing profile contracts;
- maturity rating for `memoryProfile`.

### Audit 2: Coordinator Decision Audit

Feed seeded profiles into the coordinator without relying on UI.

Verify:

- selected learning pressure matches memory;
- target bundle contains support/growth/refresh roles;
- support candidates become support, not repeated primary focus;
- high-utility growth beats niche growth when memory need is equal;
- route cooldown affects selection;
- same-route return is classified;
- all rejected candidates have owner codes.

Output:

- selected decision rows;
- rejected decision rows;
- scoring trace gaps;
- maturity rating for `coordinatorPolicy`.

### Audit 3: Arc Generator Capability Audit

Inventory production A1 islands and routes.

For each island, record:

- supported rungs;
- supported upgrade axes;
- route count;
- support-growth blend support;
- follow-up support;
- choice/reason/detail/sequence/ask-back support;
- required metadata;
- materializable examples;
- coverage readiness status.

Output:

- `production_ready_for_rotation`;
- `first_contact_only`;
- `refresh_only`;
- `not_production_ready_for_rotation`;
- blocker rows for missing routes/rungs.

### Audit 4: Metadata And Surface Readiness Audit

For each route/rung candidate, verify required metadata and surfaces.

Record:

- missing definitions;
- placeholder meanings;
- phrase/component gaps;
- missing paradigm cells;
- renderable variant gaps;
- missing slot-family metadata;
- missing bridge/follow-up preconditions;
- utility scoring gaps.

Output:

- exact metadata ids to repair;
- exact surface cells to add;
- candidate routes blocked by metadata;
- maturity rating for `metadataReadiness` and `compilerMaterialization`.

### Audit 5: Compiler Materialization Audit

Attempt to compile candidate lessons for audited routes.

Verify:

- full lesson sequence exists;
- matching covers all required targets;
- role-building covers required targets;
- bounded typing includes learner production targets only;
- final conversation cues exist;
- definitions appear correctly;
- no generic fallback surfaces render.

Output:

- compileable route list;
- blocked route list;
- missing stage/materialization details;
- test fixtures for repaired candidates.

### Audit 6: Conversation Coherence Audit

Run route candidates through coherence validation.

Positive cases:

- preference with context;
- possession with detail;
- activity with time;
- preference with choice;
- reason follow-up after reason-bearing claim;
- linked simple sequence.

Negative cases:

- possession question -> desire answer without bridge;
- activity/time question -> unrelated object answer;
- preference answer -> random object follow-up;
- choice follow-up without choosing;
- reason follow-up without reason precondition;
- same route with only slot swap and no slot-variation rung.

Output:

- valid route relations;
- invalid route relations;
- missing bridge metadata;
- maturity rating for `arcCoherence`.

### Audit 7: End-To-End Product Progression Study

Run backend and UI production-path Focus starts with memory writes between starts.

Record:

- island;
- route;
- rung;
- opening route;
- learner route;
- follow-up route;
- support/growth/refresh roles;
- known-support ratio;
- growth ratio;
- upgrade axis;
- transcript hash;
- shape hash;
- same-route return classification;
- blocker/remediation rows.

Classifications:

```text
same_island_advanced
same_island_refreshed
same_island_stale_repeat
same_route_productive_return
same_route_refresh
same_route_stale_repeat
same_route_surface_only_variation
new_island_first_contact
new_island_unnecessary_reset
slot_only_novelty
all_growth_island_hopping
support_growth_blend
generator_capability_blocked
metadata_or_surface_blocked
coherence_blocked
```

Output:

- product rows;
- whether completed sessions changed later lessons;
- whether changes felt productive by contract;
- owner-coded remediation backlog;
- final maturity assessment.

## How Audit Findings Must Modify The Plan

After audits complete, the implementer must update this spec and the current plan before continuing.

Required update format:

```text
findingId
owner
evidence
requiredChange
specSectionUpdated
planTaskAddedOrChanged
testToUnlock
status
```

Examples:

- If support candidates exist but the coordinator selects all growth, add coordinator scoring and target-bundle tasks.
- If preference island lacks a location-context route, add an arc capability task for `preference.location_context`.
- If `hazaker` or another inflected form is missing, add metadata/surface-cell tasks before coordinator selection depends on that route.
- If coherence rejects every richer candidate, add bridge/follow-up metadata or route relation tasks.
- If only one island is production-ready, add metadata/generator coverage tasks before claiming normal Focus progression is ready.

The plan must not continue with broad implementation while audit findings remain as prose only.

## Remediation Execution Contract

The audit is not the deliverable. The audit exists to decide what must be repaired. The implementation plan must convert every material audit finding into one of these outcomes:

- a concrete implementation task that changes production behavior;
- a concrete metadata or registry repair task that unlocks production behavior;
- a concrete test/audit improvement task that makes the blocker diagnosable enough to fix;
- an owned product blocker that prevents declaring the milestone complete.

It is not acceptable for the plan to say "audit generator coverage," "audit coherence," "audit metadata," or "audit product diversity" without a follow-up repair slice tied to the finding. Each owner below has a required remediation path.

### Arc Generator Remediation Path

If the audit shows the A1 arc generator cannot support the intended product shape, the plan must add generator remediation tasks. It must not leave the issue as "route scarcity" while continuing to tune coordinator scoring.

Required generator fixes when blocked:

- add or upgrade route-keyed capability-map entries for the affected priority route set;
- add the route/rung/upgrade-axis capability that the coordinator needs, such as context variation, slot variation, reason follow-up, choice contrast, ask-back, or linked/sequence thought;
- add route candidate generation logic for that capability if the catalog does not already have it;
- connect the route to metadata readiness and coherence requirements;
- prove the route can be selected by the coordinator only when it is registered, metadata-ready, materializable, and coherent;
- if the generator genuinely cannot support the route yet, return `arcCoverage` with exact missing route/rung/axis and a repair action.

The plan must include a production-priority route set where generator capability moves from missing or inferred to explicitly route-keyed, minimally coherent, and either production-ready or blocked by exact downstream owners. If no route in the set can be made production-ready in the implementation phase, the plan must stop and report that generator coverage is the active product blocker.

### Metadata Remediation Path

If the audit shows missing meanings, forms, phrase definitions, bridge data, utility data, or surface cells, the plan must repair priority metadata before depending on those targets in coordinator selection.

Required metadata fixes when blocked:

- add exact learner-facing meanings for selected words and phrases;
- add phrase-level meanings for multiword sentiments or expressions;
- add exact generated-form cells for selected person, number, tense/aspect, possession, and accepted variants;
- add verified paradigm/form cells for every form the coordinator is allowed to use as a growth or support expansion, with learner-facing English meaning and usage note;
- add slot-family and substitution-family metadata for coherent alternatives;
- add utility ranking metadata so high-utility vocabulary is promoted before niche alternatives unless a goal boost applies;
- add bridge metadata for routes that intentionally move between frames;
- rerun readiness tests and UI/manual checks that prove matching, building, bounded typing, and final cues render the repaired material.

The plan must not allow placeholder definitions, generic labels, raw ids, or "supporting line" fallbacks to count as a repair.

### Coordinator Remediation Path

If memory exposes support candidates but the coordinator still selects all growth, the plan must repair coordinator behavior. It must not treat product movement across islands as success.

Required coordinator fixes when blocked:

- implement learning-pressure classification before route selection;
- build target bundles with support, growth, refresh, cooled, blocked, island, rung, and upgrade-axis fields;
- reject all-growth revisits when viable support exists;
- classify visible word reuse as intentional support, cooled support, stale repeat, accidental reuse, or blocker;
- select routes from target-bundle needs, not by choosing a route first and stuffing words into it;
- emit selected and rejected candidate traces in product-readable language;
- add a growth candidate source that can promote A1-ready metadata/curriculum targets when memory has support but no growth or refresh candidate;
- require the source to return selected candidates, rejected candidates, owner-coded blockers, and repair actions before target-bundle selection is allowed to dead-end;
- make composition scoring bundle-aware after target bundles exist;
- when bundle-aware scoring cannot find a route that materializes the bundle's growth/refresh target, return `arcCoverage.support_growth_bundle_no_registered_route` with the missing target ids and candidate route ids;
- reserve `coordinatorPolicy.no_growth_or_refresh_target` for the narrower case where the memory profile truly exposes no growth or refresh target for the selected island;
- when the profile exposes support but no usable growth/refresh target bundle, return `coordinatorPolicy.no_memory_growth_or_refresh_candidate` only after the growth source proves there is no eligible metadata/curriculum candidate, and do not also emit generic known/growth ratio noise;
- prove in backend product studies that later lessons include known support when viable.

The plan must treat `coordinatorPolicy.composition_no_support_growth_available` as a behavior bug to fix, not just a diagnostic code to preserve.

The current live diagnostic also exposed these lower-level coordinator rejection gates:

```text
coordinatorPolicy.no_growth_or_refresh_target
coordinatorPolicy.known_growth_ratio_out_of_bounds
```

These must not be accepted as a final Task 16 outcome when a target bundle exists. Task 16 is only product-complete when those generic scoring failures either disappear behind a selected support-growth lesson, are repaired by sourced A1 growth, or are converted to the first precise downstream owner, usually `arcCoverage.support_growth_bundle_no_registered_route`, `metadataReadiness.no_growth_pool_for_island`, or `arcCoherence.no_coherent_growth_route`.

### Support Rotation And Paradigm Expansion Remediation Path

If memory exposes support candidates but the coordinator keeps choosing the same support word, same support surface, or same verb form, the plan must repair support selection. It must not claim success because one growth word changed while the learner still experiences the same sentence shell anchored by the same few supports.

Required support-rotation fixes when blocked:

- define support role pools for predicate, object, place, time, person/entity, connector, and bridge support;
- score support candidates by memory readiness, route relevance, underused-as-support status, utility, and fit with the target route;
- subtract or block recent exact support surfaces, repeated role/surface combinations, stale same-route anchors, and mastered-primary targets that are no longer useful as the main focus;
- prefer known-but-not-mastered support when available, while allowing mastered/core targets only as low-friction anchors;
- preserve canonical memory identity while rendering the correct surface for the route, so `kitab` and `el kitab` share core memory but the lesson still asks for the article-bearing phrase when the sentence needs it;
- allow a known lemma to support a new verified form, such as using `ana bahebb` knowledge to introduce `howwa bihebb`, or using `ana bazaker` knowledge to introduce `ana hazaker`;
- require every paradigm expansion form to exist in verified metadata before selection; unsupported or invented forms such as `ana habb` must be blocked until a verified entry with meaning and usage note exists;
- return owned blockers such as `supportPool.predicate_too_thin`, `supportPool.object_too_thin`, `supportPool.place_too_thin`, `supportPool.time_too_thin`, `supportPool.person_too_thin`, `supportPool.connector_too_thin`, `supportPool.bridge_too_thin`, or `metadataReadiness.paradigm_form_unverified` when the system cannot rotate support safely.

The plan must prove that repeated lessons rotate support surfaces when viable, expand across verified pronoun/person/tense/aspect forms when appropriate, or return exact owner-coded blockers when the support pool or form metadata is too thin.

### Coherence Remediation Path

If the audit shows lessons can form unnatural conversation chains, the plan must build production coherence validation. It must not count surface diversity or word changes as success when the conversation does not make real-world sense.

Required coherence fixes when blocked:

- define question-answer compatibility rules by route;
- define follow-up dependency rules by route;
- define bridge rules for frame changes, such as possession to desire/reason;
- define choice, reason, sequence, ask-back, and topic-shift constraints;
- track introduced entities with role, grammatical gender, person, number, and allowed follow-up pronouns;
- reject pronoun/person/gender/number mismatches, such as introducing "my brother" and then asking what "she" does;
- add positive fixtures that represent valid everyday conversation patterns;
- add negative fixtures from observed failures;
- connect the validator to coordinator candidate filtering before UI render;
- classify product-study failures as `arcCoherence` when the lesson changes but remains conversationally odd.

The plan must prove that known bad patterns fail and valid simple patterns pass through the same validator used by production selection.

### Product Diversity And UI Remediation Path

If backend behavior improves but the user cannot feel it in the app, the plan must repair the product path. It must not claim completion from backend tests alone.

Required product/UI fixes when blocked:

- verify UI completion writes the same final proof that backend studies write;
- verify UI completion writes canonical proof targets from the `learning_core` proof contract, not only the concrete words/forms visible in the old UI;
- verify concrete words/forms remain recorded as detail evidence without replacing the canonical proof target used by progress and coordinator selection;
- verify the next UI-started lesson reads current memory, not stale memory;
- verify the selected support/growth targets are visible in the rendered lesson stages;
- compare backend and UI product rows to identify controller or wiring gaps;
- add a manual server checkpoint after visible behavior milestones;
- report remaining failures by owner: coordinator, arc coverage, metadata readiness, compiler materialization, coherence, UI evidence loop, or progress alignment.

The plan must include at least one checkpoint where the user can operate the web app and evaluate whether the intended milestone improvement is visible. If the improvement is not visible, the plan must record why and add the next repair task.

## Deterministic Remediation Selection Algorithm

The implementation plan must not choose fixes by convenience or by the smallest patch that quiets an audit row. Each repair slice must follow the deterministic algorithm below and record its decision in the plan. This section is binding: if the plan omits the algorithm, the plan is incomplete.

Every remediation slice must include a `Remediation Decision Record` before its implementation steps:

```text
productFailure
firstFailingLayer
evidence
selectedRepair
whyThisRepairFirst
productionBehaviorChanged
backendProof
uiProductCheckpoint
remainingOwnedBlocker
```

The plan must fill every field with concrete values. `none`, `TBD`, or vague entries such as "improve coordinator" are not valid.

### Step 1: Start From The Product Failure

Every fix must begin with the learner-facing or product-facing failure it is meant to change. Valid product failures include:

- lesson feels repetitive even when words technically change;
- known words are visibly reused but not intentionally used as support;
- later lessons hop islands without building on prior knowledge;
- route returns are only surface-level changes;
- question, answer, and follow-up do not form a real conversation;
- the same support word, support role, or exact support surface appears repeatedly even though alternatives exist;
- a route keeps repeating the same verb form instead of using verified nearby forms across pronoun/person/tense/aspect;
- a follow-up contradicts the entity, person, gender, or number introduced by the prior turn;
- matching, sentence building, bounded typing, or final cue is missing selected words or phrase meanings;
- selected forms are grammatically wrong for person, tense/aspect, number, or possession;
- backend studies improve but UI-started sessions do not change;
- Progress and coordinator memory disagree about what the learner can say.

The plan must name the product failure before naming the code file or owner. This prevents implementation from starting with an internal patch that does not address the user's actual experience.

### Step 2: Trace The First Failing Layer

For every product failure, the plan must diagnose the first failing layer in this order:

1. memory profile;
2. coordinator target bundle;
3. arc generator capability;
4. metadata readiness;
5. compiler materialization;
6. coherence validation;
7. UI/controller/evidence loop;
8. Progress alignment.

The first failing layer owns the repair. Downstream layers must not be patched to hide an upstream failure.

Examples:

- If memory does not expose support/growth/refresh state, repair `memoryProfile` before coordinator scoring.
- If memory exposes support but the coordinator selects all growth, repair `coordinatorPolicy`.
- If memory exposes multiple support options but the same support surface keeps recurring, repair `coordinatorPolicy` support rotation before expanding route catalogs.
- If a known lemma should support a new form but the form is missing or unverified, repair `metadataReadiness` paradigm metadata before allowing that expansion.
- If the coordinator builds a valid target bundle but no route advertises the required rung or upgrade axis, repair `arcCoverage`.
- If a route advertises capability but lacks definitions, phrase meanings, bridge data, utility ranking, or exact generated forms, repair `metadataReadiness`.
- If metadata is ready but the full lesson cannot render matching, building, bounded typing, final cue, or proof targets, repair `compilerMaterialization`.
- If all material exists but the conversation is unnatural, repair `arcCoherence`.
- If the conversation fails because follow-up subject/agreement contradicts the prior entity, repair `arcCoherence` entity-state validation before treating the route as production-ready.
- If backend studies pass but the UI does not change after completion, repair `uiEvidenceLoop` or `progressAlignment`.

### Step 3: Choose The Repair By Rule

The plan must choose repairs with these rules:

- Memory profile failure -> add derived profile fields from existing graph rollups; do not create a second memory source.
- Coordinator all-growth revisit -> implement or adjust learning-pressure classification, target bundles, support/growth scoring, route-return classification, and selected/rejected traces.
- Support over-repetition -> implement support role pools, exact-surface cooldowns, underused-support scoring, and owned thin-pool blockers; do not hide the issue by swapping only the growth word.
- Paradigm expansion blocked -> add verified form metadata and expansion selection rules; do not generate unverified forms or examples from general language intuition.
- Generator route scarcity -> add route-keyed capability-map entries and route candidate generation for the priority route set, or return exact `arcCoverage` blocker if the route cannot be built yet.
- Metadata missing -> add exact metadata/surface/phrase/form/utility/bridge entries required by the selected production routes; do not suppress placeholders.
- Compiler failure -> add preflight checks and block candidate selection before UI render.
- Coherence failure -> add relation/bridge validation and connect it to production candidate filtering.
- Entity agreement failure -> add entity-state extraction and pronoun/person/gender/number validation to the coherence layer used by production selection.
- UI/product failure -> repair evidence write/read/render wiring and prove UI-started lessons affect the next start.

The selected repair must be the smallest production behavior change that addresses the first failing layer, but it must still be large enough to make the intended product behavior possible. A cosmetic audit change is not a valid repair.

### Step 4: Prove Before And After

Every remediation slice must include:

- the failing audit/product row or seeded failing case before the fix;
- the production code, metadata, registry, policy, or UI path changed by the fix;
- the backend proof after the fix;
- the UI/product checkpoint when the slice is expected to be visible;
- the remaining owned blocker if the intended behavior still does not appear.

If a slice cannot include a before/after proof, it must be split further until the proof is possible.

### Step 5: Prefer Highest-Yield Visible Progress

The plan must prioritize fixes that most quickly improve normal Focus behavior without breaking the shared architecture. The default priority order after audit report integration is:

1. make memory support/growth/refresh legible to the coordinator;
2. make the coordinator intentionally build support-growth target bundles;
3. make a priority route set production-ready or exactly blocked through route capability, verified metadata/forms, compiler, and coherence checks;
4. prove backend progression changes later lesson formation;
5. prove UI-started progression changes later lesson formation;
6. expand more islands/routes after the first production-ready route-return path works.

The plan may deviate from this order only if the remediation decision record explains why the dependency order requires it.

### Step 6: Plan Construction Requirement

When the implementation plan is written, each milestone must contain these subsections:

- `Purpose`;
- `Audit finding addressed`;
- `Remediation Decision Record`;
- `Implementation slices`;
- `Backend proof`;
- `UI/product checkpoint`;
- `Exit criteria`;
- `Remaining blocker handling`.

The plan must not group multiple owners into one task unless the task is explicitly an integration slice and each owner already has its own passing proof. For example, "fix product diversity" is not a valid implementation task. Valid tasks look like:

- "derive coordinator memory profile support/growth buckets";
- "reject all-growth revisits when viable support exists";
- "add capability-map coverage for preference context variation";
- "repair phrase-level meanings and verified form cells for the priority route set";
- "block possession-to-desire answer without bridge";
- "prove UI completion writes final proof used by next Focus start."

This ensures the spec's remediation paths are carried into the plan rather than glanced over.

## Implementation Workstreams After Audit

## Addendum: A1 Catalog And Metadata Reachability Alignment

### Audit Finding

The latest audit compared the hardline A1 arc catalog and compiler concrete-surface maps against `StarterLanguageMetadata.v1`. The result is a first-class blocker for memory-led coordinator progression: the app has broader production metadata than the A1 arc generator can currently surface.

This is not primarily a raw vocabulary-count problem. `StarterLanguageMetadata.v1` currently exposes 326 total metadata nodes, 303 selectable learning chunks, and 63 selectable nouns. The mismatch is that the hardline A1 arc catalog owns separate hardcoded slot-pool surfaces such as `pool.shopping.objects: kitab, mobile, alam`, while metadata contains additional selectable objects such as `shanta`, `gazma`, `ticket`, and `dawa`. The coordinator can reason about an abstract growth target like `shopping.object`, but the current arc generator can only instantiate a small subset of the tagged metadata.

Observed concrete example:

- `shopping.object.shoe` -> `gazma` -> shoe is selectable metadata and belongs to `pool.shopping.objects`.
- `shopping.object.medicine` -> `dawa` -> medicine is selectable metadata and belongs to `pool.shopping.objects`.
- The current A1 catalog `pool.shopping.objects` can instantiate only `kitab`, `mobile`, and `alam`.
- The compiler's concrete target map for `shopping.object` also maps only `kitab`, `mobile`, and `alam`.
- Therefore `gazma` and `dawa` are valid metadata but unreachable in current hardline A1 arc lessons.

### Metadata-Weak Cluster Report

The following clusters are weak for current A1 testing because their catalog pools and metadata pools do not align. "Metadata nodes" means selectable nodes available from `StarterLanguageMetadata.v1` for the catalog pools used by that family. "Catalog surfaces" means surfaces hardcoded in the A1 arc catalog for those same pools. "Weakness" names whether metadata is unreachable, catalog surfaces lack metadata backing, or the pool is too thin.

| cluster | metadata nodes | catalog surfaces | weakness summary |
|---|---:|---:|---|
| `identity_intro` | 6 | 6 | Healthy for current A1 scope. |
| `people_relationships` | 6 | 6 | Uses `pool.daily.activities`, where metadata has noun/action nodes (`rawa7`, `mozakra`, `shoghl`) but catalog uses generated verb surfaces (`azaker`, `ashtaghal`, `atemasha`) without pool-node backing. |
| `daily_activities` | 3 | 7 | Severe mismatch: `pool.time.anchors` has no selectable metadata nodes backing `delwa2ti`, `ennaharda`, `bukra`, `embareh`; `pool.daily.activities` has action nodes but not the generated surfaces the catalog uses. |
| `preferences_opinions` | 4 | 6 | `pool.preferences.items` has only one metadata node for three catalog surfaces; daily activity generated surfaces are not backed by slot-pool metadata. |
| `social_politeness` | 18 | 6 | Rich metadata is narrow in catalog: four social routine metadata surfaces and nine shopping object metadata surfaces are unreachable from catalog instantiation. |
| `time_scheduling` | 3 | 7 | Severe mismatch: time anchors are catalog-only and daily actions do not align with generated surfaces. |
| `home_objects_possessions` | 2 | 6 | Severe mismatch: `pool.home.objects` has no selectable metadata nodes for `kitab`, `mobile`, `kursi`; `helw` is catalog-only for descriptions. |
| `shopping_requests` | 14 | 6 | High-value mismatch: metadata has 12 shopping-object nodes, but catalog reaches only three; `gazma`, `dawa`, `shanta`, `ticket`, `tshirt`, and others are unreachable. |
| `conversation_repair` | 6 | 8 | Repair phrases and support questions have partial drift: `ha2ol` is metadata-only while `tani`, `eh`, and `feen` are catalog-only or not backed cleanly. |
| `feelings_states` | 7 | 8 | Severe mismatch: feeling-state catalog surfaces are not backed by selectable `pool.feelings.states` nodes; support connector pool has multiple unreachable or unbacked surfaces. |
| `descriptions` | 2 | 6 | Severe mismatch: descriptions use feeling-state catalog surfaces that lack pool backing and `helw` is catalog-only for the description pool. |

Priority clusters that should be expanded or aligned before further product testing:

1. `shopping_requests`: because it already has rich metadata and the learner expects objects like `gazma` and `dawa` to appear.
2. `daily_activities` and `time_scheduling`: because they are central to current Focus and repeated blockers cite activity/time routes.
3. `home_objects_possessions`: because it currently cycles a tiny object set and blocks object growth.
4. `feelings_states` and `descriptions`: because catalog surfaces exist but metadata backing is thin or absent.
5. `social_politeness` and `conversation_repair`: because phrase-level surfaces such as `rabena ma3ak`, `tamam`, and repair language must have phrase-level meanings and reachability.

`food_drink` remains excluded from primary hardline A1 arc selection in this phase. Do not promote `food_drink` to a primary A1 island as part of this addendum. Food and drink metadata may become reachable only when it is safely used by an already production-ready primary route such as `shopping_requests`, `preferences_opinions`, or `descriptions`, and only if coherence and compiler checks pass.

### Required Product Shape

The A1 arc generator must stop acting like a separate tiny vocabulary universe. Production A1 arc slot values must come from shared metadata-backed slot-pool resolution unless a route declares an explicit, audited override.

Required behavior:

- The A1 catalog can still declare which slot roles and slot pools a route supports.
- The catalog must not be the long-term source of truth for the concrete values inside those pools.
- Slot values used by A1 arc instantiation must carry metadata node id, surface, English gloss, canonical memory target ids, slot pool id, and route compatibility.
- The compiler's concrete target replacement must use the same metadata-backed resolver as the instantiator, not a separate private surface map that can drift.
- A selectable metadata node in an A1 production slot pool must either be reachable by at least one production A1 arc route or have an explicit exclusion reason.
- A catalog surface used by a production A1 arc must either be backed by metadata or be represented as an explicit contract-only node with owner, meaning, and reason.
- The coordinator may select a route only after preflight proves the route has renderable support and growth/refresh candidates from the same metadata-backed slot source.

### Shared Resolver Contract

Add a shared A1 metadata slot-pool resolver owned by `learning_core`. It must expose:

```text
A1MetadataSlotValue
  surface
  metadataNodeId
  englishGloss
  canonicalTargetIds
  memoryTargetIds
  slotPoolId
  slotRoleIds
  utilityScore
  routeCompatibleFamilyIds
  routeCompatibleArcIds
  exclusionReason
```

The resolver must support:

- lookup by A1 slot pool id;
- lookup by A1 slot role id, such as `request_object`, `home_object`, `preference_item`, `activity`, `time_anchor`, `state`, `degree`, `person`, `routine_phrase`, `repair_phrase`, and `connector`;
- lookup by surface for compiler target replacement;
- reporting unreachable metadata surfaces;
- reporting catalog surfaces missing metadata backing;
- reporting route/family capability blockers.

### Required Remediation Steps

Implementation must happen in small slices:

1. Add an audit model/test that compares A1 catalog slot pools, compiler surface maps, and `StarterLanguageMetadata.v1`.
2. Add the shared metadata-backed slot resolver and make it report current reachability gaps.
3. Update A1 arc instantiation to request slot values through the resolver while preserving deterministic seeded selection.
4. Update compiler target replacement to consume the resolver's surface-to-target mapping instead of maintaining a separate private map for production A1 surfaces.
5. Repair the first priority slot pools globally: `pool.shopping.objects`, `pool.home.objects`, `pool.time.anchors`, `pool.daily.activities`, `pool.feelings.states`, and `pool.descriptions.adjectives`.
6. Update growth candidate sourcing so it can source concrete metadata-backed slot candidates, not only abstract targets like `shopping.object`.
7. Update coordinator preflight so routes with no renderable metadata-backed growth/refresh candidate are skipped before they can block Start Focus.
8. Run backend and UI product audits to prove previously unreachable objects such as `gazma` or `dawa` can appear when selected by a valid production route, and that unsupported families still return owned blockers.

### Gates Added By This Addendum

#### Catalog-Metadata Reachability Gate

Every production A1 slot pool must be audited against production metadata. A selectable metadata node in a production A1 slot pool cannot remain unreachable unless it has an explicit exclusion reason. A production catalog surface cannot remain metadata-unbacked unless it is an explicit contract-only node with a learner-facing meaning.

#### Shared Slot Resolver Gate

A1 instantiation, compiler target replacement, growth candidate sourcing, and coordinator preflight must consume the same shared resolver or shared resolver output. If one layer uses a private hardcoded list that can drift from metadata, the task is not complete.

#### Concrete Growth Visibility Gate

When the coordinator sources growth from metadata, the selected concrete node must be visible in the lesson stages and written to memory after completion. For example, if `shopping.object.shoe` is selected, `gazma` must be available in matching, sentence building, bounded typing, final proof evidence, and later memory/profile reads.

#### Metadata Weakness Report Gate

Before claiming a UI/product checkpoint is representative, the implementation must report which clusters remain metadata-weak and whether those weaknesses are acceptable for the checkpoint. It is not valid to conclude that memory progression is failing if the first failing owner is catalog/metadata reachability.

The final plan must not treat the remediation backlog as one giant coordinator rewrite. It must use the milestone ladder below. Each milestone is substantial; a milestone is not one task. The plan must break every milestone into small test-first slices that can be completed independently, verified, and observed through audit output. Where a milestone should change the learner-facing app, the plan must include a backend proof and a UI/product checkpoint before moving on.

The ordering below is intentional. It prioritizes the fastest meaningful product improvement while still building the shared surfaces needed to prevent one-off patches. The plan may split a milestone into more tasks, but it must not skip the exit criteria or bury a large owner fix inside a vague task.

### Milestone 1: Coordinator Memory Profile Foundation

Primary owner: `memoryProfile`.

Current problem:

Memory stores useful evidence and produces surface-aware rollups, but the coordinator does not yet receive the learner state in the language of lesson planning. It sees target-level history, support eligibility, and refresh signals, but not enough island, route, rung, slot, or recent-path structure to decide what kind of lesson should come next.

What must be built:

- Define a coordinator-facing memory profile object derived from the existing memory graph, not a new memory store.
- Add island state by family/progression island: unseen, first-contacted, active, saturated-this-session, support-ready, refresh-needed, blocked-by-capability, blocked-by-metadata.
- Add route state by island/route: never used, recently used, productive-return eligible, stale-return blocked, refresh eligible.
- Add target buckets by island: support candidates, growth candidates, refresh candidates, cooled primary targets, blocked targets.
- Add frame and slot state: which frames are stable, which frames are weak, which slot families are thin, which slot families have enough high-utility alternatives.
- Add eligible rungs and blocked rungs by island, with the blocker owner: memory, coordinator, arc coverage, metadata, compiler, or coherence.
- Add recent island/route history in the same identity format used by selection and audit.

Implementation slices the plan must create:

- Slice 1: add profile model and pure projection from existing graph rollups.
- Slice 2: add island/route/rung state derivation.
- Slice 3: add support/growth/refresh target buckets and cooldown/saturation handling.
- Slice 4: add seeded-memory tests that prove known words become support and saturated words cool as primary focus without disappearing.
- Slice 5: update audit output to show the profile fields in readable terms.

Backend proof checkpoint:

- A seeded profile with repeated `kitab`, `bukra`, or `predicate.like` evidence must show those targets as support or cooled-support, not as fresh growth.
- A seeded weak target must show as refresh or strengthen-needed.
- The audit must report exact missing fields if any profile field is absent.

UI/product checkpoint:

- This milestone may not create a large visible UI change by itself. The expected visible change is limited: later lessons are now diagnosable as "coordinator ignored available support" instead of "memory did not know support existed."

Exit criteria:

- `a1_memory_profile_consumption_audit_test.dart` proves the profile exists and contains island, route, rung, support, growth, refresh, slot, and recent-route fields.
- The product audit can distinguish visible word reuse from intentional memory support.

### Milestone 2: Learning Pressure And Target Bundle Selection

Primary owner: `coordinatorPolicy`.

Current problem:

The coordinator can choose A1 arc lessons, but it does not first decide why the next lesson exists. The current failure is that after completed sessions it often selects all-growth lessons even when memory has support candidates. This makes lessons feel either repetitive by surface reuse or scattered by topic hopping, instead of progressive.

What must be built:

- Define learning pressure categories before route selection: first contact, consolidate, expand slot, expand context, refresh, return productively, change island, or blocked.
- Build a target bundle before arc selection. The bundle must name support anchors, growth targets, refresh targets, optional cooled targets, blocked targets, eligible island, eligible rung, and intended upgrade axis.
- Establish a tunable support/growth rule. Revisited islands should usually require at least one support anchor and one growth/refresh target unless the policy says first-contact, refresh-only, or owned blocked result.
- Reject all-growth revisits when support exists but is not used. If support cannot be used, return an owner-coded blocker naming whether the issue is coordinator, arc coverage, metadata, compiler, or coherence.
- Keep familiar words available as support without making them the lesson's primary growth item forever.
- Add support-rotation fields to the target bundle: support role pool, selected support surface id, canonical target id, recent support cooldown state, underused support score, and support-rotation trace.
- Add paradigm-growth fields to the target bundle: known lemma/form support, intended new verified form, person/tense/aspect shift, and required metadata cells.
- Enforce exact support-surface cooldowns so `bithebb`, `kitab`, `el medina`, or any other visible anchor cannot carry several lessons in a row when viable alternatives exist.
- Choose support from known-but-not-mastered targets when viable; use mastered targets only as low-load anchors, not as the repeated center of the lesson.
- Add a growth candidate sourcing layer between memory-profile consumption and target-bundle selection. When memory has support but no growth/refresh target, this layer must search A1-ready metadata/curriculum pools, filter by route compatibility and metadata readiness, and either produce growth candidates or emit the exact owner-coded blocker.
- The target bundle must record whether growth came from memory, metadata/curriculum sourcing, refresh policy, route return, or owned blocker.
- Emit trace rows for selected and rejected bundles so the audit can explain the decision in product language.

Implementation slices the plan must create:

- Slice 1: define shared learning-pressure enum and target-bundle model.
- Slice 2: map coordinator memory profile into target-bundle candidates.
- Slice 3: implement the shared A1 growth candidate source model and metadata/curriculum query boundary.
- Slice 4: add source filters for utility, learner load, recent saturation, alias duplicate rejection, route compatibility, and metadata/compiler readiness.
- Slice 5: integrate sourced growth into target-bundle selection before any no-growth blocker can be returned.
- Slice 6: score support/growth/refresh mix using shared policy values.
- Slice 7: reject or block all-growth revisits.
- Slice 8: add support role pools, exact support-surface cooldowns, and underused-support scoring before route selection.
- Slice 9: add paradigm-growth target selection using only verified form metadata.
- Slice 10: add same-island and same-route return classification before route selection.
- Slice 11: update backend product study to prove known targets become support and metadata-sourced growth in later lessons.

Backend proof checkpoint:

- After one or more completed lessons, later starts must include known support targets when viable.
- A support-only memory profile must produce a sourced growth target when A1-ready metadata has an eligible candidate.
- If a sourced growth target exists but no route can use it, the blocker must be route coverage, not generic coordinator no-growth.
- If a candidate lacks gloss, exact surface, verified form, teaching metadata, or compiler materialization, the blocker must name that missing readiness field.
- The product audit must stop reporting repeated `known=0.00 growth=1.00` for every later lesson unless every candidate is owned blocked.
- The product audit must show `growthSource` and the selected/rejected candidate trace for every later lesson.
- Repeated visible words must be classified as intentional support, cooled support, stale repeat, or accidental reuse.
- Repeated exact support surfaces must rotate when alternatives are viable, or return an owned thin-pool blocker.
- A known form can support a nearby new form only when the target form is verified by metadata.

UI/product checkpoint:

- The learner should start feeling that some familiar material is being used as an anchor while one or two controlled pieces change.
- Starting Focus after completing a lesson must either render a support-plus-growth lesson or show a blocker card that names the exact growth source, metadata, route, coherence, or compiler owner.
- Practicing a sourced growth target in the UI must write completion evidence into memory so a later lesson can treat that target as proved growth/support according to policy.
- If the UI still feels similar, the audit must say whether the cause is route scarcity, surface-only variation, metadata scarcity, or coherence rejection.

Exit criteria:

- `a1_coordinator_decision_audit_test.dart` proves all-growth revisit is rejected or blocked with repair action.
- `a1_support_rotation_policy_test.dart` proves repeated support surfaces rotate, thin pools block, and unverified paradigm forms are rejected.
- `a1_growth_candidate_source_test.dart` proves support-only memory sources growth from metadata, rejects missing readiness fields, and reports precise blockers.
- `focus_coordinator_arc_candidate_test.dart` proves support-only memory no longer ends in generic no-growth when metadata-ready growth exists.
- `a1_memory_led_product_progression_audit_test.dart` shows at least one later lesson with a support-growth blend in the production backend path and reports the growth source.

### Milestone 3: Shared Policy, Registry, And Tuning Surfaces

Primary owners: `coordinatorPolicy`, `arcCoverage`, `metadataReadiness`, `arcCoherence`.

Current problem:

Important behavior is still at risk of living in scattered coordinator conditionals, generator assumptions, audit-only fixtures, or local constants. That would make future stakeholder tuning slow and unsafe.

What must be built:

- Create shared policy bundles for support/growth mix, route-return strictness, cooldown windows, learner load, stale-repeat thresholds, and productive-return requirements.
- Create shared owner codes and repair-action values used by production blockers, audit reports, and tests.
- Create a shared route capability registry location, even if Milestone 4 fills it progressively.
- Create a shared coherence relation registry location, even if Milestone 7 fills it progressively.
- Create shared readiness/preflight helper boundaries so metadata and compiler checks are not audit-only.
- Add validation scripts or tests that fail when production routes, blocker codes, policies, or registries drift.

Implementation slices the plan must create:

- Slice 1: define policy bundle schema and default values.
- Slice 2: move support/growth and route-return thresholds into the policy bundle.
- Slice 3: define shared blocker owner/repair registry and update audit rows to use it.
- Slice 4: define empty or minimal capability, metadata readiness, coherence, and compiler preflight registry entry points.
- Slice 5: add drift tests proving production and audit read the same shared surfaces.

Backend proof checkpoint:

- Changing a shared support/growth threshold in a test must change coordinator/audit classification.
- Adding a production route without a capability registry row must fail readiness validation.
- An audit blocker code must come from the shared owner-code surface.

UI/product checkpoint:

- This milestone may not produce a visible learner change by itself. Its value is that later visible changes become tunable without scattered edits.

Exit criteria:

- `a1_shared_surface_audit_test.dart` passes because the required surfaces exist and are shared.
- Shared-surface tests prove audit and production consume the same policy/registry values.

### Milestone 4: A1 Arc Capability Maps

Primary owner: `arcCoverage`.

Current problem:

The generator has arcs, but the coordinator cannot reliably know what each island/route can do. It cannot ask, "Can this route support a productive return with known support and a location-context expansion?" without guessing from local heuristics.

Task 16G proved that this cannot be solved by a shallow "arc has a registry row" map. A route can exist, receive a target bundle, and even attach target ids while still failing the learner-visible product contract. Current failure examples include bad rendered forms, growth targets that are tagged but not visibly taught, same-feeling shells, and turns that technically render but do not form a coherent conversation. The route capability registry must therefore become a truthful contract between the coordinator target bundle, the arc generator/instantiator, metadata/form readiness, compiler materialization, and coherence validation.

What must be built:

- Inventory current production A1 islands and routes as route keys, not only arc ids. A route key must include at least `familyId`, `arcId`, and the intended `rung` or `upgradeAxis`, because the same arc id can be safe for one island and unsafe for another.
- For each route key, declare capability status: `productionReady`, `pendingFormReadiness`, `pendingCoherence`, `pendingCompilerPreflight`, or `unsupported`. Normal Focus may select only `productionReady` routes. Pending routes may appear in audits, but they must not silently act as production-ready candidates.
- For each route key, declare materialization mode: `targetIdsOnly`, `surfaceMaterialized`, `formMaterialized`, or `compilerMaterialized`. `targetIdsOnly` means the route can attach evidence/progress ids but cannot yet prove the learner-visible material. It is not enough for production route selection.
- For each route key, declare supported rungs: first contact, revisit support, slot variation, context variation, one expansion, coherent follow-up, linked/sequence thought, ask-back/choice, refresh.
- For each route key, declare supported target roles: tutor question support, tutor question growth, learner answer support, learner answer growth, bridge phrase, follow-up anchor, optional choice target, refresh target, detail expansion target, pronoun/person variation target, and tense/aspect variation target.
- For each route key, declare upgrade axes: pronoun/person shift, tense/aspect shift, object slot change, location context, time context, reason clause, choice contrast, sequence/linking, ask-back, support rotation, and refresh return.
- For each route key, declare required metadata, verified form cells, compiler stage coverage, and coherence relations needed before the route can be production-ready. If a route needs a verified person/tense form or entity-agreement relation, that dependency must be encoded in the route capability entry rather than hidden in generator logic.
- Add a route materialization proof helper. This helper must compare a coordinator target bundle against the instantiated route and report whether required support/growth/refresh targets actually appear in learner-visible transcript turns and, where available, compiler-visible lesson stages. A route may not claim `surfaceMaterialized`, `formMaterialized`, or `compilerMaterialized` unless this helper can prove the claim in tests/audits.
- Update coordinator route selection so memory target bundles are checked against the route capability registry before production generation. If no production-ready route can satisfy the bundle, Focus must return an owned `arcCoverage` blocker instead of trying a pending route or falling through to a generic no-candidate failure.
- Mark route scarcity explicitly. If an island cannot provide enough productive variation, the system must own `arcCoverage` with the missing route key, rung, target role, upgrade axis, and first downstream owner rather than cycling stale shells.
- Convert route failures into precise blocker codes: `arcCoverage.family_arc_unregistered`, `arcCoverage.route_key_unregistered`, `arcCoverage.rung_unavailable`, `arcCoverage.growth_role_unavailable`, `arcCoverage.surface_materialization_missing`, `arcCoverage.no_production_ready_route_for_growth_bundle`, `formReadiness.verified_form_required`, `arcCoherence.required_relation_missing`, and `compilerMaterialization.stage_missing`.

Implementation slices the plan must create:

- Slice 1: add route-keyed capability map model, capability status enum, materialization mode enum, supported role/axis fields, and dependency fields for metadata, forms, compiler stages, and coherence relations.
- Slice 2: inventory all current production A1 `familyId + arcId` route keys and require registry coverage. Coverage by `arcId` alone is insufficient.
- Slice 3: mark only proven current capabilities. Routes that only attach ids must be `targetIdsOnly`; routes requiring future verified forms or coherence checks must be `pendingFormReadiness` or `pendingCoherence`.
- Slice 4: add a route materialization proof helper that instantiates representative production routes with realistic support/growth bundles and compares registry claims to learner-visible transcript material.
- Slice 5: update coordinator candidate generation to ask the registry for eligible production-ready routes before route instantiation. Pending routes must be blocked with owned repair codes, not attempted as normal Focus candidates.
- Slice 6: update the arc capability audit to list exact missing route key, rung, role, axis, materialization mode, and first downstream owner for blocked islands.
- Slice 7: connect the 12-lesson product audit to route capability reporting so later UI/product checks can distinguish route scarcity from form readiness, coherence, compiler materialization, or coordinator scoring.

Backend proof checkpoint:

- A production route cannot be selected for a route key, rung, target role, or upgrade axis it does not advertise.
- A route marked `targetIdsOnly`, `pendingFormReadiness`, `pendingCoherence`, `pendingCompilerPreflight`, or `unsupported` cannot be selected by normal Focus.
- A route claiming visible support/growth materialization must pass a production instantiation proof showing those targets in learner-visible transcript turns.
- A route claiming compiler materialization must pass a compiler-stage proof or remain pending Task 21.
- A missing or pending capability returns an `arcCoverage` blocker with the exact route key, target ids, materialization gap, and repair action.
- Product study rows show whether limited variety is caused by route scarcity, surface-only variation, form readiness, coherence rejection, or compiler materialization.

UI/product checkpoint:

- The learner should see fewer lessons that are the same shell with a swapped word when another capable route exists.
- If the generator cannot support variety yet, the audit must make that clear before UI testing is treated as a coordinator failure.

Exit criteria:

- `a1_arc_capability_audit_test.dart` proves production A1 routes are represented in the capability registry.
- Route capability tests prove registry claims match instantiated learner-visible route material.
- Coordinator tests prove pending or target-id-only routes return owned blockers instead of normal Focus lessons.
- The audit can answer which islands are production-ready for rotation, which are first-contact-only, and which are blocked by forms, coherence, compiler materialization, or missing route capability.

### Milestone 4A: Thought Depth Capability Contract

Primary owner: `arcCoverage`, with future dependencies on `metadataReadiness`, `arcCoherence`, and `compilerMaterialization`.

Current problem:

Task 17 made routes truthful about family, arc, rung, upgrade axis, target roles, and downstream blockers. That is enough for short A1 route selection, but it is not yet explicit enough for the later product shape where a learner response grows from a direct answer into a connected thought. If the registry does not know whether a route can support detail, reason, sequence, contrast, choice, ask-back, or multi-sentence learner response depth, later work will either hard-code those choices in the generator or treat a long response as just a longer string.

This milestone is a contract extension, not a full long-response generator. It exists so Tasks 18-22 and future thought-depth implementation do not build against a route registry that can only describe shallow exchanges.

What must be built:

- Define thought-depth rungs as first-class capability values:
  - `direct_answer`;
  - `answer_with_detail`;
  - `answer_with_context`;
  - `answer_with_reason`;
  - `answer_with_description_or_evaluation`;
  - `linked_two_clause_thought`;
  - `contrast_or_choice`;
  - `multi_sentence_response`;
  - `ask_back_or_continue`.
- Define allowed thought operations as first-class capability values:
  - `add_object`;
  - `add_adjective`;
  - `add_intensifier`;
  - `add_time`;
  - `add_place`;
  - `add_reason`;
  - `add_sequence`;
  - `add_contrast`;
  - `add_choice`;
  - `add_ask_back`;
  - `change_pronoun`;
  - `change_tense`;
  - `change_subject`.
- Extend route capability entries so a route can declare which thought-depth rungs and thought operations it supports. A route may support short `revisitSupport` while still being blocked for `answer_with_reason` or `linked_two_clause_thought`.
- Add thought-depth dependency fields:
  - required connector target ids;
  - required bridge relation ids;
  - required verified form queries;
  - required compiler stages;
  - required coherence preconditions;
  - maximum learner response clauses for the current production level.
- Add owned blockers for unsupported thought depth:
  - `arcCoverage.thought_depth_rung_unavailable`;
  - `arcCoverage.thought_operation_unavailable`;
  - `metadataReadiness.thought_connector_missing`;
  - `arcCoherence.thought_precondition_missing`;
  - `compilerMaterialization.thought_stage_missing`.
- Ensure the route capability audit reports thought-depth readiness separately from ordinary route readiness. A route can be production-ready for direct answers and pending for reason/sequence/multi-sentence growth.

Implementation slices the plan must create:

- Slice 1: add thought-depth rung and operation enums or value objects in a shared route capability file.
- Slice 2: extend `A1RouteCapability` with supported thought-depth rungs, supported thought operations, required connector ids, required bridge ids, required thought coherence relation ids, and max learner response clause count.
- Slice 3: update current route capability entries with conservative truth: most current routes should advertise only direct answer/detail/context support until later metadata/coherence/compiler work proves more.
- Slice 4: add tests proving a route can be direct-answer ready while reason/sequence/multi-sentence depth remains exactly blocked.
- Slice 5: update audits so future product reports can say "the route is available, but the requested thought depth is not."

Backend proof checkpoint:

- A route claiming `answer_with_reason` must declare a reason connector, a reason-compatible prior claim relation, and a compiler/coherence dependency.
- A route claiming `linked_two_clause_thought` must declare a sequence/addition connector and at least two compatible predicate/slot roles.
- A route claiming `multi_sentence_response` must declare a max clause/sentence budget and compiler stages that can materialize more than one learner response clause.
- Current production routes cannot silently claim thought-depth readiness just because they are `productionReady` for direct answers.

UI/product checkpoint:

- This milestone may not visibly change the learner experience. Its value is that later long-response growth cannot be implemented as local generator string stitching.

Exit criteria:

- Route capability tests prove direct-answer readiness is independent from thought-depth readiness.
- The route capability audit names unsupported thought-depth rungs with owned blockers and repair actions.

### Milestone 4B: Priority Route Set Readiness And Minimal Coherence Gate

Primary owner: `arcCoverage`, with first-pass ownership from `arcCoherence`.

Current problem:

Task 17 added the route capability registry and proof helper, but the next production step cannot be a single preference-route promotion. That would make one visible path look better while leaving the system unable to rotate across the routes a learner actually needs. The coordinator needs a small, production-ready route set that can support memory-led returns across daily activities, preferences, possessions/requests, and people/relationship references, and it needs enough coherence validation that obviously broken route candidates do not become "ready" just because they have target ids.

What must be built:

- Define a priority route set for the next production milestone, not a single hard-coded route. The minimum set is:
  - `daily_activities/activity_time_arc` for activity plus time/context growth;
  - `preferences_opinions/preference_alternative_arc` for preference detail, alternative, and choice contrast growth;
  - `home_objects_possessions/request_detail_arc` for possession/request/detail growth;
  - `people_relationships/person_reference_arc` for person reference growth, only when entity agreement can be proven.
- Add a minimal route coherence preflight before any route in this set can be promoted to `productionReady`. This is intentionally smaller than the full Task 22 coherence validator, but it must catch the failures already seen in the product:
  - person/entity agreement mismatch, such as introducing "my brother" and then asking what "she" does;
  - answer-relation mismatch, such as answering "Do you have gloves?" with "I want gloves" unless the route declares a valid desire bridge;
  - unsupported reason/follow-up jumps, such as asking "why?" without a prior claim that can receive a reason;
  - same-shell return without a new route axis, support rotation, context, reason, choice, sequence, or ask-back.
- Route readiness must stay global. The registry should not say "preferences route is ready" because a single fixture passes. It must say which route key, rung, target roles, upgrade axes, and coherence relation ids are ready, pending, or blocked.
- The coordinator must consume the same readiness and minimal coherence result as the audit. If the audit marks a route pending, normal Focus must not select it.
- The audit must name the first downstream owner when the priority route set is insufficient: `arcCoverage` for missing routes, `formReadiness` for missing forms, `metadataReadiness` for missing target metadata, `arcCoherence` for relation failures, or `compilerMaterialization` for lesson-stage failures.

Implementation slices the plan must create:

- Slice 1: add `A1RouteCoherencePreflight` with result/finding types and deterministic owner codes for the minimal relation checks listed above.
- Slice 2: add positive and negative fixtures for the priority route set. At least one fixture must be outside the originally designed preference example so the proof is global.
- Slice 3: update `A1RouteCapabilityRegistry.initial()` so the priority route set is represented by route key and status, with `requiredCoherenceRelationIds` attached where needed.
- Slice 4: update coordinator candidate filtering so a priority route must pass route capability and minimal coherence preflight before selection.
- Slice 5: update route capability and 12-lesson audits so the report distinguishes route scarcity from minimal coherence rejection.

Backend proof checkpoint:

- A route with target ids but a failed minimal coherence preflight cannot become `productionReady`.
- The registry can report daily activity, preference, possession/request, and person-reference route readiness independently.
- The coordinator returns owned blockers when the priority route set cannot support the current memory target bundle instead of hiding the failure behind a generic no-candidate result.
- Tests include at least one non-preference route so this cannot become a local preference patch.

UI/product checkpoint:

- The learner should stop seeing obviously broken route promotions, such as mismatched pronouns/entities or possession-to-desire jumps without a bridge.
- If lessons are still too similar, the 12-lesson report must say whether the first blocker is route scarcity, minimal coherence rejection, missing verified forms, missing metadata, compiler materialization, or coordinator scoring.

Exit criteria:

- Route capability tests prove the priority route set is represented by route key and cannot be selected while pending.
- Minimal coherence tests prove known bad chains are rejected before route promotion.
- Product audits expose route scarcity and minimal coherence separately from metadata/form/compiler blockers.

### Milestone 5: Route-Keyed Metadata, Verified Forms, And Generator Surface Repairs

Primary owner: `metadataReadiness`.

Current problem:

Even a good coordinator target bundle can fail if metadata cannot supply real meanings, phrase definitions, surface forms, utility ordering, bridge labels, exact person/tense/form cells, and compiler-readable target fields. This is where issues like missing matching items, phrase meanings, wrong generated forms, duplicate article/core-word treatment, or "description description" become systemic rather than one-off UI bugs.

This milestone must also stop the generator from inventing production verb forms by string manipulation. Forms such as `ana hazaker`, `ana bazaker`, `enta hate3mel`, `howwa bihebb`, `heyya bithebb`, `e7na benhebb`, and `homma bihebbu` must be selected from verified metadata rows. If a form is missing, the route is unavailable with an owned readiness blocker; normal Focus must not guess.

What must be built:

- Add route-growth metadata requirements keyed by `A1RouteCapabilityKey`, not only `familyId` or `arcId`. Requirements must name route, rung, target role, upgrade axis, required meanings, required phrase meanings, required form queries, required compiler fields, required slot pools, and required coherence relation ids.
- Add phrase-level definitions for multiword phrases where the learner needs a sentiment or meaning, not separate word glosses only.
- Add exact surface/form requirements for person, number, tense/aspect, possession, and accepted input/render variants used by production routes.
- Add a verified form registry/query surface for every form the coordinator may use for pronoun/person/tense/aspect expansion. Each verified form must include lemma id, canonical target id, surface target id, semantic family id, pronoun target id, pronoun, person, number, gender when relevant, tense/aspect, Franco Arabic, Arabic script if available, English cue, usage note, accepted variants, utility tier, route roles it can serve, slot family ids, and readiness status.
- The verified form registry must expose global queries, not local route-specific lists:
  - `formsFor(A1VerifiedFormQuery query)`;
  - `formOrNull({required String surfaceTargetId})`;
  - `growthOptionsFor({required String knownSurfaceTargetId, required String upgradeAxis, required String routeRole})`;
  - `requiredMatrixCoverage({required List<String> lemmaIds, required List<String> pronouns, required List<String> tenseAspects, required String routeRole})`.
- The minimum production form matrix for this phase must explicitly cover the pronoun/person set `ana`, `enta`, `enti`, `howwa`, `heyya`, `e7na`, and `homma` for the priority verbs used by the route set. It is acceptable for a cell to be blocked or review-required only if the blocker is explicit and prevents production selection. It is not acceptable for the generator to synthesize an unverified form.
- Add explicit unsafe-form behavior: a form not present in the verified registry is unavailable to the coordinator and compiler, even if it seems linguistically plausible.
- Add utility metadata for vocabulary growth: core/high-utility words should outrank niche words unless a topic goal explicitly boosts the niche word.
- Add slot-family and substitution-family metadata so the coordinator can choose alternatives that keep a sentence coherent.
- Add bridge metadata for routes that intentionally move between frames, such as possession to reason/desire.
- Convert vague metadata failures into exact missing target ids, phrase ids, surface cells, or route requirement ids.
- Add a metadata-to-compiler readability proof for the priority route set. Before Task 21 adds full compiler preflight, Tasks 19/20 must already prove that selected target ids and verified form ids carry the fields the compiler and UI need for matching, role building, bounded typing, and final conversation cues.
- Make future vocabulary expansion metadata-driven. Adding a new verb, noun, adjective, connector, or phrase should mean adding metadata/form rows with the same required fields and route roles. The coordinator, generator, and compiler must discover those rows through shared query surfaces, not through new hard-coded conditionals.

Implementation slices the plan must create:

- Slice 1: add route-keyed metadata readiness requirement models that reference `A1RouteCapabilityKey` and exact required target/form/compiler/coherence fields.
- Slice 2: add `A1VerifiedForm`, `A1VerifiedFormQuery`, and `A1VerifiedFormRegistry` with the global query methods listed above.
- Slice 3: connect route capability entries to metadata readiness requirements and verified form requirements. A route can be `productionReady` only if its required metadata/form queries pass or are owned by exact blockers.
- Slice 4: audit current production routes and list exact missing metadata ids, surface cells, phrase ids, verified form queries, compiler fields, and first repair owner.
- Slice 5: seed verified production forms for priority verbs and the pronoun/person set `ana`, `enta`, `enti`, `howwa`, `heyya`, `e7na`, and `homma`. Forms must include route roles so growth can move across person and tense without hard-coded generator logic.
- Slice 6: repair priority nouns, phrases, connectors, demonstratives, article/core-word relationships, slot-family tags, utility tiers, and bridge metadata needed by the priority route set.
- Slice 7: add a verified surface realizer that production route instantiation uses for form selection. Replace unsafe generator branches that build present/future/past forms by prefix or suffix.
- Slice 8: update target bundle and growth sourcing so `pronoun_person_shift`, `tense_aspect_shift`, object slot change, location/time context, reason, choice, sequence, and ask-back growth can be sourced from verified metadata.
- Slice 9: add metadata-to-compiler proof tests showing that selected targets/forms survive into matching, sentence building, bounded typing, and final conversation cue payloads for at least two different route families.

Backend proof checkpoint:

- No selected target can render `description description`, `supporting line`, raw ids, or generic labels.
- A selected inflected form must resolve to the expected surface for its person/tense/aspect role.
- A selected paradigm expansion must come from verified metadata. Unsupported examples such as `ana habb` must fail readiness until explicitly defined with meaning and usage note.
- Phrase targets must expose phrase-level learner meanings.
- The same registry/query path must return forms for at least two different verbs and at least two different pronoun/person shifts, proving the fix is global and not local to one lesson.
- Adding a synthetic verified form in a test fixture must make it available through `formsFor` and `growthOptionsFor` without changing coordinator or generator code.
- The generator must not produce `ana azaker bukra` when a future first-person study form is required; it must use the verified future form or return `metadataReadiness.paradigm_form_unverified`.
- Priority-route metadata must expose compiler-readable fields for selected targets/forms.

UI/product checkpoint:

- Matching, sentence building, bounded typing, and final cues should include the words or phrases the user actually needs.
- Wrong form issues should become exact metadata failures or exact fixed surfaces, not coordinator mysteries.
- Growth should be able to move from `ana`/`enta` into `enti`, `howwa`, `heyya`, `e7na`, and `homma` when memory and route capability allow it, without adding a new hard-coded branch for each pronoun.

Exit criteria:

- `a1_metadata_surface_progression_audit_test.dart` lists exact gaps and passes after priority route metadata is repaired.
- `a1_verified_form_registry_test.dart` proves verified form queries, matrix coverage, synthetic fixture expansion, and unsupported-form blocking.
- `a1_conversation_arc_instantiator_test.dart` proves priority routes use verified forms rather than unsafe generated strings.
- A metadata-to-compiler proof shows selected target/form ids and learner-facing labels appear in required lesson-stage payloads for at least two route families.
- UI/manual testing of the priority routes shows definitions and forms are available in all lesson stages.

### Milestone 6: Compiler Preflight Materialization

Primary owner: `compilerMaterialization`.

Current problem:

Some candidates may look valid to memory and route selection but fail when converted into the full Focus lesson. Normal Focus needs to know that a candidate can become the entire lesson sequence before rendering it.

What must be built:

- Add a compiler preflight helper that accepts a candidate route, target bundle, capability entry, metadata readiness entry, and coherence result.
- Verify goal conversation materialization.
- Verify per-turn vocabulary/matching materialization.
- Verify role-building materialization.
- Verify bounded typing materialization without unwanted full-sentence first-box behavior.
- Verify final conversation cue/proof materialization.
- Verify selected proof targets map back to memory evidence writes.
- Return owner-coded materialization blockers before UI render.

Implementation slices the plan must create:

- Slice 1: define preflight input/output model.
- Slice 2: check stage presence and proof target consistency.
- Slice 3: check selected target visibility across matching, building, bounded typing, and final cue.
- Slice 4: connect preflight to coordinator candidate filtering.
- Slice 5: add route-level compiler tests for every production-ready route.

Backend proof checkpoint:

- A candidate missing any required lesson stage is blocked before selection.
- A candidate whose final proof target is absent from teaching stages is blocked.
- A candidate that passes preflight can write final evidence to memory.

UI/product checkpoint:

- The learner should see fewer broken or incomplete lesson sections after a candidate is selected.
- If UI still misses material, the blocker should name whether the issue is UI binding or compiler materialization.

Exit criteria:

- `a1_compiler_materialization_audit_test.dart` proves priority production routes can materialize fully.
- Production selection uses preflight before committing.

### Milestone 7: Conversation Coherence Validator

Primary owner: `arcCoherence`.

Current problem:

The app can produce lessons that change words or frames without sounding like a real conversation. The system needs to reject disconnected chains, not only avoid exact repetition.

What must be built:

- Define route relation metadata: question-answer compatibility, follow-up dependency, bridge requirements, choice compatibility, sequence compatibility, and return-to-route requirements.
- Validate that the learner answer type matches the tutor question type unless a route declares a valid bridge.
- Validate follow-ups depend on prior answer content, route, slot, or bridge.
- Validate entity agreement across turns. If a prior answer introduces a masculine singular entity such as "my brother," follow-up subjects must remain compatible with that entity unless the route explicitly shifts topic.
- Validate that pronoun/person/number/gender shifts are deliberate upgrade axes, not accidental contradictions.
- Validate that a route returning to a familiar island adds a real context, reason, choice, sequence, ask-back, or surface upgrade.
- Validate that same-route returns are productive, refresh, or blocked, never silently stale.
- Add positive fixtures for valid preference, possession, activity/time, reason, choice, and sequence routes.
- Add negative fixtures for possession-to-desire without bridge, activity/time to object-only answer, random topic shift, choice mismatch, entity/pronoun agreement mismatch, and stale shell repeat.

Implementation slices the plan must create:

- Slice 1: define coherence relation and bridge models.
- Slice 2: define entity-state model for introduced people/things with role, grammatical gender, person, number, and allowed follow-up subjects.
- Slice 3: add positive/negative coherence fixtures from stakeholder-described failures.
- Slice 4: connect route capability entries to coherence requirements.
- Slice 5: connect coherence validation to coordinator candidate filtering.
- Slice 6: update product audit to classify incoherence as an owned blocker rather than surface diversity.

Backend proof checkpoint:

- Known bad chains fail with `arcCoherence` owner codes and repair actions.
- Valid simple chains pass.
- Candidate selection cannot choose a route that fails coherence.

UI/product checkpoint:

- The learner should start seeing conversations that feel more human: questions and answers belong together, follow-ups depend on what was said, and route returns have a reason.
- If UI lessons are diverse but still weird, the product audit must classify the failure as coherence, not diversity success.

Exit criteria:

- `a1_conversation_coherence_progression_audit_test.dart` proves positive and negative route relation cases.
- Production route selection consumes the same coherence validator as the audit.

### Milestone 8: Integrated Product Diversity And UI Proof

Primary owners: `productDiversity`, `uiEvidenceLoop`, `progressAlignment`, with dependencies on all previous owners.

Current problem:

The learner-facing product must prove that all upstream work actually changes lesson formation. A backend-only improvement is not enough if the UI does not write evidence, read current memory, or render the selected material coherently.

What must be built:

- Run backend multi-start studies with real memory writes between starts.
- Run UI-started Focus studies or widget/integration tests that use the same gateway/evidence path the app uses.
- Compare visible word reuse, memory-recognized support, support-growth blend, same-island return, same-route productive return, route change, and coherence result separately.
- Verify the UI completion path writes final proof to memory and the next start reads it.
- Verify Progress and coordinator memory agree enough that the learner's known words are not invisible to one path.
- Write a final study note that says what improved, what remains blocked, and which owner owns the remaining gap.

Implementation slices the plan must create:

- Slice 1: enhance product audit classification to separate visible reuse, intentional support, stale repeat, accidental reuse, route scarcity, metadata scarcity, and coherence block.
- Slice 2: run backend production-path starts and assert support-growth blend appears after evidence writes.
- Slice 3: run UI evidence-loop study and assert completed UI lessons affect later starts.
- Slice 4: compare backend and UI results and identify any UI/controller wiring gap.
- Slice 5: run manual app checkpoint on the server and record expected learner-visible improvements.
- Slice 6: update final notes and remaining blocker backlog.

Backend proof checkpoint:

- Product rows show known support in later lessons when viable.
- Same-island returns are advanced, refreshed, or owned blocked.
- Repetition is classified by cause, not merely by transcript hash.

UI/product checkpoint:

- The user should be able to run several Focus lessons and see at least one tangible improvement from the completed milestone set: familiar material used deliberately as support, a controlled new stretch, fewer broken surfaces, and more coherent turns.
- If this is not visible, the study must say whether the blocker is coordinator selection, generator capability, metadata readiness, compiler materialization, coherence validation, or UI evidence wiring.

Exit criteria:

- `a1_memory_led_product_progression_audit_test.dart` proves production backend progression.
- UI-started Focus proof shows completed lessons affect later selection.
- The final report lists no unowned blockers.

## Required Tests Before Completion

### Memory Profile Tests

- blank memory recommends low-load first-contact options;
- one-session saturation cools target without mastery;
- can-say/stable targets appear as support;
- weak frames ask for strengthening;
- stable frames expose upgrade axes;
- thin slot families request high-utility vocabulary;
- recent route history is visible;
- generator-ineligible rungs are blocked with owner codes.

### Coordinator Decision Tests

- seeded support/growth memory produces target bundles with support and growth;
- all-growth revisit is rejected or classified as blocker;
- same-route productive return is accepted only with real expansion;
- same-route surface-only variation is rejected;
- high-utility growth beats niche growth unless goal/topic boost applies;
- saturated targets cool down as primary focus but remain support-eligible.
- repeated exact support surfaces rotate when viable alternatives exist;
- known-but-not-mastered support outranks repeatedly used mastered anchors for support roles;
- support pool scarcity returns exact role-specific blockers instead of stale repeats;
- known lemma plus verified new form can be selected as paradigm growth;
- known lemma plus unverified new form is rejected before candidate selection.

### Arc Capability Tests

- every advertised route/rung has at least one materializable candidate;
- missing rung returns `arcCoverage.rung_unavailable`;
- one-route islands are marked incomplete for rotation;
- support-growth blend unavailable returns `arcCoverage.support_blend_unavailable`;
- route capability maps expose choice, reason, detail, sequence, and ask-back support accurately.

### Metadata And Compiler Tests

- no learner-facing `description description`;
- no learner-facing `supporting line`;
- no raw ids as definitions;
- phrase-level targets have phrase-level meanings;
- exact surface cells render for selected person/tense/form;
- verified paradigm cells exist before pronoun/person/tense/aspect expansion is selectable;
- unsupported or invented forms cannot appear in target bundles, compiler output, or UI cues;
- generic labels cannot render as sentence predicates;
- matching/role-building/bounded typing include selected targets correctly;
- final conversation cue text exists.

### Coherence Tests

- valid preference/context route passes;
- valid possession/detail route passes;
- valid activity/time route passes;
- valid reason follow-up passes only after reason-bearing prior claim;
- possession question -> desire answer without bridge fails;
- activity/time question -> object-only answer fails;
- random follow-up topic shift fails without bridge;
- "my brother" -> "what does she do?" fails with entity agreement blocker;
- masculine entity -> masculine follow-up passes when the route relation is valid;
- feminine entity -> feminine follow-up passes when the route relation is valid;
- pronoun/person/tense shifts pass only when the route declares the shift and the target form is verified;
- choice mismatch fails;
- stale same-route repeat fails.

### Product Study Tests

- backend starts show completed proof changes later selection;
- UI starts show completed proof changes later selection;
- same-island return is classified as advanced, refreshed, or blocked;
- known support appears inside later lessons;
- support-only memory starts source new A1 growth from metadata/curriculum when eligible candidates exist;
- sourced growth is written back to memory after UI completion evidence and can affect later starts;
- canonical final proof targets from the lesson contract reach target memory, surface-aware rollups, progress projection, and the next coordinator memory profile after UI completion;
- concrete component/form targets practiced in the final conversation are preserved as detail evidence and cannot replace canonical proof targets;
- Start Focus blocked screens expose exact sourced-growth blockers instead of generic no-growth wording;
- product studies report support/growth ratio and upgrade axis;
- product studies report growth source, selected growth candidate ids, rejected growth candidate ids, blocker owner, and repair action;
- remaining blockers include recommended repair and test to unlock.

### Shared Surface Tests

- coordinator progression thresholds are read from a shared policy bundle;
- route-return classification changes when the shared policy changes;
- island/route/rung capability audit and production selection read the same registry;
- adding a route capability without required metadata fails readiness validation;
- blocker codes and repair actions come from shared values used by both production and audit reports;
- audit scripts fail when a production route is not represented in the capability registry;
- no test-only path can mark a route production-ready without the shared registry and preflight checks.

## Acceptance Gates

### Memory-Led Pipeline Gate

Normal Focus candidate selection must expose the full pipeline trace from memory profile through final selection or blocker.

### Productive Route Return Gate

Same route returns must be classified and accepted only when they refresh or add a real learner-visible expansion.

### Support-Growth Blend Gate

Revisited islands must use proved support targets with new growth or refresh targets unless first-contact, refresh, or owned blocker applies.

### Growth Candidate Sourcing Gate

When memory exposes viable support but no growth or refresh candidate, the coordinator must source growth from A1-ready metadata/curriculum before blocking. Generic `coordinatorPolicy.no_memory_growth_or_refresh_candidate` is only acceptable after the source proves no eligible metadata/curriculum path exists. If metadata has candidates but they cannot be used, ownership must move to the exact missing layer: metadata readiness, route coverage, coherence, compiler readiness, or UI/memory writeback.

### Canonical Proof Contract Gate

Every normal A1 Focus lesson must expose one canonical proof contract from `learning_core`. The compiler, UI/controller, memory repository, surface-aware rollups, progress projection, and coordinator memory profile must consume that same contract. A UI completion path may record concrete practiced targets such as `daily.action.study`, `verb.walk.i`, or phrase/form details, but it must also write the canonical proof target such as `daily.activity` when the final proof contract says the learner proved it. If a canonical target disappears before rollups or the next coordinator start, the task is not complete even if concrete detail evidence exists.

### Support Rotation Gate

Support targets must rotate by role and exact surface when viable alternatives exist. If the system repeats the same support surface because no safe alternative exists, it must return the exact thin-pool, route-capability, metadata, compiler, or coherence blocker.

### Paradigm Expansion Gate

Pronoun/person/tense/aspect growth must use verified form metadata only. A known lemma may support a new form, but no unverified or invented surface may enter target bundles, compiler output, or UI cues.

### Coherence Gate

Generated conversations must pass route relation validation before rendering.

### Entity Agreement Gate

Follow-up turns must preserve entity, role, person, gender, and number agreement unless an explicit route relation declares a topic shift. Agreement failures are `arcCoherence`, not acceptable diversity.

### Coverage Readiness Gate

Production A1 islands must advertise route/rung coverage and be marked incomplete if they cannot support rotation.

### Compiler Readiness Gate

Selected candidates must prove full lesson materialization before normal Focus renders them.

### Blocker Remediation Gate

Every blocker must include owner, missing contract, recommended repair, and test to unlock.

### Shared Surface Gate

Coordinator, generator, compiler, metadata readiness, coherence validation, and audits must use shared policies, registries, helpers, or scripts for behavior that is expected to be tuned globally. The final audit must list any remaining local behavior and justify why it is intentionally local.

### Maturity Assessment Gate

The audit must grade each system layer and assign implementation scope before broad remediation.

### No Fallback Dependency Gate

Normal Focus must not pass by cycling through tiny route pools, stale repeats, all-growth island hopping, or hidden fallback behavior.

### Backend And UI Proof Gate

Production-path backend and UI studies must show that real completion evidence changes later lessons and supports the intended progression contract.

The proof must include the current operating path, not only isolated fixtures: complete a lesson, start Focus again through the production gateway, show the target bundle's `growthSource`, render or block with the precise owner, and verify any practiced sourced growth target reaches memory for later coordinator use.

## Route-Specific Growth Bundle Contract

### New Audit Finding: Abstract Growth Collapse

After Task 16E, the UI/controller path can still block after a run of completed lessons even though memory is being written and metadata-backed growth exists. The reproduced failure is not primarily stale browser state, missing final proof writeback, or lack of metadata reachability. The failure is that the coordinator and bundle planner still treat growth at the wrong level.

Current behavior after several UI-completed lessons:

- broad A1 targets such as `daily.activity`, `time.anchor`, `home.object`, `shopping.object`, `detail.size`, `predicate.like`, and `predicate.have` become can-say, stable, or cooled;
- the profile exposes many support candidates but `growthCandidatesByFamily` is empty;
- the target bundle planner may produce bundles for only a small subset of families;
- many candidate arcs then fail with `coordinatorPolicy.no_memory_growth_or_refresh_candidate`, `coordinatorPolicy.known_growth_ratio_out_of_bounds`, `arcCoverage.support_growth_bundle_no_registered_route`, or recent visible cooldown;
- the learner-visible result is either a blocked Start Focus screen or overly similar lessons before the block.

This means the system is collapsing two different ideas:

1. the learner knows the abstract slot or frame, such as `daily.activity`, `home.object`, or `shopping.object`;
2. the learner has exhausted all useful growth under that slot, including concrete values, forms, pronouns, tense/aspect variants, time anchors, places, reasons, and detail expansions.

Those are not the same. A stable `daily.activity` target should usually become support for growth under the activity slot. It should not automatically make daily activity growth disappear.

### Required Product Contract

Normal A1 Focus must build growth at layered, route-specific granularity:

```text
memory graph
-> coordinator memory profile
-> A1 growth inventory
-> route-specific growth bundles
-> coordinator route ranking
-> arc instantiation
-> compiler/materialization
```

The coordinator must not ask only "is this abstract target new?" It must ask "what concrete or form-level growth can this known abstract target safely carry in this route?"

Required layers:

- **abstract slot state**: broad targets such as `daily.activity`, `home.object`, `shopping.object`, `time.anchor`, `predicate.like`, and `predicate.have`;
- **concrete value state**: exact usable fillers such as `daily.action.study`, `daily.action.work`, `object.gazma`, `object.dawa`, `time.bukra`, and `time.delwa2ti`;
- **form/paradigm state**: verified person/pronoun/tense/aspect forms such as first-person present, first-person future, second-person question, third-person statement, plural forms, and past forms;
- **route compatibility**: whether a specific family/arc can materialize the support and growth into coherent tutor/learner turns;
- **cooldown scope**: an abstract target may be cooled as primary focus while still being allowed as support for concrete or form growth underneath it.

### Required New Shared Unit: A1 Growth Inventory

Implementation must add a shared growth inventory layer, not scattered coordinator conditionals. The inventory must be reusable by production coordinator selection, backend audits, UI/controller product studies, and future metadata-readiness checks.

Required responsibilities:

- map abstract target ids to concrete metadata-backed candidate ids;
- map known lemma or predicate targets to verified form-growth candidates;
- classify each candidate by growth axis: `slot_value`, `pronoun`, `person`, `tense_aspect`, `time_anchor`, `object`, `place`, `reason`, `detail`, or `route_context`;
- separate known concrete ids from available concrete growth ids;
- separate cooled abstract primary targets from still-available concrete/form growth under that abstract target;
- filter candidates by family and arc compatibility before the coordinator attempts that arc;
- emit selected and rejected candidate traces with owner-coded blockers.

The inventory must not invent unverified forms. If a requested person/tense/pronoun form lacks metadata, it must return a `metadataReadiness` or `formReadiness` blocker.

### Required New Shared Unit: Route-Specific Growth Bundle

The existing target bundle shape is too broad because it can describe family-level support and growth without proving that the selected route can use them. A new or upgraded bundle must be route-specific before the coordinator commits to an arc.

Required fields:

```text
bundleId
familyId
arcId
learningPressure
rung
upgradeAxis
supportAbstractTargetIds
supportConcreteTargetIds
supportFormTargetIds
growthAbstractTargetIds
growthConcreteTargetIds
growthFormTargetIds
refreshTargetIds
cooledAsPrimaryTargetIds
blockedTargetIds
growthSource
selectedGrowthCandidateIds
rejectedGrowthCandidateIds
materializationRequirementIds
supportGrowthRatio
routeCooldownState
blockerCode
repairAction
trace
```

Route-specific bundles must be built before candidate arc scoring. The coordinator must rank viable bundles, then instantiate the selected route. It must not try arbitrary routes first and only discover afterward that no bundle fits.

### Required Fallback Ladder

The coordinator must keep diversity guards without allowing the guards to block everything prematurely. The fallback ladder is:

1. same island, different route, with concrete or form growth;
2. same island, same route, only if it has real growth: new concrete filler, verified form shift, pronoun/person shift, time shift, place/detail/reason expansion, or refresh need;
3. related island with known support and route-compatible growth;
4. different island with lower cooldown pressure and viable growth;
5. owned blocked result with exact missing layer and repair action.

The coordinator may return to the same question shape only when the return materially changes the learner-visible sentence or conversational role. Slot-only novelty that merely swaps one object while keeping the same stale route several times must be rejected or classified as stale.

### Required Blocker Ownership

Generic `coordinatorPolicy.no_memory_growth_or_refresh_candidate` is not acceptable while the metadata inventory contains viable concrete or form growth. It is only acceptable after the growth inventory proves there are no eligible candidates for the selected family/route and no alternative route or island can produce a viable bundle.

Required blocker examples:

```text
growthInventory.no_concrete_growth_for_slot:daily.activity
growthInventory.no_verified_form_growth:predicate.like
routeBundle.no_materializing_arc:daily_activities/activity_time_arc
routeBundle.all_routes_recently_seen:shopping_requests
routeBundle.support_growth_ratio_impossible:people_relationships
metadataReadiness.missing_concrete_pool:home.object
formReadiness.missing_verified_form:verb.study.future.first.singular
arcCoverage.no_route_for_growth_form:verb.work.future.first
arcCoherence.no_coherent_growth_route:home_objects_possessions/request_detail_arc
```

### Required 12-Lesson Conversation Progression Study

The next implementation task must add a production-path audit that prints and asserts the final conversation shape across at least 12 UI/controller-style Focus starts with memory writes between lessons.

The report must include, per lesson:

- lesson index;
- family id;
- arc id;
- maturity/rung;
- final conversation transcript;
- support abstract/concrete/form ids;
- growth abstract/concrete/form ids;
- refresh ids;
- selected growth source;
- selected and rejected growth candidate ids;
- route cooldown state;
- diagnosis/blocker owner if blocked.

The test must not pass by only showing target ids. It must show the actual final conversation surfaces so the team can see whether lessons are changing in a learner-visible way.

Passing behavior:

- twelve lessons render final conversations through the production UI/controller-style path;
- if lessons render, later lessons must show at least one of: family change, route change, concrete slot growth, verified form growth, pronoun/person shift, time/place/detail/reason expansion, or meaningful refresh;
- `growthCandidatesByFamily` being empty cannot by itself block when the inventory has concrete or form growth under known abstract slots;
- Start Focus must not reach a generic no-growth blocker while route-specific growth bundles exist;
- exact repeated final conversation transcripts are rejected unless the row is an owned refresh/repair case.

Failing behavior that must trigger remediation:

- `daily.activity`, `home.object`, or `shopping.object` is stable/cooled and therefore no concrete growth is attempted;
- route cooldown removes all candidates even though another island has viable growth;
- a family-level bundle exists but no route-specific bundle can materialize it;
- a route-specific bundle materializes target ids but the compiler renders unrelated or incoherent turns;
- the UI completion path writes memory but the next-start bundle does not consume it.
- the 12-lesson study blocks before twelve rendered final conversations, even if the blocker is precise; a precise blocker is useful evidence for the next repair owner, not a passing product result.

## Visible Itinerary Coordinator Contract

### New Audit Finding: Hidden Novelty Can Still Look Repetitive

After Task 16F, memory writeback and route-specific growth bundles can work, but the learner can still see lessons that feel the same. The reproduced 12-lesson audit showed final conversations repeating exact simple shapes such as preference and social check-in rows even when internal target ids, growth bundles, or cooldown traces changed.

The current codebase has four concrete gaps:

- the production hardline A1 gateway passes only `recentDecisionFingerprints` into `FocusCoordinator.createA1ConversationArcFocusPlan`, even though the UI persistence layer stores a richer `visibleFingerprint`;
- `FocusCoordinator.selectA1ConversationArcCandidate` still returns the first selectable family/arc candidate instead of collecting viable candidates and ranking them by learner-visible itinerary value;
- `_a1LearnerVisibleCooldownIdentity` is too small because it uses family, opening surface, and target classes, but not full final visible transcript, final turn hashes, support surfaces, growth surfaces, or route-shape movement;
- `A1TargetBundlePlanner` support selection currently receives no recent support history, so the support anchor can keep returning to the same familiar word or predicate when other viable support exists.

This is not a memory-writeback failure. It is a coordinator selection boundary failure: the app knows what was shown, but A1 selection does not yet consume enough of that visible history before choosing the next lesson.

### Required Product Contract

Normal A1 Focus must select the next lesson through a visible itinerary layer:

```text
UI/controller recent visible signatures
-> A1 visible itinerary context
-> route-specific growth bundles
-> candidate thread materialization
-> candidate visible previews
-> itinerary scoring and hard-repeat rejection
-> selected A1 arc candidate
-> compiler/materialization
-> UI evidence writeback
```

The coordinator must not treat hidden target movement as product diversity. If the learner sees the same final conversation, opening route, and support anchors, the lesson is a repeat even when the internal target bundle changed.

### Required New Shared Unit: A1 Visible Itinerary Context

Implementation must add a shared context object consumed by production coordinator selection and audits.

Required fields:

```text
recentVisibleFingerprints
recentDecisionFingerprints
recentFamilyIds
recentArcIds
recentOpeningSurfaceHashes
recentFinalVisibleTurnHashes
recentVisibleTranscriptHashes
recentSupportSurfaceTargetIds
recentGrowthSurfaceTargetIds
recentCompletedStatuses
```

The gateway must populate this from persisted selection signatures. The coordinator must continue to accept legacy decision strings for compatibility, but normal A1 selection must prefer the richer visible context whenever it is available.

### Required New Shared Unit: A1 Candidate Visible Preview

Every route candidate that passes hard readiness checks must produce a learner-visible preview before final selection.

Required fields:

```text
familyId
arcId
maturityLevel
rung
openingTutorSurface
firstLearnerSurface
finalVisibleTurns
finalVisibleTurnHashes
visibleTranscriptHash
targetClassShape
supportTargetIds
supportSurfaceTargetIds
growthTargetIds
growthSurfaceTargetIds
refreshTargetIds
growthSource
routeCooldownState
compositionScoreTerms
bundleTrace
```

Candidate previews must be built from the actual materialized `A1BoundConversationThread`, not from an abstract desired bundle. This prevents the coordinator from counting growth that never becomes visible.

### Required New Shared Unit: A1 Itinerary Scorer

The coordinator must collect selectable candidate previews, score them, and choose the best candidate. First-selectable-candidate behavior is no longer product-correct for normal A1 Focus.

The scorer must use policy-controlled weights, not buried constants. It must be tunable through the shared progression policy bundle.

Hard rejects:

- exact recent visible transcript repeat;
- exact recent final visible turn hash sequence repeat;
- same final conversation with only hidden target or bundle differences;
- candidate whose selected support/growth bundle is not materialized into the preview;
- candidate that fails bound lesson readiness or product audit.

Penalties:

- same family as the immediately prior lesson;
- same arc as a recent lesson;
- same opening surface as a recent lesson;
- same first learner answer shape as a recent lesson;
- repeated support anchor surface;
- same target-class shape with no route or conversational-role change;
- slot-only novelty after a recent slot-only lesson;
- high coherence risk or missing route capability owner.

Bonuses:

- different island after recent same-island pressure;
- different route inside an island when support and growth are viable;
- productive return to an older island after spacing;
- verified support-growth blend;
- visible concrete growth;
- visible verified form/paradigm growth;
- pronoun/person/tense/time/place/detail/reason movement;
- support anchor reused in a new conversational context after spacing.

Selection must use this shape:

```text
candidateScore =
  memoryGrowthScore
  + supportGrowthScore
  + itineraryDiversityBonus
  + productiveReturnBonus
  - recentVisibleSimilarityPenalty
  - repeatedSupportPenalty
  - routeCooldownPenalty
  - coherenceRiskPenalty
```

The score trace must explain why the winner was selected and why strong alternatives were rejected or downranked.

### Required Support Rotation Input

Support rotation must consume recent support surfaces. The support planner must no longer receive an empty recent-support list in production.

Required behavior:

- prefer known-but-not-mastered or stable support that is route-compatible;
- downrank support surfaces used in the last few lessons;
- allow a recently used support only when it appears in a new route/context or when no other viable support exists;
- emit `supportRotation.no_alternate_support_available` instead of silently repeating the same support anchor;
- keep support rotation separate from growth selection so a known support word can carry new growth without becoming the primary focus again.

### Required Island Itinerary Behavior

The target learner experience is island hopping with productive returns:

```text
start island A
-> move to island B
-> move to island C
-> return to island A with visible growth
-> move to island D
-> return to island B with a new route or form
```

The coordinator may return to the same question shape only when the return has visible movement, such as a different route, different conversational role, new concrete value, verified form shift, pronoun/person shift, time/place/detail/reason expansion, or a clear refresh need.

The coordinator must not repeatedly prefer a route that is only marginally different when another viable route or island has stronger visible itinerary value.

### Required Blocker Ownership

The following blocker codes must be used when visible itinerary selection cannot produce a lesson:

```text
itinerary.exact_visible_transcript_repeat
itinerary.exact_final_turn_repeat
itinerary.same_route_slot_only_novelty
itinerary.no_diverse_candidate_after_scoring
itinerary.no_visible_preview_for_candidate
supportRotation.no_recent_support_context
supportRotation.no_alternate_support_available
gatewayRecentContext.missing_visible_fingerprint
gatewayRecentContext.visible_fingerprint_unreadable
```

These blockers must include enough context to repair the system: family id, arc id, transcript hash, support ids, growth ids, and the first downstream owner if the reason is actually route capability, metadata readiness, compiler materialization, or coherence.

### Required Validation

Implementation must add tests and audits that prove the new coordinator behavior, not only the data model.

Required checks:

- unit test that exact final visible transcript repeats are hard rejected even when internal growth/support ids differ;
- unit test that same-family/same-arc candidates are downranked behind viable different-family or different-route candidates;
- unit test that recent support ids are passed into support rotation and repeated support is penalized;
- gateway test that hardline A1 passes decoded recent `LearnerVisibleLessonFingerprint` context into the coordinator;
- 12-lesson UI/controller-style audit that fails normal Focus on exact repeated final transcripts;
- 12-lesson audit output that includes selected candidate score, top bonuses, top penalties, exact-repeat rejections, and selected final conversation surfaces.

Passing behavior:

- no exact visible transcript repeats in normal Focus without an explicit refresh/repair owner;
- hidden-only target movement is not counted as learner-visible diversity;
- support surfaces rotate when viable alternatives exist;
- same island returns only after spacing or visible upgrade;
- if route/generator capability blocks diversity, the report names `arcCoverage`, `metadataReadiness`, `compilerMaterialization`, or `arcCoherence` rather than hiding behind coordinator policy.

### Relationship To Later Tasks

This visible itinerary contract must be implemented before Task 17 route capability remediation. Task 17 should receive route/generator gaps only after the coordinator can prove which candidate it wanted, how the visible preview scored, and whether the route failed because of capability rather than because selection used stale recent context.

## Addendum: Typed Bootstrap, Vocabulary-Scale Metadata, Grammar Axes, And AI Composer

This addendum captures the product direction settled after the Task 22E and Task 22F seeded-generation audits. It supersedes any earlier allowance for a starter legacy arc fallback in normal A1 Focus. Legacy examples may remain in older audit text as historical context, but they are no longer an acceptable product route for the typed A1 generator.

The target learner experience is not simply "more new words." The system must help a learner reuse known vocabulary in increasingly different conversational paths:

```text
no memory
-> typed beginner bootstrap
-> typed composition using known words as support
-> cross-island recombination
-> person, tense, polarity, time, place, reason, and detail expansion
-> optional AI-naturalized dialogue that keeps the same learning contract
```

For a learner who knows only 100 words, the product should make those 100 words feel productive across many sentence shapes, pronouns, tenses, and thought depths before the system depends on simply unlocking another vocabulary list. When the learner reaches 1,000 words, the same contracts should scale by having more metadata-backed options, not by adding more one-off arc templates.

### Required Routing Contract

Normal A1 Focus must route through the typed system only:

```text
emptyMemoryRoute = typed_bootstrap
typedEligibleRoute = typed_composition
failureRoute = owned_blocker
legacyFallbackAllowedForA1Typed = false
```

The route decision must be owned by a shared generation-mode policy, not by UI conditionals, local test harnesses, or hidden coordinator branches. The policy must expose:

- whether learner memory can support typed composition;
- whether learner memory must start with typed bootstrap;
- whether the generator is blocked because metadata, memory projection, compiler materialization, surface forms, grammar axes, or coherence rules are incomplete;
- why a route was selected;
- why no legacy route was attempted.

The backend, UI, compiler, and memory writer must all consume the same route result. A UI session that renders a lesson must be able to report:

```text
generationMode: typed_bootstrap | typed_composition | blocked
selectedGrowthTargets
selectedSupportTargets
selectedGrammarAxes
selectedIslandIds
selectedPredicateFrames
semanticFactsUsed
semanticFactsWritten
candidateScoreTerms
compilerPreflightStatus
coherenceStatus
legacyFallbackAttempted: false
```

### Shared Tunable Product Rules

Every product rule likely to be tuned by future audits must live in shared policy or registry surfaces. The following surfaces are required:

- `A1GenerationModePolicy`: chooses `typed_bootstrap`, `typed_composition`, or `blocked`.
- `A1TypedEligibilityPolicy`: decides when memory is rich enough for normal typed composition.
- `A1BootstrapProgressionPolicy`: controls starter rungs, island spread, one-exchange limits, and graduation.
- `A1CompositionSelectionPolicy`: owns freshness, cooldown, support rotation, productive returns, and candidate score weights.
- `A1MetadataCoveragePolicy`: defines the required metadata contract for active vocabulary.
- `A1GrammarAxisPolicy`: gates person, tense, polarity, agreement, and answer-length expansion.
- `A1AiComposerPolicy`: controls what the AI composer may transform, omit, reorder, or reject.

These policies should expose thresholds as named fields and trace them in audits. A future adjustment such as "same predicate cooldown is too strict" or "reason clauses are unlocking too early" should require changing a policy value, not searching through candidate factories.

### Typed Beginner Bootstrap Contract

Bootstrap is the first rung of the new typed system, not a legacy fallback. It exists because an empty-memory learner cannot yet provide enough known support words, facts, or grammar axes for normal typed composition.

Bootstrap must be metadata-driven and island-aware. It may use short one-exchange lessons at the beginning, but it must still write memory in the same typed format that normal composition consumes.

Required bootstrap rungs:

```text
B0: one predicate plus one concrete argument
    example shape: "Do you have X?" -> "Yes, I have X."

B1: same simple predicate inventory across multiple islands
    example islands: possession, food/drink, places, feelings, school/work, home, visible objects

B2: simple detail expansion
    allowed details: time, place, object attribute, state, preference, topic

B3: first support relation
    allowed relations: because, before/after, at/in, with, need-for, do-when, do-not-when

B4: typed composition eligibility
    learner has enough facts, role classes, predicates, islands, and renderable candidates to leave bootstrap
```

Bootstrap graduation must be capability-based rather than lesson-count-only. A learner graduates when the projected memory can prove:

```text
minimumIslandsTouched >= 3
minimumKnownPredicateFrames >= 6
minimumKnownSemanticRoleClasses >= 10
minimumTypedSemanticFactsWritten >= 12
minimumConcreteDetailFacts >= 3
minimumReasonCompatiblePairs >= 1
minimumRenderableTypedCompositionCandidates >= 12
minimumRecentExactTranscriptRepeats == 0
```

If these thresholds are not met, bootstrap continues with productive spread. It must not repeat the same island or predicate as primary focus when viable starter alternatives exist. If viable alternatives do not exist, it must emit a blocker such as:

```text
bootstrap.no_viable_island_spread
bootstrap.no_viable_predicate_rotation
bootstrap.no_renderable_starter_surface
bootstrap.memory_writeback_missing_required_fact
```

### Memory Projection And Writeback Contract

The typed generator can only grow if memory contains more than raw surface completion. Every rendered lesson must write facts that future generation can consume.

Required projection fields:

- known and learning lexeme ids;
- semantic classes for each known lexeme;
- predicate frames proven by the learner;
- argument role facts, such as `has(person, object)` or `studies(person, topic)`;
- detail facts, such as time, place, topic, attribute, reason, condition, and preference;
- grammar axes proven by completed answers;
- recent lesson fingerprints;
- recent primary predicates, support predicates, islands, objects, and answer shapes;
- cooldown state for overused growth and support surfaces.

Required writeback fields:

- `semanticFactsWritten`;
- `predicateFramesPracticed`;
- `argumentRolesPracticed`;
- `grammarAxesPracticed`;
- `supportTargetsPracticed`;
- `growthTargetsPracticed`;
- `visibleTranscriptFingerprint`;
- `semanticLessonFingerprint`;
- `conversationShapeFingerprint`;
- `coherenceRepairOrDowngradeOwner`, when applicable.

The UI must not be the owner of semantic interpretation. It should pass completion evidence and the selected typed proof contract back to the memory writer. The memory writer should persist the facts declared by the proof contract, then audits should prove the next generated lesson can read them.

### Vocabulary-Scale Metadata Contract

The current seeded generator proves the direction, but it is still narrow because only a small group of lexemes has enough role tags, compatibility edges, affordance rows, fact rules, and surface-form rules. The next phase must turn metadata into the source of truth for generation.

Every active vocabulary item must be classified into exactly one of these states:

```text
generatable
blocked_with_owner_code
intentionally_inactive
```

Silent orphan vocabulary is not allowed. A word like `nur` must either be usable through semantic classes such as `visible_thing` or `light_source`, or it must report why it cannot yet be used.

The metadata system must use reusable semantic classes rather than one-off word branches. Required class families include:

- entities: person, place, object, substance, abstract concept;
- common object classes: readable object, writable surface, writing tool, container, device, furniture, clothing, document, household object, school object, work object, personal item, visible thing;
- resource classes: useful resource, needed resource, consumable, tool, light source;
- food and drink classes: edible item, drinkable item, meal item, preference item;
- place classes: home place, school place, work place, public place, room, destination;
- state classes: physical state, emotional state, cognitive state, need state;
- time classes: today, tomorrow, yesterday, day part, repeated time, future time, past time;
- activity classes: study action, work action, movement action, reading action, writing action, eating action, drinking action, seeing action, needing action, wanting action, having action.

Predicate frames must bind to classes, not only individual words:

```text
have(person, possessable_object)
want(person, preference_item | useful_resource | activity)
need(person, useful_resource | food_item | drink_item | place | tool)
read(person, readable_object)
write(person, writing_tool | writable_surface | document)
study(person, topic | place | study_tool | time)
work(person, place | time | tool | reason)
go(person, destination | time | reason)
see(person, visible_thing | person | place)
feel(person, physical_state | emotional_state | cognitive_state)
do_when(person, activity, time | condition)
do_not_when(person, activity, condition | reason)
```

The system may add many more frames, but these frames are the minimum product proof set because they cover multiple islands and demonstrate that the generator is no longer a school/book-only system.

Golden metadata examples must be written for both frequently used words and underused words. These examples are a quality bar, not the boundary of the metadata expansion. The expansion must also cover the current compiled A1 lexical inventory. Every active A1 item in `apps/mobile/assets/content/egyptian-arabic.json` must receive metadata derived from what the word actually is: part of speech, slot categories, situation tags, function tags, review status, and content-specific semantics. Do not force all words into the school/book/drink examples. Restaurant service items, countries, repair chunks, connectors, numbers, modifiers, payment words, utensils, places, food, drinks, verbs, and helper phrases may need different semantic classes, frames, affordances, facts, grammar axes, and coherence rules.

A golden row must include:

```text
lexemeId
surfaceForms
partOfSpeech
semanticClasses
islandMemberships
compatiblePredicateFrames
argumentRoleKinds
factPatternsUnlocked
affordanceFamilies
surfacePatternRequirements
memoryWritebackFacts
grammarAxisCoverage
coherenceRules
exampleGeneratedSentences
blockedReason, when not generatable
```

The golden examples must cover at least:

- book, bag, meat, tea, water, school, home, office, today, tomorrow, yesterday;
- history or another study topic;
- tired, hungry, thirsty, okay, confused or "do not understand";
- study, go, want, need, have, read, write, see, work;
- light or `nur` as a visible thing/light source;
- pen or `alam` as a writing tool;
- notebook as writable surface/readable object/document-like school object.

The candidate factory, follow-up planner, semantic compatibility registry, fact registry, surface planner, and coherence checks must consume this metadata. Existing hard-coded maps may remain only as transitional scaffolds while a task is actively migrating them; the plan must name the owner and remove or isolate the scaffold before closeout.

### Production Metadata Harness Contract

Metadata coverage is not sufficient by itself. The production typed generator must read the same metadata source that the app ships with, produce backend lesson payloads from it, and write memory that the next lesson can consume. A sandbox registry that passes isolated tests is useful only when it can be traced back to the production metadata source.

Authoritative current source:

```text
apps/mobile/assets/content/egyptian-arabic.json
```

For the current implementation stage, `A1LexemeMetadataRegistry.fromContentLexicalItems(...)` may act as the adapter that derives typed metadata from that JSON. The adapter must be treated as a production migration bridge, not as the final authoring model. The final product direction is that the JSON metadata itself carries the needed role tags, compatible frames, affordances, fact patterns, surface requirements, grammar axes, coherence rules, and examples with as little implicit derivation as possible.

The production harness must prove four routes:

```text
emptyMemory + real A1 metadata -> typed_bootstrap lessons
beginnerTypedMemory + real A1 metadata -> bootstrap spread and graduation readiness
seededTypedMemory + real A1 metadata -> typed_composition lessons
largerKnownWordBank + real A1 metadata -> richer island, frame, grammar-axis, and thought-depth coverage
```

Every route must print full conversation threads, not only counters. The audit must show:

```text
lessonIndex
generationMode
primaryIslandId
selectedPredicateFrameIds
growthTargets
supportTargets
grammarAxes
thoughtDepthRung
conversationShapeFingerprint
semanticFactsUsed
semanticFactsWritten
metadataSourceIds
candidateScoreTerms
rejectedOwnerCounts
conversation
```

When the intended product shape fails, the report must identify the first failing layer. Required owner buckets:

```text
metadata.active_row_missing
metadata.semantic_class_missing
metadata.predicate_frame_missing
metadata.affordance_missing
metadata.surface_pattern_missing
metadata.fact_pattern_missing
compatibility.no_frame_for_known_words
coherence.relation_rejected
compiler.surface_materialization_failed
memory.writeback_fact_missing
memory.projection_missing_known_fact
selection.exact_repeat_rejected
selection.no_fresh_candidate
grammar.axis_surface_missing
```

The harness must reject a false success where the same one or two frames keep producing lessons simply because they are the only complete metadata rows. Passing production behavior requires:

- no legacy route;
- no silent orphan A1 lexical rows;
- at least five primary islands represented across empty or beginner bootstrap audits when metadata provides viable rows;
- at least four primary islands represented across seeded composition audits when memory provides viable facts;
- multiple predicate frames per active island where metadata provides them;
- repeated words appearing in different operations, focus plans, and thought-depth rungs;
- no exact transcript repeats;
- no repeated second exchange shape unless the trace records an owned lack of alternatives;
- over-practiced support or growth targets downranked before a fresh eligible option;
- full typed facts written by one lesson visible to the next lesson.

Metadata authoring is a first-class product surface. Adding another batch of words requires a batch audit before those words count as production-ready. For every new batch, the audit must prove:

- every new word is `generatable`, `blocked_with_owner_code`, or `intentionally_inactive`;
- every generatable word declares semantic classes, island membership, compatible frames or argument roles, affordance families, fact patterns, surface pattern requirements, writeback facts, grammar axes, and coherence rules;
- every new word either connects to an existing island/role graph or declares a new island with enough starter frames to avoid being an isolated word;
- related words are interwoven bidirectionally where appropriate, such as a visible outdoor object connecting to seeing, walking, places, and description frames;
- a constrained slice audit can generate lessons from the new batch;
- a mixed audit can combine new words with previously known words without collapsing into a narrow hard-coded example.

The goal is not to hand-author finished sentence tracks. The goal is to hand-author precise metadata so the generator can make deterministic choices, explain blockers, and later give a bounded AI composer enough context to make the same lesson sound natural.

### Cross-Island Recombination Contract

The generator must not move only in linear sentence expansions such as:

```text
I study.
I study at school.
I study tomorrow at school because I work today.
```

That path is valid, but it is only one path. The system must also discover recombinations from separately learned facts:

```text
learned separately:
  I work today.
  I go to school.
  I study history.
  I have a book.

later typed composition:
  I study history at school tomorrow because I work today.
```

This requires a global proposition graph where known facts can be joined by compatible role classes, time facts, place facts, reason facts, and activity facts. The joiner must score:

- whether the growth target is required;
- whether supporting words are known and not overused;
- whether the support facts are logically compatible;
- whether the shape is fresh compared with recent lessons;
- whether the grammar axes are eligible;
- whether the compiler can materialize the conversation;
- whether the coherence validator accepts the proposition.

When the next vocabulary item in order does not fit the current island, the generator may select a later related word if it is metadata-compatible with the current growth path. The trace must record:

```text
orderedTargetSkipped
skipReason
relatedTargetSelected
relationEvidence
```

### Slot-Only Novelty Is Not Product Novelty

The production metadata generator must not count a lesson as fresh only because a new lexeme was substituted into the same conversational shell. This is a product failure even when the exact transcript hash is new. For example, these are the same dialogue shape and must share repetition pressure:

```text
What will you order?
I will order bread.
Do you want bread now?
Yes, I want bread now.

What will you order?
I will order cheese.
Do you want cheese now?
Yes, I want cheese now.
```

The selected lesson trace must therefore include two independent identities:

```text
visibleTranscriptFingerprint: includes the concrete surfaces
conversationShapeFingerprint: excludes the concrete slot filler
moveSequenceFingerprint: includes opening move, question demand, second-half shape, relation sequence, and thought-depth rung
```

Freshness scoring must penalize repeated shape fingerprints and move-sequence fingerprints even when the growth word changes. If the same word returns, the system should look for a different opening move, question demand, relation sequence, second-half shape, or thought-depth rung. If a new word appears, it still needs a non-stale conversational path unless all alternatives are blocked with owned reasons.

This contract applies globally. `want`, `need`, `have`, `go`, `order`, `see`, `feel`, `study/work`, `people`, `repair`, and future islands all use the same move families:

```text
direct_claim
situation_prompt
choice_or_contrast
detail_expansion
reason_or_constraint
sequence_or_next_event
transfer_or_affordance
repair_or_clarification
```

Islands may expose different metadata and surface patterns, but they must not introduce fixed island-specific scripts just to appear diverse. The deterministic planner should produce acceptable diversity without AI; the AI naturalizer may later make the selected move path sound more human, but it must not be required to rescue a slot-substitution loop.

### Grammar Axis Expansion Contract

Vocabulary growth and thought growth must include grammar growth. The system must not stay forever in short first-person present/future answers.

Required axes:

```text
person: 1sg, 2sg, 3sg_m, 3sg_f, 1pl, 3pl
tenseAspect: present_or_habitual, future, past
polarity: affirmative, negative
answerLength: one_clause, two_clause, three_clause, reasoned_answer
detailAxis: time, place, topic, object, state, reason, condition, contrast
```

Grammar axis selection must be gated by memory and metadata. A grammar form is eligible only when:

- the surface form is verified or has a verified production rule;
- the learner has enough known support words to make the form meaningful;
- the candidate can be materialized without inventing unknown vocabulary;
- the coherence check can evaluate the proposition;
- recent lessons have not overused the same axis.

Audits must prove that a larger word bank unlocks larger grammar coverage. A 24-round seeded audit must show at least:

- first person and second person;
- at least one third-person or plural candidate when seeded memory includes eligible forms;
- present or habitual plus future;
- past candidates when seeded memory includes eligible past forms;
- at least two answer-length rungs;
- at least two detail-axis combinations.

If the audit cannot produce those forms, it must name whether the blocker is surface metadata, grammar policy, memory projection, compiler materialization, or coherence.

### Coherence-First Candidacy Contract

Repair and downgrade are safety valves, not the primary strategy. Candidate construction should be coherence-first:

```text
build coherent proposition
-> select compatible supports
-> choose fresh conversational route
-> materialize surface
-> validate
-> repair only if a local surface issue is fixable
-> downgrade only with an owned blocker
```

The validator must reject propositions that are structurally grammatical but semantically weak when the metadata says the relation is unsupported. For example, "I need a small bag because I have a big book" is only acceptable if metadata says the bag can carry the book and the size relation is plausible. Otherwise the candidate should choose a different support relation, omit the optional reason, or report a blocker.

Coherence should be checked at multiple levels:

- role compatibility: can this predicate take this argument class?
- fact compatibility: do known facts support this relation?
- world plausibility: does the reason or condition make sense under metadata affordances?
- conversation context: does a short question such as "why?" have a visible antecedent?
- surface grammar: are pronoun, gender, tense, and agreement valid for the selected axis?
- repetition shape: is the second exchange doing a different conversational job than the first?

The deterministic system may still produce plain or slightly unnatural lines. It must not produce contextless filler, repeated same-shape follow-ups, or incoherent required relations without an owned blocker.

### Bounded AI Composer Contract

The AI layer should improve naturalness, not replace the typed product system. The deterministic system must provide a learning contract rather than a finished sentence track.

The AI composer receives:

```text
requiredGrowthTargets
allowedKnownVocabulary
allowedGrammarAxes
semanticIntent
requiredPredicateFrames
optionalSupportFacts
forbiddenTargets
maxTurns
maxUnknownWords
expectedFactsToWrite
coherenceRules
learnerLevel
recentLessonFingerprints
```

The AI may:

- choose a natural order for the dialogue;
- choose among optional known support facts;
- omit optional awkward details when the required target is still practiced;
- use a different question shape that satisfies the same semantic intent;
- make the second exchange respond to or build on the first exchange;
- make the final learner answer more natural while staying inside allowed vocabulary and grammar.

The AI may not:

- introduce unknown vocabulary beyond policy allowance;
- practice an unsupported tense, person, or agreement form;
- erase required growth targets;
- invent learner memory facts;
- bypass compiler or coherence validation;
- hide failures by returning a generic confirmation.

The AI output must be validated by the same typed proof contract:

```text
allRequiredGrowthTargetsPresent
noForbiddenTargetsPresent
unknownWordBudgetRespected
grammarAxesAllowed
semanticIntentPreserved
expectedFactsWritable
compilerPreflightPasses
coherencePasses
recentFingerprintNotRepeated
```

This means the deterministic generator remains useful without AI, and AI becomes a bounded natural dialogue composer that can make the product feel alive once the metadata and proof contracts are ready.

### Egyptian Arabic Metadata Expansion Contract

The next vocabulary expansion should nearly double the active Egyptian Arabic inventory, but the metadata must expand more carefully than the word count. New language should be added as audited world packets across the eight non-restaurant balance categories:

```text
daily_routine
home_life
school_study
movement_city
people_social
feelings_states
time_sequence
discourse_glue
```

Each packet must contain enough relational material to generate dialogue: verbs, objects, places, people, states, time/sequence words, connectors, and repair/social chunks. Adding isolated nouns is not sufficient because the planner cannot build propositions, follow-ups, or memory facts from nouns alone.

New rows must default to a conservative readiness state:

```text
metadata_only
recognition_support
bridge_safe
planner_safe
production_ready
```

The current metadata-backed bridge may only consume rows that are `bridge_safe` or higher for the exact dialogue role being generated. A row may be valid metadata and still be unavailable for production generation. This is required so a large vocabulary batch can land without destabilizing the working deterministic path.

#### Verb Family And Paradigm Contract

Every verb surface form must belong to a shared verb family and lemma. The system must not treat forms such as `bakol`, `takol`, `akalt`, future forms, and future negative forms as unrelated action words.

Each verb row must expose:

```text
verbFamilyId
lemmaId
person
gender
number
tenseAspect
polarity
speakerRoleEligibility
dialogueRoleEligibility
positiveCounterpartId
negativeCounterpartId
generationReadiness
learningPriorityScore
```

The minimum person set for future production metadata is:

```text
1sg, 2sg_m, 2sg_f, 3sg_m, 3sg_f, 1pl, 3pl
```

The minimum tense/aspect set is:

```text
present_or_habitual, past, future
```

Negative forms should be added to metadata early, but not activated broadly. Negative verb forms start as `metadata_only` unless a specific route and validator prove them safe. The first production-ready negative slice should be small and high-value, such as "I don't know", "I don't understand", "I don't want", or "I don't have". Broad negative production for every verb waits until polarity coherence, fact writeback, surface realization, and memory projection support it.

#### Existing Inventory Backfill

The expansion is also a migration of the current inventory. Existing A1 rows must be classified before their missing forms are added. The backfill must identify:

- fixed negative chunks that should keep chunk semantics but gain polarity metadata;
- positive verb forms missing negative counterparts;
- present-only forms missing person, past, or future coverage;
- bare second-person question forms that are tutor-question eligible but not learner-self-answer eligible;
- ambiguous forms such as `3ayiz` or `3ayza` that require gender/person constraints;
- helper phrases such as `ma3rafsh`, `mesh fahem`, and `mesh fahma` that should be high-priority repair/support chunks.

No code path may synthesize an unverified Egyptian Arabic conjugation. If a form is missing, the row receives an owned readiness blocker rather than a generated guess.

#### Learning Priority Contract

The metadata must make learning order explicit. Each row should carry or derive a `learningPriorityScore` from reviewed utility, combinatoric value, personal usefulness, frequency/commonness, route usefulness, and generation readiness. Candidate selection should prefer higher-priority rows when all other safety, cooldown, island-balance, and coherence constraints are equal.

Priority is not allowed to override safety. A high-priority row with incomplete paradigm metadata remains blocked or support-only until its contract is complete.

#### Balanced Island Viability Batch

The first production metadata expansion must add enough reviewed A1 rows for every expansion packet to be viable under the existing bridge. The acceptance target is not "more rows"; it is that each packet has at least six reviewed A1 rows, bridge-safe rows expose readiness and priority metadata, and the seeded 24-row audit visibly rotates beyond restaurant/service/payment.

The initial batch is allowed to skip an external physical review gate, but it is not allowed to skip automated contract gates. The batch must pass JSON loading, active vocabulary coverage, production blocker ownership, seeded 24-row composition, and mobile asset hydration tests. Negative verb forms remain metadata-only or recognition/support-only unless a future negative route explicitly unlocks them.

People and feeling/state words require role-specific safeguards. Person entities can participate in people/social and direct visibility routes, but they must not be consumed as possessed objects or object-pronoun follow-ups. Feeling/state adjectives must map to `feel_state`, not the restaurant modifier path.

#### Product Spine Reattachment Contract

The balanced metadata and 24-row bridge work are diagnostic pressure, not final product proof. The bridge proved useful product smells: restaurant drift, repetitive route shapes, weak role gates, missing verb-family metadata, and missing island balance. It must not become the product path.

The next integration segment must return the work to the main app-renderable spine:

```text
A1 production manifest
-> learner memory / rung profile
-> target bundle selection
-> generation mode decision
-> bootstrap or robust generation
-> compiler/materializer
-> UI-ready lesson payload
-> learner response handling
-> memory writeback evidence
-> next lesson consumes the written memory
```

The robust generation path, once the learner has enough support, must route through:

```text
production metadata
-> proposition graph
-> dialogue obligation
-> move-sequence planner
-> follow-up planner
-> coherence/scoring
-> realizer
-> validator
-> compiler/materializer
```

Every new audit in this segment must terminate in an app-renderable payload or a precise owned blocker explaining why renderability is not possible. An audit that produces only an abstract transcript, synthetic candidate, or bridge-only proof is diagnostic-only and cannot count as product completion.

The `metadata_backed_profile_bridge` harness may remain as a comparison and smell-test tool. Product-spine proof must fail, or mark itself degraded, when the selected lesson silently falls back to that bridge as its main generator.

#### A1 Production Manifest Role

`StarterLanguageMetadata.v1` remains the quality reference because it behaved like a small curriculum graph, not a raw vocabulary list. The new A1 production manifest must preserve that product shape while avoiding the starter file becoming the permanent scale bottleneck.

The broad compiled content JSON may remain the full inventory. The A1 production manifest is the curated product-facing promotion layer:

```text
broad content inventory
-> curated A1 production manifest
-> starter-like metadata repository / slot resolver adapter
-> product lesson spine
```

The manifest must stay balanced and starter-like:

- enough foundation, daily routine, home, school, movement, people, feeling/state, time, discourse, and food/drink coverage;
- minimal restaurant/service rows, only where they unlock high-value service affordances such as menu/check;
- explicit verb family, lemma, person, gender/number when relevant, tense/aspect, polarity, positive/negative counterpart, readiness, and learning priority metadata;
- negative forms default to metadata-only or recognition/support-only until a negative route explicitly unlocks learner production;
- no fake or synthesized Egyptian Arabic forms;
- priority order is explicit and deterministic, but never bypasses readiness, coherence, or renderability gates.

#### Bootstrap To Robust Generator Graduation

The product must support two generation modes that share contracts:

- `bootstrap`: for empty or weak memory, using a small curated slice from the production manifest and stable starter-like lesson shapes;
- `robust`: for learners with enough support memory, using the proposition graph, obligation, move sequence, follow-up, coherence/scoring, and realizer path.

Bootstrap is not a separate product universe. It must use the same manifest source, memory writeback evidence, validator expectations, compiler/materializer, and UI payload shape. Its difference is generation depth: bootstrap chooses safer targets and simpler routes while it creates the memory needed for robust composition.

Graduation must be memory/readiness based, not a fixed lesson count. The policy should consider:

- support-word breadth across islands;
- at least a few seen verb families and answer-shape forms;
- known noun/place/state anchors;
- successful memory writeback evidence from prior lessons;
- target bundle viability without overloading growth;
- current route capability and compiler materialization readiness.

If graduation readiness is not met, the coordinator should remain in bootstrap or choose a repair/refresh route. It should not force robust generation and then rely on hidden fallbacks to make the lesson render.

#### Existing Contract Preservation

The final integration segment must be integration by inventory, not reinvention. Existing memory, rung, coordinator, compiler, validator, metadata, coherence, and UI payload contracts must be classified before new product wiring is written.

Every relevant middle contract should be marked as one of:

- `product_spine`: required in the app-renderable lesson path;
- `diagnostic_scaffold`: useful for audits or comparison only;
- `legacy_fallback`: allowed for app survival but not product proof;
- `retirement_candidate`: no longer used after the product path is proven.

The new production-manifest path must not bypass existing contracts by generating transcripts directly. If the manifest cannot pass through target selection, graph/planner/coherence, compiler/materializer, UI payload, or memory writeback, the audit should expose the first failing owner rather than building around it.

#### Current Product Shape Understanding

As of the product-spine reset:

- the mobile app's default content loader still loads `assets/content/egyptian-arabic.json`;
- surface-aware progress projection and many backend tests still default to `StarterLanguageMetadata.v1`;
- the 24-row metadata audit is backend code, but it is a transitional bridge proof because its trace includes `metadata_backed_profile_bridge`;
- the A1 production manifest is backend-readable through `A1ProductionMetadataSource`, but it is not yet the source used by the real coordinator/generator path;
- the bridge shaping work applies as acceptance criteria, not as final product architecture;
- the next proof must show production manifest lessons materialize into UI-ready payloads and write memory that the following lesson consumes.

#### First-Class A1 Product Coordinator

The next integration segment should not keep patching the old `FocusCoordinator` until it happens to behave like the intended product spine. The old coordinator is allowed to remain in the codebase as a legacy comparison path, but it must not be the route that satisfies product-spine proof. The first-class A1 path needs a new coordinator boundary, tentatively `A1ProductCoordinator` or `A1ProductSpineCoordinator`, whose only responsibility is to pull the product-spine components together in sequence.

The new coordinator must start from clean product inputs:

```text
production metadata repository/source
surface-aware memory graph or memory profile
recent visible lesson history
generation policy/configuration
learner profile, when needed for forms
```

and produce clean product outputs:

```text
selected mode: typedBootstrap | typedComposition | blocked
UI-ready lesson payload or owned blocker
trace ledger naming every participating component
proof/writeback contract for accepted completion
visible transcript and semantic fingerprints
```

The new coordinator must not call the hardline A1 arc catalog/instantiator as a way to make a lesson render. If typed bootstrap cannot produce a renderable lesson, the product path returns a bootstrap-owned blocker. If robust typed composition cannot satisfy graph, obligation, move sequence, follow-up, coherence, realizer, validator, or compiler preflight, the product path returns the first owned blocker. A passing product proof fails if it succeeds by falling back to the old arc generator, metadata-backed bridge transcript, or any hidden legacy seed/routine path.

The old `FocusCoordinator` can still be mined for useful pieces:

- compiler/materializer handoff patterns;
- visible fingerprint and repeat-prevention helpers;
- trace conventions that are still useful;
- memory graph and surface-aware rollup adapters;
- validation/preflight checks that are product-agnostic.

Those pieces should be copied, wrapped, or extracted into shared helpers only when the new coordinator needs them. The old coordinator's branching shape, fallback behavior, and hardline arc materialization should not be inherited as the new product architecture.

The mobile gateway should eventually select the new coordinator for normal A1 Focus. During the migration, tests may instantiate the old coordinator for comparison, but product-path audits must clearly label that as `legacy_comparison` or `legacy_fallback`. The default app path should not be flipped to the new coordinator until typed bootstrap can render, write memory, and feed the next lesson through the same payload contract.

#### Full Backend Product Path Integration Contract

The next product proof must answer the whole-system question, not another component-local question: can the backend path the app will use keep producing app-renderable lessons, write memory, consume that memory, and continue growing the learner across vocabulary, islands, rungs, grammar axes, and thought complexity?

The canonical backend path is:

```text
production metadata source
-> memory/rung profile
-> target bundle
-> generation mode policy
-> bootstrap or robust generator
-> proposition graph
-> dialogue obligation
-> move-sequence planner
-> follow-up planner
-> coherence/scoring
-> realizer
-> validator
-> compiler/materializer
-> UI-ready payload
-> memory writeback
-> next lesson consumes memory
```

This canonical path is owned by the new A1 product coordinator. A product-path audit cannot count a component as satisfied because the old `FocusCoordinator` emitted a similar trace term while using hardline arc materialization. Each component counts only when the new coordinator invokes it or returns its owned blocker.

The UI is the visualizer and evidence submission surface for this phase. It should not own progression, island selection, route repair, grammar-axis unlocking, or generator fallback decisions. If the backend product path can produce many renderable lessons and write/read memory correctly, the UI can be reattached afterward with a much smaller proof surface.

A component counts as product-wired only when all of these are true:

- the app-path backend invokes it through the production gateway or the same compiler path the UI will hydrate;
- the participation audit observes its trace, selected value, rejection owner, or emitted payload field;
- a focused input/output test proves the component's local responsibility;
- an app-path before/after test proves the rendered lesson, trace, blocker, or writeback changed for the intended product reason;
- failures report the first missing owner and at least one repair route instead of silently falling back.

The deterministic system is allowed to sound plain while this gate is being proven. The required behavior is that it can keep running and expose growth movement:

- more known words become support instead of disappearing;
- new growth words enter in bounded batches;
- lessons move through rungs and thought-depth demands;
- eligible verbs appear across person/pronoun, tense/aspect, and polarity when metadata and learner readiness allow it;
- definite/indefinite forms, connectors, places, people, objects, states, time anchors, and discourse glue participate without one island dominating;
- same words can recombine into different operations, answer shapes, and follow-up routes;
- exact repeats, same-shape loops, and long-run route starvation are owned blockers.

If a long-run proof blocks after six lessons, twenty-four lessons, or any other count, the audit must identify the first failing product owner. A blocked run is useful only when it says which layer stopped the product path: metadata readiness, adapter parity, memory projection, target bundle selection, generation mode policy, route capability, proposition graph, dialogue obligation, move-sequence planning, follow-up planning, coherence/scoring, realizer, validator, compiler/materializer, UI payload readiness, or memory writeback.

#### First-Class Product Lesson Compiler Contract

The compiler/materializer is not a transcript formatter and not a legacy rescue path. It is the product contract boundary between selected lesson idea and app-renderable, memory-writable lesson. A candidate is not a lesson until this boundary proves all three product obligations:

```text
renderable by the UI
provable by the learner
writable/readable by memory
```

The first-class compiler, tentatively `A1ProductLessonCompiler`, should consume structured product data:

```text
generation mode and growth mode
selected bootstrap typed plan or robust dialogue candidate
proposition graph / graph fingerprint
dialogue obligation ids
move-sequence plan and move ids
follow-up plan/opportunity metadata
realized surface turns and turn metadata
target bundle: support, growth, refresh, shape, route, grammar
metadata source ids and required metadata ids
recent route/fingerprint context
memory profile snapshot needed for proof/load decisions
validator and scoring output
```

and emit one compiled package:

```text
A1CompiledLessonPackage
  UI-ready lesson payload
  stable stage ids, turn ids, box ids, and expected learner actions
  proof contract
  memory writeback contract
  source metadata ids
  route/frame/fingerprint ids
  generation and growth traces
  compiler diagnostics
```

The compiler must carry proof roles explicitly. A visible target must be classified as one of:

- final learner proof;
- bounded typing/form production;
- guided use;
- learner-visible exposure;
- tutor-only exposure;
- distractor exposure;
- support-only target;
- growth target;
- refresh/repair target;
- semantic role target;
- semantic fact target;
- grammar/form target;
- route/frame/fingerprint target.

The UI may render the lesson through an adapter, but the compiler owns the canonical proof/writeback semantics. The UI must not infer pedagogy from transcript strings, and the memory writer must not decide after the fact whether a target was support, growth, tutor-only exposure, or final proof.

The compiler must fail closed with owned blockers. Examples:

```text
compiler.structured_input_missing
compiler.ui_stage_missing
compiler.final_conversation_missing
compiler.proof_contract_missing
compiler.writeback_contract_missing
compiler.semantic_fact_missing
compiler.semantic_role_missing
compiler.grammar_axis_missing
compiler.verified_form_missing
compiler.route_fingerprint_missing
compiler.metadata_source_missing
compiler.legacy_materializer_attempted
```

A coherent candidate with only visible turns should fail with a compiler owner, not become a product lesson. A grammatically plausible but unverified Egyptian Arabic form should fail with `compiler.verified_form_missing`, not be synthesized. A candidate that needs the old `FocusCoordinator`, hardline A1 arc catalog, metadata-backed bridge, seed/routine fallback, or old compiler preflight to render should fail with `compiler.legacy_materializer_attempted`.

The compiler must not become a second generator. The generator chooses the target/route/candidate. The compiler proves, packages, or rejects. The compiler may normalize IDs, assemble stages, and validate contract completeness. It may not change the selected route, add new growth targets, invent semantic facts, or parse semantic meaning back out of transcript text.

The same compiler boundary must serve all current and future lesson sources:

```text
typed bootstrap candidate -> A1ProductLessonCompiler -> UI/memory lesson
robust typed candidate -> A1ProductLessonCompiler -> UI/memory lesson
future AI candidate -> A1ProductLessonCompiler -> UI/memory lesson
```

This is the required seam for later AI augmentation. AI may propose a more natural candidate, but deterministic compiler, validator, proof contract, and memory writeback decide whether it becomes a lesson.

Compiler readiness is not proven by a local compile test alone. The minimum product proof is:

```text
selected candidate compiles
compiled package exposes UI stages
compiled package exposes proof contract
compiled package exposes memory writeback contract
completion writes memory
next lesson consumes that memory
no legacy fallback, bridge transcript, or old arc materializer participated
```

Task 22Q implementation note: the first backend compiler slice now exists as `A1ProductLessonCompiler`. It rejects transcript-only input, fails closed with `compiler.*` owners for missing structured proof data, compiles bootstrap typed plans and robust dialogue candidates into `A1CompiledLessonPackage`, emits UI-stage/proof/writeback/metadata/fingerprint data, and is wired into `A1ProductCoordinator` for backend bootstrap and robust composition tests. This does not yet prove the current mobile session controller can hydrate the compiled package or that repository read projection consumes every compiler-written target. Those remain the next product-path integration gates.

#### Product Spine Progression Audit Harness Contract

Before the mobile UI adapter becomes the final product proof, the backend needs a readable progression harness that acts like a flight recorder for the learning spine. Its purpose is not to make lessons prettier. Its purpose is to show whether the deterministic backbone can keep advancing a learner, and to name the first owner when it cannot.

The harness must run the product path as far as the current worktree supports:

```text
scenario preset
-> metadata lane or vocabulary subset
-> starting memory state
-> A1ProductCoordinator
-> A1CompiledLessonPackage
-> simulated learner completion from the compiler proof contract
-> memory writeback ledger
-> memory reload/projection
-> next lesson consumes projected memory
-> repeat
```

If the coordinator currently exposes only the compiled payload and not the full `A1CompiledLessonPackage`, the harness must make that gap visible. The repair is to expose the package or a package-compatible audit view from the product coordinator result, not to parse proof roles back out of transcript text.

The report must be readable by a product reviewer and precise enough for an engineer. It must include four layers:

1. Run summary:
   - requested lesson count and completed lesson count;
   - first blocker and blocker owner, if the run stops;
   - whether any legacy, bridge, seed/routine, or old arc fallback participated;
   - memory-write count, memory-projection count, and projection mismatch count;
   - diversity trend across islands, route frames, shapes, pronouns, tense/aspect, polarity, connectors, and thought-depth demands;
   - growth-mode trend across lexical, form, relation, composition, thought-depth, refresh, and blocked.
2. Lesson timeline:
   - full final tutor/learner conversation for every generated lesson;
   - generation mode and growth mode;
   - primary island, route/frame/fingerprint ids, support targets, growth targets, grammar axes, semantic facts, and semantic roles;
   - why the selected growth mode won and why the other growth modes did not;
   - selected candidate score terms and first rejected-owner buckets when candidates are rejected.
3. Memory ledger:
   - for each target, before state, lesson role, planned writeback kind, raw written state, projected read state, and whether the next lesson consumed it;
   - separate rows for final learner proof, bounded typing/form production, guided use, learner-visible exposure, tutor-only exposure, distractor exposure, support-only, growth, semantic role, semantic fact, grammar/form, and route/fingerprint targets;
   - explicit diagnosis when raw memory writes exist but projection does not expose them to the next lesson.
4. Rule pressure and blocker report:
   - whether lesson generation is blocked by metadata readiness, verified form readiness, memory projection, growth-mode policy, target bundle selection, route novelty saturation, proposition graph, dialogue obligation, move-sequence planning, follow-up planning, coherence/scoring, realizer, validator, compiler, UI payload readiness, or memory writeback;
   - whether the system is blocked because rules are too strict, metadata is too thin, memory did not advance, or route/fingerprint diversity is saturated.

The harness must include scenario presets:

- brand-new learner: proves bootstrap start, first writeback, and no legacy fallback;
- small vocabulary subset: proves the system can expand thought/form complexity instead of relying on endless lexical variety;
- composition-ready learner: proves enough known memory unlocks robust typed composition;
- large vocabulary manifest: proves more vocabulary increases island and route breadth without returning to restaurant drift;
- saturation/fallback-pressure learner: proves route novelty, repeated-shape rejection, blocker ownership, and no hidden fallback success.

Each scenario must make the expansion contract visible. For every lesson, the report must answer:

```text
Why lexical growth?
Why not form growth?
Why not thought-depth growth?
Why not relation/composition growth?
Why not refresh/repair?
Which thresholds, caps, or missing readiness facts decided this?
```

The harness is allowed to simulate completion from the compiler proof contract before the mobile UI adapter lands. That simulation must use compiler-emitted proof/writeback roles, not transcript inference. Once the app adapter lands, the same harness should be able to swap its memory writer/projection seam to the real repository path.

Passing this harness does not mean the UI is done. It means the backend learning spine is debuggable: when the product does not progress, the report names whether the next priority is memory write/read parity, growth-mode policy, metadata readiness, route/fingerprint variety, coherence strictness, compiler payload completeness, or app adapter work.

Task 22R implementation note: the first progression harness now exists as `A1ProductSpineProgressionAudit` with a CLI at `packages/learning_core/tool/a1_product_spine_progression_audit.dart`. It can generate a Markdown report for brand-new, small-vocabulary, composition-ready, large-vocabulary, and saturation scenarios. The generated brand-new learner report now runs the backend product spine with no legacy fallback, prints full tutor/learner conversations, writes memory from `A1CompiledLessonPackage`, reloads projected memory, records growth-mode decisions, reports blocker pressure, and includes transition diagnostics. The latest long-run finding is intentionally not a pass, but the blocker moved: adding a sixth bootstrap predicate frame lets policy advance to `relationGrowth` at lesson 9 and lets generation exit bootstrap at lesson 13 with the first non-bootstrap route also at lesson 13. The compiler now materializes contextual typed-composition move sequences, and typed composition now honors recent route fingerprints. The current report therefore records no repeated transcript/route, then blocks before lesson 15 with `arcCoherence.same_route_stale_repeat`. The product implication is that graduation should be route-capacity-aware and bootstrap should likely continue through a richer contextual starter tier until typed composition can prove enough valid, non-repeating, renderable candidates for the learner state. This is still backend simulated completion. It does not yet prove the mobile session controller hydrates the compiled package or that the real repository projection exposes every compiler-written target.

Task 22S implementation note: the typed composition readiness sweep now exists as `A1TypedCompositionReadinessSweep` with a CLI at `packages/learning_core/tool/a1_typed_composition_readiness_sweep.dart`. It seeds descending saved-memory states, reports the current policy gate from derived readiness, then forces typed-composition readiness to probe actual route capacity from the same saved facts. The generated report at `docs/superpowers/audits/2026-06-05-a1-typed-composition-readiness-sweep.md` shows no current seed satisfies the 6-lesson meaningful floor. A rich 32-fact saved-memory seed now covers the current coherent factory fact hooks across 10 seed islands, 10 predicate frames, 17 role classes, and 5 reason-compatible pairs; it is the strongest current seed, but still produces only 5 clean typed-composition lessons, touches only 3 output islands, and then blocks with `arcCoherence.question_focus_unanswered`. The older full 12-fact seed also produces 5 clean lessons, then blocks with `arcCoherence.same_route_stale_repeat`; lower seeds can probe 3-5 routes when forced, but current policy correctly keeps them in bootstrap. A compiler focus bug found by the sweep was fixed so broad saved memory no longer turns a possession/use route into `Do you study? / What do you need?`. The remaining blocker is not basic saved-memory ingestion. Richer memory is accepted, but candidate/coherence/compiler coverage still converts too little of that memory into valid, non-repeating, renderable routes.

#### Progression Gate Harness Contract

The product-spine report must now graduate from descriptive audit to progression gate diagnosis. A transcript report is useful, but it can still lead to local patching: "fix this repeated prompt" or "add one more route." The harness must instead answer which large product capability is underdeveloped and what bundle of work should come next.

The gate layer must evaluate the same backend run against these product axes:

- bootstrap exit: whether a learner leaves bootstrap only when typed composition can sustain valid output;
- vocabulary growth: whether new high-value lexical targets are introduced, written, reused, and eventually stop dominating when support is sufficient;
- rung/thought-depth growth: whether the learner reaches relation, reason, contrast, sequence, planning, correction, or ask-back demands;
- grammar/form growth: whether person, tense/aspect, polarity, definiteness, and bounded form production are reachable when metadata supports them;
- route novelty and saturation: whether route families, move sequences, openings, answer demands, second-half shapes, and visible transcripts avoid stale loops;
- semantic use: whether semantic facts and role memory shape later lessons instead of remaining inert writeback;
- compiler/writeback: whether selected lessons carry enough proof, writeback, route, grammar, and metadata fields for the next lesson to consume;
- failure explanation: whether every blocked run names the first failing owner and recommends a repair area.

Each gate must render a status:

```text
pass: behavior is demonstrated in this scenario
warning: behavior appears partially wired but weak or narrow
fail: behavior blocks progression or repeats despite available alternatives
unmeasured: this scenario cannot prove the behavior yet
```

The report must end with a next-work decision. This decision must be a large repair bundle, not a small patch. Examples:

```text
typed_generator_expansion_bundle:
  add and generalize route packets, answer-demand patterns, move sequences,
  surface realization, coherence acceptance, and route-family scoring together

growth_rung_controller_bundle:
  add capacity-aware axis arbitration, rung forcing scenarios, grammar/form
  readiness probes, and cooldown rules together

compiler_ui_parity_bundle:
  wire compiled packages through the real app gateway, evidence writer,
  repository projection, and progress display together
```

This gate layer is the protection against endless small iteration. A future implementation task should be accepted only if it moves a named gate from fail to warning/pass or makes an unmeasured gate measurable. A prettier transcript is not enough if the gate state does not improve.

#### Typed Generator Expansion Blocker Audit And Guardrail Contract

When the progression gate report recommends `typed_generator_expansion_bundle`, the next audit must decompose that bundle into exact failing surfaces. The report must answer:

```text
When route novelty fails, why did the product path not select another valid lesson?
```

The answer must be grounded in typed generator evidence, not transcript impressions. The audit should separate:

- route packet coverage: which route families, move sequences, answer demands, and thought-depth rungs exist today;
- fact compatibility: whether written semantic facts can feed more than one packet family;
- surface realization and compiler acceptance: whether candidate packets can produce verified surfaces and compiled proof/writeback contracts;
- coherence and anti-repeat: whether candidates are blocked by bridge/follow-up logic, same-visible-transcript pressure, stale move sequences, or repeated answer demand;
- scoring and rerouting: whether valid alternatives lose because the scorer over-prefers a saturated pocket;
- rung and grammar readiness: whether product moves such as contrast, sequence, ask-back, person shift, tense shift, or negative/polarity practice have enough valid candidates to be selectable.

The audit must also protect the product from gaming its own scoreboard. Product movement is an obligation, not permission to emit bad lessons:

```text
desired growth axis != generation permission
```

A gate cannot pass because a target move merely appears in the transcript. It passes only when the move:

1. is selected from a typed candidate;
2. has enough candidate capacity to avoid a new narrow loop;
3. survives semantic compatibility, metadata/form readiness, typed coherence, anti-repeat, proof-burden, and compiler gates;
4. carries proof/writeback targets that future lessons can consume;
5. does not increase generic prompts, incoherence, stale repetition, or forced unnatural dialogue.

If a desired product move such as contrast or sequence has no valid candidates, the product path should block with an owned reason or degrade intentionally to the next best valid growth axis. It must not force a malformed contrast or sequence just to satisfy the gate.

The blocker audit must end with an actionable repair sequence. This sequence should still be bundle-sized, but specific enough to implement:

```text
1. Expand route packet capacity for the missing route/rung families.
2. Add move-sequence and answer-demand coverage for those packets.
3. Add surface realizer and compiler acceptance for the new typed shapes.
4. Add typed coherence fixtures proving good candidates pass and bad forced moves fail.
5. Add scoring/rerouting pressure so saturated route pockets lose to valid alternatives.
6. Re-run progression gates and accept only if route novelty improves without safety regressions.
```

#### Rung-Aware Learning Trajectory Contract

The next product spine stage must make learner trajectory first-class. The system should not merely escape repeats. It should choose the next lesson direction because the learner's current rung, memory, recent history, and available material make that direction pedagogically appropriate.

The required decision order is:

```text
learner memory and proof state
-> rung placement and rung floor
-> candidate growth directions at that rung
-> capacity proof for each direction
-> selected learning trajectory move
-> route packet / move-sequence / follow-up candidate selection
-> coherence, anti-repeat, compiler, proof/writeback gates
-> lesson
```

This order matters. A growth direction must not drop the learner below their current rung floor just because a lower-rung candidate is easier to render.

Examples:

```text
rung-5 learner + tense_shift desired
  allowed: rung-5 tense shift with contextual claim/reason/sequence support
  not allowed: beginner "Do you study? / Yes, I study." tense reset

rung-5 learner + contrast desired but no rung-5 contrast candidates
  allowed: intentionally degrade to another rung-5 move such as detail, sequence, or neighboring island
  not allowed: use rung-1 contrast just to claim contrast growth

brand-new learner
  allowed: rung-1/rung-2 typed bootstrap because the learner has not proved higher support yet
```

The trajectory layer must distinguish:

- **rung placement**: current rung floor, allowed stretch rung, refresh/repair exception, and blocked rung owners;
- **growth direction**: vocabulary, detail, reason, contrast, sequence, choice, ask-back, person shift, tense/aspect shift, polarity shift, neighboring island, or refresh/repair;
- **capacity**: number of candidates at or above the rung floor that pass metadata, fact compatibility, move-sequence, surface realization, coherence, anti-repeat, compiler, and proof/writeback gates;
- **material readiness**: whether authored material contains enough facts, forms, surfaces, micro-situations, examples, and priorities for the desired move;
- **system readiness**: whether the code has packets, planner rules, scoring, rerouting, realizer support, coherence rules, and compiler acceptance for the desired move.

The first-class artifact should be a modular trajectory decision, not a scattered set of scoring constants:

```text
A1LearningTrajectoryPlanner
A1LearningTrajectoryPolicy
A1RungPlacementPolicy
A1NextMoveRegistry
A1TrajectoryCapacityAuditor
A1MaterialCapacityReport
```

These names are provisional, but the responsibilities are not. Each must be swappable and auditable:

- rung thresholds and rung names must live in one policy/registry surface;
- next-move definitions and priority rules must live in one registry/policy surface;
- capacity thresholds must be visible and tunable;
- material blockers must use owner codes that distinguish missing authored material from missing generator code;
- scoring must consume the trajectory decision rather than burying product direction in candidate score side effects;
- reports must print the selected rung, selected growth direction, rejected directions, downgrade reason, and capacity counts.

The trajectory planner may downgrade, but only within product constraints:

```text
preferred: rung-5 contrast
blocked: material.contrast_capacity_too_low
degraded: rung-5 sequence
not allowed: rung-1 contrast
```

The planner must also be able to say "material is the blocker." If a move is pedagogically correct and system code supports it, but the material lacks compatible facts/forms/surfaces, the repair is material expansion, not more coordinator tuning.

Examples of material owner codes:

```text
material.contrast_capacity_too_low
material.sequence_pair_missing
material.reason_pair_too_narrow
material.person_shift_forms_missing
material.tense_shift_forms_missing
material.polarity_forms_missing
material.micro_situation_missing
material.island_balance_too_narrow
```

Examples of system owner codes:

```text
trajectory.no_ready_move_at_rung
trajectory.rung_floor_downgrade_blocked
routeCapacity.packet_missing_for_move
dialogueMovePlanner.sequence_missing_for_move
surfaceRealization.move_surface_missing
coherence.move_validation_missing
scoring.reroute_not_available
```

Task acceptance must be based on trajectory evidence, not transcript count alone. A report that adds three more lessons but still cannot show rung-aware move selection is not a pass.

#### Material Capacity Upgrade Contract

If trajectory diagnostics prove material is the limiting factor, the project should perform a large, structured A1 material capacity upgrade. This upgrade must be capability-led, not vocabulary-stuffing.

Material expansion should add or harden:

- contrast pairs across multiple islands;
- sequence-compatible event pairs;
- reason-compatible fact pairs;
- place/time/detail facts;
- choice pairs and ask-back/social routines;
- person-shift examples and forms;
- tense/aspect examples and forms;
- polarity/negative examples and forms;
- surface patterns and verified learner-answer forms;
- micro-situations;
- priority ordering and island balance;
- examples that prove the same capability works outside one topic pocket.

The material report must compare before/after capacity by move and rung:

```text
contrast_growth at rung 4+
  before: 1 usable candidate across 1 island
  after: 6 usable candidates across 3 islands

sequence_growth at rung 5+
  before: 0 usable candidates
  after: 5 usable candidates across 2 islands
```

Material upgrade is only complete when the typed generator can consume it through the normal path. A material row that cannot become a typed candidate, pass coherence, compile, write proof, and affect the next lesson is not product-ready material.

#### Metadata Source And Adapter Parity Contract

The JSON manifest is the authored production data source. Dart-native metadata is the execution representation. The product should not maintain two divergent vocabularies.

If the JSON manifest can be interpreted or compiled into the same `LanguageMetadataRepository` behavior as the strong starter data, the implementation priority is adapter parity, not hand-maintaining a second Dart vocabulary. A generated Dart cache is acceptable only when it is deterministic output from the JSON source, clearly marked as generated or derived, and covered by parity tests.

Metadata parity must prove representative rows resolve through the same product surfaces:

- lexical identity, island identity, readiness, and priority order;
- semantic type, predicate frame, situation, micro-situation, and route capability;
- learner-production eligibility versus recognition/support-only eligibility;
- person/pronoun, tense/aspect, polarity, definiteness, and surface-form availability;
- support/growth/refresh targeting and blocker ownership.

If native Dart starter data appears to work better, the audit must name whether the advantage comes from richer fields, stronger defaults, code-only behavior, or missing JSON adapter logic. The repair should move that behavior into the shared metadata contract rather than preserving a hidden native-only path.

#### A1 Core Capability Pack Contract

The next material phase must create a curated A1 core capability pack, not a blind vocabulary import. The pack is the testable bridge between the broad legacy content asset, the newer A1 production manifest, the typed generator, and the product-spine harness. Its job is to prove that strong metadata can drive the intended product behavior through the real path before broad vocabulary expansion continues.

The authored source should be JSON because it is easier to review, diff, validate, and maintain over time than hand-authored Dart. Dart-native metadata remains the execution representation, quality reference, and optional generated/cache surface. The product should not maintain two independently authored vocabularies.

The capability pack should live at:

```text
apps/mobile/assets/content/egyptian-arabic-a1-core-capability-pack.json
```

This file must not become active by filename alone. It is production-ready only when adapter tests prove it can enter the same product path as the current app metadata:

```text
curated JSON capability pack
-> A1ProductionMetadataSource or A1CoreCapabilityPackSource
-> A1LexemeMetadataRegistry and LanguageMetadataRepository
-> A1MaterialCapacityAudit
-> A1LearningTrajectoryPlanner
-> typed route packet candidate generation
-> first-class product lesson compiler
-> memory writeback simulation
-> next-lesson product-spine audit
```

The pack must include first-class capability data, not only lexical rows:

- lexemes with island identity, learning priority, readiness, part of speech, canonical Franco Arabic, accepted Franco variants, support/growth eligibility, and product status;
- verified forms for verbs and predicates, including lemma/family id, person, number, gender where relevant, tense/aspect, polarity, role eligibility, positive/negative counterpart ids, and readiness;
- semantic facts that can be written by the compiler and consumed by the next lesson;
- relation pairs for reason, contrast, sequence, place/time/detail, choice, and social ask-back moves;
- capability targets that map material to trajectory moves such as lexical growth, detail growth, reason growth, contrast growth, sequence growth, person shift, tense shift, and polarity shift;
- surface examples that prove the material can be realized without inventing Franco Arabic;
- readiness flags that prevent metadata-only or recognition-only forms from becoming learner-production targets too early;
- deterministic priority order so the system targets the highest-value next words and forms first.

The first pack should cover the eight non-restaurant A1 product islands as a balanced core:

```text
daily_routine
home_life
school_study
movement_city
people_social
feelings_states
time_sequence
discourse_glue
```

Food/drink and restaurant material may appear as support only when needed for reusable A1 capability proof. They must not dominate the first capability pack or hide island weakness.

The first pack must target enough material to test the system, not the final full dictionary:

```text
6-10 useful words per core island
10-15 verb/predicate families with verified form coverage
12-16 reason-compatible relation pairs
12-16 contrast-compatible relation pairs
10-12 sequence-compatible relation pairs
5-8 polarity/negative rows, defaulting to non-production readiness unless explicitly unlocked
```

Old metadata is a harvest source, not a source of truth. Existing rows should be classified before inclusion:

```text
keep_as_is
keep_but_transform
use_as_reference_only
reject_for_now
```

Rows are allowed into the new capability pack only when they serve a named product capability and can be validated through the adapter. Useful existing work should be reused, but transcript-only, unreviewed, over-restaurant, borrowed-brand, or semantically vague rows should not enter the new pack just because they already exist.

The acceptance gate for this phase is not "more words." It is a material-capacity and product-spine proof:

- material capacity blockers for reason, contrast, sequence, tense/person, polarity, and island balance improve or clear with exact before/after counts;
- product-spine scenarios advance farther than the current material-limited baseline;
- rich-memory and rung-5 scenarios produce rung-appropriate typed lessons instead of resetting to beginner shapes;
- generated/debug English surfaces remain acceptable only as audit readability, while product rows carry verified Franco Arabic surfaces for compiler/UI rendering;
- failures return owned blockers that distinguish missing material from missing route packets, scoring policy, coherence, compiler, or memory writeback.

#### Swappable Component Contract

Every product-path component that stakeholders are likely to tune must be replaceable behind a small interface, strategy, adapter, registry, or policy object. Replacing one implementation should require changing the injection/constructor/provider binding and adding the new implementation, not rewriting the rest of the pipeline.

Shared trace keys and owner codes are part of the interface. A new coherence validator, follow-up planner, generation policy, metadata source, or scoring policy must be able to drop in while preserving:

- input contract shape;
- output or blocker shape;
- trace field names;
- product-path participation audit visibility;
- compiler/materializer and memory writeback compatibility.

This is required for deterministic iteration now and for the later bounded AI augmentation layer. AI may eventually make lessons more natural, but it should consume the same deterministic contract: allowed vocabulary, growth targets, support facts, grammar axes, dialogue obligations, expected facts to write, and coherence rules.

The new A1 product coordinator is the place where this swappability is enforced. It should depend on constructor-injected or provider-injected collaborators for metadata source, memory index builder, target planner, generation mode policy, bootstrap generator, robust generator, coherence validator/scorer, realizer, validator/preflight, compiler adapter, and writeback contract builder. If `A1CompositionMemoryIndex`, the follow-up planner, or the coherence validator proves outdated, replacing it should mean swapping a collaborator and updating its tests, not editing unrelated coordinator stages.

#### Limited Vocabulary Stress Lane

Large metadata makes route scarcity less visible. The product path also needs a small, strong metadata lane that proves the system can grow complexity with limited words.

This lane should use a compact starter-like source, either Dart-native or JSON-derived through the same adapter, with high-quality metadata for a limited vocabulary. It must prove that the backend can reuse known words more deeply before relying on a large word bank for variety. Passing behavior includes movement across person/pronoun, tense/aspect, polarity, connectors, definite/indefinite surfaces, follow-up demands, and thought-depth rungs with the same small vocabulary.

### Required Audit Program

The next implementation block must add audits that expose product behavior, not only unit behavior.

Required audits:

- 12-lesson empty-memory audit: proves typed bootstrap works without legacy and writes facts.
- 24-lesson seeded composition audit: proves island spread, support rotation, follow-up diversity, grammar-axis movement, and no exact transcript repeats.
- metadata slice audits: prove at least two different island slices generate coherent lessons using the same metadata contracts.
- whole-vocabulary coverage audit: every active vocabulary item is generatable, blocked with owner code, or intentionally inactive.
- golden metadata audit: verifies the required metadata fields for representative words, including underused words.
- grammar axis audit: proves eligible person, tense, polarity, and answer-length forms appear when seeded memory supports them.
- backend/UI route audit: proves the UI renders typed bootstrap/composition payloads, completion writes typed facts, and the next backend lesson consumes those facts.
- AI contract fixture audit: proves the AI seam accepts good naturalized dialogue and rejects unknown words, unsupported grammar, missing required targets, or incoherent output.
- synthetic stress metadata audit: generates 1,000 and 10,000 fake lexeme rows in test fixtures only, proving coverage/scoring performance and orphan detection without requiring production metadata for 10,000 real words.
- active A1 vocabulary metadata audit: loads the current compiled A1 lexical items and proves each active item has word-specific metadata, or an owned blocked/inactive state when a future item truly cannot generate yet.
- production metadata harness audit: loads the current compiled A1 metadata source, runs empty-memory, beginner, seeded, and larger-known-word-bank routes through the backend generator, prints full lesson threads, and reports first-failing owner buckets for metadata, compatibility, coherence, compiler, memory, selection, and grammar-axis failures.
- new-word batch readiness audit: proves a newly added metadata batch is connected to existing islands or has its own starter coverage before it can be treated as production-ready.
- paradigm/readiness/priority audit: proves every verb row has family, lemma, person, tense/aspect, polarity, role eligibility, readiness, and priority metadata; proves negative forms default to non-production readiness unless explicitly unlocked; proves priority order is deterministic and does not bypass readiness gates.
- balanced island viability audit: proves the compiled A1 asset has reviewed rows across `daily_routine`, `home_life`, `school_study`, `movement_city`, `people_social`, `feelings_states`, `time_sequence`, and `discourse_glue`, and that the seeded bridge uses non-restaurant worlds without semantic role leaks.
- product spine map audit: inventories memory, rung/progression, target selection, bootstrap, metadata source, slot resolver, proposition graph, dialogue obligation, move-sequence planner, follow-up planner, coherence/scoring, validator, compiler/materializer, UI payload/session controller, memory writeback, and fallback owners before additional production wiring.
- A1 production manifest reachability audit: proves curated manifest rows can reach the existing starter-like metadata repository or slot resolver path without copying raw transcripts or bypassing target selection.
- bootstrap graduation audit: proves empty/weak memory stays in bootstrap, seeded memory graduates only when readiness criteria are met, and both modes emit the same UI payload and memory evidence contracts.
- product spine progression audit harness: runs brand-new, small-vocabulary, composition-ready, large-vocabulary, and saturation learner scenarios through the product coordinator/compiler loop, simulates completion from proof contracts, reloads projected memory, prints lesson timelines and memory ledgers, and reports first owner when lessons stop advancing.
- 24-lesson product-spine audit: replaces bridge proof as the product gate by generating 24 app-renderable lessons from the A1 production manifest through the real coordinator/generator/compiler path, with bounded restaurant ratio, island diversity, support/growth balance, grammar readiness, no semantic role leaks, no unresolved placeholders, and explicit trace ownership.
- new coordinator no-fallback audit: proves the first-class A1 product coordinator returns owned blockers instead of calling the old hardline A1 arc catalog, metadata-backed bridge, or legacy seed/routine path.
- UI renderability audit: proves generated product-spine lessons can hydrate the same session/controller payload shape the app screen expects, without moving progression decisions into the UI.

Every audit must print enough final conversation surfaces for stakeholder review. At minimum, the 12-lesson and 24-lesson audits must print the full conversation thread, generation mode, primary island, growth targets, support targets, grammar axes, and rejection/blocker summary.

The product-spine audits must also print whether any lesson used a diagnostic bridge, legacy fallback, or unmaterialized abstract stage. A passing product proof cannot contain silent fallback success.

### Product Distance Check

After Tasks 22G through 22J, the system should be able to prove the following:

- an empty user starts in typed bootstrap, not legacy;
- typed bootstrap is produced by the new A1 product coordinator and not by the old hardline A1 arc materializer;
- bootstrap writes the same memory facts that typed composition consumes;
- a seeded or graduated learner can receive 24 lessons without exact repeats or same-shape second exchanges;
- metadata coverage explains why underused words are usable or blocked;
- multiple islands use the same semantic-class and predicate-frame contracts;
- larger seeded memory unlocks richer person, tense, detail, and thought-depth forms;
- the backend and UI render the new typed system and write back enough proof for the next lesson;
- AI can be added as a bounded naturalizer/composer without changing the proof contract.

The system is not product-complete until these are true for production metadata, not just hand-seeded school/book examples.

## Non-Goals

- Do not implement runtime AI planning.
- Do not make the UI decide progression.
- Do not add random templates solely to increase variety.
- Do not hand-author one-off sentence tracks for every object or activity.
- Do not require every lesson to stay in the same island.
- Do not force a fixed support/growth ratio for first-contact beginner islands.
- Do not rewrite memory unless the audit proves a memory-profile contract gap.

## Open Audit Questions

These questions must be answered by audit evidence before plan remediation starts:

1. Which field should own island identity: current family id, frame family id, route family id, or a new progression island id?
2. Which production A1 islands have enough route/rung coverage for rotation today?
3. Which rungs can be implemented with current metadata and compiler capability?
4. Which missing metadata blocks the highest-value route expansions?
5. Is coherence validation mostly missing metadata, missing route relations, or missing validator logic?
6. How often does the coordinator currently ignore available support candidates?
7. Is the main diversity failure same-route staleness, all-growth island hopping, route scarcity, metadata scarcity, or incoherence?

## Definition Of Done For This Phase

- The spec and implementation plan are updated from audit findings before broad remediation.
- The coordinator profile can name island state, route history, support candidates, growth candidates, refresh targets, eligible rungs, and blocked rungs.
- The coordinator selects learning pressure before selecting routes.
- Target bundles explicitly classify support, growth, refresh, anchor, and blocked targets.
- A1 final-conversation proof has a canonical `learning_core` contract that survives UI completion, memory writes, rollups, progress, and next coordinator start while preserving concrete detail evidence.
- The A1 generator advertises route/rung/axis capability for production islands.
- Compiler preflight blocks candidates that cannot render full lesson stages.
- Coherence validation rejects logically invalid conversations.
- Same-route returns are productive, refresh, or blocked.
- Known words become support inside later lessons, not only cooled primary targets.
- Metadata gaps produce exact repair tasks.
- Owned blockers include recommended repair and test to unlock.
- Coordinator/generator behavior that stakeholders are likely to tune is exposed through shared policies, registries, helpers, or scripts.
- Audit and production paths consume the same shared surfaces for route capability, readiness, materialization, coherence, and blocker reporting.
- Backend and UI studies prove completed Focus sessions affect later memory-led island progression.
