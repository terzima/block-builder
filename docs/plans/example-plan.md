# A1 Memory-Led Coordinator Island Progression Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` for inline execution by default. Use `superpowers:subagent-driven-development` only when the Subagent Usage Contract below is triggered. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an audit-first path toward memory-led, coherent, progressively richer normal A1 Focus lessons, then implement deterministic dialogue composition so known vocabulary can recombine into fresh operations, focus orders, relation shapes, and thought-depth growth.

**Architecture:** Create shared audit models first, then run layer-by-layer diagnostics across memory profile, coordinator decision-making, shared policy/registry surfaces, route capability, metadata/surface readiness, typed dialogue generation, coherence, compiler materialization, scoring, proof/evidence persistence, and backend/UI product progression. The audit must produce maturity ratings and an owner-coded remediation backlog that feeds directly back into the spec and this plan.

**Tech Stack:** Dart `packages/learning_core`, Flutter mobile app, existing A1 arc catalog/instantiator/compiler/coordinator, surface-aware memory policy and rollups, `FocusMasteryPlanGateway`, `LearnerMemoryRepository`, Drift in-memory database tests, Dart tests, Flutter tests.

---

## Subagent Usage Contract

Default execution mode is inline.

Use subagents only when:

- a task touches both `packages/learning_core` and `apps/mobile`;
- the task changes memory projection, coordinator selection, generator capability, compiler materialization, metadata readiness, coherence validation, UI evidence wiring, or Progress;
- a hard acceptance gate could slip without independent review;
- the failure owner is unclear between memory profile, coordinator policy, generator coverage, metadata readiness, compiler materialization, coherence, UI binding, or Progress;
- a fresh context is useful before accepting a large audit interpretation.

Do not use subagents for:

- small doc edits;
- mechanical test updates;
- running focused test commands;
- local formatting;
- follow-up patches where the failure owner is clear.

If a subagent is used, say why in one sentence before spawning it. If subagents are unavailable, continue inline and record that constraint in the task note.

## Non-Negotiable Gates

- Do not implement broad remediation before the audit findings are written back into both the spec and this plan.
- Do not let the audit stop at pass/fail. Each finding must include owner, code, evidence, severity, maturity impact, recommended repair, implementation scope, and test to unlock.
- Do not treat blockers as product strategy. If blockers are frequent, the report must say which layer is underdeveloped and what must be built.
- Do not hide route scarcity behind all-growth island hopping or surface-only variation.
- Do not rewrite memory unless the audit proves a memory-profile contract gap.
- Do not add one-off route fixes that are invisible to shared capability/readiness audits.
- Production and audit paths must read the same policies, registries, helpers, and owner-code values wherever behavior is meant to be globally tunable.
- Normal Focus remains hardline A1 arc: no silent legacy seed/routine fallback.

## File Structure

### Specs And Notes

- Read: `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- Create: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`
- Modify after audit: `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- Modify after audit: this plan

### Core Audit Models And Harnesses

- Create: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`
  - Shared audit row models, maturity ratings, blocker remediation records, and markdown rendering.
- Modify: `packages/learning_core/lib/learning_core.dart`
  - Export `a1_memory_led_progression_audit.dart`.
- Create: `packages/learning_core/test/a1_memory_led_progression_audit_test.dart`
  - Unit tests for report models, maturity aggregation, blocker remediation validation, and markdown output.
- Create: `packages/learning_core/test/a1_shared_surface_audit_test.dart`
  - Audit for scattered coordinator/generator/policy/metadata behavior that should move into shared surfaces.
- Create: `packages/learning_core/test/a1_memory_profile_consumption_audit_test.dart`
  - Audit seeded memory profile signals consumed by the coordinator.
- Create: `packages/learning_core/test/a1_coordinator_decision_audit_test.dart`
  - Audit learning pressure, target bundles, same-route classification, and rejected-candidate owner codes.
- Create: `packages/learning_core/test/a1_arc_capability_audit_test.dart`
  - Audit production A1 island/route/rung capability.
- Create: `packages/learning_core/test/a1_metadata_surface_progression_audit_test.dart`
  - Audit definitions, slot families, phrases, surface cells, and route growth metadata.
- Create: `packages/learning_core/test/a1_compiler_materialization_audit_test.dart`
  - Audit whether candidate routes can compile into full Focus lesson stages.
- Create: `packages/learning_core/test/a1_conversation_coherence_progression_audit_test.dart`
  - Audit coherent and incoherent route relations.

### Mobile Product Audit

- Create: `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`
  - Backend/UI production-path progression study with evidence writes between starts.
- Reuse: `apps/mobile/test/a1_focus_perceived_diversity_audit_test.dart`
  - Use current perceived-diversity logic as reference; do not silently replace it until the new audit proves richer classifications.
- Reuse: `apps/mobile/test/a1_memory_balanced_focus_progression_test.dart`
  - Use current support/growth blocker evidence as the baseline failure this plan must explain.
- Reuse: `apps/mobile/test/focus_ui_memory_balanced_progression_test.dart`
  - Use current UI proof path as baseline for completion evidence writing.

## Task 0: Preflight, Spec Lock, And Baseline Orientation

**Files:**

- Read: `agent-onboarding.md`
- Read: `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- Read: this plan

- [ ] **Step 1: Confirm branch and cleanliness**

Run:

```bash
cd /Users/slouis/Development/apps/kalami/.worktrees/coordinator-memory-integration
git status --short --branch
git log --oneline -5
```

Expected:

```text
## codex/coordinator-memory-integration
```

and recent commits include:

```text
docs: require shared coordinator upgrade surfaces
docs: harden A1 memory-led coordinator spec
```

- [ ] **Step 2: Confirm the active spec has no unresolved placeholders**

Run:

```bash
rg -n "TBD|TODO|FIXME|\\?\\?|placeholder gap|implement later" \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md
```

Expected: no matches except intentional uses of the word `placeholder` in sections that block placeholder definitions.

- [ ] **Step 3: Re-run the current baseline blocker proof**

Run:

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_memory_balanced_focus_progression_test.dart \
  test/a1_focus_perceived_diversity_audit_test.dart \
  --concurrency=1
```

Expected: PASS. The output should still include `coordinatorPolicy.composition_no_support_growth_available` in the printed rows. If it does not, record the new blocker or changed behavior in the audit report before writing new tests.

- [ ] **Step 4: Commit checkpoint only if files changed**

Run:

```bash
git status --short
```

Expected: no changes. Do not commit if the worktree is clean.

## Task 1: Shared Audit Models And Markdown Report Contract

**Files:**

- Create: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Create: `packages/learning_core/test/a1_memory_led_progression_audit_test.dart`

- [ ] **Step 1: Write failing tests for audit model validation**

Create `packages/learning_core/test/a1_memory_led_progression_audit_test.dart` with:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1 memory-led progression audit models', () {
    test('blocker remediation rows require concrete repair details', () {
      final row = A1ProgressionBlockerRow(
        owner: A1ProgressionOwner.coordinatorPolicy,
        code: 'coordinatorPolicy.composition_no_support_growth_available',
        islandId: 'preferences_opinions',
        routeId: 'preference.open',
        rung: A1ProgressionRung.revisitSupport,
        primaryUpgradeAxis: 'location_context',
        supportTargetIds: const ['predicate.like'],
        growthTargetIds: const ['place.school'],
        refreshTargetIds: const [],
        missingCapability: '',
        missingMetadataIds: const [],
        missingSurfaceCells: const [],
        coherenceFailure: '',
        recentRouteHistory: const ['preferences_opinions/preference.open'],
        candidateCountBeforeFiltering: 4,
        candidateCountAfterFiltering: 0,
        recommendedRepair:
            'add_route_capability: preference.location_context',
        testToUnlock: 'a1_coordinator_decision_audit_test.dart',
      );

      expect(row.isActionable, isTrue);
      expect(row.ownerCode, 'coordinatorPolicy');
      expect(row.toMarkdownRow(), contains('preference.location_context'));
    });

    test('maturity assessment records distance and implementation scope', () {
      const assessment = A1ProgressionMaturityAssessment(
        layer: A1ProgressionLayer.coordinatorPolicy,
        rating: A1ProgressionMaturity.underdeveloped,
        evidence: 'all audited revisits were all-growth',
        distanceFromTarget:
            'needs target bundle, route return, and support-growth scoring',
        implementationScope: A1ProgressionImplementationScope.large,
        riskIfIgnored: 'lessons keep feeling repetitive or incoherent',
        nextRepairAction: 'implement learning pressure target bundles',
        testToProveRepair: 'a1_coordinator_decision_audit_test.dart',
      );

      expect(assessment.toMarkdown(), contains('underdeveloped'));
      expect(assessment.toMarkdown(), contains('large'));
      expect(assessment.toMarkdown(), contains('target bundle'));
    });

    test('audit report renders product rows blockers and maturity summary', () {
      final report = A1ProgressionAuditReport(
        title: 'A1 Memory-Led Coordinator Audit',
        generatedAtIso: '2026-06-01T00:00:00.000Z',
        productRows: const [
          A1ProgressionProductRow(
            index: 0,
            islandId: 'preferences_opinions',
            routeId: 'preference.open',
            rung: A1ProgressionRung.firstContact,
            classification: A1ProgressionClassification.newIslandFirstContact,
            supportTargetIds: [],
            growthTargetIds: ['predicate.like', 'preference.item'],
            refreshTargetIds: [],
            knownSupportRatio: 0,
            growthRatio: 1,
            upgradeAxis: '',
            transcriptHash: 'hash.1',
            shapeHash: 'shape.1',
            notes: 'first start',
          ),
        ],
        blockers: const [],
        maturity: const [
          A1ProgressionMaturityAssessment(
            layer: A1ProgressionLayer.memoryProfile,
            rating: A1ProgressionMaturity.minorContractGap,
            evidence: 'rollups exist but island fields are incomplete',
            distanceFromTarget: 'needs islandStateByFamily',
            implementationScope: A1ProgressionImplementationScope.small,
            riskIfIgnored: 'coordinator reads memory too narrowly',
            nextRepairAction: 'add coordinator profile island fields',
            testToProveRepair:
                'a1_memory_profile_consumption_audit_test.dart',
          ),
        ],
      );

      final markdown = report.toMarkdown();
      expect(markdown, contains('# A1 Memory-Led Coordinator Audit'));
      expect(markdown, contains('preferences_opinions'));
      expect(markdown, contains('memoryProfile'));
    });
  });
}
```

- [ ] **Step 2: Run the tests and verify they fail because models are missing**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_memory_led_progression_audit_test.dart
```

Expected: FAIL with missing classes such as `A1ProgressionBlockerRow`.

- [ ] **Step 3: Implement the audit model file**

Create `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart` with focused immutable Dart model types:

```dart
enum A1ProgressionOwner {
  memoryProfile('memoryProfile'),
  coordinatorPolicy('coordinatorPolicy'),
  arcCoverage('arcCoverage'),
  metadataReadiness('metadataReadiness'),
  compilerMaterialization('compilerMaterialization'),
  surfaceRealization('surfaceRealization'),
  arcCoherence('arcCoherence'),
  productDiversity('productDiversity'),
  uiEvidenceLoop('uiEvidenceLoop'),
  progressAlignment('progressAlignment');

  const A1ProgressionOwner(this.code);
  final String code;
}

enum A1ProgressionRung {
  firstContact('first_contact'),
  revisitSupport('revisit_support'),
  slotVariation('slot_variation'),
  contextVariation('context_variation'),
  oneExpansion('one_expansion'),
  paradigmOrSurfaceUpgrade('paradigm_or_surface_upgrade'),
  coherentFollowup('coherent_followup'),
  linkedOrSequenceThought('linked_or_sequence_thought'),
  askBackOrChoice('ask_back_or_choice'),
  refresh('refresh'),
  blocked('blocked');

  const A1ProgressionRung(this.id);
  final String id;
}

enum A1ProgressionClassification {
  sameIslandAdvanced('same_island_advanced'),
  sameIslandRefreshed('same_island_refreshed'),
  sameIslandStaleRepeat('same_island_stale_repeat'),
  sameRouteProductiveReturn('same_route_productive_return'),
  sameRouteRefresh('same_route_refresh'),
  sameRouteStaleRepeat('same_route_stale_repeat'),
  sameRouteSurfaceOnlyVariation('same_route_surface_only_variation'),
  newIslandFirstContact('new_island_first_contact'),
  newIslandUnnecessaryReset('new_island_unnecessary_reset'),
  slotOnlyNovelty('slot_only_novelty'),
  allGrowthIslandHopping('all_growth_island_hopping'),
  supportGrowthBlend('support_growth_blend'),
  generatorCapabilityBlocked('generator_capability_blocked'),
  metadataOrSurfaceBlocked('metadata_or_surface_blocked'),
  coherenceBlocked('coherence_blocked');

  const A1ProgressionClassification(this.id);
  final String id;
}

enum A1ProgressionLayer {
  memoryProfile('memoryProfile'),
  coordinatorPolicy('coordinatorPolicy'),
  arcGeneratorCoverage('arcGeneratorCoverage'),
  metadataReadiness('metadataReadiness'),
  compilerMaterialization('compilerMaterialization'),
  arcCoherence('arcCoherence'),
  productDiversity('productDiversity'),
  uiEvidenceLoop('uiEvidenceLoop'),
  progressAlignment('progressAlignment');

  const A1ProgressionLayer(this.id);
  final String id;
}

enum A1ProgressionMaturity {
  ready('ready'),
  minorContractGap('minor_contract_gap'),
  needsTargetedRemediation('needs_targeted_remediation'),
  underdeveloped('underdeveloped'),
  requiresRearchitecture('requires_rearchitecture'),
  unknownUntilSubaudit('unknown_until_subaudit');

  const A1ProgressionMaturity(this.id);
  final String id;
}

enum A1ProgressionImplementationScope {
  small('small'),
  medium('medium'),
  large('large'),
  unknownUntilSubaudit('unknown_until_subaudit');

  const A1ProgressionImplementationScope(this.id);
  final String id;
}
```

Add classes:

```dart
final class A1ProgressionBlockerRow {
  const A1ProgressionBlockerRow({
    required this.owner,
    required this.code,
    required this.islandId,
    required this.routeId,
    required this.rung,
    required this.primaryUpgradeAxis,
    required this.supportTargetIds,
    required this.growthTargetIds,
    required this.refreshTargetIds,
    required this.missingCapability,
    required this.missingMetadataIds,
    required this.missingSurfaceCells,
    required this.coherenceFailure,
    required this.recentRouteHistory,
    required this.candidateCountBeforeFiltering,
    required this.candidateCountAfterFiltering,
    required this.recommendedRepair,
    required this.testToUnlock,
  });

  final A1ProgressionOwner owner;
  final String code;
  final String islandId;
  final String routeId;
  final A1ProgressionRung rung;
  final String primaryUpgradeAxis;
  final List<String> supportTargetIds;
  final List<String> growthTargetIds;
  final List<String> refreshTargetIds;
  final String missingCapability;
  final List<String> missingMetadataIds;
  final List<String> missingSurfaceCells;
  final String coherenceFailure;
  final List<String> recentRouteHistory;
  final int candidateCountBeforeFiltering;
  final int candidateCountAfterFiltering;
  final String recommendedRepair;
  final String testToUnlock;

  String get ownerCode => owner.code;

  bool get isActionable {
    return owner.code.isNotEmpty &&
        code.isNotEmpty &&
        recommendedRepair.trim().isNotEmpty &&
        testToUnlock.trim().isNotEmpty &&
        (missingCapability.trim().isNotEmpty ||
            missingMetadataIds.isNotEmpty ||
            missingSurfaceCells.isNotEmpty ||
            coherenceFailure.trim().isNotEmpty ||
            candidateCountAfterFiltering < candidateCountBeforeFiltering);
  }

  String toMarkdownRow() {
    return [
      owner.code,
      code,
      islandId,
      routeId,
      rung.id,
      primaryUpgradeAxis,
      supportTargetIds.join(', '),
      growthTargetIds.join(', '),
      refreshTargetIds.join(', '),
      missingCapability,
      missingMetadataIds.join(', '),
      missingSurfaceCells.join(', '),
      coherenceFailure,
      recentRouteHistory.join(' -> '),
      '$candidateCountBeforeFiltering/$candidateCountAfterFiltering',
      recommendedRepair,
      testToUnlock,
    ].map(_mdCell).join(' | ');
  }
}
```

Also add `A1ProgressionMaturityAssessment`, `A1ProgressionProductRow`, `A1ProgressionAuditReport`, and a private `_mdCell` helper. Keep all rendering deterministic and ASCII-only.

- [ ] **Step 4: Export the audit model**

Modify `packages/learning_core/lib/learning_core.dart`:

```dart
export 'src/a1_memory_led_progression_audit.dart';
```

- [ ] **Step 5: Run the model tests**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_memory_led_progression_audit_test.dart
```

Expected: PASS.

- [ ] **Step 6: Commit the shared audit model**

Run:

```bash
git add \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_memory_led_progression_audit_test.dart
git commit -m "test: add A1 memory-led audit contract"
```

## Task 2: Shared Surface Inventory Audit

**Files:**

- Create: `packages/learning_core/test/a1_shared_surface_audit_test.dart`
- Modify after audit if needed: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`

- [ ] **Step 1: Write a failing audit test for shared surface inventory**

Create `packages/learning_core/test/a1_shared_surface_audit_test.dart` with:

```dart
import 'dart:io';

import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1 shared surface audit', () {
    test('coordinator and audits use shared policy and blocker surfaces', () {
      final audit = A1SharedSurfaceAudit(
        repoRoot: Directory.current.parent.parent.path,
      ).run();

      expect(audit.maturity.layer, A1ProgressionLayer.coordinatorPolicy);
      expect(audit.blockers, isNotEmpty);
      expect(
        audit.blockers,
        everyElement(
          predicate<A1ProgressionBlockerRow>(
            (row) => row.isActionable,
            'shared-surface blocker has repair and testToUnlock',
          ),
        ),
      );
      expect(
        audit.toMarkdown(),
        contains('Coordinator progression policy'),
      );
    });
  });
}
```

- [ ] **Step 2: Run the test and verify the audit type is missing**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_shared_surface_audit_test.dart
```

Expected: FAIL with `A1SharedSurfaceAudit` missing.

- [ ] **Step 3: Implement `A1SharedSurfaceAudit`**

In `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`, add:

```dart
final class A1SharedSurfaceAudit {
  const A1SharedSurfaceAudit({required this.repoRoot});

  final String repoRoot;

  A1SharedSurfaceAuditResult run() {
    final rows = <A1ProgressionBlockerRow>[];

    rows.addAll(_sourceSurfaceRows());

    final maturity = A1ProgressionMaturityAssessment(
      layer: A1ProgressionLayer.coordinatorPolicy,
      rating: rows.isEmpty
          ? A1ProgressionMaturity.ready
          : A1ProgressionMaturity.needsTargetedRemediation,
      evidence: rows.isEmpty
          ? 'No scattered shared-surface gaps found.'
          : 'Found ${rows.length} shared-surface gaps.',
      distanceFromTarget: rows.isEmpty
          ? 'Shared surfaces are discoverable.'
          : 'Some globally tunable behavior is still local or not audited.',
      implementationScope: rows.length > 4
          ? A1ProgressionImplementationScope.medium
          : A1ProgressionImplementationScope.small,
      riskIfIgnored:
          'Stakeholder tuning requires scattered coordinator/generator edits.',
      nextRepairAction:
          'Move repeated policy, capability, and blocker values into shared registries.',
      testToProveRepair: 'a1_shared_surface_audit_test.dart',
    );

    return A1SharedSurfaceAuditResult(
      blockers: List.unmodifiable(rows),
      maturity: maturity,
    );
  }

  List<A1ProgressionBlockerRow> _sourceSurfaceRows() {
    return [
      A1ProgressionBlockerRow(
        owner: A1ProgressionOwner.coordinatorPolicy,
        code: 'sharedSurface.audit_required',
        islandId: 'all',
        routeId: 'all',
        rung: A1ProgressionRung.blocked,
        primaryUpgradeAxis: '',
        supportTargetIds: const [],
        growthTargetIds: const [],
        refreshTargetIds: const [],
        missingCapability: 'shared_surface_inventory',
        missingMetadataIds: const [],
        missingSurfaceCells: const [],
        coherenceFailure: '',
        recentRouteHistory: const [],
        candidateCountBeforeFiltering: 1,
        candidateCountAfterFiltering: 0,
        recommendedRepair:
            'add_shared_registry: coordinator_progression_policy',
        testToUnlock: 'a1_shared_surface_audit_test.dart',
      ),
    ];
  }
}
```

Also add `A1SharedSurfaceAuditResult` with `toMarkdown()` that includes sections for:

```text
Coordinator progression policy
Island/route/rung capability registry
Upgrade-axis registry
Route-return classification policy
Coherence relation registry
Metadata readiness audit registry
Compiler preflight materialization helper
Blocker owner-code and repair-action registry
Product progression audit harness
```

This first audit is allowed to report gaps. It is not allowed to be empty unless the shared surfaces already exist and are used by production and tests.

- [ ] **Step 4: Run the shared surface audit**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_shared_surface_audit_test.dart
```

Expected: PASS with at least one actionable shared-surface blocker row. This confirms the audit can report global tuning gaps without pretending they are solved.

- [ ] **Step 5: Commit the shared surface audit**

Run:

```bash
git add \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_shared_surface_audit_test.dart
git commit -m "test: audit A1 shared coordinator surfaces"
```

## Task 3: Memory Profile Consumption Audit

**Files:**

- Create: `packages/learning_core/test/a1_memory_profile_consumption_audit_test.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`

- [ ] **Step 1: Write the memory profile audit test**

Create `packages/learning_core/test/a1_memory_profile_consumption_audit_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1 memory profile consumption audit', () {
    test('seeded memory exposes support growth refresh and gaps', () {
      final graph = MasteryMemoryGraphProjector().project([
        _event('like.s1', 'predicate.like', 'session.1'),
        _event('like.s2', 'predicate.like', 'session.2'),
        _event('book.s1', 'home.object', 'session.1'),
        _event('miss.s3', 'time.anchor', 'session.3',
            kind: MasteryGraphEvidenceKind.miss),
      ]);

      final audit = A1MemoryProfileConsumptionAudit(graph: graph).run();

      expect(audit.maturity.layer, A1ProgressionLayer.memoryProfile);
      expect(audit.supportCandidateIds, contains('predicate.like'));
      expect(audit.refreshTargetIds, contains('time.anchor'));
      expect(audit.missingProfileFields, contains('islandStateByFamily'));
      expect(audit.blockers, everyElement(isA<A1ProgressionBlockerRow>()));
      expect(audit.toMarkdown(), contains('memoryProfile'));
    });
  });
}

MasteryGraphEvidenceEvent _event(
  String id,
  String targetId,
  String sessionId, {
  MasteryGraphEvidenceKind kind = MasteryGraphEvidenceKind.finalConversation,
}) {
  return MasteryGraphEvidenceEvent(
    eventId: id,
    targetId: targetId,
    targetKind: MasteryGraphTargetKind.lexical,
    evidenceKind: kind,
    sessionId: sessionId,
  );
}
```

- [ ] **Step 2: Run the test and verify it fails because the audit is missing**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_memory_profile_consumption_audit_test.dart
```

Expected: FAIL with `A1MemoryProfileConsumptionAudit` missing.

- [ ] **Step 3: Implement the memory profile audit**

In `a1_memory_led_progression_audit.dart`, add `A1MemoryProfileConsumptionAudit` and `A1MemoryProfileConsumptionAuditResult`.

Implementation rules:

- read `graph.surfaceAwareRollups(policy: SurfaceAwareMemoryPolicy.defaultPolicy)`;
- classify support candidates from rollup states `canSay`, `stable`, and `mastered`;
- classify refresh targets from `needsRefresh`, `miss`, or available rollup refresh indicators;
- report missing fields that current coordinator profile does not expose as first-class fields:

```dart
const requiredProfileFields = [
  'islandStateByFamily',
  'frameStateByFamily',
  'routeStateByFamily',
  'slotBreadthByFamily',
  'supportCandidatesByFamily',
  'growthCandidatesByFamily',
  'refreshTargetsByFamily',
  'eligibleRungsByFamily',
  'blockedRungsByFamily',
  'eligibleUpgradeAxesByFamily',
  'recentIslandRouteHistory',
];
```

Until these fields exist as concrete coordinator profile output, the audit must report them as contract gaps with owner `memoryProfile`.

- [ ] **Step 4: Run the memory profile audit test**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_memory_profile_consumption_audit_test.dart
```

Expected: PASS. The audit should pass while still reporting actionable `memoryProfile` gaps.

- [ ] **Step 5: Commit the memory profile audit**

Run:

```bash
git add \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_memory_profile_consumption_audit_test.dart
git commit -m "test: audit A1 coordinator memory profile gaps"
```

## Task 4: Coordinator Decision Audit

**Files:**

- Create: `packages/learning_core/test/a1_coordinator_decision_audit_test.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`

- [ ] **Step 1: Write tests for learning pressure and target bundle diagnosis**

Create `packages/learning_core/test/a1_coordinator_decision_audit_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1 coordinator decision audit', () {
    test('current coordinator reports support growth blocker for revisits', () {
      final coordinator = FocusCoordinator();
      final first = coordinator.createA1ConversationArcFocusPlan(
        preferredFamilyId: 'preferences_opinions',
      );
      final graph = MasteryMemoryGraphProjector().project([
        for (final targetId
            in first.selectionSignature.finalProofTargetIds)
          MasteryGraphEvidenceEvent(
            eventId: 'proof.$targetId',
            targetId: targetId,
            targetKind: MasteryGraphTargetKind.lexical,
            evidenceKind: MasteryGraphEvidenceKind.finalConversation,
            sessionId: 'session.1',
          ),
      ]);

      final audit = A1CoordinatorDecisionAudit(
        coordinator: coordinator,
        memoryGraph: graph,
        preferredFamilyId: 'preferences_opinions',
        recentDecisionFingerprints: [
          first.selectionSignature.a1ConversationDecisionFingerprint ??
              first.selectionSignature.visibleFingerprint
                  .visibleDecisionFingerprint,
        ],
      ).run();

      expect(audit.maturity.layer, A1ProgressionLayer.coordinatorPolicy);
      expect(audit.rows, isNotEmpty);
      expect(audit.blockers, isNotEmpty);
      expect(
        audit.blockers.map((row) => row.code),
        contains('coordinatorPolicy.composition_no_support_growth_available'),
      );
      expect(audit.toMarkdown(), contains('support'));
    });
  });
}
```

- [ ] **Step 2: Run the test and verify it fails because audit type is missing**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_coordinator_decision_audit_test.dart
```

Expected: FAIL with `A1CoordinatorDecisionAudit` missing.

- [ ] **Step 3: Implement coordinator decision audit**

Add `A1CoordinatorDecisionAudit` to `a1_memory_led_progression_audit.dart`.

The audit must:

- call `FocusCoordinator.createA1ConversationArcFocusPlan`;
- collect selected `familyId`, `arcId`, `maturityLevel`, `a1ConversationDecisionFingerprint`, and `robustFocusReasons`;
- classify target roles using `A1LessonTargetRoleClassifier`;
- create blocker rows for these trace codes:

```text
coordinatorPolicy.composition_no_support_growth_available
coordinatorPolicy.composition_beginner_no_support_available
coordinatorPolicy.known_growth_ratio_out_of_bounds
coordinatorPolicy.recent_target_reuse_too_high
coordinatorPolicy.mastered_target_selected_as_primary
```

- mark `composition_beginner_no_support_available` as a note for first contact, not a blocker;
- mark `composition_no_support_growth_available` as a blocker when maturity is not `beginner` or when route history says this is a revisit.

Each blocker must include:

```text
recommendedRepair: implement_learning_pressure_target_bundle
testToUnlock: a1_coordinator_decision_audit_test.dart
```

- [ ] **Step 4: Run the coordinator decision audit**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_coordinator_decision_audit_test.dart
```

Expected: PASS with an actionable coordinator blocker. This is diagnostic, not remediation.

- [ ] **Step 5: Commit coordinator decision audit**

Run:

```bash
git add \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_coordinator_decision_audit_test.dart
git commit -m "test: audit A1 coordinator decision gaps"
```

## Task 5: Arc Generator Capability Audit

**Files:**

- Create: `packages/learning_core/test/a1_arc_capability_audit_test.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`

- [ ] **Step 1: Write tests for route and rung coverage inventory**

Create `packages/learning_core/test/a1_arc_capability_audit_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1 arc capability audit', () {
    test('production families report rotation readiness and missing rungs', () {
      final audit = A1ArcCapabilityAudit(
        catalog: A1ConversationArcCatalog.initial(),
      ).run();

      expect(audit.rows, isNotEmpty);
      expect(
        audit.rows.map((row) => row.islandId),
        contains('preferences_opinions'),
      );
      expect(
        audit.rows,
        everyElement(
          predicate<A1ArcCapabilityAuditRow>(
            (row) => row.supportedRungs.isNotEmpty,
            'every production family has at least first-contact rung',
          ),
        ),
      );
      expect(audit.blockers, everyElement(isA<A1ProgressionBlockerRow>()));
      expect(audit.toMarkdown(), contains('coverage readiness'));
    });
  });
}
```

- [ ] **Step 2: Run the test and verify it fails because audit type is missing**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_arc_capability_audit_test.dart
```

Expected: FAIL with `A1ArcCapabilityAudit` missing.

- [ ] **Step 3: Implement arc capability audit**

Add `A1ArcCapabilityAudit`, `A1ArcCapabilityAuditResult`, and `A1ArcCapabilityAuditRow`.

Use `A1ConversationArcCatalog.initial()` and each primary family profile.

For each primary family:

- set `first_contact` supported when at least one supported arc instantiates a normal Focus thread;
- set `revisit_support` supported only when the audit can identify support/progress targets in the instantiated thread;
- set `slot_variation` or `context_variation` supported only if the family has more than one route or target-class shape;
- set coverage status:

```text
production_ready_for_rotation
first_contact_only
refresh_only
not_production_ready_for_rotation
```

Create blockers:

- `arcCoverage.only_one_route_available` when a family has only one supported arc route;
- `arcCoverage.support_blend_unavailable` when no support-growth blend shape is detectable;
- `arcCoverage.rung_unavailable` for missing `revisit_support`.

Recommended repairs must name the missing route/rung, for example:

```text
add_route_capability: preferences_opinions.revisit_support
```

- [ ] **Step 4: Run the arc capability audit**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_arc_capability_audit_test.dart
```

Expected: PASS and print or expose rows identifying which families are rotation-ready versus incomplete. Do not require all families to be production-ready yet; this is an audit.

- [ ] **Step 5: Commit arc capability audit**

Run:

```bash
git add \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_arc_capability_audit_test.dart
git commit -m "test: audit A1 arc progression capability"
```

## Task 6: Metadata And Surface Readiness Audit

**Files:**

- Create: `packages/learning_core/test/a1_metadata_surface_progression_audit_test.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`

- [ ] **Step 1: Write tests for metadata and surface blockers**

Create `packages/learning_core/test/a1_metadata_surface_progression_audit_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1 metadata and surface progression audit', () {
    test('audits production-selectable progression metadata', () {
      final audit = A1MetadataSurfaceProgressionAudit(
        metadata: StarterLanguageMetadata.v1,
        coordinator: FocusCoordinator(),
      ).run();

      expect(audit.rows, isNotEmpty);
      expect(audit.toMarkdown(), contains('metadataReadiness'));
      expect(
        audit.blockers,
        everyElement(
          predicate<A1ProgressionBlockerRow>(
            (row) => row.isActionable,
            'metadata blockers include exact repair path',
          ),
        ),
      );
    });
  });
}
```

- [ ] **Step 2: Run the test and verify the audit type is missing**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_metadata_surface_progression_audit_test.dart
```

Expected: FAIL with `A1MetadataSurfaceProgressionAudit` missing.

- [ ] **Step 3: Implement metadata and surface audit**

Add `A1MetadataSurfaceProgressionAudit`.

The audit must inspect final/progress targets from production A1 candidates and record:

- missing learner-facing definitions;
- raw ids shown as definitions;
- phrase targets without phrase-level meanings;
- accepted variants missing renderability status;
- missing surface/paradigm cells for selected route examples;
- missing slot family or utility metadata when a target is selectable as growth;
- missing bridge/follow-up metadata for reason, choice, detail, or sequence routes.

Create blockers with owner:

```text
metadataReadiness
surfaceRealization
```

Use exact `missingMetadataIds` and `missingSurfaceCells` where the current APIs can expose them. When an exact id cannot be derived yet, use:

```text
missingCapability: metadata_exact_id_not_exposed
recommendedRepair: expose_metadata_id_in_readiness_audit
```

- [ ] **Step 4: Run metadata surface audit**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_metadata_surface_progression_audit_test.dart
```

Expected: PASS. It may report blockers, but every blocker must be actionable.

- [ ] **Step 5: Commit metadata surface audit**

Run:

```bash
git add \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_metadata_surface_progression_audit_test.dart
git commit -m "test: audit A1 progression metadata readiness"
```

## Task 7: Compiler Materialization Audit

**Files:**

- Create: `packages/learning_core/test/a1_compiler_materialization_audit_test.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`

- [ ] **Step 1: Write tests for full lesson materialization**

Create `packages/learning_core/test/a1_compiler_materialization_audit_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1 compiler materialization audit', () {
    test('normal Focus candidates materialize required learner stages', () {
      final audit = A1CompilerMaterializationAudit(
        coordinator: FocusCoordinator(),
      ).run(preferredFamilies: const [
        'preferences_opinions',
        'daily_activities',
        'home_objects_possessions',
      ]);

      expect(audit.rows, isNotEmpty);
      expect(audit.toMarkdown(), contains('compilerMaterialization'));
      expect(
        audit.rows,
        everyElement(
          predicate<A1CompilerMaterializationAuditRow>(
            (row) =>
                row.hasGoalConversation &&
                row.hasFinalConversation &&
                row.finalProofTargetIds.isNotEmpty,
            'candidate has goal and final conversation proof targets',
          ),
        ),
      );
    });
  });
}
```

- [ ] **Step 2: Run the test and verify the audit type is missing**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_compiler_materialization_audit_test.dart
```

Expected: FAIL with `A1CompilerMaterializationAudit` missing.

- [ ] **Step 3: Implement compiler materialization audit**

Add `A1CompilerMaterializationAudit`.

For each selected family:

- call `FocusCoordinator.createA1ConversationArcFocusPlan(preferredFamilyId: familyId)`;
- inspect `plan.boundLesson`;
- verify stages contain goal conversation and final conversation;
- verify final conversation stage memory targets are non-empty;
- verify learner turns have cue text and visible surfaces;
- verify matching/role-building/bounded typing stages include selected targets when those stages exist;
- record blockers for:

```text
compilerMaterialization.lesson_stage_missing_target
compilerMaterialization.bounded_typing_target_missing
compilerMaterialization.progression_surface_missing
metadataReadiness.definition_missing
```

- [ ] **Step 4: Run compiler audit**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_compiler_materialization_audit_test.dart
```

Expected: PASS with rows and actionable blockers if any candidate cannot fully materialize.

- [ ] **Step 5: Commit compiler materialization audit**

Run:

```bash
git add \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_compiler_materialization_audit_test.dart
git commit -m "test: audit A1 compiler materialization"
```

## Task 8: Conversation Coherence Audit

**Files:**

- Create: `packages/learning_core/test/a1_conversation_coherence_progression_audit_test.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`

- [ ] **Step 1: Write positive and negative coherence tests**

Create `packages/learning_core/test/a1_conversation_coherence_progression_audit_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1 conversation coherence progression audit', () {
    test('classifies coherent and incoherent route chains', () {
      final audit = A1ConversationCoherenceProgressionAudit().run();

      expect(audit.positiveRows, isNotEmpty);
      expect(audit.negativeRows, isNotEmpty);
      expect(
        audit.negativeRows.map((row) => row.blocker.code),
        contains('arcCoherence.followup_relation_invalid'),
      );
      expect(
        audit.negativeRows.map((row) => row.blocker.code),
        contains('arcCoherence.bridge_missing'),
      );
      expect(audit.toMarkdown(), contains('arcCoherence'));
    });
  });
}
```

- [ ] **Step 2: Run the test and verify the audit type is missing**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_conversation_coherence_progression_audit_test.dart
```

Expected: FAIL with `A1ConversationCoherenceProgressionAudit` missing.

- [ ] **Step 3: Implement coherence audit cases**

Add `A1ConversationCoherenceProgressionAudit`.

Positive case ids:

```text
preference_context_valid
possession_detail_valid
activity_time_valid
reason_followup_after_reason_claim_valid
choice_answer_valid
linked_sequence_valid
```

Negative case ids:

```text
possession_question_desire_answer_without_bridge
activity_time_question_object_answer
preference_answer_random_object_followup
choice_followup_no_choice_selected
reason_followup_without_reason_claim
same_route_surface_only_variation
```

For now, the audit may use explicit route-relation fixtures instead of changing production validator logic. Each negative row must return owner `arcCoherence`, code, recommended repair, and test to unlock.

- [ ] **Step 4: Run coherence audit**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_conversation_coherence_progression_audit_test.dart
```

Expected: PASS with both positive and negative rows.

- [ ] **Step 5: Commit coherence audit**

Run:

```bash
git add \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_conversation_coherence_progression_audit_test.dart
git commit -m "test: audit A1 conversation coherence gaps"
```

## Task 9: Backend And UI Product Progression Audit

**Files:**

- Create: `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`

- [ ] **Step 1: Write the product progression audit test**

Create `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`:

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:kalami_mobile/features/practice/focus_evidence_writer.dart';
import 'package:kalami_mobile/features/practice/focus_mastery_plan_gateway.dart';
import 'package:kalami_mobile/features/practice/focus_start_lease.dart';
import 'package:kalami_mobile/shared/content/kalami_content.dart';
import 'package:kalami_mobile/shared/persistence/app_database.dart';
import 'package:kalami_mobile/shared/persistence/learner_memory_repository.dart';
import 'package:learning_core/learning_core.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('completed Focus sessions produce memory-led progression diagnosis',
      () async {
    final database = AppDatabase.inMemory();
    addTearDown(database.close);
    final repository = LearnerMemoryRepository(database);
    final leaseRepository = DriftFocusStartLeaseRepository(database);
    final content = await KalamiContent.loadFromAsset();
    final gateway = FocusMasteryPlanGateway(
      memoryRepository: repository,
      seedPoolLoader: () async => content.toCoreSeedPrompts(),
      focusStartLeaseRepository: leaseRepository,
    );

    final audit = A1MemoryLedProductProgressionAudit(
      gateway: gateway,
      repository: repository,
      leaseRepository: leaseRepository,
    );

    final result = await audit.run(starts: 6);

    // ignore: avoid_print
    print(result.toMarkdown());

    expect(result.productRows, hasLength(6));
    expect(
      result.productRows.skip(1),
      everyElement(
        predicate<A1ProgressionProductRow>(
          (row) =>
              row.classification !=
                  A1ProgressionClassification.sameRouteStaleRepeat ||
              result.blockers.any(
                (blocker) =>
                    blocker.code == 'arcCoherence.same_route_stale_repeat',
              ),
          'stale repeats are blocked and owned',
        ),
      ),
    );
    expect(
      result.maturity,
      isNotEmpty,
      reason: 'product audit must report distance from target by layer',
    );
  });
}
```

- [ ] **Step 2: Run the test and verify mobile audit type is missing**

Run:

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_memory_led_product_progression_audit_test.dart \
  --concurrency=1
```

Expected: FAIL with `A1MemoryLedProductProgressionAudit` missing.

- [ ] **Step 3: Implement product progression audit helper**

Because this helper depends on mobile gateway/repository types, create it inside the test file first as a test harness, not a production class.

The harness must:

- start normal Focus through `FocusMasteryPlanGateway.start`;
- read rollups before each start;
- classify selected lesson with `A1LessonTargetRoleClassifier`;
- write accepted final conversation proof through `FocusEvidenceWriter`;
- record start lease signatures through `DriftFocusStartLeaseRepository`;
- compute:

```text
islandId
routeId
rung
opening route
learner route
support/growth/refresh ids
known support ratio
growth ratio
upgrade axis
transcript hash
shape hash
classification
blocker rows
maturity rows
```

Use the existing helper patterns from `a1_focus_perceived_diversity_audit_test.dart` and `a1_memory_balanced_focus_progression_test.dart`. Do not copy stale classification rules; extend them with:

```text
same_route_productive_return
same_route_refresh
same_route_stale_repeat
same_route_surface_only_variation
support_growth_blend
all_growth_island_hopping
coherence_blocked
```

- [ ] **Step 4: Run product progression audit**

Run:

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_memory_led_product_progression_audit_test.dart \
  --concurrency=1
```

Expected: PASS. The printed report must reveal whether current behavior is mostly productive progression, all-growth island hopping, route scarcity, metadata/surface blocking, coherence blocking, or stale route repetition.

- [ ] **Step 5: Commit product progression audit**

Run:

```bash
git add \
  apps/mobile/test/a1_memory_led_product_progression_audit_test.dart \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart
git commit -m "test: audit A1 memory-led product progression"
```

## Task 10: Completed Audit Report And Remediation Baseline

**Status:** completed before this remediation plan was written.

**Files:**

- Created: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`
- Modified: `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`

**Confirmed baseline:**

- Memory mostly works as a storage/projection layer, but the coordinator-facing contract is incomplete.
- The highest-risk product blocker is `coordinatorPolicy.composition_no_support_growth_available`.
- Later backend starts currently move across islands but classify as all-growth: `known=0.00 growth=1.00`.
- Product diversity is underdeveloped because the system changes topics without proving cumulative support-growth progression.
- Arc generator capability, metadata readiness, compiler preflight, coherence validation, and UI evidence proof must all be strengthened because each layer depends on the others.

**Audit report path:**

```text
docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md
```

## Post-Audit Remediation Gate

The user approved turning the audit findings and hardened spec into implementation tasks. Continue through the remediation milestones below. Do not replace these tasks with a broad rewrite. Each task includes a Remediation Decision Record, focused implementation slices, backend proof, UI/product checkpoint, exit criteria, and remaining blocker handling.

Every task must preserve normal Focus hardline A1 behavior:

- no silent legacy fallback;
- no unowned blocker;
- no route selected only because it is available if memory, metadata, compiler, or coherence says it is invalid;
- no product-success claim from backend tests alone when the task says the change should be visible in the UI.

## Task 11: Shared Remediation Contract And Owner Codes

**Purpose:** Make blocker owners, repair actions, and remediation decision records production-facing instead of audit-only.

**Audit finding addressed:** `sharedSurface.progression_policy_missing`, `sharedSurface.route_capability_registry_missing`, `sharedSurface.coherence_registry_missing`.

**Remediation Decision Record:**

```text
productFailure: fixes can be chosen by convenience and then fail to change lesson behavior
firstFailingLayer: coordinatorPolicy shared surface
evidence: audit report says shared route, coherence, and progression policy surfaces are not represented as global registries
selectedRepair: create shared remediation contracts and owner/repair code values consumed by audits and production blockers
whyThisRepairFirst: later coordinator, generator, metadata, compiler, and coherence slices need the same owner codes and repair actions
productionBehaviorChanged: production blockers can use shared owner/repair values instead of local strings
backendProof: shared-surface audit proves owner codes and repair actions come from shared values
uiProductCheckpoint: no large UI change expected; this makes later UI-visible fixes globally tunable
remainingOwnedBlocker: coordinatorPolicy remains blocked until target bundles use these contracts
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_progression_contracts.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`
- Modify: `packages/learning_core/test/a1_shared_surface_audit_test.dart`
- Modify: `packages/learning_core/test/a1_memory_led_progression_audit_test.dart`

- [ ] **Step 1: Write the failing shared contract test**

Add expectations to `packages/learning_core/test/a1_shared_surface_audit_test.dart`:

```dart
test('owner codes and repair actions are shared production values', () {
  expect(A1ProgressionOwnerCode.coordinatorPolicy.value,
      'coordinatorPolicy');
  expect(A1ProgressionRepairAction.implementLearningPressureTargetBundle.value,
      'implement_learning_pressure_target_bundle');
  expect(A1ProgressionBlockerCode.supportPoolPredicateTooThin.value,
      'supportPool.predicate_too_thin');
  expect(A1ProgressionBlockerCode.paradigmFormUnverified.value,
      'metadataReadiness.paradigm_form_unverified');
  expect(A1ProgressionBlockerCode.coherenceEntityAgreementMismatch.value,
      'arcCoherence.entity_agreement_mismatch');

  final row = A1ProgressionBlockerRow(
    owner: A1ProgressionOwner.coordinatorPolicy,
    code: A1ProgressionBlockerCode.compositionNoSupportGrowthAvailable.value,
    islandId: 'preferences_opinions',
    routeId: 'preference_alternative_arc',
    rung: A1ProgressionRung.revisitSupport,
    primaryUpgradeAxis: 'support_growth',
    supportTargetIds: const ['predicate.like'],
    growthTargetIds: const ['place.school'],
    refreshTargetIds: const [],
    missingCapability: 'support_growth_target_bundle',
    missingMetadataIds: const [],
    missingSurfaceCells: const [],
    coherenceFailure: '',
    recentRouteHistory: const [],
    candidateCountBeforeFiltering: 1,
    candidateCountAfterFiltering: 0,
    recommendedRepair:
        A1ProgressionRepairAction.implementLearningPressureTargetBundle.value,
    testToUnlock: 'a1_coordinator_decision_audit_test.dart',
  );

  expect(row.isActionable, isTrue);
});
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_shared_surface_audit_test.dart
```

Expected: FAIL because `A1ProgressionOwnerCode`, `A1ProgressionRepairAction`, and `A1ProgressionBlockerCode` are missing.

- [ ] **Step 3: Add shared contract values**

Create `packages/learning_core/lib/src/a1_progression_contracts.dart`:

```dart
enum A1ProgressionOwnerCode {
  memoryProfile('memoryProfile'),
  coordinatorPolicy('coordinatorPolicy'),
  arcCoverage('arcCoverage'),
  metadataReadiness('metadataReadiness'),
  compilerMaterialization('compilerMaterialization'),
  arcCoherence('arcCoherence'),
  productDiversity('productDiversity'),
  uiEvidenceLoop('uiEvidenceLoop'),
  progressAlignment('progressAlignment');

  const A1ProgressionOwnerCode(this.value);
  final String value;
}

enum A1ProgressionBlockerCode {
  memoryProfileFieldMissing('memoryProfile.field_missing'),
  compositionNoSupportGrowthAvailable(
    'coordinatorPolicy.composition_no_support_growth_available',
  ),
  sharedProgressionPolicyMissing(
    'sharedSurface.progression_policy_missing',
  ),
  routeCapabilityRegistryMissing(
    'sharedSurface.route_capability_registry_missing',
  ),
  coherenceRegistryMissing('sharedSurface.coherence_registry_missing'),
  arcRungUnavailable('arcCoverage.rung_unavailable'),
  arcRouteUnavailable('arcCoverage.route_unavailable'),
  arcUpgradeAxisUnavailable('arcCoverage.upgrade_axis_unavailable'),
  arcOnlyOneRouteAvailable('arcCoverage.only_one_route_available'),
  metadataProgressionRegistryMissing(
    'metadataReadiness.progression_registry_missing',
  ),
  metadataDefinitionMissing('metadataReadiness.definition_missing'),
  metadataPhraseMeaningMissing('metadataReadiness.phrase_meaning_missing'),
  paradigmFormUnverified('metadataReadiness.paradigm_form_unverified'),
  supportPoolPredicateTooThin('supportPool.predicate_too_thin'),
  supportPoolObjectTooThin('supportPool.object_too_thin'),
  supportPoolPlaceTooThin('supportPool.place_too_thin'),
  supportPoolTimeTooThin('supportPool.time_too_thin'),
  supportPoolPersonTooThin('supportPool.person_too_thin'),
  supportPoolConnectorTooThin('supportPool.connector_too_thin'),
  supportPoolBridgeTooThin('supportPool.bridge_too_thin'),
  supportExactSurfaceCooldown('supportPool.exact_surface_cooldown'),
  compilerStageMissing(
    'compilerMaterialization.lesson_stage_missing_target',
  ),
  coherenceBridgeMissing('arcCoherence.bridge_missing'),
  coherenceFollowupInvalid('arcCoherence.followup_relation_invalid'),
  coherenceAnswerInvalid('arcCoherence.answer_relation_invalid'),
  coherenceSameRouteStaleRepeat('arcCoherence.same_route_stale_repeat'),
  coherenceEntityAgreementMismatch(
    'arcCoherence.entity_agreement_mismatch',
  ),
  uiEvidenceNotConsumed('uiEvidenceLoop.completed_proof_not_consumed');

  const A1ProgressionBlockerCode(this.value);
  final String value;
}

enum A1ProgressionRepairAction {
  addCoordinatorMemoryProfile('add_coordinator_memory_profile'),
  implementLearningPressureTargetBundle(
    'implement_learning_pressure_target_bundle',
  ),
  addSharedProgressionPolicy('add_shared_registry: coordinator_progression_policy'),
  addRouteCapabilityRegistry('add_shared_registry: a1_route_capability_registry'),
  addCoherenceRegistry('add_shared_registry: a1_coherence_relation_registry'),
  addRouteCapability('add_route_capability'),
  addMetadataReadinessRegistry(
    'add_metadata_registry: route_growth_requirements',
  ),
  addSupportRotationPolicy('add_support_rotation_policy'),
  addParadigmExpansionRegistry('add_paradigm_expansion_registry'),
  addCompilerPreflight('add_compiler_preflight'),
  addCoherenceRelation('add_coherence_relation'),
  addEntityAgreementValidation('add_entity_agreement_validation'),
  repairUiEvidenceLoop('repair_ui_evidence_loop');

  const A1ProgressionRepairAction(this.value);
  final String value;
}

final class A1RemediationDecisionRecord {
  const A1RemediationDecisionRecord({
    required this.productFailure,
    required this.firstFailingLayer,
    required this.evidence,
    required this.selectedRepair,
    required this.whyThisRepairFirst,
    required this.productionBehaviorChanged,
    required this.backendProof,
    required this.uiProductCheckpoint,
    required this.remainingOwnedBlocker,
  });

  final String productFailure;
  final A1ProgressionOwnerCode firstFailingLayer;
  final String evidence;
  final A1ProgressionRepairAction selectedRepair;
  final String whyThisRepairFirst;
  final String productionBehaviorChanged;
  final String backendProof;
  final String uiProductCheckpoint;
  final String remainingOwnedBlocker;

  bool get isConcrete {
    return [
      productFailure,
      evidence,
      whyThisRepairFirst,
      productionBehaviorChanged,
      backendProof,
      uiProductCheckpoint,
      remainingOwnedBlocker,
    ].every((value) => value.trim().isNotEmpty) &&
        !productFailure.toLowerCase().contains('improve coordinator');
  }
}
```

- [ ] **Step 4: Export shared contracts**

Add to `packages/learning_core/lib/learning_core.dart`:

```dart
export 'src/a1_progression_contracts.dart';
```

- [ ] **Step 5: Update audit rows to use shared values where touched**

Update blocker construction in `a1_memory_led_progression_audit.dart` for the codes covered by the test. Keep existing enum names intact for compatibility, but use the shared `.value` constants for blocker `code` and `recommendedRepair` strings.

- [ ] **Step 6: Verify**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_memory_led_progression_audit_test.dart \
  test/a1_shared_surface_audit_test.dart
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_progression_contracts.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_shared_surface_audit_test.dart \
  packages/learning_core/test/a1_memory_led_progression_audit_test.dart
git commit -m "feat: add shared A1 remediation contracts"
```

## Task 12: Coordinator Memory Profile Foundation

**Purpose:** Make memory legible to the coordinator in island, route, rung, support, growth, refresh, slot, and recent-history terms.

**Audit finding addressed:** `memoryProfile.field_missing`.

**Remediation Decision Record:**

```text
productFailure: known words are visibly reused but not intentionally used as support
firstFailingLayer: memoryProfile
evidence: audit report lists missing islandStateByFamily, routeStateByFamily, supportCandidatesByFamily, growthCandidatesByFamily, refreshTargetsByFamily, eligibleRungsByFamily, blockedRungsByFamily, eligibleUpgradeAxesByFamily, and recentIslandRouteHistory
selectedRepair: add_coordinator_memory_profile
whyThisRepairFirst: coordinator target bundles cannot be deterministic until memory exposes planning-ready state
productionBehaviorChanged: FocusCoordinator can receive a structured A1CoordinatorMemoryProfile instead of raw rollups only
backendProof: seeded memory profile exposes support and cooled support for repeated targets
uiProductCheckpoint: limited visible change; product audit can now name when coordinator ignored support
remainingOwnedBlocker: coordinatorPolicy.composition_no_support_growth_available remains until Task 15
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_coordinator_memory_profile.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`
- Modify: `packages/learning_core/test/a1_memory_profile_consumption_audit_test.dart`
- Create: `packages/learning_core/test/a1_coordinator_memory_profile_test.dart`

- [ ] **Step 1: Write the failing profile projection test**

Create `packages/learning_core/test/a1_coordinator_memory_profile_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1CoordinatorMemoryProfile', () {
    test('projects support growth refresh and recent route state', () {
      final graph = MasteryMemoryGraphProjector().project([
        MasteryGraphEvidenceEvent(
          eventId: 'e1',
          targetId: 'predicate.like',
          targetKind: MasteryMemoryNodeKind.word,
          evidenceKind: MasteryGraphEvidenceKind.finalConversation,
          sessionId: 's1',
        ),
        MasteryGraphEvidenceEvent(
          eventId: 'e2',
          targetId: 'predicate.like',
          targetKind: MasteryMemoryNodeKind.word,
          evidenceKind: MasteryGraphEvidenceKind.finalConversation,
          sessionId: 's2',
        ),
        MasteryGraphEvidenceEvent(
          eventId: 'e3',
          targetId: 'time.anchor',
          targetKind: MasteryMemoryNodeKind.word,
          evidenceKind: MasteryGraphEvidenceKind.miss,
          sessionId: 's2',
        ),
      ]);

      final profile = A1CoordinatorMemoryProfile.fromGraph(
        graph,
        recentRouteHistory: const [
          A1RecentIslandRoute(
            islandId: 'preferences_opinions',
            routeId: 'preference_alternative_arc',
          ),
        ],
      );

      expect(profile.supportCandidatesByFamily['global'],
          contains('predicate.like'));
      expect(profile.refreshTargetsByFamily['global'], contains('time.anchor'));
      expect(profile.recentIslandRouteHistory.single.routeId,
          'preference_alternative_arc');
      expect(profile.eligibleRungsByFamily['global'],
          contains(A1ProgressionRung.revisitSupport));
    });
  });
}
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_coordinator_memory_profile_test.dart
```

Expected: FAIL because the profile types are missing.

- [ ] **Step 3: Implement profile model and projection**

Create `packages/learning_core/lib/src/a1_coordinator_memory_profile.dart`:

```dart
import 'a1_memory_led_progression_audit.dart';
import 'mastery_memory_graph.dart';
import 'surface_aware_memory_policy.dart';

enum A1CoordinatorIslandState {
  unseen,
  firstContacted,
  active,
  saturatedThisSession,
  supportReady,
  refreshNeeded,
  blockedByCapability,
  blockedByMetadata,
}

enum A1CoordinatorRouteState {
  neverUsed,
  recentlyUsed,
  productiveReturnEligible,
  staleReturnBlocked,
  refreshEligible,
}

final class A1RecentIslandRoute {
  const A1RecentIslandRoute({
    required this.islandId,
    required this.routeId,
  });

  final String islandId;
  final String routeId;
}

final class A1CoordinatorMemoryProfile {
  const A1CoordinatorMemoryProfile({
    required this.islandStateByFamily,
    required this.routeStateByFamily,
    required this.supportCandidatesByFamily,
    required this.growthCandidatesByFamily,
    required this.refreshTargetsByFamily,
    required this.cooledPrimaryTargetsByFamily,
    required this.blockedTargetsByFamily,
    required this.eligibleRungsByFamily,
    required this.blockedRungsByFamily,
    required this.eligibleUpgradeAxesByFamily,
    required this.recentIslandRouteHistory,
  });

  factory A1CoordinatorMemoryProfile.fromGraph(
    MasteryMemoryGraphState graph, {
    List<A1RecentIslandRoute> recentRouteHistory = const [],
  }) {
    final rollups = graph.surfaceAwareRollups(
      policy: SurfaceAwareMemoryPolicy.defaultPolicy,
    );
    final support = <String>[];
    final growth = <String>[];
    final refresh = <String>[];
    final cooled = <String>[];
    final blocked = <String>[];

    for (final entry in rollups.byId.entries) {
      final targetId = entry.key;
      final effect = entry.value.coordinatorEffect;
      if (effect.supportEligible) {
        support.add(targetId);
      }
      if (effect.refreshRequired || entry.value.missCount > 0) {
        refresh.add(targetId);
      }
      if (effect.cooldownSessions > 0 ||
          entry.value.saturationState != SurfaceAwareSaturationState.notSaturated) {
        cooled.add(targetId);
      }
      if (!effect.supportEligible && !effect.refreshRequired) {
        growth.add(targetId);
      }
    }

    support.sort();
    growth.sort();
    refresh.sort();
    cooled.sort();
    blocked.sort();

    final islandState = support.isEmpty && refresh.isEmpty
        ? A1CoordinatorIslandState.firstContacted
        : refresh.isNotEmpty
            ? A1CoordinatorIslandState.refreshNeeded
            : A1CoordinatorIslandState.supportReady;

    return A1CoordinatorMemoryProfile(
      islandStateByFamily: {'global': islandState},
      routeStateByFamily: {
        'global': recentRouteHistory.isEmpty
            ? A1CoordinatorRouteState.neverUsed
            : A1CoordinatorRouteState.productiveReturnEligible,
      },
      supportCandidatesByFamily: {'global': List.unmodifiable(support)},
      growthCandidatesByFamily: {'global': List.unmodifiable(growth)},
      refreshTargetsByFamily: {'global': List.unmodifiable(refresh)},
      cooledPrimaryTargetsByFamily: {'global': List.unmodifiable(cooled)},
      blockedTargetsByFamily: {'global': List.unmodifiable(blocked)},
      eligibleRungsByFamily: {
        'global': [
          A1ProgressionRung.firstContact,
          if (support.isNotEmpty) A1ProgressionRung.revisitSupport,
          if (refresh.isNotEmpty) A1ProgressionRung.refresh,
        ],
      },
      blockedRungsByFamily: const {},
      eligibleUpgradeAxesByFamily: {
        'global': [
          if (support.isNotEmpty) 'support_growth',
          if (refresh.isNotEmpty) 'refresh',
        ],
      },
      recentIslandRouteHistory: List.unmodifiable(recentRouteHistory),
    );
  }

  final Map<String, A1CoordinatorIslandState> islandStateByFamily;
  final Map<String, A1CoordinatorRouteState> routeStateByFamily;
  final Map<String, List<String>> supportCandidatesByFamily;
  final Map<String, List<String>> growthCandidatesByFamily;
  final Map<String, List<String>> refreshTargetsByFamily;
  final Map<String, List<String>> cooledPrimaryTargetsByFamily;
  final Map<String, List<String>> blockedTargetsByFamily;
  final Map<String, List<A1ProgressionRung>> eligibleRungsByFamily;
  final Map<String, List<A1ProgressionRung>> blockedRungsByFamily;
  final Map<String, List<String>> eligibleUpgradeAxesByFamily;
  final List<A1RecentIslandRoute> recentIslandRouteHistory;
}
```

- [ ] **Step 4: Export profile**

Add to `packages/learning_core/lib/learning_core.dart`:

```dart
export 'src/a1_coordinator_memory_profile.dart';
```

- [ ] **Step 5: Update memory profile audit to use the new profile**

In `A1MemoryProfileConsumptionAudit.run()`, construct `A1CoordinatorMemoryProfile.fromGraph(graph)` and derive `missingProfileFields` by checking the profile's maps, not by returning a static missing list. Keep any field missing from the profile as a blocker.

- [ ] **Step 6: Verify**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_coordinator_memory_profile_test.dart \
  test/a1_memory_profile_consumption_audit_test.dart
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_coordinator_memory_profile.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_coordinator_memory_profile_test.dart \
  packages/learning_core/test/a1_memory_profile_consumption_audit_test.dart
git commit -m "feat: add A1 coordinator memory profile"
```

## Task 13: Product Audit Visible Reuse Classification

**Purpose:** Distinguish visible word reuse from intentional memory support, cooled support, stale repeat, accidental reuse, route scarcity, metadata scarcity, and coherence block.

**Audit finding addressed:** `productDiversity` underdeveloped because product rows currently show all-growth even when the learner feels repeated words.

**Remediation Decision Record:**

```text
productFailure: lesson feels repetitive even when audit says all growth
firstFailingLayer: productDiversity
evidence: user reported repeated words while product audit classified later starts as allGrowthIslandHopping
selectedRepair: improve product audit classification before changing selection behavior
whyThisRepairFirst: implementation needs to prove whether later fixes change intentional support or only visible surfaces
productionBehaviorChanged: product audit becomes a production-path diagnostic for real Focus starts
backendProof: audit rows classify visible reuse separately from intentional support
uiProductCheckpoint: limited visible change; later UI checkpoints can explain repetition cause
remainingOwnedBlocker: coordinatorPolicy remains blocked until target bundle selection changes production behavior
```

**Files:**

- Modify: `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`

- [ ] **Step 1: Add classification expectations**

Update `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart` so product rows expose:

```dart
expect(
  result.productRows.skip(1),
  everyElement(
    predicate<A1ProgressionProductRow>(
      (row) => row.notes.contains('visibleReuse=') &&
          row.notes.contains('supportIntent=') &&
          row.notes.contains('repetitionCause='),
      'row names visible reuse, support intent, and repetition cause',
    ),
  ),
);
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_memory_led_product_progression_audit_test.dart \
  --concurrency=1
```

Expected: FAIL because product row notes do not expose the new classification fields.

- [ ] **Step 3: Implement note classification in the test-local audit harness**

In `_rowForReady`, compute:

```dart
final previousGrowth = previousRows
    .expand((row) => row.growthTargetIds)
    .toSet();
final visibleReuseIds = signature.finalProofTargetIds
    .where(previousGrowth.contains)
    .toList(growable: false);
final supportIntent = composition.supportTargetIds.isNotEmpty
    ? 'intentional_support'
    : visibleReuseIds.isNotEmpty
        ? 'visible_reuse_without_support'
        : 'no_visible_reuse';
final repetitionCause = composition.supportTargetIds.isNotEmpty
    ? 'support_growth'
    : previousRows.any((row) => row.islandId == familyId)
        ? 'same_island_without_support'
        : 'island_hop_without_support';
```

Append to `notes`:

```dart
'visibleReuse=${visibleReuseIds.join(",")}; '
'supportIntent=$supportIntent; '
'repetitionCause=$repetitionCause; '
```

- [ ] **Step 4: Verify**

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_memory_led_product_progression_audit_test.dart \
  --concurrency=1
```

Expected: PASS, with product rows that name visible reuse and support intent.

- [ ] **Step 5: Commit**

```bash
git add apps/mobile/test/a1_memory_led_product_progression_audit_test.dart
git commit -m "test: classify A1 product repetition causes"
```

## Task 14: Shared Progression Policy Bundle

**Purpose:** Move support/growth mix, route-return thresholds, cooldowns, and stale-repeat decisions into a shared policy surface.

**Audit finding addressed:** `sharedSurface.progression_policy_missing`.

**Remediation Decision Record:**

```text
productFailure: support and growth behavior cannot be globally tuned when lessons move too fast or too slowly
firstFailingLayer: coordinatorPolicy shared surface
evidence: audit report says stakeholder tuning still risks coordinator-only edits
selectedRepair: add shared progression policy bundle and consume it in composition scoring
whyThisRepairFirst: target bundle selection needs tunable thresholds before it can reject all-growth revisits deterministically
productionBehaviorChanged: coordinator and audit read the same support/growth and route-return thresholds
backendProof: changing policy thresholds changes audit/coordinator classification in a test
uiProductCheckpoint: no immediate UI change expected; later visible changes become tunable
remainingOwnedBlocker: coordinatorPolicy remains blocked until Task 15 uses the policy for target bundles
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_progression_policy.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/lib/src/a1_lesson_composition.dart`
- Create: `packages/learning_core/test/a1_progression_policy_test.dart`

- [ ] **Step 1: Write failing policy test**

Create `packages/learning_core/test/a1_progression_policy_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('shared progression policy controls revisit support requirements', () {
    const policy = A1ProgressionPolicy.defaultPolicy;

    expect(policy.requireSupportForRevisit, isTrue);
    expect(policy.minSupportTargetsForRevisit, 1);
    expect(policy.minGrowthOrRefreshTargetsForRevisit, 1);
    expect(policy.exactSupportSurfaceCooldownWindow, 3);
    expect(policy.underusedSupportBonus, greaterThan(0));
    expect(policy.repeatedSupportSurfacePenalty, lessThan(0));
    expect(policy.masteredPrimaryFocusPenalty, lessThan(0));
    expect(policy.allowVerifiedParadigmExpansion, isTrue);

    final relaxed = policy.copyWith(requireSupportForRevisit: false);
    expect(relaxed.requireSupportForRevisit, isFalse);
    expect(relaxed.policyBundleId, policy.policyBundleId);
  });
}
```

- [ ] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_progression_policy_test.dart
```

Expected: FAIL because `A1ProgressionPolicy` is missing.

- [ ] **Step 3: Implement policy**

Create `packages/learning_core/lib/src/a1_progression_policy.dart`:

```dart
final class A1ProgressionPolicy {
  const A1ProgressionPolicy({
    required this.policyBundleId,
    required this.version,
    required this.requireSupportForRevisit,
    required this.minSupportTargetsForRevisit,
    required this.minGrowthOrRefreshTargetsForRevisit,
    required this.maxRecentRouteReturnWindow,
    required this.exactSupportSurfaceCooldownWindow,
    required this.underusedSupportBonus,
    required this.repeatedSupportSurfacePenalty,
    required this.masteredPrimaryFocusPenalty,
    required this.allowVerifiedParadigmExpansion,
    required this.allowFirstContactAllGrowth,
  });

  static const defaultPolicy = A1ProgressionPolicy(
    policyBundleId: 'a1_progression_policy.2026-06-01.v1',
    version: '2026-06-01.v1',
    requireSupportForRevisit: true,
    minSupportTargetsForRevisit: 1,
    minGrowthOrRefreshTargetsForRevisit: 1,
    maxRecentRouteReturnWindow: 3,
    exactSupportSurfaceCooldownWindow: 3,
    underusedSupportBonus: 20,
    repeatedSupportSurfacePenalty: -80,
    masteredPrimaryFocusPenalty: -40,
    allowVerifiedParadigmExpansion: true,
    allowFirstContactAllGrowth: true,
  );

  final String policyBundleId;
  final String version;
  final bool requireSupportForRevisit;
  final int minSupportTargetsForRevisit;
  final int minGrowthOrRefreshTargetsForRevisit;
  final int maxRecentRouteReturnWindow;
  final int exactSupportSurfaceCooldownWindow;
  final int underusedSupportBonus;
  final int repeatedSupportSurfacePenalty;
  final int masteredPrimaryFocusPenalty;
  final bool allowVerifiedParadigmExpansion;
  final bool allowFirstContactAllGrowth;

  A1ProgressionPolicy copyWith({
    bool? requireSupportForRevisit,
    int? minSupportTargetsForRevisit,
    int? minGrowthOrRefreshTargetsForRevisit,
    int? maxRecentRouteReturnWindow,
    int? exactSupportSurfaceCooldownWindow,
    int? underusedSupportBonus,
    int? repeatedSupportSurfacePenalty,
    int? masteredPrimaryFocusPenalty,
    bool? allowVerifiedParadigmExpansion,
    bool? allowFirstContactAllGrowth,
  }) {
    return A1ProgressionPolicy(
      policyBundleId: policyBundleId,
      version: version,
      requireSupportForRevisit:
          requireSupportForRevisit ?? this.requireSupportForRevisit,
      minSupportTargetsForRevisit:
          minSupportTargetsForRevisit ?? this.minSupportTargetsForRevisit,
      minGrowthOrRefreshTargetsForRevisit:
          minGrowthOrRefreshTargetsForRevisit ??
              this.minGrowthOrRefreshTargetsForRevisit,
      maxRecentRouteReturnWindow:
          maxRecentRouteReturnWindow ?? this.maxRecentRouteReturnWindow,
      exactSupportSurfaceCooldownWindow:
          exactSupportSurfaceCooldownWindow ??
              this.exactSupportSurfaceCooldownWindow,
      underusedSupportBonus:
          underusedSupportBonus ?? this.underusedSupportBonus,
      repeatedSupportSurfacePenalty:
          repeatedSupportSurfacePenalty ??
              this.repeatedSupportSurfacePenalty,
      masteredPrimaryFocusPenalty:
          masteredPrimaryFocusPenalty ?? this.masteredPrimaryFocusPenalty,
      allowVerifiedParadigmExpansion:
          allowVerifiedParadigmExpansion ??
              this.allowVerifiedParadigmExpansion,
      allowFirstContactAllGrowth:
          allowFirstContactAllGrowth ?? this.allowFirstContactAllGrowth,
    );
  }
}
```

- [ ] **Step 4: Export policy**

Add:

```dart
export 'src/a1_progression_policy.dart';
```

to `packages/learning_core/lib/learning_core.dart`.

- [ ] **Step 5: Verify**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_progression_policy_test.dart \
  test/a1_lesson_composition_test.dart
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_progression_policy.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_progression_policy_test.dart
git commit -m "feat: add shared A1 progression policy"
```

## Task 15: Learning Pressure And Target Bundle Model

**Purpose:** Make the coordinator decide why the next lesson exists before selecting a route.

**Audit finding addressed:** `coordinatorPolicy.composition_no_support_growth_available`.

**Remediation Decision Record:**

```text
productFailure: later lessons hop islands or reuse words without intentional support-growth progression
firstFailingLayer: coordinator target bundle
evidence: product rows after completion show allGrowthIslandHopping with support empty and growth full
selectedRepair: implement learning-pressure classification and target bundle construction from coordinator memory profile
whyThisRepairFirst: route selection must be driven by memory pressure rather than available shells
productionBehaviorChanged: coordinator can build support/growth/refresh bundles before asking the arc generator for candidates
backendProof: seeded memory produces target bundles with support and growth
uiProductCheckpoint: after Task 16A, learner should see familiar support anchors with controlled new material that does not reuse the same support surface every lesson
remainingOwnedBlocker: arcCoverage may block if no route can materialize the selected bundle
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_target_bundle.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Create: `packages/learning_core/test/a1_target_bundle_test.dart`

- [ ] **Step 1: Write failing target bundle test**

Create `packages/learning_core/test/a1_target_bundle_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('builds revisit support-growth bundle from memory profile', () {
    final profile = A1CoordinatorMemoryProfile(
      islandStateByFamily: const {
        'preferences_opinions': A1CoordinatorIslandState.supportReady,
      },
      routeStateByFamily: const {
        'preferences_opinions': A1CoordinatorRouteState.productiveReturnEligible,
      },
      supportCandidatesByFamily: const {
        'preferences_opinions': ['predicate.like'],
      },
      growthCandidatesByFamily: const {
        'preferences_opinions': ['place.school'],
      },
      refreshTargetsByFamily: const {'preferences_opinions': []},
      cooledPrimaryTargetsByFamily: const {'preferences_opinions': []},
      blockedTargetsByFamily: const {'preferences_opinions': []},
      eligibleRungsByFamily: const {
        'preferences_opinions': [A1ProgressionRung.revisitSupport],
      },
      blockedRungsByFamily: const {},
      eligibleUpgradeAxesByFamily: const {
        'preferences_opinions': ['location_context'],
      },
      recentIslandRouteHistory: const [],
    );

    final bundle = A1TargetBundlePlanner(
      policy: A1ProgressionPolicy.defaultPolicy,
    ).build(profile).single;

    expect(bundle.learningPressure, A1LearningPressure.returnProductively);
    expect(bundle.islandId, 'preferences_opinions');
    expect(bundle.supportTargetIds, ['predicate.like']);
    expect(bundle.growthTargetIds, ['place.school']);
    expect(bundle.upgradeAxis, 'location_context');
    expect(bundle.isSupportGrowthBlend, isTrue);
  });
}
```

- [ ] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_target_bundle_test.dart
```

Expected: FAIL because bundle types are missing.

- [ ] **Step 3: Implement target bundle planner**

Create `packages/learning_core/lib/src/a1_target_bundle.dart` with:

```dart
import 'a1_coordinator_memory_profile.dart';
import 'a1_memory_led_progression_audit.dart';
import 'a1_progression_policy.dart';

enum A1LearningPressure {
  firstContact,
  consolidate,
  expandSlot,
  expandContext,
  refresh,
  returnProductively,
  changeIsland,
  blocked,
}

final class A1TargetBundle {
  const A1TargetBundle({
    required this.learningPressure,
    required this.islandId,
    required this.rung,
    required this.upgradeAxis,
    required this.supportTargetIds,
    required this.growthTargetIds,
    required this.refreshTargetIds,
    required this.cooledTargetIds,
    required this.blockedTargetIds,
    required this.trace,
  });

  final A1LearningPressure learningPressure;
  final String islandId;
  final A1ProgressionRung rung;
  final String upgradeAxis;
  final List<String> supportTargetIds;
  final List<String> growthTargetIds;
  final List<String> refreshTargetIds;
  final List<String> cooledTargetIds;
  final List<String> blockedTargetIds;
  final List<String> trace;

  bool get isSupportGrowthBlend =>
      supportTargetIds.isNotEmpty &&
      (growthTargetIds.isNotEmpty || refreshTargetIds.isNotEmpty);
}

final class A1TargetBundlePlanner {
  const A1TargetBundlePlanner({required this.policy});

  final A1ProgressionPolicy policy;

  List<A1TargetBundle> build(A1CoordinatorMemoryProfile profile) {
    final bundles = <A1TargetBundle>[];
    final familyIds = <String>{
      ...profile.supportCandidatesByFamily.keys,
      ...profile.growthCandidatesByFamily.keys,
      ...profile.refreshTargetsByFamily.keys,
    };

    for (final familyId in familyIds) {
      final support = profile.supportCandidatesByFamily[familyId] ?? const [];
      final growth = profile.growthCandidatesByFamily[familyId] ?? const [];
      final refresh = profile.refreshTargetsByFamily[familyId] ?? const [];
      final cooled =
          profile.cooledPrimaryTargetsByFamily[familyId] ?? const [];
      final blocked = profile.blockedTargetsByFamily[familyId] ?? const [];
      final axes = profile.eligibleUpgradeAxesByFamily[familyId] ?? const [];
      final rungs = profile.eligibleRungsByFamily[familyId] ?? const [];
      final hasSupport = support.length >= policy.minSupportTargetsForRevisit;
      final hasGrowth =
          growth.length + refresh.length >= policy.minGrowthOrRefreshTargetsForRevisit;

      if (hasSupport && hasGrowth) {
        bundles.add(
          A1TargetBundle(
            learningPressure: A1LearningPressure.returnProductively,
            islandId: familyId,
            rung: rungs.contains(A1ProgressionRung.revisitSupport)
                ? A1ProgressionRung.revisitSupport
                : A1ProgressionRung.blocked,
            upgradeAxis: axes.isEmpty ? 'support_growth' : axes.first,
            supportTargetIds: support.take(2).toList(growable: false),
            growthTargetIds: growth.take(2).toList(growable: false),
            refreshTargetIds: refresh.take(1).toList(growable: false),
            cooledTargetIds: cooled,
            blockedTargetIds: blocked,
            trace: const ['coordinatorPolicy.target_bundle.support_growth'],
          ),
        );
      }
    }

    return List.unmodifiable(bundles);
  }
}
```

- [ ] **Step 4: Export target bundle**

Add:

```dart
export 'src/a1_target_bundle.dart';
```

to `packages/learning_core/lib/learning_core.dart`.

- [ ] **Step 5: Verify**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_target_bundle_test.dart \
  test/a1_progression_policy_test.dart
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_target_bundle.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_target_bundle_test.dart
git commit -m "feat: add A1 target bundle planner"
```

## Task 16: Coordinator Rejects All-Growth Revisits

**Purpose:** Change production coordinator behavior so later lessons cannot be treated as successful progression when viable support exists but is ignored.

**Audit finding addressed:** `coordinatorPolicy.composition_no_support_growth_available`.

**Remediation Decision Record:**

```text
productFailure: later lessons feel repetitive or scattered because familiar words are not used as deliberate support
firstFailingLayer: coordinatorPolicy
evidence: product audit rows after start 0 classify all later rows as allGrowthIslandHopping
selectedRepair: feed target bundles into FocusCoordinator candidate selection and reject all-growth revisits when support is viable
whyThisRepairFirst: this is the first slice expected to change lesson formation
productionBehaviorChanged: FocusCoordinator uses A1TargetBundlePlanner before selecting A1 arc candidates
backendProof: product progression audit shows at least one supportGrowthBlend row
uiProductCheckpoint: learner should start seeing familiar support anchors with controlled new targets
remainingOwnedBlocker: arcCoverage owns failure if no registered route can satisfy a valid target bundle
```

**Files:**

- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`
- Modify: `packages/learning_core/test/a1_coordinator_decision_audit_test.dart`
- Modify: `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`

- [ ] **Step 1: Strengthen failing coordinator decision test**

In `packages/learning_core/test/a1_coordinator_decision_audit_test.dart`, add:

```dart
expect(
  result.rows.single.supportTargetIds,
  isNotEmpty,
  reason: 'seeded support must be selected as support, not ignored',
);
expect(
  result.blockers.where(
    (blocker) =>
        blocker.code ==
        A1ProgressionBlockerCode.compositionNoSupportGrowthAvailable.value,
  ),
  isEmpty,
);
```

- [ ] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_coordinator_decision_audit_test.dart
```

Expected: FAIL because the current coordinator still reports `composition_no_support_growth_available`.

- [ ] **Step 3: Thread target bundles into A1 selection**

In `FocusCoordinator.createA1ConversationArcFocusPlan`, build:

```dart
final coordinatorProfile = memoryGraph == null
    ? null
    : A1CoordinatorMemoryProfile.fromGraph(memoryGraph);
final targetBundles = coordinatorProfile == null
    ? const <A1TargetBundle>[]
    : A1TargetBundlePlanner(
        policy: A1ProgressionPolicy.defaultPolicy,
      ).build(coordinatorProfile);
```

Use the first compatible bundle to bias family/arc scoring. A candidate is compatible when:

```dart
candidate.familyId == bundle.islandId &&
bundle.isSupportGrowthBlend
```

If a bundle exists but no candidate can satisfy it, append an owned trace reason:

```dart
'arcCoverage.support_growth_bundle_no_registered_route'
```

and keep a blocker row available to the audit.

- [ ] **Step 4: Update composition audit to classify bundle usage**

In `A1CoordinatorDecisionAudit.run()`, include target bundle support/growth ids in the row before falling back to `A1LessonTargetRoleClassifier`. The audit should prefer the target bundle's role assignment when present.

- [ ] **Step 5: Verify backend coordinator tests**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_target_bundle_test.dart \
  test/a1_coordinator_decision_audit_test.dart
```

Expected: PASS.

- [ ] **Step 6: Verify product progression test**

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_memory_led_product_progression_audit_test.dart \
  --concurrency=1
```

Expected: PASS and printed rows include at least one `support_growth_blend` or an owned `arcCoverage` blocker explaining why the bundle could not be materialized.

- [ ] **Step 7: Commit**

```bash
git add \
  packages/learning_core/lib/src/focus_coordinator.dart \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_coordinator_decision_audit_test.dart \
  apps/mobile/test/a1_memory_led_product_progression_audit_test.dart
git commit -m "feat: make A1 coordinator use support-growth bundles"
```

## Task 16A: Support Rotation And Paradigm Expansion Planner

**Purpose:** Prevent the coordinator from repeatedly using the same support word, support role, or exact support surface when memory has viable alternatives.

**Audit finding addressed:** support anchors such as `bithebb`, `kitab`, and `el medina` can recur as the visible spine of several lessons even when the growth word changes.

**Remediation Decision Record:**

```text
productFailure: lessons feel like the same shell because the same support word or form keeps carrying the route
firstFailingLayer: coordinatorPolicy support rotation
evidence: stakeholder trial reported repeated support anchors and verb forms even after memory upgrades
selectedRepair: add support role pools, exact-surface cooldowns, underused-support scoring, and verified paradigm expansion selection
whyThisRepairFirst: target bundles must choose support intentionally before route capability or metadata repairs can make the lesson feel different
productionBehaviorChanged: target bundles include rotated support surfaces and paradigm-growth decisions instead of only canonical target ids
backendProof: support-rotation tests prove repeated support surfaces rotate, thin pools block, and unverified forms are rejected
uiProductCheckpoint: learner should see familiar material used as support without the same support surface carrying every lesson
remainingOwnedBlocker: supportPool or metadataReadiness owns failures when no safe support alternative or verified expansion form exists
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_support_rotation_policy.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/lib/src/a1_target_bundle.dart`
- Modify: `packages/learning_core/lib/src/a1_progression_policy.dart`
- Create: `packages/learning_core/test/a1_support_rotation_policy_test.dart`
- Modify: `packages/learning_core/test/a1_target_bundle_test.dart`

- [ ] **Step 1: Write failing support rotation tests**

Create `packages/learning_core/test/a1_support_rotation_policy_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('rotates exact support surfaces when alternatives exist', () {
    final planner = A1SupportRotationPlanner(
      policy: A1ProgressionPolicy.defaultPolicy,
    );

    final selection = planner.select(
      role: A1SupportRole.predicate,
      candidates: const [
        A1SupportCandidate(
          canonicalTargetId: 'predicate.like',
          surfaceTargetId: 'predicate.like.present.first.ana_bahebb',
          surface: 'ana bahebb',
          role: A1SupportRole.predicate,
          readiness: A1SupportReadiness.knownButNotMastered,
          routeRelevance: 10,
          timesUsedAsSupport: 5,
          isMasteredPrimary: false,
        ),
        A1SupportCandidate(
          canonicalTargetId: 'predicate.study',
          surfaceTargetId: 'predicate.study.present.first.ana_bazaker',
          surface: 'ana bazaker',
          role: A1SupportRole.predicate,
          readiness: A1SupportReadiness.knownButNotMastered,
          routeRelevance: 9,
          timesUsedAsSupport: 0,
          isMasteredPrimary: false,
        ),
      ],
      recentSupportSurfaceIds: const [
        'predicate.like.present.first.ana_bahebb',
      ],
    );

    expect(selection.selected?.surfaceTargetId,
        'predicate.study.present.first.ana_bazaker');
    expect(selection.blockerCode, isEmpty);
    expect(selection.trace, contains('supportRotation.exact_surface_cooldown'));
  });

  test('returns role-specific blocker when support pool is too thin', () {
    final planner = A1SupportRotationPlanner(
      policy: A1ProgressionPolicy.defaultPolicy,
    );

    final selection = planner.select(
      role: A1SupportRole.predicate,
      candidates: const [
        A1SupportCandidate(
          canonicalTargetId: 'predicate.like',
          surfaceTargetId: 'predicate.like.present.first.ana_bahebb',
          surface: 'ana bahebb',
          role: A1SupportRole.predicate,
          readiness: A1SupportReadiness.mastered,
          routeRelevance: 10,
          timesUsedAsSupport: 6,
          isMasteredPrimary: true,
        ),
      ],
      recentSupportSurfaceIds: const [
        'predicate.like.present.first.ana_bahebb',
      ],
    );

    expect(selection.selected, isNull);
    expect(selection.blockerCode,
        A1ProgressionBlockerCode.supportPoolPredicateTooThin.value);
  });

  test('allows known lemma to support only verified new forms', () {
    final planner = A1SupportRotationPlanner(
      policy: A1ProgressionPolicy.defaultPolicy,
    );

    final allowed = planner.selectParadigmExpansion(
      support: const A1SupportCandidate(
        canonicalTargetId: 'predicate.like',
        surfaceTargetId: 'predicate.like.present.first.ana_bahebb',
        surface: 'ana bahebb',
        role: A1SupportRole.predicate,
        readiness: A1SupportReadiness.stable,
        routeRelevance: 10,
        timesUsedAsSupport: 1,
        isMasteredPrimary: false,
      ),
      expansion: const A1ParadigmExpansionCandidate(
        canonicalTargetId: 'predicate.like',
        surfaceTargetId: 'predicate.like.present.third_masc.howwa_bihebb',
        surface: 'howwa bihebb',
        supportSurfaceTargetId: 'predicate.like.present.first.ana_bahebb',
        person: 'third',
        number: 'singular',
        gender: 'masculine',
        tenseAspect: 'present',
        isVerifiedForm: true,
      ),
    );

    expect(allowed.isAllowed, isTrue);
    expect(allowed.blockerCode, isEmpty);

    final blocked = planner.selectParadigmExpansion(
      support: allowed.support!,
      expansion: const A1ParadigmExpansionCandidate(
        canonicalTargetId: 'predicate.like',
        surfaceTargetId: 'predicate.like.unsupported.ana_habb',
        surface: 'ana habb',
        supportSurfaceTargetId: 'predicate.like.present.first.ana_bahebb',
        person: 'first',
        number: 'singular',
        gender: '',
        tenseAspect: 'unsupported',
        isVerifiedForm: false,
      ),
    );

    expect(blocked.isAllowed, isFalse);
    expect(blocked.blockerCode,
        A1ProgressionBlockerCode.paradigmFormUnverified.value);
  });
}
```

- [ ] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_support_rotation_policy_test.dart
```

Expected: FAIL because `A1SupportRotationPlanner`, `A1SupportCandidate`, `A1SupportRole`, and `A1ParadigmExpansionCandidate` are missing.

- [ ] **Step 3: Implement support rotation planner**

Create `packages/learning_core/lib/src/a1_support_rotation_policy.dart`:

```dart
import 'a1_progression_contracts.dart';
import 'a1_progression_policy.dart';

enum A1SupportRole {
  predicate,
  object,
  place,
  time,
  person,
  connector,
  bridge,
}

enum A1SupportReadiness {
  knownButNotMastered,
  stable,
  mastered,
  refreshNeeded,
}

final class A1SupportCandidate {
  const A1SupportCandidate({
    required this.canonicalTargetId,
    required this.surfaceTargetId,
    required this.surface,
    required this.role,
    required this.readiness,
    required this.routeRelevance,
    required this.timesUsedAsSupport,
    required this.isMasteredPrimary,
  });

  final String canonicalTargetId;
  final String surfaceTargetId;
  final String surface;
  final A1SupportRole role;
  final A1SupportReadiness readiness;
  final int routeRelevance;
  final int timesUsedAsSupport;
  final bool isMasteredPrimary;
}

final class A1SupportSelectionResult {
  const A1SupportSelectionResult({
    required this.selected,
    required this.blockerCode,
    required this.trace,
  });

  final A1SupportCandidate? selected;
  final String blockerCode;
  final List<String> trace;
}

final class A1ParadigmExpansionCandidate {
  const A1ParadigmExpansionCandidate({
    required this.canonicalTargetId,
    required this.surfaceTargetId,
    required this.surface,
    required this.supportSurfaceTargetId,
    required this.person,
    required this.number,
    required this.gender,
    required this.tenseAspect,
    required this.isVerifiedForm,
  });

  final String canonicalTargetId;
  final String surfaceTargetId;
  final String surface;
  final String supportSurfaceTargetId;
  final String person;
  final String number;
  final String gender;
  final String tenseAspect;
  final bool isVerifiedForm;
}

final class A1ParadigmExpansionSelection {
  const A1ParadigmExpansionSelection({
    required this.isAllowed,
    required this.support,
    required this.expansion,
    required this.blockerCode,
    required this.trace,
  });

  final bool isAllowed;
  final A1SupportCandidate? support;
  final A1ParadigmExpansionCandidate? expansion;
  final String blockerCode;
  final List<String> trace;
}

final class A1SupportRotationPlanner {
  const A1SupportRotationPlanner({required this.policy});

  final A1ProgressionPolicy policy;

  A1SupportSelectionResult select({
    required A1SupportRole role,
    required List<A1SupportCandidate> candidates,
    required List<String> recentSupportSurfaceIds,
  }) {
    final roleCandidates =
        candidates.where((candidate) => candidate.role == role).toList();
    if (roleCandidates.isEmpty) {
      return A1SupportSelectionResult(
        selected: null,
        blockerCode: _thinPoolBlocker(role),
        trace: const ['supportRotation.role_pool_empty'],
      );
    }

    final scored = roleCandidates.map((candidate) {
      var score = candidate.routeRelevance;
      if (candidate.readiness == A1SupportReadiness.knownButNotMastered ||
          candidate.readiness == A1SupportReadiness.stable) {
        score += policy.underusedSupportBonus;
      }
      if (candidate.timesUsedAsSupport == 0) {
        score += policy.underusedSupportBonus;
      }
      if (recentSupportSurfaceIds.contains(candidate.surfaceTargetId)) {
        score += policy.repeatedSupportSurfacePenalty;
      }
      if (candidate.isMasteredPrimary) {
        score += policy.masteredPrimaryFocusPenalty;
      }
      return MapEntry(candidate, score);
    }).toList()
      ..sort((left, right) => right.value.compareTo(left.value));

    final selected = scored.first.key;
    final trace = <String>[];
    if (recentSupportSurfaceIds.contains(selected.surfaceTargetId)) {
      return A1SupportSelectionResult(
        selected: null,
        blockerCode: _thinPoolBlocker(role),
        trace: const ['supportRotation.exact_surface_cooldown'],
      );
    }
    if (scored.any(
      (entry) => recentSupportSurfaceIds.contains(entry.key.surfaceTargetId),
    )) {
      trace.add('supportRotation.exact_surface_cooldown');
    }

    return A1SupportSelectionResult(
      selected: selected,
      blockerCode: '',
      trace: List.unmodifiable(trace),
    );
  }

  A1ParadigmExpansionSelection selectParadigmExpansion({
    required A1SupportCandidate support,
    required A1ParadigmExpansionCandidate expansion,
  }) {
    if (!policy.allowVerifiedParadigmExpansion ||
        !expansion.isVerifiedForm ||
        expansion.canonicalTargetId != support.canonicalTargetId ||
        expansion.supportSurfaceTargetId != support.surfaceTargetId) {
      return A1ParadigmExpansionSelection(
        isAllowed: false,
        support: support,
        expansion: expansion,
        blockerCode: A1ProgressionBlockerCode.paradigmFormUnverified.value,
        trace: const ['supportRotation.paradigm_form_unverified'],
      );
    }
    return A1ParadigmExpansionSelection(
      isAllowed: true,
      support: support,
      expansion: expansion,
      blockerCode: '',
      trace: const ['supportRotation.verified_paradigm_expansion'],
    );
  }

  String _thinPoolBlocker(A1SupportRole role) {
    switch (role) {
      case A1SupportRole.predicate:
        return A1ProgressionBlockerCode.supportPoolPredicateTooThin.value;
      case A1SupportRole.object:
        return A1ProgressionBlockerCode.supportPoolObjectTooThin.value;
      case A1SupportRole.place:
        return A1ProgressionBlockerCode.supportPoolPlaceTooThin.value;
      case A1SupportRole.time:
        return A1ProgressionBlockerCode.supportPoolTimeTooThin.value;
      case A1SupportRole.person:
        return A1ProgressionBlockerCode.supportPoolPersonTooThin.value;
      case A1SupportRole.connector:
        return A1ProgressionBlockerCode.supportPoolConnectorTooThin.value;
      case A1SupportRole.bridge:
        return A1ProgressionBlockerCode.supportPoolBridgeTooThin.value;
    }
  }
}
```

- [ ] **Step 4: Export support rotation policy**

Add:

```dart
export 'src/a1_support_rotation_policy.dart';
```

to `packages/learning_core/lib/learning_core.dart`.

- [ ] **Step 5: Extend target bundle with support surface and paradigm fields**

In `packages/learning_core/lib/src/a1_target_bundle.dart`, add these fields to `A1TargetBundle` and populate them from `A1SupportRotationPlanner` when support candidates are available:

```dart
final A1SupportRole? selectedSupportRole;
final String selectedSupportSurfaceTargetId;
final String selectedSupportCanonicalTargetId;
final String selectedParadigmExpansionSurfaceTargetId;
final List<String> supportRotationTrace;
```

The planner must preserve canonical memory identity while storing the surface actually chosen for rendering. For example, `object.book` can remain the canonical memory target while `object.book.article.el_kitab` is the selected surface for a sentence that requires "the book."

- [ ] **Step 6: Add target bundle regression assertion**

In `packages/learning_core/test/a1_target_bundle_test.dart`, add:

```dart
expect(bundle.selectedSupportCanonicalTargetId, 'predicate.like');
expect(bundle.selectedSupportSurfaceTargetId, isNotEmpty);
expect(bundle.supportRotationTrace,
    contains('supportRotation.verified_paradigm_expansion'));
```

If the seeded target bundle uses support without paradigm expansion, assert:

```dart
expect(bundle.supportRotationTrace,
    contains('supportRotation.support_surface_selected'));
```

- [ ] **Step 7: Verify**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_support_rotation_policy_test.dart \
  test/a1_target_bundle_test.dart \
  test/a1_progression_policy_test.dart
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_support_rotation_policy.dart \
  packages/learning_core/lib/src/a1_target_bundle.dart \
  packages/learning_core/lib/src/a1_progression_policy.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_support_rotation_policy_test.dart \
  packages/learning_core/test/a1_target_bundle_test.dart
git commit -m "feat: add A1 support rotation planner"
```

## Task 16B: Bundle-Aware Candidate Scoring And Owner Handoff

**Purpose:** Close the acceptance gap found after Tasks 15-16A: target bundles exist, but production A1 selection can still die at generic composition-score gates before the bundle's support/growth intent is consumed or handed to the correct downstream owner.

**Live diagnostic addressed:** the web Focus page showed repeated:

```text
coordinatorPolicy.no_growth_or_refresh_target
coordinatorPolicy.known_growth_ratio_out_of_bounds
```

for `daily_activities`, `preferences_opinions`, and `time_scheduling`, even after target-bundle scaffolding existed.

**Remediation Decision Record:**

```text
productFailure: Focus blocks with generic coordinator ratio errors even when memory has support and an intended growth/refresh direction
firstFailingLayer: coordinator composition scoring handoff
evidence: live blocked Focus page surfaces no_growth_or_refresh_target and known_growth_ratio_out_of_bounds across multiple families
selectedRepair: make A1 candidate scoring consume compatible target-bundle roles and move non-materializable bundles to arcCoverage owner codes
whyThisRepairFirst: Task 17 route capability work should receive precise missing-route/missing-target blockers, not generic coordinator math
productionBehaviorChanged: selection either chooses a bundle-compatible support-growth candidate or blocks with arcCoverage.support_growth_bundle_no_registered_route
backendProof: focused coordinator test reproduces stable support plus weak growth and no longer reports only generic coordinator ratio errors
uiProductCheckpoint: Start Focus no longer shows only no_growth_or_refresh_target / known_growth_ratio_out_of_bounds; it either starts or names the precise downstream blocker, including no_memory_growth_or_refresh_candidate for support-only memory
remainingOwnedBlocker: Task 17/18 own route capability if no A1 route can materialize the bundle's growth/refresh target
```

**Files:**

- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/test/focus_coordinator_arc_candidate_test.dart`
- Modify if needed: `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`
- Modify if needed: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`

- [ ] **Step 1: Write failing production-boundary test**

In `packages/learning_core/test/focus_coordinator_arc_candidate_test.dart`, add a test that builds:

```text
stable support: daily.activity, time.anchor
weak growth: time.shift
preferred family: daily_activities
```

Before the fix this must fail with:

```text
coordinatorPolicy.no_growth_or_refresh_target
coordinatorPolicy.known_growth_ratio_out_of_bounds
```

The expected post-fix behavior is either:

```text
selected support-growth lesson
```

or:

```text
arcCoverage.support_growth_bundle_no_registered_route
```

The test must fail if the only surfaced reasons are generic coordinator ratio reasons.

- [ ] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/focus_coordinator_arc_candidate_test.dart \
  -n "bundle-aware scoring"
```

Expected: FAIL with the current generic coordinator rejection reasons.

- [ ] **Step 3: Add bundle-compatible scoring helper**

In `FocusCoordinator.selectA1ConversationArcCandidate`, resolve the best target bundle for each family:

```text
family-specific bundle first
global support-growth bundle second
no bundle third
```

Build a candidate role view from:

```text
candidate thread target ids
bundle support ids
bundle growth ids
bundle refresh ids
bundle blocked/cooled ids
```

If the candidate target ids contain at least one bundle support and at least one bundle growth/refresh, score the candidate using those bundle roles instead of raw rollup-only roles.

- [ ] **Step 4: Add downstream owner handoff**

If a support-growth bundle exists but the candidate target ids do not contain any bundle growth/refresh target, reject the candidate with:

```text
arcCoverage.support_growth_bundle_no_registered_route:<arcId>:missing=<ids>
```

If no support-growth bundle exists because memory truly exposes no growth/refresh target, keep:

```text
coordinatorPolicy.no_growth_or_refresh_target
```

If support exists but no usable growth/refresh target bundle exists, collapse the generic score failures to:

```text
coordinatorPolicy.no_memory_growth_or_refresh_candidate:<arcId>
```

Do not also emit `coordinatorPolicy.known_growth_ratio_out_of_bounds` for the same candidate.

If growth exists but every materializable route is blocked by cooldown, include the cooldown reason and do not collapse it back into `known_growth_ratio_out_of_bounds`.

- [ ] **Step 5: Verify backend behavior**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/focus_coordinator_arc_candidate_test.dart \
  test/a1_coordinator_decision_audit_test.dart
```

Expected: PASS.

- [ ] **Step 6: Verify product audit behavior**

Run:

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_memory_led_product_progression_audit_test.dart \
  test/a1_focus_perceived_diversity_audit_test.dart \
  --concurrency=1
```

Expected: PASS. Printed blockers may remain, but they must be more precise than the unqualified generic coordinator ratio failures when a target bundle exists.

- [ ] **Step 7: Verify UI behavior**

Hot reload or restart the web app, then use the in-app browser to press **Start focus**.

Expected:

```text
either a renderable Focus lesson starts
or the blocked screen names arcCoverage.support_growth_bundle_no_registered_route / no_memory_growth_or_refresh_candidate / another precise downstream owner
```

The UI must not show only repeated `coordinatorPolicy.no_growth_or_refresh_target` and `coordinatorPolicy.known_growth_ratio_out_of_bounds` for bundle-ready families.

- [ ] **Step 8: Continue gate**

If Task 16B produces a renderable support-growth lesson, proceed through Task 17, Task 17B, and Task 18 to the next major UI checkpoint.

If Task 16B still blocks but now names `arcCoverage`, proceed to Task 17 because route capability is now the first failing owner.

If Task 16B still blocks with only generic coordinator ratio reasons, stop and repair Task 16B before moving on.

- [ ] **Step 9: Commit**

```bash
git add \
  packages/learning_core/lib/src/focus_coordinator.dart \
  packages/learning_core/test/focus_coordinator_arc_candidate_test.dart \
  apps/mobile/test/a1_memory_led_product_progression_audit_test.dart \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md
git commit -m "feat: make A1 candidate scoring bundle aware"
```

## Task 16C: A1 Growth Candidate Sourcing From Metadata

**Purpose:** Repair the current post-16B blocker where memory exposes support, but the coordinator blocks with `coordinatorPolicy.no_memory_growth_or_refresh_candidate` because it has no source of new growth outside memory.

**Spec section implemented:** `Stage 3A: A1 Growth Candidate Sourcing`.

**Placement:** This is a standalone mid-plan upgrade between Task 16B and Task 17. It must not be folded into the older bundle-aware scoring task. Later route capability, metadata readiness, compiler preflight, product audit, and UI evidence tasks must consume the source trace and owner-coded blockers produced here.

**Remediation Decision Record:**

```text
productFailure: after a learner completes a lesson, Start Focus can block because support-only memory has no growth target even though A1 metadata has eligible next targets
firstFailingLayer: coordinator target-bundle growth source
evidence: live UI showed coordinatorPolicy.no_memory_growth_or_refresh_candidate after Task 16B collapsed generic ratio errors
selectedRepair: add an A1 growth candidate source that reads shared A1 catalog/metadata targets, filters by support compatibility, route compatibility, readiness, saturation, and learner load, and feeds sourced growth into target bundles
whyThisRepairFirst: Task 17 route capability should only own true materialization gaps; it should not receive work that the coordinator never sourced
productionBehaviorChanged: support-only memory can become support-plus-sourced-growth before route selection
backendProof: focused coordinator test proves support-only memory sources growth and no longer blocks generically when metadata-ready targets exist
uiProductCheckpoint: Start Focus either renders a support-plus-growth lesson or shows a precise metadata/route/coherence/compiler blocker, not generic no-memory-growth
remainingOwnedBlocker: if sourced growth exists but the current arc thread cannot materialize it, Task 17/18 own route capability; if it materializes but cannot render, Task 19-22 own readiness/coherence/preflight
```

**Files:**

- Create if needed: `packages/learning_core/lib/src/a1_growth_candidate_source.dart`
- Modify: `packages/learning_core/lib/src/a1_target_bundle.dart`
- Modify: `packages/learning_core/lib/src/a1_conversation_arc_instantiator.dart`
- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/test/focus_coordinator_arc_candidate_test.dart`
- Modify if needed: `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`
- Modify if needed: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`

- [ ] **Step 1: Write failing growth-source coordinator test**

In `packages/learning_core/test/focus_coordinator_arc_candidate_test.dart`, change the support-only memory regression so it expects sourced growth, not a generic no-memory-growth blocker.

The test must seed support-only memory:

```text
support: daily.activity
support: time.anchor
preferred family: daily_activities
```

Expected post-fix behavior:

```text
selected lesson trace contains coordinatorPolicy.growth_source:metadata
selected lesson trace contains coordinatorPolicy.target_bundle_growth:<target>
blocked reasons do not contain coordinatorPolicy.no_memory_growth_or_refresh_candidate
blocked reasons do not contain coordinatorPolicy.known_growth_ratio_out_of_bounds
```

If route materialization is still impossible, the only acceptable failure is:

```text
arcCoverage.support_growth_bundle_no_registered_route:<arcId>:missing=<target>
```

- [ ] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/focus_coordinator_arc_candidate_test.dart \
  -n "support-only memory sources A1 growth"
```

Expected before implementation: FAIL because the current coordinator still emits `coordinatorPolicy.no_memory_growth_or_refresh_candidate`.

- [ ] **Step 3: Add shared growth source model**

Create `A1GrowthCandidate`, `A1GrowthCandidateSourceResult`, and `A1GrowthCandidateSource`.

The source must:

- read `A1ConversationArcCatalog.initial()`;
- use the selected island's family profile;
- collect candidate target ids from compatible family profiles and arc-specific growth targets;
- reject ids already used as support, refresh, cooled, or blocked;
- reject alias duplicates by exact id and canonical id;
- prefer candidates with shared supported arcs and high A1 utility;
- return selected candidates, rejected candidates, owner-coded blocker, and repair action.

Minimum production-ready source behavior for this task:

```text
daily_activities + support-only daily.activity/time.anchor -> time.shift or preference.item when compatible
preferences_opinions + support-only predicate.like/preference.item -> detail/reason/alternative candidate when compatible, or exact metadata/route blocker
time_scheduling + support-only time.anchor -> time.shift or daily.activity when compatible
```

- [ ] **Step 4: Feed sourced growth into target bundles**

Update `A1TargetBundlePlanner.build()` so that when a family has support but no growth/refresh, it calls the source and creates a support-growth bundle from the selected sourced candidates.

The created bundle trace must include:

```text
coordinatorPolicy.target_bundle.support_growth
coordinatorPolicy.growth_source:metadata
coordinatorPolicy.growth_candidate_selected:<targetId>
```

If the source has no selected candidate, the planner must not invent growth. It must return no bundle and expose the source blocker through coordinator rejection reasons.

- [ ] **Step 5: Make current arc threads materialize sourced arc targets when metadata-ready**

Update the A1 arc instantiator or coordinator candidate role view so route-compatible sourced growth can appear in `progressTargetIds` for the selected thread.

For this task, add deterministic arc target augmentation:

```text
time_shift_arc -> time.shift
preference_alternative_arc -> preference.item, predicate.like
activity_time_arc -> daily.activity, time.anchor
request_detail_arc -> detail.size or request/detail target from the family profile
state_reason_arc -> state.reason/detail target from the family profile
```

Do not invent learner-facing forms or UI text here. If a target cannot be taught or rendered, leave that for metadata/compiler/coherence owner codes in later tasks.

- [ ] **Step 6: Keep blockers precise**

Update coordinator rejection handling:

- `coordinatorPolicy.no_memory_growth_or_refresh_candidate` is valid only when the source checked metadata/curriculum pools and selected nothing;
- if the source selected a candidate but the candidate route does not include it, report `arcCoverage.support_growth_bundle_no_registered_route`;
- if the source selected a candidate and the thread materializes it, score bundle-aware and allow selection if composition policy passes;
- never pair `no_memory_growth_or_refresh_candidate` with `known_growth_ratio_out_of_bounds` for the same candidate.

- [ ] **Step 7: Verify backend behavior**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/focus_coordinator_arc_candidate_test.dart \
  test/a1_coordinator_decision_audit_test.dart
```

Expected: PASS. The support-only test must show sourced growth or a precise downstream owner.

- [ ] **Step 8: Verify production product audit**

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_memory_led_product_progression_audit_test.dart \
  test/a1_focus_perceived_diversity_audit_test.dart \
  --concurrency=1
```

Expected: PASS. Product rows should include a support-growth blend or a precise route/metadata/coherence/compiler blocker. If the audit cannot show `growth_source:metadata`, update the audit row extraction so it reads the production coordinator trace.

- [ ] **Step 9: Verify UI behavior**

Restart or hot reload the app server, open the in-app browser, and press **Start Focus**.

Expected:

```text
either the next lesson starts and uses familiar support with one controlled growth target
or the blocked UI names arcCoverage/metadataReadiness/arcCoherence/compilerReadiness with the missing target
```

If the UI still shows only `coordinatorPolicy.no_memory_growth_or_refresh_candidate`, stop and repair this task. If it starts but renders missing matching/sentence-building material, continue only if the missing layer is small; otherwise report the new blocker as metadata/compiler/UI binding.

- [ ] **Step 10: Future-task dependency notes**

Before proceeding to Task 17, update later tasks as follows if they are not already covered:

- Task 17 route capability registry must register routes for sourced growth targets, not only memory growth targets.
- Task 18 priority route set readiness must prove sourced-growth routes are route-keyed, minimally coherent, and either production-ready or blocked by exact downstream owners.
- Task 19 route-keyed metadata readiness must check selected and rejected sourced candidates, including verified form queries and compiler-readable fields.
- Task 21 compiler preflight must receive sourced candidate ids in the selected bundle.
- Task 24 backend progression proof must report `growthSource`.
- Task 16D must prove sourced-growth and UI-completed final proof targets share the same canonical proof contract before route capability work continues.
- Task 25 UI proof must prove a practiced sourced target writes back to memory through the same canonical proof contract, not through a synthetic final-proof shortcut.

- [ ] **Step 11: Continue gate**

If Task 16C renders a support-plus-sourced-growth lesson in the UI, continue to Task 16D before Task 17. Route capability work must not begin while canonical proof targets can disappear in the UI completion loop.

If Task 16C blocks with `arcCoverage`, continue to Task 16D first, then Task 17, because route capability is now the first failing owner only after the canonical proof contract is aligned.

If Task 16C blocks with `metadataReadiness`, `compilerReadiness`, or `arcCoherence`, compare against Tasks 19-22. If the blocker is exactly covered by a later task, proceed to that owner task; if it is not covered, stop and update the spec/plan before continuing.

If Task 16C still blocks with `coordinatorPolicy.no_memory_growth_or_refresh_candidate`, stop and repair Task 16C because growth sourcing is not integrated.

- [ ] **Step 12: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_growth_candidate_source.dart \
  packages/learning_core/lib/src/a1_target_bundle.dart \
  packages/learning_core/lib/src/a1_conversation_arc_instantiator.dart \
  packages/learning_core/lib/src/focus_coordinator.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/focus_coordinator_arc_candidate_test.dart \
  apps/mobile/test/a1_memory_led_product_progression_audit_test.dart \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md
git commit -m "feat: source A1 growth candidates from metadata"
```

## Task 16D: Canonical A1 Proof Contract Alignment

**Purpose:** Make `learning_core` own final proof semantics so the compiler, UI, memory, rollups, Progress, and coordinator agree on canonical proof targets while preserving the concrete words/forms the learner actually practiced.

**Spec section implemented:** `Stage 3B: Canonical A1 Proof Contract Alignment`.

**Placement:** This is the next standalone implementation task after Task 16C and before Task 17. It must not be folded into route capability, metadata readiness, or UI-product proof work. Those later tasks are misleading while the UI can complete a lesson and write only the concrete detail target instead of the canonical proof target.

**Remediation Decision Record:**

```text
productFailure: app completion can record practiced concrete targets while dropping the canonical final proof target that should drive next lesson selection
firstFailingLayer: proofContract / UI evidence loop / progress alignment
evidence: UI completion regression audit reported ui_completion.final_targets_missing_from_surface_rollups:daily.activity; the lesson contract proved daily.activity, but actual UI completion rows and surface-aware rollups contained daily.action.study
selectedRepair: create a compiler-owned A1 proof contract and make UI completion resolve submissions against it, writing the canonical target as the primary targetId and concrete details as component/form/phrase/frame evidence
whyThisRepairFirst: old UI must remain a thin renderer/submission surface; route capability and coordinator work should not proceed while memory, progress, and the coordinator disagree about what the learner proved
productionBehaviorChanged: completing a Focus lesson writes canonical final proof plus concrete detail, and the next Start Focus reads the canonical proof through production rollups/profile
backendProof: core proof-contract tests show finalConversationReturnTargetIds, final-stage memoryTargets, memoryWriteRequirements, and stage evidence all derive from one contract
uiProductCheckpoint: UI completion audit shows every canonical proof target reaches target memory and surface-aware rollups; the next Start Focus consumes those targets or returns a precise downstream blocker
remainingOwnedBlocker: if canonical proof reaches rollups but selection still blocks, Task 17+ own arcCoverage/metadata/coherence/compiler; if a UI box cannot map to the proof contract, uiEvidenceLoop owns it
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_lesson_proof_contract.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/lib/src/focus_plan.dart`
- Modify: `packages/learning_core/lib/src/mastery_lesson_compiler.dart`
- Modify if needed: `packages/learning_core/lib/src/tutor_engine.dart`
- Modify: `apps/mobile/lib/features/practice/focus_sequence_lesson_player.dart`
- Modify: `apps/mobile/lib/features/practice/focus_evidence_writer.dart`
- Modify: `apps/mobile/lib/features/practice/focus_mastery_plan_gateway.dart` if production start does not read the updated rollups after completion
- Modify if needed: `apps/mobile/lib/shared/persistence/learner_memory_repository.dart`
- Test: `packages/learning_core/test/a1_lesson_proof_contract_test.dart`
- Modify: `packages/learning_core/test/mastery_lesson_compiler_arc_thread_test.dart`
- Modify: `apps/mobile/test/a1_ui_completion_memory_regression_audit_test.dart`

- [ ] **Step 1: Write failing core proof-contract test**

Create `packages/learning_core/test/a1_lesson_proof_contract_test.dart`.

The test must select a production A1 activity lesson that has an abstract canonical target and at least one concrete detail target. It must assert that every derived plan field reads from one contract:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('A1 lesson final proof fields derive from one canonical contract', () {
    final coordinator = FocusCoordinator();
    final result = coordinator.createA1ConversationArcFocusPlan(
      preferredFamilyId: 'daily_activities',
    );

    expect(result.plan, isNotNull, reason: result.blockedReasons.join('\n'));

    final plan = result.plan!;
    final contract = plan.a1ProofContract;

    expect(contract, isNotNull);
    expect(contract!.canonicalProofTargetIds, isNotEmpty);
    expect(
      plan.finalConversationReturnTargetIds,
      containsAll(contract.canonicalProofTargetIds),
    );

    final finalStage = plan.stages.lastWhere(
      (stage) => stage.kind == FocusStageKind.finalConversation,
    );

    expect(
      finalStage.memoryTargets.targetIds,
      containsAll(contract.canonicalProofTargetIds),
    );
    expect(
      plan.memoryWriteRequirements,
      containsAll(
        contract.canonicalProofTargetIds.map(
          (targetId) => 'stage.final_conversation_open_answer:$targetId',
        ),
      ),
    );
    expect(
      finalStage.memoryEvidenceProduced,
      containsAll(contract.canonicalProofTargetIds),
    );
  });

  test('A1 activity proof preserves canonical and concrete targets together', () {
    final coordinator = FocusCoordinator();
    final result = coordinator.createA1ConversationArcFocusPlan(
      preferredFamilyId: 'daily_activities',
    );

    expect(result.plan, isNotNull, reason: result.blockedReasons.join('\n'));

    final contract = result.plan!.a1ProofContract!;
    expect(contract.canonicalProofTargetIds, contains('daily.activity'));
    expect(
      contract.componentTargetIdsByCanonicalTargetId['daily.activity'],
      isNotEmpty,
      reason:
          'daily.activity must keep concrete detail such as daily.action.study instead of being replaced by it',
    );
  });
}
```

If `preferredFamilyId: 'daily_activities'` cannot deterministically select `daily.activity`, use the existing production coordinator helper that already selects the activity/time arc in the Task 16C tests. Do not make a test-only fake lesson because this task is proving the production compiler contract.

- [ ] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_lesson_proof_contract_test.dart
```

Expected before implementation: FAIL because `FocusLessonPlan.a1ProofContract` and `A1LessonProofContract` do not exist or because final proof fields are still assembled from parallel local lists.

- [ ] **Step 3: Add proof contract model in `learning_core`**

Create `packages/learning_core/lib/src/a1_lesson_proof_contract.dart`:

```dart
class A1LessonProofContract {
  const A1LessonProofContract({
    required this.lessonId,
    required this.candidateId,
    required this.canonicalProofTargetIds,
    this.surfaceProofTargetIds = const [],
    this.componentTargetIdsByCanonicalTargetId = const {},
    this.grammarTargetIdsByCanonicalTargetId = const {},
    this.frameTargetIdsByCanonicalTargetId = const {},
    this.phraseTargetIdsByCanonicalTargetId = const {},
    this.supportOnlyTargetIds = const [],
    this.stageIdByCanonicalTargetId = const {},
    this.boxIdsByCanonicalTargetId = const {},
    this.evidenceKindByCanonicalTargetId = const {},
    this.coordinatorProgressionTargetIds = const [],
    this.progressDisplayTargetIds = const [],
    this.trace = const [],
  });

  final String lessonId;
  final String candidateId;
  final List<String> canonicalProofTargetIds;
  final List<String> surfaceProofTargetIds;
  final Map<String, List<String>> componentTargetIdsByCanonicalTargetId;
  final Map<String, List<String>> grammarTargetIdsByCanonicalTargetId;
  final Map<String, List<String>> frameTargetIdsByCanonicalTargetId;
  final Map<String, List<String>> phraseTargetIdsByCanonicalTargetId;
  final List<String> supportOnlyTargetIds;
  final Map<String, String> stageIdByCanonicalTargetId;
  final Map<String, List<String>> boxIdsByCanonicalTargetId;
  final Map<String, String> evidenceKindByCanonicalTargetId;
  final List<String> coordinatorProgressionTargetIds;
  final List<String> progressDisplayTargetIds;
  final List<String> trace;

  List<String> memoryWriteRequirements() {
    return canonicalProofTargetIds
        .map((targetId) => 'stage.final_conversation_open_answer:$targetId')
        .toList(growable: false);
  }
}

class A1LessonProofContractValidationResult {
  const A1LessonProofContractValidationResult({
    required this.isValid,
    this.blockerCode,
    this.message,
  });

  final bool isValid;
  final String? blockerCode;
  final String? message;
}
```

Export it from `packages/learning_core/lib/learning_core.dart`:

```dart
export 'src/a1_lesson_proof_contract.dart';
```

Keep the class immutable and data-only. Do not put UI concepts or Flutter imports in this file.

- [ ] **Step 4: Attach contract to the production Focus plan**

Modify `packages/learning_core/lib/src/focus_plan.dart` so `FocusLessonPlan` has:

```dart
final A1LessonProofContract? a1ProofContract;
```

Update the constructor, `copyWith` if present, equality/serialization helpers if present, and all existing call sites with `a1ProofContract: null` except A1 arc Focus plans.

For A1 arc Focus plan creation, build the contract from the selected thread and bound final-conversation stage:

```dart
final proofContract = A1LessonProofContract(
  lessonId: lessonId,
  candidateId: selection.candidateId,
  canonicalProofTargetIds: selection.boundThread.progressTargetIds,
  surfaceProofTargetIds: finalStage.memoryTargets.surfaceTargetIds,
  componentTargetIdsByCanonicalTargetId:
      _componentTargetsByCanonicalTarget(selection, finalStage),
  grammarTargetIdsByCanonicalTargetId:
      _grammarTargetsByCanonicalTarget(selection, finalStage),
  frameTargetIdsByCanonicalTargetId:
      _frameTargetsByCanonicalTarget(selection, finalStage),
  phraseTargetIdsByCanonicalTargetId:
      _phraseTargetsByCanonicalTarget(selection, finalStage),
  supportOnlyTargetIds: selection.targetBundle.supportTargetIds,
  stageIdByCanonicalTargetId: {
    for (final targetId in selection.boundThread.progressTargetIds)
      targetId: finalStage.id,
  },
  boxIdsByCanonicalTargetId:
      _finalConversationBoxIdsByCanonicalTarget(selection, finalStage),
  evidenceKindByCanonicalTargetId: {
    for (final targetId in selection.boundThread.progressTargetIds)
      targetId: 'stage.final_conversation_open_answer',
  },
  coordinatorProgressionTargetIds: selection.boundThread.progressTargetIds,
  progressDisplayTargetIds: selection.boundThread.progressTargetIds,
  trace: [
    'proofContract.source:learning_core',
    'proofContract.final_targets:${selection.boundThread.progressTargetIds.join(',')}',
  ],
);
```

Use existing target bundle/thread types for the helper bodies. If the compiler currently lacks `surfaceTargetIds`, `grammarTargetIds`, or box ids for a category, leave that category empty and preserve the owned blocker trace; do not invent forms.

- [ ] **Step 5: Derive final proof fields from the contract**

In the A1 arc plan assembly, replace parallel final-proof lists with contract-derived values:

```dart
finalConversationReturnTargetIds: proofContract.canonicalProofTargetIds,
memoryWriteRequirements: proofContract.memoryWriteRequirements(),
```

Update the final-conversation stage creation so:

```dart
memoryTargets.targetIds
memoryEvidenceProduced
```

include `proofContract.canonicalProofTargetIds`.

If the final stage still needs concrete detail targets for rendering or stage-level practice, store those as component/form/surface details, not as replacements for the canonical target list.

- [ ] **Step 6: Add contract validator and owner-coded failure tests**

In `packages/learning_core/lib/src/a1_lesson_proof_contract.dart`, add:

```dart
class A1LessonProofContractValidator {
  const A1LessonProofContractValidator();

  A1LessonProofContractValidationResult validatePlan(FocusLessonPlan plan) {
    final contract = plan.a1ProofContract;
    if (contract == null) {
      return const A1LessonProofContractValidationResult(
        isValid: false,
        blockerCode: 'proofContract.missing',
        message: 'A1 Focus plan is missing proof contract',
      );
    }
    final finalTargets = plan.finalConversationReturnTargetIds.toSet();
    final canonical = contract.canonicalProofTargetIds.toSet();
    if (!finalTargets.containsAll(canonical) || !canonical.containsAll(finalTargets)) {
      return const A1LessonProofContractValidationResult(
        isValid: false,
        blockerCode: 'proofContract.final_target_mismatch',
        message: 'finalConversationReturnTargetIds do not match canonical proof targets',
      );
    }
    final required = contract.memoryWriteRequirements().toSet();
    final actual = plan.memoryWriteRequirements.toSet();
    if (!actual.containsAll(required)) {
      return const A1LessonProofContractValidationResult(
        isValid: false,
        blockerCode: 'proofContract.memory_write_requirement_mismatch',
        message: 'memoryWriteRequirements are missing canonical proof targets',
      );
    }
    return const A1LessonProofContractValidationResult(isValid: true);
  }
}
```

If `FocusLessonPlan` cannot be referenced from this file without creating a cycle, move the validator to the existing plan/compiler file that owns `FocusLessonPlan`. Keep the blocker codes exactly as named in the spec.

- [ ] **Step 7: Run core proof tests**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_lesson_proof_contract_test.dart \
  test/mastery_lesson_compiler_arc_thread_test.dart
```

Expected: PASS. If this fails because the production arc cannot expose concrete component details, stop and classify the blocker as `compilerReadiness.detail_target_missing`, then update Task 19/21 before continuing.

- [ ] **Step 8: Make UI completion resolve submissions against the contract**

Modify the mobile completion path so the UI never decides proof semantics from a rendered box alone.

Required behavior:

```text
input: FocusSequenceSubmission / completed final conversation stage
lookup: plan.a1ProofContract
for each canonical target in contract.canonicalProofTargetIds:
  write LearningEvent.masteryEvidenceRecorded with targetId = canonical target
  attach or separately preserve detail targets from componentTargetIdsByCanonicalTargetId, grammarTargetIdsByCanonicalTargetId, frameTargetIdsByCanonicalTargetId, phraseTargetIdsByCanonicalTargetId
if no contract box maps to the submitted final proof:
  report uiEvidenceLoop.proof_box_missing_contract
```

Implementation guidance:

- Update `apps/mobile/lib/features/practice/focus_sequence_lesson_player.dart` so final conversation completion passes the active `FocusLessonPlan.a1ProofContract` into the evidence writer.
- Update `apps/mobile/lib/features/practice/focus_evidence_writer.dart` so final proof writes canonical targets from the contract even when the visible text is a concrete form.
- If `LearningEvent.masteryEvidenceRecorded` already supports component/form target arrays, use those fields.
- If event persistence cannot store detail arrays yet, emit separate detail evidence rows with a non-canonical evidence kind such as `stage.final_conversation_detail` and make sure those rows do not replace the canonical proof row.
- Do not copy old UI parsing logic into `learning_core`; the old UI can only map submissions to contract box ids and send accepted evidence.

- [ ] **Step 9: Strengthen the UI regression audit into a hard proof**

Update `apps/mobile/test/a1_ui_completion_memory_regression_audit_test.dart` so the current diagnostic becomes an assertion:

```dart
expect(
  report.findings,
  isNot(contains(startsWith('ui_completion.final_targets_missing_from_surface_rollups:'))),
);
expect(
  report.findings,
  isNot(contains(startsWith('ui_completion.final_targets_missing_from_target_memory:'))),
);
```

Add a focused assertion for the observed failure if the selected lesson includes `daily.activity`:

```dart
if (report.completedContracts.any(
  (contract) => contract.finalTargetIds.contains('daily.activity'),
)) {
  expect(report.surfaceAwareRollupTargetIds, contains('daily.activity'));
  expect(report.detailTargetIds, contains('daily.action.study'));
}
```

Use the existing report object from this audit. If the object does not expose `completedContracts`, `surfaceAwareRollupTargetIds`, or `detailTargetIds`, add those fields to the test audit helper; do not hide the result in console output only.

- [ ] **Step 10: Run UI proof audit**

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_ui_completion_memory_regression_audit_test.dart \
  --concurrency=1
```

Expected: PASS. The report must show no `final_targets_missing_from_surface_rollups` findings. If canonical proof reaches target memory but not surface-aware rollups, repair the repository/projection. If canonical proof reaches rollups but the next Focus start ignores it, repair the profile/progress gateway before moving to Task 17.

- [ ] **Step 11: Validate production browser behavior**

Restart the local server if needed and open the in-app browser at the current dev-server URL.

Complete one Focus lesson through the app. Then press **Start Focus** again.

Expected:

```text
the next lesson or blocker reads the canonical final proof from the just-completed lesson
the app does not show the exact same lesson because daily.activity or another canonical target vanished in UI evidence
any remaining blocker names route capability, metadata readiness, compiler readiness, or coherence rather than proof/writeback mismatch
```

If the UI cannot prove this because the route/generator still blocks, report the exact blocker and continue only if the backend/UI proof audit already shows canonical proof reaches the next production start.

- [ ] **Step 12: Continue gate**

If Task 16D passes core and UI proof audits, continue to Task 16E.

If Task 16D proves canonical targets reach rollups but Focus still blocks on `arcCoverage`, continue to Task 16E first because route capability is misleading while A1 catalog slot pools and metadata slot pools can still drift.

If Task 16D proves canonical targets reach rollups but Focus still renders missing matching or sentence-building material, compare against Tasks 19-21. If the blocker is exactly covered there, proceed to the owner task; if not, update this spec and plan before continuing.

If Task 16D still shows canonical proof missing from UI completion, stop and repair this task before any route/generator work.

- [ ] **Step 13: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_lesson_proof_contract.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/lib/src/focus_plan.dart \
  packages/learning_core/lib/src/mastery_lesson_compiler.dart \
  packages/learning_core/lib/src/tutor_engine.dart \
  packages/learning_core/test/a1_lesson_proof_contract_test.dart \
  packages/learning_core/test/mastery_lesson_compiler_arc_thread_test.dart \
  apps/mobile/lib/features/practice/focus_sequence_lesson_player.dart \
  apps/mobile/lib/features/practice/focus_evidence_writer.dart \
  apps/mobile/lib/features/practice/focus_mastery_plan_gateway.dart \
  apps/mobile/lib/shared/persistence/learner_memory_repository.dart \
  apps/mobile/test/a1_ui_completion_memory_regression_audit_test.dart \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md
git commit -m "feat: align A1 proof contract across UI memory"
```

## Task 16E: A1 Catalog And Metadata Reachability Alignment

**Purpose:** Stop the hardline A1 arc generator from using a tiny hardcoded vocabulary universe that drifts from production metadata.

**Placement:** This is the next standalone implementation task after Task 16D and before Task 17. Route capability work must not proceed until production A1 routes can prove their slot values are metadata-backed, reachable, and compiler-mapped.

**Audit finding addressed:** `metadataReadiness.catalog_metadata_reachability_mismatch`, `arcCoverage.route_slot_pool_too_thin`, `compilerMaterialization.concrete_surface_map_drift`.

**Remediation Decision Record:**

```text
productFailure: metadata contains useful words like gazma and dawa, but A1 Focus cannot surface them because the A1 arc catalog and compiler concrete maps own smaller hardcoded pools
firstFailingLayer: metadataReadiness/catalogReachability
evidence: pool.shopping.objects has 12 selectable metadata nodes, but the A1 catalog can instantiate only kitab/mobile/alam and the compiler concrete map for shopping.object also maps only those three
selectedRepair: add a shared metadata-backed A1 slot resolver, audit catalog/metadata drift, and wire A1 instantiation plus compiler concrete target replacement through the same resolver
whyThisRepairFirst: coordinator memory and route capability cannot be trusted while routes appear thin only because catalog pools ignore metadata
productionBehaviorChanged: A1 arc routes can choose from metadata-backed slot values when route/coherence/compiler checks permit them
backendProof: catalog-metadata audit proves priority slot pools are reachable or explicitly excluded
uiProductCheckpoint: valid shopping/home/object lessons can surface previously unreachable metadata-backed objects such as gazma or dawa when selected
remainingOwnedBlocker: if a metadata-backed value cannot be rendered, compilerMaterialization owns it; if a value is coherent only in some routes, arcCoherence or routeCapability owns it; if a family remains intentionally excluded, metadataReadiness must report the exclusion reason
```

**Current Weak Cluster Report To Encode In The Audit:**

```text
identity_intro: healthy for current scope
people_relationships: daily activity pool drift
daily_activities: severe time-anchor and generated-activity drift
preferences_opinions: preference item pool thin; daily activity drift
social_politeness: rich metadata but narrow social/shopping catalog reach
time_scheduling: severe time-anchor and generated-activity drift
home_objects_possessions: severe home-object backing gap
shopping_requests: rich shopping metadata but catalog reaches only three objects
conversation_repair: repair phrase/support question drift
feelings_states: feeling-state backing gap and connector drift
descriptions: description/feeling backing gap
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_catalog_metadata_reachability_audit.dart`
- Create: `packages/learning_core/lib/src/a1_metadata_slot_resolver.dart`
- Create: `packages/learning_core/test/a1_catalog_metadata_reachability_audit_test.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/lib/src/a1_conversation_arc_catalog.dart`
- Modify: `packages/learning_core/lib/src/a1_conversation_arc_instantiator.dart`
- Modify: `packages/learning_core/lib/src/a1_growth_candidate_source.dart`
- Modify: `packages/learning_core/lib/src/mastery_lesson_compiler.dart`
- Modify: `packages/learning_core/test/a1_target_bundle_test.dart`
- Modify: `packages/learning_core/test/focus_coordinator_arc_candidate_test.dart`
- Modify: `apps/mobile/test/a1_focus_perceived_diversity_audit_test.dart`

- [x] **Step 1: Write failing reachability audit test**

Create `packages/learning_core/test/a1_catalog_metadata_reachability_audit_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1 catalog metadata reachability audit', () {
    test('reports current production slot-pool drift with exact owners', () {
      final report = A1CatalogMetadataReachabilityAudit.run(
        catalog: A1ConversationArcCatalog.initial(),
        metadata: StarterLanguageMetadata.v1,
      );

      expect(report.totalCatalogPoolCount, greaterThan(0));
      expect(report.rows, isNotEmpty);
      expect(
        report.rowForPool('pool.shopping.objects').unreachableMetadataSurfaces,
        contains('gazma'),
      );
      expect(
        report.rowForPool('pool.shopping.objects').unreachableMetadataSurfaces,
        contains('dawa'),
      );
      expect(
        report.rowForPool('pool.time.anchors').catalogSurfacesMissingMetadata,
        contains('bukra'),
      );
      expect(
        report.weakClusterSummaries.map((row) => row.clusterId),
        containsAll([
          'daily_activities',
          'time_scheduling',
          'home_objects_possessions',
          'shopping_requests',
          'feelings_states',
          'descriptions',
        ]),
      );
    });

    test('priority production pools have no unowned reachability gaps', () {
      final report = A1CatalogMetadataReachabilityAudit.run(
        catalog: A1ConversationArcCatalog.initial(),
        metadata: StarterLanguageMetadata.v1,
      );

      final unowned = report.unownedPriorityGaps(
        priorityPoolIds: const [
          'pool.shopping.objects',
          'pool.home.objects',
          'pool.time.anchors',
          'pool.daily.activities',
          'pool.feelings.states',
          'pool.descriptions.adjectives',
        ],
      );

      expect(unowned, isEmpty, reason: report.toMarkdown());
    });
  });
}
```

Expected before implementation: the first test passes once the audit model exists; the second test fails because priority pools currently have unowned drift.

- [x] **Step 2: Run failing audit**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_catalog_metadata_reachability_audit_test.dart \
  -r expanded
```

Expected: FAIL until `A1CatalogMetadataReachabilityAudit` exists and priority drift is repaired or explicitly owned.

- [x] **Step 3: Implement reachability audit model**

Create `packages/learning_core/lib/src/a1_catalog_metadata_reachability_audit.dart`:

```dart
import 'a1_conversation_arc_catalog.dart';
import 'language_metadata_repository.dart';

final class A1CatalogMetadataReachabilityAudit {
  const A1CatalogMetadataReachabilityAudit._();

  static A1CatalogMetadataReachabilityReport run({
    required A1ConversationArcCatalog catalog,
    required LanguageMetadataRepository metadata,
  }) {
    final rows = <A1CatalogMetadataReachabilityRow>[];
    for (final entry in catalog.slotPools.entries) {
      rows.add(
        A1CatalogMetadataReachabilityRow.fromPool(
          poolId: entry.key,
          catalogSurfaces: entry.value,
          metadataNodes: metadata.nodesForSlotPool(entry.key),
        ),
      );
    }
    return A1CatalogMetadataReachabilityReport(rows: rows);
  }
}

final class A1CatalogMetadataReachabilityReport {
  const A1CatalogMetadataReachabilityReport({required this.rows});

  final List<A1CatalogMetadataReachabilityRow> rows;

  int get totalCatalogPoolCount => rows.length;

  A1CatalogMetadataReachabilityRow rowForPool(String poolId) {
    return rows.singleWhere((row) => row.poolId == poolId);
  }

  List<A1WeakClusterSummary> get weakClusterSummaries {
    const clusterPools = {
      'daily_activities': ['pool.daily.activities', 'pool.time.anchors'],
      'time_scheduling': ['pool.time.anchors', 'pool.daily.activities'],
      'home_objects_possessions': [
        'pool.home.objects',
        'pool.descriptions.adjectives',
      ],
      'shopping_requests': [
        'pool.shopping.objects',
        'pool.descriptions.adjectives',
      ],
      'feelings_states': [
        'pool.feelings.states',
        'pool.support.connectors',
      ],
      'descriptions': [
        'pool.descriptions.adjectives',
        'pool.feelings.states',
      ],
    };
    return [
      for (final entry in clusterPools.entries)
        if (entry.value.map(rowForPool).any((row) => row.hasUnownedGap))
          A1WeakClusterSummary(
            clusterId: entry.key,
            poolIds: entry.value,
            blockerCode: 'metadataReadiness.catalog_metadata_reachability_mismatch',
          ),
    ];
  }

  List<String> unownedPriorityGaps({required List<String> priorityPoolIds}) {
    return [
      for (final poolId in priorityPoolIds)
        for (final gap in rowForPool(poolId).unownedGapDescriptions)
          '$poolId:$gap',
    ];
  }

  String toMarkdown() {
    final buffer = StringBuffer()
      ..writeln('| pool | catalog | metadata | unreachable | missing backing |')
      ..writeln('|---|---:|---:|---|---|');
    for (final row in rows) {
      buffer.writeln(
        '| ${row.poolId} | ${row.catalogSurfaces.length} | '
        '${row.metadataSurfaceCount} | '
        '${row.unreachableMetadataSurfaces.join("<br>")} | '
        '${row.catalogSurfacesMissingMetadata.join("<br>")} |',
      );
    }
    return buffer.toString();
  }
}

final class A1CatalogMetadataReachabilityRow {
  const A1CatalogMetadataReachabilityRow({
    required this.poolId,
    required this.catalogSurfaces,
    required this.metadataSurfaceCount,
    required this.unreachableMetadataSurfaces,
    required this.catalogSurfacesMissingMetadata,
    required this.explicitExclusions,
  });

  factory A1CatalogMetadataReachabilityRow.fromPool({
    required String poolId,
    required List<String> catalogSurfaces,
    required List<LanguageMetadataNode> metadataNodes,
  }) {
    final catalogSet = catalogSurfaces.map(_normalize).toSet();
    final metadataSurfaceMap = <String, String>{};
    for (final node in metadataNodes.where((node) => node.canAssembleLearningChunk)) {
      metadataSurfaceMap[_normalize(node.preferredFrancoArabic)] =
          node.preferredFrancoArabic;
      for (final alias in node.approvedFrancoAliases) {
        metadataSurfaceMap[_normalize(alias)] = alias;
      }
    }
    return A1CatalogMetadataReachabilityRow(
      poolId: poolId,
      catalogSurfaces: List.unmodifiable(catalogSurfaces),
      metadataSurfaceCount: metadataNodes
          .where((node) => node.canAssembleLearningChunk)
          .length,
      unreachableMetadataSurfaces: List.unmodifiable([
        for (final node in metadataNodes.where((node) => node.canAssembleLearningChunk))
          if (!_nodeMatchesCatalogSurface(node, catalogSet))
            node.preferredFrancoArabic,
      ]),
      catalogSurfacesMissingMetadata: List.unmodifiable([
        for (final surface in catalogSurfaces)
          if (!metadataSurfaceMap.containsKey(_normalize(surface))) surface,
      ]),
      explicitExclusions: const [],
    );
  }

  final String poolId;
  final List<String> catalogSurfaces;
  final int metadataSurfaceCount;
  final List<String> unreachableMetadataSurfaces;
  final List<String> catalogSurfacesMissingMetadata;
  final List<String> explicitExclusions;

  bool get hasUnownedGap => unownedGapDescriptions.isNotEmpty;

  List<String> get unownedGapDescriptions => [
        for (final surface in unreachableMetadataSurfaces)
          'metadata_unreachable:$surface',
        for (final surface in catalogSurfacesMissingMetadata)
          'catalog_surface_missing_metadata:$surface',
      ];
}

final class A1WeakClusterSummary {
  const A1WeakClusterSummary({
    required this.clusterId,
    required this.poolIds,
    required this.blockerCode,
  });

  final String clusterId;
  final List<String> poolIds;
  final String blockerCode;
}

bool _nodeMatchesCatalogSurface(
  LanguageMetadataNode node,
  Set<String> catalogSet,
) {
  return catalogSet.contains(_normalize(node.preferredFrancoArabic)) ||
      node.approvedFrancoAliases.map(_normalize).any(catalogSet.contains);
}

String _normalize(String value) => value.trim().toLowerCase();
```

Export it from `packages/learning_core/lib/learning_core.dart`:

```dart
export 'src/a1_catalog_metadata_reachability_audit.dart';
```

- [x] **Step 4: Add shared metadata slot resolver test**

In `packages/learning_core/test/a1_catalog_metadata_reachability_audit_test.dart`, add:

```dart
test('shared resolver exposes metadata-backed shopping objects', () {
  final resolver = A1MetadataSlotResolver(
    metadata: StarterLanguageMetadata.v1,
  );

  final shopping = resolver.valuesForSlotPool('pool.shopping.objects');

  expect(shopping.map((value) => value.surface), contains('gazma'));
  expect(shopping.map((value) => value.surface), contains('dawa'));
  expect(
    shopping.singleWhere((value) => value.surface == 'gazma').metadataNodeId,
    'shopping.object.shoe',
  );
  expect(
    shopping.singleWhere((value) => value.surface == 'dawa').englishGloss,
    'medicine',
  );
});
```

- [x] **Step 5: Implement shared metadata slot resolver**

Create `packages/learning_core/lib/src/a1_metadata_slot_resolver.dart`:

```dart
import 'language_metadata_repository.dart';

final class A1MetadataSlotValue {
  const A1MetadataSlotValue({
    required this.surface,
    required this.metadataNodeId,
    required this.englishGloss,
    required this.canonicalTargetIds,
    required this.memoryTargetIds,
    required this.slotPoolId,
    required this.slotRoleIds,
    required this.utilityScore,
    this.exclusionReason = '',
  });

  final String surface;
  final String metadataNodeId;
  final String englishGloss;
  final List<String> canonicalTargetIds;
  final List<String> memoryTargetIds;
  final String slotPoolId;
  final List<String> slotRoleIds;
  final int utilityScore;
  final String exclusionReason;
}

final class A1MetadataSlotResolver {
  A1MetadataSlotResolver({required this.metadata});

  final LanguageMetadataRepository metadata;

  List<A1MetadataSlotValue> valuesForSlotPool(String slotPoolId) {
    final nodes = metadata.nodesForSlotPool(slotPoolId)
        .where((node) => node.canAssembleLearningChunk)
        .toList()
      ..sort((a, b) {
        final priority = b.lexicalPriority.compareTo(a.lexicalPriority);
        if (priority != 0) return priority;
        return a.nodeId.compareTo(b.nodeId);
      });
    return [
      for (final node in nodes)
        A1MetadataSlotValue(
          surface: node.preferredFrancoArabic,
          metadataNodeId: node.nodeId,
          englishGloss: node.englishGloss,
          canonicalTargetIds: [node.nodeId],
          memoryTargetIds: node.memoryTargetIds,
          slotPoolId: slotPoolId,
          slotRoleIds: _slotRolesForPool(slotPoolId),
          utilityScore: node.lexicalPriority,
        ),
    ];
  }

  Map<String, String> surfaceToTargetMapForBaseTarget(
    String baseTargetId,
  ) {
    final poolIds = switch (baseTargetId) {
      'shopping.object' => const ['pool.shopping.objects'],
      'home.object' => const ['pool.home.objects'],
      'preference.item' => const [
          'pool.preferences.items',
          'pool.daily.activities',
          'pool.shopping.objects',
        ],
      'detail.size' => const ['pool.descriptions.adjectives'],
      'time.anchor' || 'time.shift' => const ['pool.time.anchors'],
      'daily.activity' => const ['pool.daily.activities'],
      'emotion.state' => const ['pool.feelings.states'],
      _ => const <String>[],
    };
    return {
      for (final poolId in poolIds)
        for (final value in valuesForSlotPool(poolId))
          value.surface: value.metadataNodeId,
    };
  }
}

List<String> _slotRolesForPool(String poolId) {
  return switch (poolId) {
    'pool.shopping.objects' => const ['request_object', 'preference_item'],
    'pool.home.objects' => const ['home_object'],
    'pool.preferences.items' => const ['preference_item'],
    'pool.daily.activities' => const ['activity', 'preference_item'],
    'pool.time.anchors' => const ['time_anchor'],
    'pool.feelings.states' => const ['state'],
    'pool.descriptions.adjectives' => const ['degree', 'detail_value'],
    'pool.people.relationships' => const ['person'],
    'pool.social.routines' => const ['routine_phrase'],
    'pool.repair.phrases' => const ['repair_phrase'],
    'pool.support.connectors' => const ['connector'],
    _ => const [],
  };
}
```

Export it from `packages/learning_core/lib/learning_core.dart`:

```dart
export 'src/a1_metadata_slot_resolver.dart';
```

- [x] **Step 6: Run resolver tests**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_catalog_metadata_reachability_audit_test.dart \
  -r expanded
```

Expected: resolver test passes; priority reachability test still fails until catalog/instantiator/compiler are wired through the resolver.

- [x] **Step 7: Wire A1 instantiator to metadata-backed slot values**

Modify `packages/learning_core/lib/src/a1_conversation_arc_instantiator.dart`:

- Add optional constructor dependency:

```dart
A1ConversationArcInstantiator({
  A1ConversationArcCatalog? catalog,
  A1MetadataSlotResolver? slotResolver,
})  : catalog = catalog ?? A1ConversationArcCatalog.initial(),
      slotResolver = slotResolver ??
          A1MetadataSlotResolver(metadata: StarterLanguageMetadata.v1);

final A1MetadataSlotResolver slotResolver;
```

- Change `_pool(String poolId)` so it prefers metadata-backed values:

```dart
List<String> _pool(String poolId) {
  final resolved = slotResolver.valuesForSlotPool(poolId);
  if (resolved.isNotEmpty) {
    return [for (final value in resolved) value.surface];
  }
  return catalog.slotPools[poolId] ?? const ['sample'];
}
```

- Replace direct `catalog.slotPools[...]` reads inside `_slotBindings` with `_pool(...)`.

Do not remove deterministic seeded selection. `_pick(values, seed)` must still produce repeatable tests.

- [x] **Step 8: Wire compiler concrete target replacement to shared resolver**

Modify `packages/learning_core/lib/src/mastery_lesson_compiler.dart`:

- Add a local resolver helper near `_a1ArcTeachingTargetIds`:

```dart
Map<String, String> _a1ConcreteTargetMapFor({
  required String baseTargetId,
  required LanguageMetadataRepository metadata,
}) {
  final resolver = A1MetadataSlotResolver(metadata: metadata);
  final resolved = resolver.surfaceToTargetMapForBaseTarget(baseTargetId);
  if (resolved.isNotEmpty) {
    return resolved;
  }
  return _a1ConcreteTargetIdsBySurface[baseTargetId] ?? const {};
}
```

- In `_a1ArcTeachingTargetIds`, replace:

```dart
final concreteTargets = _a1ConcreteTargetIdsBySurface[baseTargetId];
```

with:

```dart
final concreteTargets = _a1ConcreteTargetMapFor(
  baseTargetId: baseTargetId,
  metadata: metadata,
);
```

The private `_a1ConcreteTargetIdsBySurface` map may remain as a fallback for contract-only surfaces, but production metadata-backed slot pools must be preferred.

- [x] **Step 9: Repair priority metadata pool backing**

Modify `packages/learning_core/lib/src/starter_language_metadata.dart` only for exact backing gaps needed by production A1 slots:

- Ensure `pool.time.anchors` has selectable metadata nodes for `delwa2ti`, `ennaharda`, `bukra`, and `embareh`.
- Ensure `pool.home.objects` has selectable metadata nodes for `kitab`, `mobile`, and `kursi`, or explicitly map existing object metadata into that pool.
- Ensure `pool.feelings.states` has selectable metadata nodes for `mabsoot`, `ta3ban`, and `ga3an`.
- Ensure `pool.descriptions.adjectives` either has metadata backing for `helw` or the catalog stops using `helw` as a size/detail candidate.
- Ensure daily activity nodes expose the generated surfaces used by the A1 catalog through aliases or verified form metadata, not by adding invented forms.

Do not promote `food_drink` from `excludedLegacy` in this task.

- [x] **Step 10: Update growth candidate source to use concrete metadata-backed candidates**

Modify `packages/learning_core/lib/src/a1_growth_candidate_source.dart` so metadata-sourced growth can name concrete candidate ids when available:

```dart
final resolver = A1MetadataSlotResolver(metadata: StarterLanguageMetadata.v1);
```

For abstract targets such as `shopping.object`, `home.object`, `daily.activity`, `time.anchor`, `emotion.state`, and `description.adjective`, use `surfaceToTargetMapForBaseTarget` to verify at least one concrete metadata-backed candidate exists before returning the abstract growth candidate.

If no concrete candidate exists, return:

```text
metadataReadiness.no_concrete_slot_candidate:<baseTargetId>
```

not generic `coordinatorPolicy.no_memory_growth_or_refresh_candidate`.

- [x] **Step 11: Update coordinator preflight owner handling**

Modify `packages/learning_core/lib/src/focus_coordinator.dart` so a family/route with no renderable metadata-backed growth/refresh candidate is skipped or owned before it can poison Start Focus.

Expected behavior:

- if another family/route has a valid renderable support-growth bundle, select it;
- if no family has one, block with exact owner rows from the reachability audit, such as `metadataReadiness.no_concrete_slot_candidate:shopping.object` or `arcCoverage.support_growth_bundle_no_registered_route:<arcId>`;
- do not emit only generic `coordinatorPolicy.no_memory_growth_or_refresh_candidate` when metadata has reachable candidates that another layer failed to use.

- [x] **Step 12: Add UI-visible regression coverage**

In `apps/mobile/test/a1_focus_perceived_diversity_audit_test.dart`, keep the extended start count high enough to reproduce the prior live blocker and add an assertion that the report either sees a reachable shopping object beyond the old three surfaces or owns why it cannot.

Add row-level helper:

```dart
bool get usesExpandedShoppingObject {
  return visibleTranscript.contains('gazma') ||
      visibleTranscript.contains('dawa') ||
      visibleTranscript.contains('shanta') ||
      visibleTranscript.contains('ticket') ||
      visibleTranscript.contains('tshirt');
}
```

Then assert:

```dart
final expandedOrOwned = result.rows.any((row) => row.usesExpandedShoppingObject) ||
    result.rows.any((row) =>
        row.diagnosisCode.startsWith('metadataReadiness.') ||
        row.diagnosisCode.startsWith('arcCoverage.') ||
        row.diagnosisCode.startsWith('compilerMaterialization.'));

expect(expandedOrOwned, isTrue, reason: result.toMarkdown());
```

- [x] **Step 13: Run focused verification**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_catalog_metadata_reachability_audit_test.dart \
  test/a1_target_bundle_test.dart \
  test/focus_coordinator_arc_candidate_test.dart \
  -r expanded

cd ../../apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_focus_perceived_diversity_audit_test.dart \
  test/a1_ui_completion_memory_regression_audit_test.dart \
  --concurrency=1
```

Expected: PASS. The catalog reachability audit must show no unowned priority gaps. UI audit must no longer block after the previously failing long-run state.

- [x] **Step 14: UI/product checkpoint**

Start or hot-reload the server and ask the user to test normal Focus. Expected visible changes:

- Start Focus should not block because it selected a family whose catalog pool is too thin while metadata has unused candidates.
- Shopping/object routes may surface expanded metadata-backed objects such as `gazma`, `dawa`, `shanta`, `ticket`, or `tshirt` when coherent.
- If those objects do not appear, the blocker must name `routeCapability`, `metadataReadiness`, `compilerMaterialization`, or `arcCoherence`, not memory.
- Food/drink remains excluded as a primary A1 island.

- [ ] **Step 15: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_catalog_metadata_reachability_audit.dart \
  packages/learning_core/lib/src/a1_metadata_slot_resolver.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/lib/src/a1_conversation_arc_catalog.dart \
  packages/learning_core/lib/src/a1_conversation_arc_instantiator.dart \
  packages/learning_core/lib/src/a1_growth_candidate_source.dart \
  packages/learning_core/lib/src/mastery_lesson_compiler.dart \
  packages/learning_core/lib/src/starter_language_metadata.dart \
  packages/learning_core/test/a1_catalog_metadata_reachability_audit_test.dart \
  packages/learning_core/test/a1_target_bundle_test.dart \
  packages/learning_core/test/focus_coordinator_arc_candidate_test.dart \
  apps/mobile/test/a1_focus_perceived_diversity_audit_test.dart \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md
git commit -m "feat: align A1 catalog slot pools with metadata"
```

## Task 16E Gate

If Task 16E passes and the long-run UI audit no longer blocks on catalog/metadata reachability, continue to Task 17.

If Task 16E shows expanded objects are metadata-backed and compiler-mapped but route selection still cannot choose them, proceed to Task 17 because route capability is now the first failing owner.

If Task 16E shows metadata-backed objects can be selected but lesson stages omit matching/building/bounded/final cue material, proceed to Task 21 because compiler materialization is now the first failing owner.

If Task 16E still has unowned priority pool drift, stop and repair Task 16E before continuing.

## Task 16F: Route-Specific Growth Bundle Contract

**Purpose:** Fix the abstract-growth collapse found after Task 16E: known broad A1 slots such as `daily.activity`, `home.object`, and `shopping.object` must become support anchors for concrete/form growth, not make growth disappear and block Focus.

**Placement:** This is the next standalone implementation task after Task 16E and before Task 17. Do not fold it into the route capability registry. Task 17 can describe what routes can build only after Task 16F defines the route-specific growth bundle contract that routes must satisfy.

**Audit finding addressed:** `coordinatorPolicy.no_memory_growth_or_refresh_candidate` after UI-completed lessons even though memory contains support and metadata contains concrete/form growth; `coordinatorPolicy.known_growth_ratio_out_of_bounds` when known support cannot be converted into a valid support-growth route; `arcCoverage.support_growth_bundle_no_registered_route` when a family-level bundle cannot materialize in the selected arc.

**Remediation Decision Record:**

```text
productFailure: completed UI lessons can make abstract A1 slots stable/cooled, leaving growth empty even though concrete values and verified forms are still available
firstFailingLayer: coordinator growth contract
evidence: extended UI/controller reproduction blocked after lesson 11 with support={global: many ids}, growth={global: []}, cooled broad targets, and repeated no-memory-growth/route-coverage blockers
selectedRepair: add A1 growth inventory and route-specific growth bundles before coordinator route scoring
whyThisRepairFirst: route capability work cannot help if the coordinator only asks whether abstract targets are new instead of asking which concrete/form growth they can carry
productionBehaviorChanged: FocusCoordinator ranks viable route-specific support-growth bundles before trying arcs; known broad slots can support concrete/form growth
backendProof: 12-lesson UI/controller-style audit prints final conversation transcripts and does not block generically when inventory-backed growth exists
uiProductCheckpoint: user-visible lessons show changing final conversation shapes or precise owned blockers, not repeated stale shapes followed by generic no-growth
remainingOwnedBlocker: Task 17 owns missing route capability only after Task 16F proves a route-specific bundle wanted a route that cannot materialize it
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_growth_inventory.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/lib/src/a1_target_bundle.dart`
- Modify: `packages/learning_core/lib/src/a1_growth_candidate_source.dart`
- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/lib/src/focus_evidence_gate.dart`
- Modify: `apps/mobile/lib/features/practice/session_controller.dart`
- Modify: `apps/mobile/lib/features/practice/focus_evidence_writer.dart`
- Create: `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart`
- Create: `packages/learning_core/test/a1_growth_inventory_test.dart`
- Modify: `packages/learning_core/test/a1_target_bundle_test.dart`
- Modify: `packages/learning_core/test/focus_coordinator_arc_candidate_test.dart`

- [x] **Step 1: Write the failing growth inventory test**

Create `packages/learning_core/test/a1_growth_inventory_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1GrowthInventory', () {
    test('known abstract activity slot still exposes concrete and form growth', () {
      final graph = MasteryMemoryGraphProjector().project([
        _event('daily.1', 'daily.activity', 'session.1'),
        _event('daily.2', 'daily.activity', 'session.2'),
        _event('time.1', 'time.anchor', 'session.1'),
        _event('time.2', 'time.anchor', 'session.2'),
        _event('study.1', 'daily.action.study', 'session.1'),
      ]);
      final profile = A1CoordinatorMemoryProfile.fromGraph(graph);
      final inventory = A1GrowthInventory.fromProfile(profile);

      final candidates = inventory.candidatesFor(
        familyId: 'daily_activities',
        arcId: 'activity_time_arc',
      );

      expect(
        candidates.supportAbstractTargetIds,
        containsAll(['daily.activity', 'time.anchor']),
      );
      expect(
        candidates.growthConcreteTargetIds,
        isNot(isEmpty),
        reason:
            'A stable abstract activity slot must become support for new concrete activity growth.',
      );
      expect(
        candidates.growthAxes,
        anyOf(contains('slot_value'), contains('tense_aspect')),
      );
      expect(candidates.blockerCode, isEmpty);
    });

    test('cooled abstract target does not block concrete growth under it', () {
      final graph = MasteryMemoryGraphProjector().project([
        _event('home.1', 'home.object', 'session.1'),
        _event('home.2', 'home.object', 'session.2'),
        _event('have.1', 'predicate.have', 'session.1'),
        _event('have.2', 'predicate.have', 'session.2'),
      ]);
      final profile = A1CoordinatorMemoryProfile.fromGraph(graph);
      final inventory = A1GrowthInventory.fromProfile(profile);

      final candidates = inventory.candidatesFor(
        familyId: 'home_objects_possessions',
        arcId: 'direct_answer_detail_arc',
      );

      expect(candidates.cooledAsPrimaryTargetIds, contains('home.object'));
      expect(candidates.supportAbstractTargetIds, contains('home.object'));
      expect(candidates.growthConcreteTargetIds, isNot(isEmpty));
      expect(
        candidates.trace,
        contains('growthInventory.abstract_slot_used_as_support:home.object'),
      );
    });
  });
}

MasteryGraphEvidenceEvent _event(
  String id,
  String targetId,
  String sessionId,
) {
  return MasteryGraphEvidenceEvent(
    eventId: id,
    targetId: targetId,
    targetKind: MasteryMemoryNodeKind.word,
    evidenceKind: MasteryGraphEvidenceKind.finalConversation,
    sessionId: sessionId,
  );
}
```

- [x] **Step 2: Run the failing inventory test**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_growth_inventory_test.dart \
  -r expanded
```

Expected: FAIL because `A1GrowthInventory` does not exist.

- [x] **Step 3: Implement `A1GrowthInventory` model and candidate result**

Create `packages/learning_core/lib/src/a1_growth_inventory.dart`:

```dart
import 'a1_coordinator_memory_profile.dart';
import 'a1_growth_candidate_source.dart';

final class A1GrowthInventory {
  A1GrowthInventory._({
    required this.profile,
    required this.source,
  });

  factory A1GrowthInventory.fromProfile(
    A1CoordinatorMemoryProfile profile, {
    A1GrowthCandidateSource? source,
  }) {
    return A1GrowthInventory._(
      profile: profile,
      source: source ?? A1GrowthCandidateSource(),
    );
  }

  final A1CoordinatorMemoryProfile profile;
  final A1GrowthCandidateSource source;

  A1GrowthInventoryCandidates candidatesFor({
    required String familyId,
    required String arcId,
  }) {
    final globalSupport = profile.supportCandidatesByFamily['global'] ?? const [];
    final familySupport = profile.supportCandidatesByFamily[familyId] ?? const [];
    final support = _unique([...familySupport, ...globalSupport]);
    final compatibleSupport = source.compatibleSupportTargetIds(
      support,
      familyId: familyId,
    );
    final globalGrowth = profile.growthCandidatesByFamily['global'] ?? const [];
    final familyGrowth = profile.growthCandidatesByFamily[familyId] ?? const [];
    final globalRefresh = profile.refreshTargetsByFamily['global'] ?? const [];
    final familyRefresh = profile.refreshTargetsByFamily[familyId] ?? const [];
    final cooled = _unique([
      ...?profile.cooledPrimaryTargetsByFamily['global'],
      ...?profile.cooledPrimaryTargetsByFamily[familyId],
    ]);
    final sourceResult = source.source(
      familyId: familyId,
      supportTargetIds: compatibleSupport,
      growthTargetIds: _unique([...familyGrowth, ...globalGrowth]),
      refreshTargetIds: _unique([...familyRefresh, ...globalRefresh]),
      cooledTargetIds: cooled,
      blockedTargetIds: _unique([
        ...?profile.blockedTargetsByFamily['global'],
        ...?profile.blockedTargetsByFamily[familyId],
      ]),
    );
    final concreteGrowth = _unique([
      for (final candidate in sourceResult.selectedCandidates)
        ...candidate.concreteTargetIds,
    ]);
    final growthAxes = _growthAxesFor(concreteGrowth);
    return A1GrowthInventoryCandidates(
      familyId: familyId,
      arcId: arcId,
      supportAbstractTargetIds: compatibleSupport,
      supportConcreteTargetIds: _concreteKnownSupport(compatibleSupport),
      supportFormTargetIds: _formTargets(compatibleSupport),
      growthAbstractTargetIds: [
        for (final candidate in sourceResult.selectedCandidates)
          candidate.targetId,
      ],
      growthConcreteTargetIds: concreteGrowth,
      growthFormTargetIds: _formTargets(concreteGrowth),
      refreshTargetIds: _unique([...familyRefresh, ...globalRefresh]),
      cooledAsPrimaryTargetIds: cooled,
      selectedGrowthCandidateIds: [
        for (final candidate in sourceResult.selectedCandidates)
          candidate.targetId,
      ],
      rejectedGrowthCandidateIds: sourceResult.rejectedCandidateIds,
      growthAxes: growthAxes,
      blockerCode: sourceResult.hasSelection ? '' : sourceResult.blockerCode,
      repairAction: sourceResult.repairAction,
      trace: [
        'growthInventory.profile_consumed',
        for (final targetId in compatibleSupport)
          'growthInventory.abstract_slot_used_as_support:$targetId',
        ...sourceResult.trace,
      ],
    );
  }

  List<String> _concreteKnownSupport(List<String> support) {
    return [
      for (final targetId in support)
        if (targetId.split('.').length > 2) targetId,
    ];
  }

  List<String> _formTargets(List<String> targetIds) {
    return [
      for (final targetId in targetIds)
        if (targetId.startsWith('verb.')) targetId,
    ];
  }

  List<String> _growthAxesFor(List<String> targetIds) {
    final axes = <String>{};
    for (final targetId in targetIds) {
      if (targetId.startsWith('verb.')) {
        axes.add('tense_aspect');
      } else if (targetId.contains('object') ||
          targetId.contains('food.') ||
          targetId.contains('daily.action') ||
          targetId.contains('time.')) {
        axes.add('slot_value');
      }
    }
    return List.unmodifiable(axes);
  }
}

final class A1GrowthInventoryCandidates {
  const A1GrowthInventoryCandidates({
    required this.familyId,
    required this.arcId,
    required this.supportAbstractTargetIds,
    required this.supportConcreteTargetIds,
    required this.supportFormTargetIds,
    required this.growthAbstractTargetIds,
    required this.growthConcreteTargetIds,
    required this.growthFormTargetIds,
    required this.refreshTargetIds,
    required this.cooledAsPrimaryTargetIds,
    required this.selectedGrowthCandidateIds,
    required this.rejectedGrowthCandidateIds,
    required this.growthAxes,
    required this.blockerCode,
    required this.repairAction,
    required this.trace,
  });

  final String familyId;
  final String arcId;
  final List<String> supportAbstractTargetIds;
  final List<String> supportConcreteTargetIds;
  final List<String> supportFormTargetIds;
  final List<String> growthAbstractTargetIds;
  final List<String> growthConcreteTargetIds;
  final List<String> growthFormTargetIds;
  final List<String> refreshTargetIds;
  final List<String> cooledAsPrimaryTargetIds;
  final List<String> selectedGrowthCandidateIds;
  final List<String> rejectedGrowthCandidateIds;
  final List<String> growthAxes;
  final String blockerCode;
  final String repairAction;
  final List<String> trace;

  bool get hasRouteGrowth {
    return growthAbstractTargetIds.isNotEmpty ||
        growthConcreteTargetIds.isNotEmpty ||
        growthFormTargetIds.isNotEmpty ||
        refreshTargetIds.isNotEmpty;
  }
}

List<String> _unique(Iterable<String> values) {
  final sorted = {
    for (final value in values)
      if (value.trim().isNotEmpty) value.trim(),
  }.toList()
    ..sort();
  return List.unmodifiable(sorted);
}
```

Export it from `packages/learning_core/lib/learning_core.dart`:

```dart
export 'src/a1_growth_inventory.dart';
```

- [x] **Step 4: Verify inventory tests pass**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_growth_inventory_test.dart \
  -r expanded
```

Expected: PASS.

- [x] **Step 5: Write failing route-specific bundle tests**

In `packages/learning_core/test/a1_target_bundle_test.dart`, add:

```dart
test('route bundle keeps abstract slot as support while growing concrete value', () {
  final graph = MasteryMemoryGraphProjector().project([
    _event('home.1', 'home.object', 'session.1'),
    _event('home.2', 'home.object', 'session.2'),
    _event('have.1', 'predicate.have', 'session.1'),
    _event('have.2', 'predicate.have', 'session.2'),
  ]);
  final profile = A1CoordinatorMemoryProfile.fromGraph(graph);
  final bundles = A1TargetBundlePlanner(
    policy: A1ProgressionPolicy.defaultPolicy,
  ).build(profile);

  final bundle = bundles.singleWhere(
    (bundle) =>
        bundle.islandId == 'home_objects_possessions' &&
        bundle.arcId == 'direct_answer_detail_arc',
  );

  expect(bundle.supportTargetIds, contains('home.object'));
  expect(bundle.growthTargetIds, isNot(isEmpty));
  expect(bundle.growthConcreteTargetIds, isNot(isEmpty));
  expect(bundle.trace, contains('routeBundle.route_specific'));
});
```

If `_event` is not already available in that file, add the same helper used in Step 1 at the bottom of the file.

- [x] **Step 6: Run the route bundle test to verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_target_bundle_test.dart \
  -r expanded
```

Expected: FAIL because `A1TargetBundle` does not yet expose `arcId` and `growthConcreteTargetIds`, and the planner does not build route-specific bundles.

- [x] **Step 7: Upgrade `A1TargetBundle` to carry route-specific growth fields**

In `packages/learning_core/lib/src/a1_target_bundle.dart`, add fields to `A1TargetBundle`:

```dart
final String arcId;
final List<String> supportConcreteTargetIds;
final List<String> supportFormTargetIds;
final List<String> growthConcreteTargetIds;
final List<String> growthFormTargetIds;
final String routeCooldownState;
final String blockerCode;
final String repairAction;
```

Update the constructor so existing tests can pass by requiring these fields and setting them from planner calls. Existing family-level creation paths must set `arcId` to the route being built, not an empty string.

- [x] **Step 8: Build bundles per family/arc from inventory**

Update `A1TargetBundlePlanner.build()`:

```dart
final inventory = A1GrowthInventory.fromProfile(profile);
for (final familyId in familyIdsToEvaluate) {
  final familyProfile = growthSource.catalog.profileFor(familyId);
  for (final arcId in familyProfile.supportedArcIds) {
    final inventoryCandidates = inventory.candidatesFor(
      familyId: familyId,
      arcId: arcId,
    );
    final bundle = _buildRouteBundle(
      familyId: familyId,
      arcId: arcId,
      inventoryCandidates: inventoryCandidates,
      support: inventoryCandidates.supportAbstractTargetIds,
      growth: inventoryCandidates.growthAbstractTargetIds,
      refresh: inventoryCandidates.refreshTargetIds,
      cooled: inventoryCandidates.cooledAsPrimaryTargetIds,
      blocked: profile.blockedTargetsByFamily[familyId] ??
          profile.blockedTargetsByFamily['global'] ??
          const [],
      axes: profile.eligibleUpgradeAxesByFamily[familyId] ??
          profile.eligibleUpgradeAxesByFamily['global'] ??
          const [],
      rungs: profile.eligibleRungsByFamily[familyId] ??
          profile.eligibleRungsByFamily['global'] ??
          const [],
    );
    if (bundle != null) bundles.add(bundle);
  }
}
```

Use the existing `_buildBundle` logic as the starting point, but it must:

- preserve abstract support ids as support even when they are cooled as primary;
- place selected abstract growth ids in `growthTargetIds`;
- place selected concrete ids in `growthConcreteTargetIds`;
- place verified form ids in `growthFormTargetIds`;
- include trace `routeBundle.route_specific`;
- return no bundle only when inventory has no route growth or support cannot meet policy;
- preserve `blockerCode` and `repairAction` from inventory when no bundle is returned.

- [x] **Step 9: Update coordinator bundle lookup to require matching family and arc**

In `packages/learning_core/lib/src/focus_coordinator.dart`, update bundle lookup so the selected `arcId` is passed into bundle retrieval:

```dart
final targetBundle = _a1TargetBundleForRoute(
  familyId: familyId,
  arcId: arcId,
  targetBundles: targetBundles,
);
```

Replace `_a1TargetBundleForFamily` with route-aware lookup:

```dart
A1TargetBundle? _a1TargetBundleForRoute({
  required String familyId,
  required String arcId,
  required List<A1TargetBundle> targetBundles,
}) {
  for (final bundle in targetBundles) {
    if (bundle.islandId == familyId &&
        bundle.arcId == arcId &&
        bundle.isSupportGrowthBlend) {
      return bundle;
    }
  }
  for (final bundle in targetBundles) {
    if (bundle.islandId == 'global' &&
        bundle.arcId == arcId &&
        bundle.isSupportGrowthBlend) {
      return bundle;
    }
  }
  return null;
}
```

Then update rejection reasons so `coordinatorPolicy.no_memory_growth_or_refresh_candidate` is not emitted when route-specific inventory had selected/rejected concrete candidates. Use the more precise owner:

```dart
if (targetBundle == null && bundleSupportTargetIds.isNotEmpty && hasNoGrowth) {
  return [
    'routeBundle.no_route_specific_growth_bundle:$arcId',
  ];
}
```

- [x] **Step 10: Verify route bundle/coordinator tests**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_growth_inventory_test.dart \
  test/a1_target_bundle_test.dart \
  test/focus_coordinator_arc_candidate_test.dart \
  -r expanded
```

Expected: PASS. If `focus_coordinator_arc_candidate_test.dart` fails with `arcCoverage.support_growth_bundle_no_registered_route`, do not weaken the bundle. Leave the precise owner and continue to Task 17. If it fails with generic no-memory-growth while inventory candidates exist, repair Task 16F before continuing.

- [x] **Step 11: Write the 12-lesson final conversation progression audit**

Create `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart`:

```dart
import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:kalami_mobile/features/practice/focus_mastery_plan_gateway.dart';
import 'package:kalami_mobile/features/practice/focus_start_lease.dart';
import 'package:kalami_mobile/features/practice/session_controller.dart';
import 'package:kalami_mobile/shared/content/kalami_content.dart';
import 'package:kalami_mobile/shared/persistence/app_database.dart';
import 'package:kalami_mobile/shared/persistence/learner_memory_repository.dart';
import 'package:learning_core/learning_core.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test(
    'route-specific bundles change final conversation shape over 12 lessons',
    () async {
      final database = AppDatabase.inMemory();
      addTearDown(database.close);
      final repository = LearnerMemoryRepository(database);
      final leaseRepository = DriftFocusStartLeaseRepository(database);
      final content = await KalamiContent.loadFromAsset();
      var now = DateTime.utc(2026, 6, 2, 16);
      final gateway = FocusMasteryPlanGateway(
        memoryRepository: repository,
        seedPoolLoader: () async => content.toCoreSeedPrompts(),
        focusStartLeaseRepository: leaseRepository,
      );
      final controller = PracticeSessionController(
        repository,
        now: () => now,
        seedPoolLoader: () async => content.toCoreSeedPrompts(),
        focusStartLeaseRepository: leaseRepository,
        focusMasteryPlanGateway: gateway,
      );

      final rows = <_RouteGrowthProgressionRow>[];
      for (var index = 0; index < 12; index += 1) {
        final start = await controller.start(mode: SessionMode.focus);
        if (start.activePlan == null) {
          rows.add(_RouteGrowthProgressionRow.blocked(
            index: index,
            blockerText: start.moves.map((move) => move.feedback).join('\n'),
            diagnostics: await _bundleDiagnostics(repository),
          ));
          break;
        }
        final plan = start.activePlan!;
        rows.add(_RouteGrowthProgressionRow.ready(
          index: index,
          plan: plan,
          diagnostics: await _bundleDiagnostics(repository),
        ));
        await _completeActiveUiPlan(controller);
        now = now.add(const Duration(minutes: 8));
      }

      final report = _RouteGrowthProgressionReport(rows);
      // ignore: avoid_print
      print(report.toMarkdown());

      expect(rows.length, greaterThanOrEqualTo(12), reason: report.toMarkdown());
      expect(
        report.genericNoGrowthWhileInventoryHadGrowth,
        isFalse,
        reason: report.toMarkdown(),
      );
      expect(
        report.hasMeaningfulConversationMovement,
        isTrue,
        reason: report.toMarkdown(),
      );
      expect(
        report.hasExactTranscriptRepeatWithoutOwnedRefresh,
        isFalse,
        reason: report.toMarkdown(),
      );
    },
  );
}
```

Then add helpers in the same file using the exact helper bodies from `apps/mobile/test/a1_ui_completion_memory_regression_audit_test.dart` for `_completeActiveUiPlan`, `_cooperativeInputForPayload`, `_typingBoxIds`, `_expectedAnswerForBox`, and `_metadataList`. Add report helpers that output this table:

```markdown
| # | status | family | arc | transcript | support | growth | concrete | forms | source | diagnosis |
|---:|---|---|---|---|---|---|---|---|---|---|
```

The row constructor must read:

- `plan.boundLesson!.conversationTurns` for transcript;
- `plan.boundLesson!.stages.singleWhere((stage) => stage.type == BoundLessonStageType.finalConversation).metadata['a1ConversationFamilyId']` for family id;
- `plan.boundLesson!.stages.singleWhere((stage) => stage.type == BoundLessonStageType.finalConversation).metadata['a1ConversationArcId']` for arc id;
- `plan.trace.robustFocusReasons` for `routeBundle.route_specific`, `coordinatorPolicy.growth_source`, selected/rejected candidates, and blockers.

- [x] **Step 12: Run the 12-lesson audit and verify failure or pass**

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  --concurrency=1 \
  -r expanded
```

Expected before full repair: FAIL or print a blocker showing the exact failing owner. Expected after Task 16F repair: PASS with 12 rendered final-conversation rows. If the audit blocks before row 12, stop and report the first blocker owner before continuing unless the blocker is a small Task 16F wiring error.

- [x] **Step 13: Repair production traces for audit visibility**

If the 12-lesson report cannot show support/concrete/form growth, update the selected plan trace in `FocusCoordinator.createA1ConversationArcFocusPlan` to include:

```text
routeBundle.route_specific
routeBundle.family:<familyId>
routeBundle.arc:<arcId>
routeBundle.support_abstract:<targetId>
routeBundle.support_concrete:<targetId>
routeBundle.support_form:<targetId>
routeBundle.growth_abstract:<targetId>
routeBundle.growth_concrete:<targetId>
routeBundle.growth_form:<targetId>
routeBundle.route_cooldown:<state>
growthInventory.selected:<targetId>
growthInventory.rejected:<targetId>:<reason>
```

Do not add UI-only traces. These traces must come from the production coordinator decision.

- [x] **Step 14: Run focused regression suite**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_growth_inventory_test.dart \
  test/a1_target_bundle_test.dart \
  test/focus_coordinator_arc_candidate_test.dart \
  test/a1_catalog_metadata_reachability_audit_test.dart \
  -r expanded

cd ../../apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  test/a1_focus_perceived_diversity_audit_test.dart \
  test/a1_ui_completion_memory_regression_audit_test.dart \
  --concurrency=1
```

Expected: PASS. The 12-lesson report must show final conversation transcripts with route/family/concrete/form movement, or it must stop at a precise owner that is not generic no-growth while inventory candidates exist.

- [x] **Step 15: Update Task 17 handoff based on Task 16F result**

Before continuing:

- If Task 16F passes and the 12-lesson report shows route-specific bundles reaching rendered lessons, continue to Task 16G before Task 17. Task 17 route capability work must receive candidate-visible scoring evidence, not only bundle evidence.
- If Task 16F produces `arcCoverage.no_route_for_growth_form` or `arcCoverage.support_growth_bundle_no_registered_route`, continue to Task 16G first if exact visible repeats or same-feeling candidate selection are still present. Then use Task 16F and 16G reports as the first route capability inputs for Task 17.
- If Task 16F produces `metadataReadiness` or `formReadiness`, compare against Tasks 19-20. If the missing metadata is exactly covered, proceed to that owner task; otherwise update the metadata task before continuing.
- If Task 16F still produces generic `coordinatorPolicy.no_memory_growth_or_refresh_candidate` while inventory candidates exist, stop and repair Task 16F. Do not proceed to Task 17.
- If Task 16F renders incoherent final conversations, continue only if the blocker is classified as `arcCoherence`; otherwise update Task 22 before continuing.

**Task 16F result and Task 17 handoff:** Task 16F passed the route-specific bundle and UI/controller verification. The 12-lesson route-growth audit rendered 12 ready lessons without a generic no-growth blocker while inventory-backed growth existed. The mobile UI completion audit also exposed and repaired a canonical proof writeback gap: `daily.activity` was landing in legacy target memory but not the surface-aware rollup ledger because visible recap duplicate suppression and the evidence gate did not treat final-return/proof-contract detail ids as one learner-visible proof set. The repair added final-return/proof-contract requirements to completion evidence, allowed A1 proof detail ids through the final-conversation evidence gate, and verified `daily.activity` now reaches surface-aware rollups.

Remaining product-quality findings are now owned by later tasks, not Task 16F memory-writeback: the rendered transcripts still include awkward or wrong forms and weak coherence such as `betbey3mel`, `beybenrooh`, `ha3ayza bukra`, repeated simple social/preference shapes, and exact or near-exact learner-visible repeats. Task 16G owns visible itinerary selection before Task 17 route capability begins. Task 17 should then use the 12-lesson reports as input for route capability and generator materialization, and Task 22/coherence work should own illogical conversational turns. Do not reopen Task 16F unless a future audit again shows generic no-growth while `A1GrowthInventory` has viable route-specific candidates, or canonical final proof targets fail to reach surface-aware rollups after UI completion.

- [ ] **Step 16: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_growth_inventory.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/lib/src/a1_target_bundle.dart \
  packages/learning_core/lib/src/a1_growth_candidate_source.dart \
  packages/learning_core/lib/src/focus_coordinator.dart \
  packages/learning_core/test/a1_growth_inventory_test.dart \
  packages/learning_core/test/a1_target_bundle_test.dart \
  packages/learning_core/test/focus_coordinator_arc_candidate_test.dart \
  apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md
git commit -m "feat: add route-specific A1 growth bundles"
```

## Task 16F Gate

If Task 16F passes and the 12-lesson final conversation report shows route-specific bundles reaching rendered lessons, proceed to Task 16G before Task 17.

If Task 16F proves route-specific bundles exist but the learner-visible itinerary still repeats exact or near-exact transcripts, Task 16G becomes the next active owner and must use the failing bundle report as its input.

If Task 16G proves route-specific bundles and visible itinerary scoring both request a route the generator cannot materialize, Task 17 becomes the next active owner and must use both failing reports as input.

If Task 16F proves concrete/form candidates are missing from metadata, update Task 19/20 before doing route registry work.

If Task 16F still blocks with generic no-growth while `A1GrowthInventory` has candidates, do not proceed. The memory-to-bundle contract is still broken.

## Task 16G: Visible Itinerary Candidate Scoring

**Purpose:** Stop hidden target/bundle movement from counting as learner-visible diversity. Normal A1 Focus must collect viable route-specific candidates, preview what the learner will actually see, score those previews against recent visible lessons, and choose the strongest next lesson instead of returning the first selectable candidate.

**Placement:** This is the next standalone implementation task after Task 16F and before Task 17. Do not fold it into route capability. Route capability work should receive precise route/generator blockers only after the coordinator can prove candidate-visible scoring and recent-visible context are working.

**Audit finding addressed:** exact or near-exact final conversation repeats after Task 16F; first-selectable A1 candidate wins; recent A1 gateway context is too thin; support rotation has no recent support input.

**Remediation Decision Record:**

```text
productFailure: memory and route-specific growth bundles can change internally while the learner sees repeated lessons
firstFailingLayer: coordinator visible itinerary policy
evidence: Task 16F rendered 12 lessons but repeated simple preference/social transcripts and current A1 path passes only recentDecisionFingerprints to selection
selectedRepair: add A1 visible itinerary context, candidate visible previews, score-and-rank selection, recent support history, and hard exact-repeat rejection
whyThisRepairFirst: Task 17 route capability needs to know whether a route was truly selected and visibly stale, not just that a bundle existed
productionBehaviorChanged: A1 selection ranks candidates by memory growth plus learner-visible itinerary diversity and blocks exact recent transcript repeats
backendProof: learning_core itinerary tests and mobile 12-lesson audit fail on exact visible repeats and pass when scorer selects a visibly different candidate or owns the blocker
uiProductCheckpoint: after Task 16G, Start Focus after completion should not show an exact recent final conversation repeat; if it does, the report names gateway, itinerary, route, metadata, compiler, or coherence owner
remainingOwnedBlocker: Task 17 owns route capability only after Task 16G proves a diverse candidate wanted an unsupported route; Task 22 owns illogical turns after itinerary no longer repeats exact shapes
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_visible_itinerary.dart`
- Create: `packages/learning_core/test/a1_visible_itinerary_test.dart`
- Modify: `packages/learning_core/lib/src/a1_progression_policy.dart`
- Modify: `packages/learning_core/lib/src/a1_target_bundle.dart`
- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/lib/src/learner_visible_lesson_fingerprint.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/test/focus_coordinator_arc_candidate_test.dart`
- Modify: `apps/mobile/lib/features/practice/focus_mastery_plan_gateway.dart`
- Modify: `apps/mobile/test/focus_mastery_plan_gateway_test.dart`
- Modify: `apps/mobile/test/a1_focus_perceived_diversity_audit_test.dart`
- Modify: `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart`

- [ ] **Step 1: Add failing visible itinerary unit tests**

Create `packages/learning_core/test/a1_visible_itinerary_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1VisibleItineraryScorer', () {
    test('hard rejects exact recent final visible transcript repeats', () {
      final recent = LearnerVisibleLessonFingerprint(
        visibleStartId: 'preference.like.basic',
        openingPromptSurface: 'enta bethebb eh?',
        stageKindSequence: const ['finalConversation'],
        introducedChunkIds: const [],
        wordMatchPromptIds: const [],
        slotBuildTargetIds: const [],
        typingTargetHashes: const [],
        finalVisibleTurnHashes: [
          LearnerVisibleLessonFingerprint.hashVisibleText(
            'tutor:enta bethebb eh?',
          ),
          LearnerVisibleLessonFingerprint.hashVisibleText(
            'learner:ana bahebb el bahr',
          ),
        ],
        primaryTargetBundleIds: const ['predicate.like', 'place.bahr'],
      );
      final context = A1VisibleItineraryContext.fromFingerprints(
        recentVisibleFingerprints: [recent],
      );
      final preview = A1CandidateVisiblePreview(
        familyId: 'preferences',
        arcId: 'preference.like.basic',
        maturityLevel: 'beginner',
        rung: 'revisitSupport',
        openingTutorSurface: 'enta bethebb eh?',
        firstLearnerSurface: 'ana bahebb el bahr',
        finalVisibleTurns: const [
          'tutor:enta bethebb eh?',
          'learner:ana bahebb el bahr',
        ],
        finalVisibleTurnHashes: recent.finalVisibleTurnHashes,
        visibleTranscriptHash: A1VisibleItineraryContext.hashVisibleTranscript(
          recent.finalVisibleTurnHashes,
        ),
        targetClassShape: const ['predicate', 'place'],
        supportTargetIds: const ['predicate.like'],
        supportSurfaceTargetIds: const ['predicate.like'],
        growthTargetIds: const ['place.bahr'],
        growthSurfaceTargetIds: const ['place.bahr'],
        refreshTargetIds: const [],
        growthSource: 'metadata_inventory',
        routeCooldownState: 'available',
        compositionScoreTerms: const {'support_growth_blend': 40},
        bundleTrace: const ['routeBundle.route_specific'],
      );

      final score = A1VisibleItineraryScorer(
        policy: A1ProgressionPolicy.defaultPolicy,
      ).score(preview: preview, context: context);

      expect(score.isSelectable, isFalse);
      expect(score.blockerCode, 'itinerary.exact_visible_transcript_repeat');
      expect(score.trace, contains('itinerary.reject_exact_visible_repeat'));
    });

    test('prefers different route over same-route slot-only novelty', () {
      final recent = LearnerVisibleLessonFingerprint(
        visibleStartId: 'preference.like.basic',
        openingPromptSurface: 'enta bethebb eh?',
        stageKindSequence: const ['finalConversation'],
        frameFamilySequence: const ['preferences'],
        introducedChunkIds: const [],
        wordMatchPromptIds: const [],
        slotBuildTargetIds: const [],
        typingTargetHashes: const [],
        finalVisibleTurnHashes: [
          LearnerVisibleLessonFingerprint.hashVisibleText(
            'tutor:enta bethebb eh?',
          ),
          LearnerVisibleLessonFingerprint.hashVisibleText(
            'learner:ana bahebb el bahr',
          ),
        ],
      );
      final context = A1VisibleItineraryContext.fromFingerprints(
        recentVisibleFingerprints: [recent],
      );
      final sameRoute = _preview(
        familyId: 'preferences',
        arcId: 'preference.like.basic',
        opening: 'enta bethebb eh?',
        learner: 'ana bahebb el kitab',
        targetClassShape: const ['predicate', 'object'],
      );
      final differentRoute = _preview(
        familyId: 'shopping_requests',
        arcId: 'request.object.basic',
        opening: 'enta 3ayiz eh?',
        learner: 'ana 3ayiz dawa',
        targetClassShape: const ['predicate', 'object'],
      );
      final scorer = A1VisibleItineraryScorer(
        policy: A1ProgressionPolicy.defaultPolicy,
      );

      final selected = scorer.selectBest(
        previews: [sameRoute, differentRoute],
        context: context,
      );

      expect(selected.preview.arcId, differentRoute.arcId);
      expect(
        selected.trace,
        contains('itinerary.bonus_different_recent_island'),
      );
      expect(
        scorer.score(preview: sameRoute, context: context).trace,
        contains('itinerary.penalty_same_recent_arc'),
      );
    });
  });
}

A1CandidateVisiblePreview _preview({
  required String familyId,
  required String arcId,
  required String opening,
  required String learner,
  required List<String> targetClassShape,
}) {
  final turns = ['tutor:$opening', 'learner:$learner'];
  final turnHashes = [
    for (final turn in turns) LearnerVisibleLessonFingerprint.hashVisibleText(turn),
  ];
  return A1CandidateVisiblePreview(
    familyId: familyId,
    arcId: arcId,
    maturityLevel: 'beginner',
    rung: 'revisitSupport',
    openingTutorSurface: opening,
    firstLearnerSurface: learner,
    finalVisibleTurns: turns,
    finalVisibleTurnHashes: turnHashes,
    visibleTranscriptHash: A1VisibleItineraryContext.hashVisibleTranscript(turnHashes),
    targetClassShape: targetClassShape,
    supportTargetIds: const ['predicate.like'],
    supportSurfaceTargetIds: const ['predicate.like'],
    growthTargetIds: const ['object.dawa'],
    growthSurfaceTargetIds: const ['object.dawa'],
    refreshTargetIds: const [],
    growthSource: 'metadata_inventory',
    routeCooldownState: 'available',
    compositionScoreTerms: const {'support_growth_blend': 40},
    bundleTrace: const ['routeBundle.route_specific'],
  );
}
```

- [ ] **Step 2: Run the new test and verify it fails**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_visible_itinerary_test.dart \
  -r expanded
```

Expected: FAIL because `A1VisibleItineraryContext`, `A1CandidateVisiblePreview`, and `A1VisibleItineraryScorer` do not exist yet.

- [ ] **Step 3: Add itinerary policy knobs to shared progression policy**

Modify `packages/learning_core/lib/src/a1_progression_policy.dart` so itinerary behavior is globally tunable:

```dart
final class A1ProgressionPolicy {
  const A1ProgressionPolicy({
    required this.policyBundleId,
    required this.version,
    required this.requireSupportForRevisit,
    required this.minSupportTargetsForRevisit,
    required this.minGrowthOrRefreshTargetsForRevisit,
    required this.maxRecentRouteReturnWindow,
    required this.exactSupportSurfaceCooldownWindow,
    required this.underusedSupportBonus,
    required this.repeatedSupportSurfacePenalty,
    required this.masteredPrimaryFocusPenalty,
    required this.allowVerifiedParadigmExpansion,
    required this.allowFirstContactAllGrowth,
    required this.exactVisibleTranscriptRepeatPenalty,
    required this.sameRecentFamilyPenalty,
    required this.sameRecentArcPenalty,
    required this.sameOpeningSurfacePenalty,
    required this.sameTargetClassShapePenalty,
    required this.slotOnlyNoveltyPenalty,
    required this.differentRecentIslandBonus,
    required this.differentRouteBonus,
    required this.productiveReturnBonus,
    required this.visibleConcreteGrowthBonus,
    required this.visibleFormGrowthBonus,
    required this.supportGrowthBlendBonus,
  });

  static const defaultPolicy = A1ProgressionPolicy(
    policyBundleId: 'a1_progression_policy.2026-06-01.v1',
    version: '2026-06-01.v1',
    requireSupportForRevisit: true,
    minSupportTargetsForRevisit: 1,
    minGrowthOrRefreshTargetsForRevisit: 1,
    maxRecentRouteReturnWindow: 3,
    exactSupportSurfaceCooldownWindow: 3,
    underusedSupportBonus: 20,
    repeatedSupportSurfacePenalty: -80,
    masteredPrimaryFocusPenalty: -40,
    allowVerifiedParadigmExpansion: true,
    allowFirstContactAllGrowth: true,
    exactVisibleTranscriptRepeatPenalty: -100000,
    sameRecentFamilyPenalty: -45,
    sameRecentArcPenalty: -70,
    sameOpeningSurfacePenalty: -55,
    sameTargetClassShapePenalty: -25,
    slotOnlyNoveltyPenalty: -60,
    differentRecentIslandBonus: 65,
    differentRouteBonus: 40,
    productiveReturnBonus: 35,
    visibleConcreteGrowthBonus: 30,
    visibleFormGrowthBonus: 35,
    supportGrowthBlendBonus: 45,
  );

  final int exactVisibleTranscriptRepeatPenalty;
  final int sameRecentFamilyPenalty;
  final int sameRecentArcPenalty;
  final int sameOpeningSurfacePenalty;
  final int sameTargetClassShapePenalty;
  final int slotOnlyNoveltyPenalty;
  final int differentRecentIslandBonus;
  final int differentRouteBonus;
  final int productiveReturnBonus;
  final int visibleConcreteGrowthBonus;
  final int visibleFormGrowthBonus;
  final int supportGrowthBlendBonus;
}
```

Update `copyWith` to carry these fields. Keep the existing fields and defaults unchanged.

- [ ] **Step 4: Implement the shared visible itinerary unit**

Create `packages/learning_core/lib/src/a1_visible_itinerary.dart`:

```dart
import 'learner_visible_lesson_fingerprint.dart';
import 'a1_progression_policy.dart';

final class A1VisibleItineraryContext {
  const A1VisibleItineraryContext({
    required this.recentVisibleFingerprints,
    required this.recentDecisionFingerprints,
    required this.recentFamilyIds,
    required this.recentArcIds,
    required this.recentOpeningSurfaceHashes,
    required this.recentFinalVisibleTurnHashes,
    required this.recentVisibleTranscriptHashes,
    required this.recentSupportSurfaceTargetIds,
    required this.recentGrowthSurfaceTargetIds,
  });

  factory A1VisibleItineraryContext.fromFingerprints({
    List<LearnerVisibleLessonFingerprint> recentVisibleFingerprints = const [],
    List<String> recentDecisionFingerprints = const [],
  }) {
    final familyIds = <String>[];
    final arcIds = <String>[];
    final openingHashes = <String>[];
    final finalTurnHashes = <String>{};
    final transcriptHashes = <String>[];
    final supportIds = <String>{};
    final growthIds = <String>{};
    for (final fingerprint in recentVisibleFingerprints) {
      if (fingerprint.frameFamilySequence.isNotEmpty) {
        familyIds.add(fingerprint.frameFamilySequence.first);
      }
      if (fingerprint.visibleStartId.trim().isNotEmpty) {
        arcIds.add(fingerprint.visibleStartId.trim());
      }
      if (fingerprint.openingPromptSurface.trim().isNotEmpty) {
        openingHashes.add(
          LearnerVisibleLessonFingerprint.hashVisibleText(
            fingerprint.openingPromptSurface,
          ),
        );
      }
      finalTurnHashes.addAll(fingerprint.finalVisibleTurnHashes);
      if (fingerprint.finalVisibleTurnHashes.isNotEmpty) {
        transcriptHashes.add(
          hashVisibleTranscript(fingerprint.finalVisibleTurnHashes),
        );
      }
      supportIds.addAll(fingerprint.primaryTargetBundleIds.take(2));
      growthIds.addAll(fingerprint.primaryTargetBundleIds.skip(2));
    }
    return A1VisibleItineraryContext(
      recentVisibleFingerprints: List.unmodifiable(recentVisibleFingerprints),
      recentDecisionFingerprints: List.unmodifiable(recentDecisionFingerprints),
      recentFamilyIds: List.unmodifiable(familyIds),
      recentArcIds: List.unmodifiable(arcIds),
      recentOpeningSurfaceHashes: List.unmodifiable(openingHashes),
      recentFinalVisibleTurnHashes: Set.unmodifiable(finalTurnHashes),
      recentVisibleTranscriptHashes: List.unmodifiable(transcriptHashes),
      recentSupportSurfaceTargetIds: Set.unmodifiable(supportIds),
      recentGrowthSurfaceTargetIds: Set.unmodifiable(growthIds),
    );
  }

  final List<LearnerVisibleLessonFingerprint> recentVisibleFingerprints;
  final List<String> recentDecisionFingerprints;
  final List<String> recentFamilyIds;
  final List<String> recentArcIds;
  final List<String> recentOpeningSurfaceHashes;
  final Set<String> recentFinalVisibleTurnHashes;
  final List<String> recentVisibleTranscriptHashes;
  final Set<String> recentSupportSurfaceTargetIds;
  final Set<String> recentGrowthSurfaceTargetIds;

  static String hashVisibleTranscript(Iterable<String> turns) {
    return LearnerVisibleLessonFingerprint.hashVisibleText(turns.join('\n'));
  }
}

final class A1CandidateVisiblePreview {
  const A1CandidateVisiblePreview({
    required this.familyId,
    required this.arcId,
    required this.maturityLevel,
    required this.rung,
    required this.openingTutorSurface,
    required this.firstLearnerSurface,
    required this.finalVisibleTurns,
    required this.finalVisibleTurnHashes,
    required this.visibleTranscriptHash,
    required this.targetClassShape,
    required this.supportTargetIds,
    required this.supportSurfaceTargetIds,
    required this.growthTargetIds,
    required this.growthSurfaceTargetIds,
    required this.refreshTargetIds,
    required this.growthSource,
    required this.routeCooldownState,
    required this.compositionScoreTerms,
    required this.bundleTrace,
  });

  final String familyId;
  final String arcId;
  final String maturityLevel;
  final String rung;
  final String openingTutorSurface;
  final String firstLearnerSurface;
  final List<String> finalVisibleTurns;
  final List<String> finalVisibleTurnHashes;
  final String visibleTranscriptHash;
  final List<String> targetClassShape;
  final List<String> supportTargetIds;
  final List<String> supportSurfaceTargetIds;
  final List<String> growthTargetIds;
  final List<String> growthSurfaceTargetIds;
  final List<String> refreshTargetIds;
  final String growthSource;
  final String routeCooldownState;
  final Map<String, int> compositionScoreTerms;
  final List<String> bundleTrace;
}

final class A1VisibleItineraryScore {
  const A1VisibleItineraryScore({
    required this.preview,
    required this.score,
    required this.isSelectable,
    required this.blockerCode,
    required this.trace,
  });

  final A1CandidateVisiblePreview preview;
  final int score;
  final bool isSelectable;
  final String blockerCode;
  final List<String> trace;
}

final class A1VisibleItineraryScorer {
  const A1VisibleItineraryScorer({required this.policy});

  final A1ProgressionPolicy policy;

  A1VisibleItineraryScore score({
    required A1CandidateVisiblePreview preview,
    required A1VisibleItineraryContext context,
  }) {
    var score = 0;
    final trace = <String>[];
    if (context.recentVisibleTranscriptHashes
        .contains(preview.visibleTranscriptHash)) {
      return A1VisibleItineraryScore(
        preview: preview,
        score: policy.exactVisibleTranscriptRepeatPenalty,
        isSelectable: false,
        blockerCode: 'itinerary.exact_visible_transcript_repeat',
        trace: const ['itinerary.reject_exact_visible_repeat'],
      );
    }
    if (_sameFinalTurnSequence(preview, context)) {
      return A1VisibleItineraryScore(
        preview: preview,
        score: policy.exactVisibleTranscriptRepeatPenalty,
        isSelectable: false,
        blockerCode: 'itinerary.exact_final_turn_repeat',
        trace: const ['itinerary.reject_exact_final_turn_repeat'],
      );
    }
    if (context.recentFamilyIds.isNotEmpty &&
        context.recentFamilyIds.first == preview.familyId) {
      score += policy.sameRecentFamilyPenalty;
      trace.add('itinerary.penalty_same_recent_family');
    } else if (context.recentFamilyIds.isNotEmpty) {
      score += policy.differentRecentIslandBonus;
      trace.add('itinerary.bonus_different_recent_island');
    }
    if (context.recentArcIds.contains(preview.arcId)) {
      score += policy.sameRecentArcPenalty;
      trace.add('itinerary.penalty_same_recent_arc');
    } else if (context.recentArcIds.isNotEmpty) {
      score += policy.differentRouteBonus;
      trace.add('itinerary.bonus_different_route');
    }
    final openingHash = LearnerVisibleLessonFingerprint.hashVisibleText(
      preview.openingTutorSurface,
    );
    if (context.recentOpeningSurfaceHashes.contains(openingHash)) {
      score += policy.sameOpeningSurfacePenalty;
      trace.add('itinerary.penalty_same_opening_surface');
    }
    if (preview.supportTargetIds.isNotEmpty &&
        (preview.growthTargetIds.isNotEmpty ||
            preview.refreshTargetIds.isNotEmpty)) {
      score += policy.supportGrowthBlendBonus;
      trace.add('itinerary.bonus_support_growth_blend');
    }
    if (preview.growthSurfaceTargetIds.isNotEmpty) {
      score += policy.visibleConcreteGrowthBonus;
      trace.add('itinerary.bonus_visible_growth');
    }
    final repeatedSupport = preview.supportSurfaceTargetIds.any(
      context.recentSupportSurfaceTargetIds.contains,
    );
    if (repeatedSupport) {
      score += policy.repeatedSupportSurfacePenalty;
      trace.add('itinerary.penalty_repeated_support_surface');
    }
    return A1VisibleItineraryScore(
      preview: preview,
      score: score,
      isSelectable: true,
      blockerCode: '',
      trace: List.unmodifiable(trace),
    );
  }

  A1VisibleItineraryScore selectBest({
    required List<A1CandidateVisiblePreview> previews,
    required A1VisibleItineraryContext context,
  }) {
    final scored = [
      for (final preview in previews) score(preview: preview, context: context),
    ].where((score) => score.isSelectable).toList()
      ..sort((left, right) => right.score.compareTo(left.score));
    if (scored.isEmpty) {
      throw StateError('itinerary.no_diverse_candidate_after_scoring');
    }
    return scored.first;
  }

  bool _sameFinalTurnSequence(
    A1CandidateVisiblePreview preview,
    A1VisibleItineraryContext context,
  ) {
    for (final recent in context.recentVisibleFingerprints) {
      final hashes = recent.finalVisibleTurnHashes;
      if (hashes.length == preview.finalVisibleTurnHashes.length &&
          _sameList(hashes, preview.finalVisibleTurnHashes)) {
        return true;
      }
    }
    return false;
  }

  bool _sameList(List<String> left, List<String> right) {
    if (left.length != right.length) return false;
    for (var index = 0; index < left.length; index += 1) {
      if (left[index] != right[index]) return false;
    }
    return true;
  }
}
```

Add `export 'src/a1_visible_itinerary.dart';` to `packages/learning_core/lib/learning_core.dart`.

- [ ] **Step 5: Run itinerary unit test**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_visible_itinerary_test.dart \
  -r expanded
```

Expected: PASS.

- [ ] **Step 6: Thread recent visible context through the hardline A1 gateway**

Modify `apps/mobile/lib/features/practice/focus_mastery_plan_gateway.dart` in `_createHardlineA1ArcResult`:

```dart
final recentVisibleFingerprints = _recentVisibleFingerprints(recentSignatures);
final result = _coordinator.createA1ConversationArcFocusPlan(
  completedEvidenceTargetIds: _completedA1EvidenceTargetIds(memory),
  memoryGraph: surfaceAwareMemoryGraph,
  recentDecisionFingerprints: _recentA1DecisionFingerprints(recentSignatures),
  recentVisibleFingerprints: recentVisibleFingerprints,
);
```

Do not remove `_recentA1DecisionFingerprints`; it remains the compatibility path for stored signatures that cannot decode the visible fingerprint object.

- [ ] **Step 7: Add gateway regression test for recent visible context**

Modify `apps/mobile/test/focus_mastery_plan_gateway_test.dart` to extend the existing hardline A1 fake coordinator. The fake must record both `recentDecisionFingerprints` and `recentVisibleFingerprints`.

Add a test:

```dart
test('hardline A1 passes recent visible fingerprints to coordinator', () async {
  final coordinator = _RecordingFocusCoordinator();
  final gateway = _gatewayWithCoordinatorAndRecentSignature(
    coordinator: coordinator,
    encodedSignature: encodeMasterySelectionSignature(
      _a1SignatureWithVisibleFingerprint(),
    ),
  );

  final result = await gateway.start(mode: MasterySessionMode.mainFocus);

  expect(result, isA<FocusMasteryPlanReady>());
  expect(coordinator.lastRecentDecisionFingerprints, isNotEmpty);
  expect(coordinator.lastRecentVisibleFingerprints, hasLength(1));
  expect(
    coordinator.lastRecentVisibleFingerprints.single.finalVisibleTurnHashes,
    isNotEmpty,
  );
});
```

Use the local helper/fake patterns already present in the file. If helper names differ, add the minimal fake fields to the existing fake coordinator; do not create a second gateway path.

- [ ] **Step 8: Extend A1 coordinator signatures**

Modify `packages/learning_core/lib/src/focus_coordinator.dart`:

```dart
MasteryFocusPlanResult createA1ConversationArcFocusPlan({
  List<String> completedEvidenceTargetIds = const [],
  MasteryMemoryGraphState? memoryGraph,
  List<String> recentDecisionFingerprints = const [],
  List<LearnerVisibleLessonFingerprint> recentVisibleFingerprints = const [],
  String? preferredFamilyId,
  LessonDepthPolicy depthPolicy = LessonDepthPolicy.focusDefault,
}) {
  final selection = selectA1ConversationArcCandidate(
    completedEvidenceTargetIds: completedEvidenceTargetIds,
    memoryGraph: memoryGraph,
    recentDecisionFingerprints: recentDecisionFingerprints,
    recentVisibleFingerprints: recentVisibleFingerprints,
    preferredFamilyId: preferredFamilyId,
    depthPolicy: depthPolicy,
  );
  ...
}
```

Apply the same parameter to `selectA1ConversationArcCandidate`. Preserve existing call sites by defaulting to `const []`.

- [ ] **Step 9: Build candidate previews from actual materialized threads**

In `packages/learning_core/lib/src/focus_coordinator.dart`, add a private helper near `_visibleFingerprintForA1ArcSelection`:

```dart
A1CandidateVisiblePreview _a1CandidateVisiblePreview({
  required String familyId,
  required String arcId,
  required A1ConversationMaturityLevel maturity,
  required A1BoundConversationThread thread,
  required A1TargetBundle? targetBundle,
  required A1LessonCompositionScore compositionScore,
}) {
  final finalTurns = [
    for (final turn in thread.turns) '${turn.speaker.name}:${turn.text}',
  ];
  final finalTurnHashes = [
    for (final turn in finalTurns)
      LearnerVisibleLessonFingerprint.hashVisibleText(turn),
  ];
  final tutorTurns = thread.turns.where(
    (turn) => turn.speaker == A1ConversationSpeaker.tutor,
  );
  final learnerTurns = thread.turns.where(
    (turn) => turn.speaker == A1ConversationSpeaker.learner,
  );
  return A1CandidateVisiblePreview(
    familyId: familyId,
    arcId: arcId,
    maturityLevel: maturity.name,
    rung: targetBundle?.rung.name ?? 'firstContact',
    openingTutorSurface: tutorTurns.isEmpty ? '' : tutorTurns.first.text,
    firstLearnerSurface: learnerTurns.isEmpty ? '' : learnerTurns.first.text,
    finalVisibleTurns: finalTurns,
    finalVisibleTurnHashes: finalTurnHashes,
    visibleTranscriptHash:
        A1VisibleItineraryContext.hashVisibleTranscript(finalTurnHashes),
    targetClassShape: [
      for (final targetId in thread.evidenceTargetIds) _a1TargetClass(targetId),
    ],
    supportTargetIds: targetBundle?.supportTargetIds ?? const [],
    supportSurfaceTargetIds:
        targetBundle?.supportConcreteTargetIds.isNotEmpty == true
            ? targetBundle!.supportConcreteTargetIds
            : targetBundle?.supportTargetIds ?? const [],
    growthTargetIds: targetBundle?.growthTargetIds ?? const [],
    growthSurfaceTargetIds:
        targetBundle?.growthConcreteTargetIds.isNotEmpty == true
            ? targetBundle!.growthConcreteTargetIds
            : targetBundle?.growthTargetIds ?? const [],
    refreshTargetIds: targetBundle?.refreshTargetIds ?? const [],
    growthSource: targetBundle?.growthSource ?? 'none',
    routeCooldownState: targetBundle?.routeCooldownState ?? 'available',
    compositionScoreTerms: compositionScore.scoreTerms,
    bundleTrace: targetBundle?.trace ?? const [],
  );
}
```

This helper must use the final `thread` after `_a1ThreadMaterializingTargetBundle`, not `rawThread`.

- [ ] **Step 10: Replace first-selectable return with score-and-rank selection**

In `selectA1ConversationArcCandidate`, create:

```dart
final itineraryContext = A1VisibleItineraryContext.fromFingerprints(
  recentVisibleFingerprints: recentVisibleFingerprints,
  recentDecisionFingerprints: recentDecisionFingerprints,
);
final selectable = <_A1SelectableArcCandidate>[];
final itineraryRejections = <String>[];
```

Add a private file-scope helper class near `A1ConversationArcCandidateSelection`:

```dart
final class _A1SelectableArcCandidate {
  const _A1SelectableArcCandidate({
    required this.selection,
    required this.preview,
    required this.score,
  });

  final A1ConversationArcCandidateSelection selection;
  final A1CandidateVisiblePreview preview;
  final A1VisibleItineraryScore score;
}
```

Instead of returning immediately after `compositionScore.isSelectable`, build `preview`, score it, and add only selectable itinerary candidates:

```dart
final preview = _a1CandidateVisiblePreview(
  familyId: familyId,
  arcId: arcId,
  maturity: maturity,
  thread: thread,
  targetBundle: targetBundle,
  compositionScore: compositionScore,
);
final itineraryScore = A1VisibleItineraryScorer(
  policy: A1ProgressionPolicy.defaultPolicy,
).score(preview: preview, context: itineraryContext);
if (!itineraryScore.isSelectable) {
  rejectedCandidateReasons
      .putIfAbsent(familyId, () => <String>[])
      .add('${itineraryScore.blockerCode}:$arcId');
  itineraryRejections.addAll(itineraryScore.trace);
  continue;
}
selectable.add(
  _A1SelectableArcCandidate(
    selection: A1ConversationArcCandidateSelection(
      familyId: familyId,
      arcId: arcId,
      maturityLevel: maturity,
      memoryInfluenceReason: 'proofs=$memoryProofCount; '
          '${surfaceAwareDecision.summary}; '
          'depth=${depthPolicy.id}; requested=${depthPolicy.targetExchanges}; '
          'selected $familyId/$arcId at ${maturity.name}',
      surfaceAwareMemoryTrace: [
        ...surfaceAwareDecision.trace,
        ...itineraryScore.trace,
        for (final entry in rejectedCandidateReasons.entries)
          for (final reason in entry.value) reason,
        if (targetBundle != null) ...targetBundle.trace,
        if (targetBundle != null)
          'coordinatorPolicy.growth_source:${targetBundle.growthSource}',
        'coordinatorPolicy.a1_composition_score_consumed',
        'itinerary.score:${itineraryScore.score}',
      ],
      visibleDecisionFingerprint: preview.visibleTranscriptHash,
      boundThread: thread,
    ),
    preview: preview,
    score: itineraryScore,
  ),
);
```

After all candidates have been inspected:

```dart
if (selectable.isNotEmpty) {
  selectable.sort((left, right) => right.score.score.compareTo(left.score.score));
  return selectable.first.selection;
}
```

If there are no selectable candidates, throw `FocusCoordinatorSelectionException` with `noNonRepeatingVisibleStart` and include `itinerary.no_diverse_candidate_after_scoring` plus `itineraryRejections` in `rejectedCandidateReasons`.

Keep existing readiness/composition rejections before itinerary scoring. Itinerary scoring should not make invalid bound lessons selectable.

- [ ] **Step 11: Feed recent support history into support rotation**

Modify `packages/learning_core/lib/src/a1_target_bundle.dart` so `A1TargetBundlePlanner.build` accepts:

```dart
List<String> recentSupportSurfaceTargetIds = const [],
```

Pass this into `_buildBundle`, then into `A1SupportRotationPlanner.select`:

```dart
recentSupportSurfaceIds: recentSupportSurfaceTargetIds,
```

In `FocusCoordinator.selectA1ConversationArcCandidate`, build target bundles with itinerary context:

```dart
final targetBundles = coordinatorProfile == null
    ? const <A1TargetBundle>[]
    : A1TargetBundlePlanner(
        policy: A1ProgressionPolicy.defaultPolicy,
      ).build(
        coordinatorProfile,
        recentSupportSurfaceTargetIds:
            itineraryContext.recentSupportSurfaceTargetIds.toList(),
      );
```

If no visible fingerprint exists but recent A1 decision strings exist, add trace `supportRotation.no_recent_support_context` and continue with an empty list. Do not block normal Focus solely because old signatures lack support ids.

- [ ] **Step 12: Update coordinator candidate tests**

Modify `packages/learning_core/test/focus_coordinator_arc_candidate_test.dart`:

Add a test that creates a first A1 plan, passes `recentVisibleFingerprints: [first.selectionSignature.visibleFingerprint]`, and verifies the second selected plan does not have the same final turn hash sequence.

```dart
test('A1 selection rejects exact recent visible transcript repeats', () {
  final coordinator = FocusCoordinator();
  final first = coordinator.createA1ConversationArcFocusPlan();
  final second = coordinator.createA1ConversationArcFocusPlan(
    recentVisibleFingerprints: [first.selectionSignature.visibleFingerprint],
    recentDecisionFingerprints: [
      first.selectionSignature.a1ConversationDecisionFingerprint!,
    ],
  );

  expect(
    second.selectionSignature.visibleFingerprint.finalVisibleTurnHashes,
    isNot(first.selectionSignature.visibleFingerprint.finalVisibleTurnHashes),
  );
  expect(
    second.plan.trace.robustFocusReasons,
    anyElement(startsWith('itinerary.')),
  );
});
```

If the current catalog cannot produce a visibly different candidate, the expected result should be a `FocusCoordinatorSelectionException` containing `itinerary.no_diverse_candidate_after_scoring`. Do not allow exact repeat as a passing fallback.

- [ ] **Step 13: Harden perceived diversity audit**

Modify `apps/mobile/test/a1_focus_perceived_diversity_audit_test.dart` so exact repeats fail normal Focus instead of passing as an owned diagnosis.

Add an assertion after rows are produced:

```dart
expect(
  result.rows.skip(1),
  everyElement(
    predicate<_PerceivedDiversityRow>(
      (row) => row.diagnosisCode != 'coordinatorPolicy.exact_visible_repeat',
      'normal A1 Focus must not render exact recent visible repeats',
    ),
  ),
  reason: result.toMarkdown(),
);
```

Keep the owned-diagnosis reporting for non-exact same-feeling rows. Exact transcript repeat is no longer acceptable unless a future explicit refresh mode is added.

- [ ] **Step 14: Expand 12-lesson route-growth report with itinerary scoring**

Modify `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart` so every row prints:

```text
itineraryScore
itineraryTrace
visibleTranscriptHash
supportSurfaceTargetIds
growthSurfaceTargetIds
exactRepeatRejectedCount
selectedCandidateReason
```

Extract these from `plan.trace.robustFocusReasons` and `selectionSignature.visibleFingerprint`.

The report must show the final conversation transcript and enough score trace to answer why the coordinator preferred that route over recent alternatives.

- [ ] **Step 15: Run focused 16G regression suite**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_visible_itinerary_test.dart \
  test/focus_coordinator_arc_candidate_test.dart \
  test/a1_target_bundle_test.dart \
  -r expanded

cd ../../apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/focus_mastery_plan_gateway_test.dart \
  test/a1_focus_perceived_diversity_audit_test.dart \
  test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  --concurrency=1 \
  -r expanded
```

Expected: PASS. The perceived diversity audit must fail if exact visible repeats appear. The route-growth audit must either render 12 rows with no exact transcript repeats or stop with a precise owner that is not hidden-only novelty.

- [ ] **Step 16: Hot reload or restart the web session for UI checkpoint**

If the app server is running on `http://127.0.0.1:7363/`, hot reload if the terminal session is available. If no terminal session is attached, restart the normal web server and reopen `http://127.0.0.1:7363/`.

Manual UI checkpoint:

- complete one A1 Focus lesson;
- press Start Focus again;
- verify the next lesson is not an exact final conversation repeat;
- if it blocks, record the precise owner shown by the backend test report;
- if it renders, compare the first two final conversations and report whether family, route, support, growth, or transcript shape changed.

- [ ] **Step 17: Update Task 17 handoff based on Task 16G result**

Before continuing:

- If Task 16G passes and the 12-lesson report shows no exact visible repeats, proceed to Task 17.
- If Task 16G selects a visibly diverse candidate but the route cannot materialize support/growth, proceed to Task 17 with the exact `arcCoverage` route ids and target ids from the score trace.
- If Task 16G repeatedly downranks all candidates because support surfaces cannot rotate, repair Task 16G support-history plumbing before proceeding.
- If Task 16G still allows exact transcript repeats, stop and repair the itinerary scorer or gateway recent-visible context. Do not proceed to Task 17.
- If Task 16G stops with `metadataReadiness`, `compilerMaterialization`, or `arcCoherence`, compare against Tasks 19, 21, and 22. If the blocker is exactly covered, proceed to that owner task; otherwise update the plan before continuing.

- [ ] **Step 18: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_visible_itinerary.dart \
  packages/learning_core/lib/src/a1_progression_policy.dart \
  packages/learning_core/lib/src/a1_target_bundle.dart \
  packages/learning_core/lib/src/focus_coordinator.dart \
  packages/learning_core/lib/src/learner_visible_lesson_fingerprint.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_visible_itinerary_test.dart \
  packages/learning_core/test/focus_coordinator_arc_candidate_test.dart \
  apps/mobile/lib/features/practice/focus_mastery_plan_gateway.dart \
  apps/mobile/test/focus_mastery_plan_gateway_test.dart \
  apps/mobile/test/a1_focus_perceived_diversity_audit_test.dart \
  apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md
git commit -m "feat: add A1 visible itinerary scoring"
```

## Task 16G Gate

If Task 16G passes and the 12-lesson report shows no exact final conversation repeats, proceed to Task 17.

If Task 16G proves that the coordinator can score and prefer visibly different candidates but the route catalog cannot materialize the preferred movement, Task 17 becomes the next active owner and must use the candidate preview and score trace as its input.

If Task 16G proves that gateway recent visible fingerprints are missing or unreadable, repair the gateway/signature path before route capability work.

If Task 16G proves that support rotation still receives no recent support context, repair the target bundle planner before route capability work.

If Task 16G still permits hidden-only novelty as a selected candidate, do not proceed. The coordinator is still not operating in the product shape required by this spec.

## Task 17: Route Capability Registry Foundation

**Purpose:** Make the generator truthfully advertise what each island/route can actually build, prove those claims against production instantiation, and prevent the coordinator from selecting routes that can only tag targets, require future form/coherence/compiler work, or cannot visibly materialize the requested memory-led bundle.

**Task 16C/16D/16E dependency:** Route capability must describe whether a route can materialize memory growth and metadata-sourced growth only after canonical proof contract alignment proves the same proof targets survive compiler, UI completion, memory, rollups, progress, and next-start profile, and after the A1 catalog slot pools are aligned with production metadata reachability. A route is not production-ready if it only works for growth targets already present in memory, if the UI evidence loop replaces canonical proof targets with concrete detail targets, or if its slot values come from private catalog constants that cannot reach production metadata.

**Task 16F/16G dependency:** Route capability must consume the route-specific bundle contract and visible itinerary scoring evidence. Task 16G proved that exact visible repeats are now blocked, but the 12-lesson report still shows bad forms, weak coherence, and route shells that technically render while failing the intended learner-visible product shape. Task 17 must therefore distinguish "route exists," "route tags targets," "route visibly materializes targets," "route needs verified forms," "route needs coherence," and "route needs compiler-stage proof." A shallow `capabilityFor(arcId)` registry is not sufficient.

**Audit finding addressed:** `sharedSurface.route_capability_registry_missing`, `arcCoverage.rung_unavailable`, `arcCoverage.only_one_route_available`.

**Remediation Decision Record:**

```text
productFailure: coordinator may have a good target bundle but no route that can produce a different coherent lesson shape
firstFailingLayer: arc generator capability
evidence: audit says production arcs exist but capabilities are inferred rather than declared globally; 12-lesson reports show routes can render while still failing visible materialization, form safety, or coherence
selectedRepair: add a route-keyed capability registry, materialization proof helper, and coordinator eligibility gate
whyThisRepairFirst: coordinator target bundles need route capability before route selection can be deterministic
productionBehaviorChanged: FocusCoordinator filters candidate routes by route key, capability status, materialization mode, rung, target role, and upgrade axis before normal Focus generation
backendProof: route capability audit fails if a production route lacks registry coverage or if a registry claim cannot be proven by production instantiation
uiProductCheckpoint: limited visible change until Task 18 promotes a minimally coherent priority route set and Task 19/20 provide verified metadata/forms
remainingOwnedBlocker: arcCoverage owns routes that are present but not production-ready for progression; formReadiness, arcCoherence, and compilerMaterialization own pending downstream dependencies
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_route_capability_registry.dart`
- Create: `packages/learning_core/lib/src/a1_route_materialization_proof.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`
- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/test/a1_arc_capability_audit_test.dart`
- Modify: `packages/learning_core/test/focus_coordinator_arc_candidate_test.dart`
- Modify: `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart`

- [x] **Step 1: Write failing route-keyed registry coverage tests**

Update `packages/learning_core/test/a1_arc_capability_audit_test.dart`:

```dart
test('every production A1 family and arc pair has a route capability row', () {
  final catalog = A1ConversationArcCatalog.initial();
  final registry = A1RouteCapabilityRegistry.initial();

  for (final profile in catalog.primaryFamilyProfiles) {
    for (final arcId in profile.supportedArcIds) {
      final arc = catalog.arcById(arcId);
      if (!arc.supportedPrimaryFamilyIds.contains(profile.clusterId)) continue;

      final routeKey = A1RouteCapabilityKey(
        familyId: profile.clusterId,
        arcId: arcId,
        rung: A1ProgressionRung.firstContact,
        upgradeAxis: 'first_contact',
      );

      expect(
        registry.capabilityFor(routeKey),
        isNotNull,
        reason:
            '${profile.clusterId}/$arcId must be represented in the route capability registry',
      );
    }
  }
});

test('arc id alone is not a sufficient capability key', () {
  final registry = A1RouteCapabilityRegistry.initial();

  expect(
    () => registry.capabilityForArcOnly('activity_time_arc'),
    throwsUnsupportedError,
    reason:
        'Task 17 must prevent consumers from treating an arc id as globally capable across every island',
  );
});
```

Add a separate assertion that every capability row has explicit status and materialization mode:

```dart
test('capability rows declare production status and materialization mode', () {
  final registry = A1RouteCapabilityRegistry.initial();

  for (final capability in registry.capabilities) {
    expect(capability.status, isNot(A1RouteCapabilityStatus.unspecified));
    expect(
      capability.materializationMode,
      isNot(A1RouteMaterializationMode.unspecified),
    );
  }
});
```

- [x] **Step 2: Write failing materialization proof tests**

In `packages/learning_core/test/a1_arc_capability_audit_test.dart`, add tests that prove a registry claim is not accepted unless production instantiation visibly supports it.

```dart
test('production-ready support-growth route visibly materializes claimed targets', () {
  final catalog = A1ConversationArcCatalog.initial();
  final registry = A1RouteCapabilityRegistry.initial();
  final proof = A1RouteMaterializationProofRunner(
    catalog: catalog,
    registry: registry,
  );

  final result = proof.prove(
    routeKey: const A1RouteCapabilityKey(
      familyId: 'daily_activities',
      arcId: 'activity_time_arc',
      rung: A1ProgressionRung.revisitSupport,
      upgradeAxis: 'tense_aspect_shift',
    ),
    supportTargetIds: ['daily.activity'],
    growthTargetIds: ['daily.activity.future'],
    refreshTargetIds: const [],
  );

  if (result.capability.status == A1RouteCapabilityStatus.productionReady) {
    expect(
      result.visibleGrowthTargetIds,
      contains('daily.activity.future'),
      reason:
          'production-ready routes must visibly surface claimed growth targets, not only attach ids',
    );
    expect(result.blockerCodes, isEmpty);
  } else {
    expect(
      result.blockerCodes,
      isNotEmpty,
      reason:
          'pending routes must name why they are not production-ready instead of silently passing',
    );
  }
});
```

- [x] **Step 3: Run and verify failures**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_arc_capability_audit_test.dart
```

Expected: FAIL because `A1RouteCapabilityRegistry`, route-keyed lookup, capability status, materialization mode, and `A1RouteMaterializationProofRunner` are missing.

- [x] **Step 4: Implement route-keyed registry model**

Create `packages/learning_core/lib/src/a1_route_capability_registry.dart` with:

```dart
import 'a1_memory_led_progression_audit.dart';

enum A1RouteCapabilityStatus {
  unspecified,
  productionReady,
  pendingFormReadiness,
  pendingCoherence,
  pendingCompilerPreflight,
  targetIdsOnly,
  unsupported,
}

enum A1RouteMaterializationMode {
  unspecified,
  targetIdsOnly,
  surfaceMaterialized,
  formMaterialized,
  compilerMaterialized,
}

final class A1RouteCapabilityKey {
  const A1RouteCapabilityKey({
    required this.familyId,
    required this.arcId,
    required this.rung,
    required this.upgradeAxis,
  });

  final String familyId;
  final String arcId;
  final A1ProgressionRung rung;
  final String upgradeAxis;
}

final class A1RouteCapability {
  const A1RouteCapability({
    required this.key,
    required this.status,
    required this.materializationMode,
    required this.arcId,
    required this.supportedRungs,
    required this.supportedUpgradeAxes,
    required this.supportedTargetRoles,
    required this.requiredMetadataKeys,
    required this.requiredVerifiedFormKeys,
    required this.requiredCompilerStageIds,
    required this.requiredCoherenceRelationIds,
    required this.ownerBlockerCode,
  });

  final A1RouteCapabilityKey key;
  final A1RouteCapabilityStatus status;
  final A1RouteMaterializationMode materializationMode;
  final String arcId;
  final List<A1ProgressionRung> supportedRungs;
  final List<String> supportedUpgradeAxes;
  final List<String> supportedTargetRoles;
  final List<String> requiredMetadataKeys;
  final List<String> requiredVerifiedFormKeys;
  final List<String> requiredCompilerStageIds;
  final List<String> requiredCoherenceRelationIds;
  final String ownerBlockerCode;

  bool supports({
    required String familyId,
    required A1ProgressionRung rung,
    required String upgradeAxis,
    required String targetRole,
  }) {
    return key.familyId == familyId &&
        supportedRungs.contains(rung) &&
        supportedTargetRoles.contains(targetRole) &&
        (supportedUpgradeAxes.contains(upgradeAxis) ||
            supportedUpgradeAxes.contains('support_growth'));
  }

  bool get selectableInNormalFocus {
    return status == A1RouteCapabilityStatus.productionReady &&
        materializationMode != A1RouteMaterializationMode.targetIdsOnly;
  }
}

final class A1RouteCapabilityRegistry {
  const A1RouteCapabilityRegistry({required this.capabilities});

  factory A1RouteCapabilityRegistry.initial() {
    return const A1RouteCapabilityRegistry(
      capabilities: [
        A1RouteCapability(
          key: A1RouteCapabilityKey(
            familyId: 'daily_activities',
            arcId: 'direct_answer_detail_arc',
            rung: A1ProgressionRung.firstContact,
            upgradeAxis: 'first_contact',
          ),
          status: A1RouteCapabilityStatus.productionReady,
          materializationMode: A1RouteMaterializationMode.surfaceMaterialized,
          arcId: 'direct_answer_detail_arc',
          supportedRungs: [
            A1ProgressionRung.firstContact,
          ],
          supportedUpgradeAxes: ['first_contact'],
          supportedTargetRoles: [
            'tutor_question_support',
            'learner_answer_growth',
          ],
          requiredMetadataKeys: ['definition', 'surface'],
          requiredVerifiedFormKeys: const [],
          requiredCompilerStageIds: const [],
          requiredCoherenceRelationIds: ['direct_answer_relation'],
          ownerBlockerCode: '',
        ),
        A1RouteCapability(
          key: A1RouteCapabilityKey(
            familyId: 'daily_activities',
            arcId: 'activity_time_arc',
            rung: A1ProgressionRung.revisitSupport,
            upgradeAxis: 'tense_aspect_shift',
          ),
          status: A1RouteCapabilityStatus.pendingFormReadiness,
          materializationMode: A1RouteMaterializationMode.targetIdsOnly,
          arcId: 'activity_time_arc',
          supportedRungs: [
            A1ProgressionRung.revisitSupport,
          ],
          supportedUpgradeAxes: ['support_growth', 'tense_aspect_shift'],
          supportedTargetRoles: [
            'learner_answer_support',
            'learner_answer_growth',
          ],
          requiredMetadataKeys: ['definition', 'surface'],
          requiredVerifiedFormKeys: ['daily.activity.future.first_person'],
          requiredCompilerStageIds: const [],
          requiredCoherenceRelationIds: ['activity_time_relation'],
          ownerBlockerCode: 'formReadiness.verified_form_required',
        ),
        A1RouteCapability(
          key: A1RouteCapabilityKey(
            familyId: 'preferences_opinions',
            arcId: 'preference_alternative_arc',
            rung: A1ProgressionRung.revisitSupport,
            upgradeAxis: 'choice_contrast',
          ),
          status: A1RouteCapabilityStatus.pendingCoherence,
          materializationMode: A1RouteMaterializationMode.surfaceMaterialized,
          arcId: 'preference_alternative_arc',
          supportedRungs: [
            A1ProgressionRung.revisitSupport,
            A1ProgressionRung.slotVariation,
          ],
          supportedUpgradeAxes: ['support_growth', 'choice_contrast'],
          supportedTargetRoles: [
            'tutor_question_support',
            'learner_answer_support',
            'learner_answer_growth',
            'optional_choice_target',
          ],
          requiredMetadataKeys: ['definition', 'surface', 'choice'],
          requiredVerifiedFormKeys: const [],
          requiredCompilerStageIds: const [],
          requiredCoherenceRelationIds: ['preference_choice_relation'],
          ownerBlockerCode: 'arcCoherence.required_relation_missing',
        ),
      ],
    );
  }

  final List<A1RouteCapability> capabilities;

  A1RouteCapability? capabilityFor(A1RouteCapabilityKey key) {
    for (final capability in capabilities) {
      if (capability.key.familyId == key.familyId &&
          capability.key.arcId == key.arcId &&
          capability.key.rung == key.rung &&
          capability.key.upgradeAxis == key.upgradeAxis) {
        return capability;
      }
    }
    return null;
  }

  A1RouteCapability capabilityForArcOnly(String arcId) {
    throw UnsupportedError(
      'Route capability is keyed by familyId, arcId, rung, and upgradeAxis; arcId=$arcId is insufficient.',
    );
  }
}
```

Add initial entries for every production `familyId + arcId` pair from `A1ConversationArcCatalog.initial()`. Mark only proven capabilities. If a route can only tag targets or requires future form/coherence/compiler work, mark it `targetIdsOnly`, `pendingFormReadiness`, `pendingCoherence`, or `pendingCompilerPreflight`; do not mark it `productionReady`.

- [x] **Step 5: Implement route materialization proof helper**

Create `packages/learning_core/lib/src/a1_route_materialization_proof.dart`.

The helper must:

- accept an `A1RouteCapabilityKey`, support target ids, growth target ids, and refresh target ids;
- instantiate the route through the same catalog/instantiator path normal Focus uses, not a test-only fixture;
- compare requested target ids against `A1BoundConversationThread.evidenceTargetIds`, `progressTargetIds`, and learner-visible transcript turns;
- report `visibleSupportTargetIds`, `visibleGrowthTargetIds`, `visibleRefreshTargetIds`, `taggedOnlyTargetIds`, and `blockerCodes`;
- add `arcCoverage.surface_materialization_missing` when a route claims visible materialization but the target is only tagged or absent;
- add `formReadiness.verified_form_required` when the capability requires verified form keys that Task 19 has not provided;
- add `arcCoherence.required_relation_missing` when the capability requires coherence relation ids that Task 22 has not provided;
- add `compilerMaterialization.stage_missing` when the capability claims compiler materialization without stage proof.

The proof helper should be intentionally small in Task 17. It does not need to solve form or coherence yet; it must tell the truth about which downstream owner is blocking production readiness.

- [x] **Step 6: Export registry and proof helper**

Add:

```dart
export 'src/a1_route_capability_registry.dart';
export 'src/a1_route_materialization_proof.dart';
```

to `packages/learning_core/lib/learning_core.dart`.

- [x] **Step 7: Update arc audit to read registry and proof helper**

In `A1ArcCapabilityAudit.run()`, use `A1RouteCapabilityRegistry.initial()` instead of inferring rungs from family profiles. The audit must report route-keyed rows with:

- `familyId`
- `arcId`
- `rung`
- `upgradeAxis`
- `status`
- `materializationMode`
- `supportedTargetRoles`
- `requiredMetadataKeys`
- `requiredVerifiedFormKeys`
- `requiredCompilerStageIds`
- `requiredCoherenceRelationIds`
- `ownerBlockerCode`
- proof result summary

Return exact blockers:

- `arcCoverage.family_arc_unregistered`
- `arcCoverage.route_key_unregistered`
- `arcCoverage.rung_unavailable`
- `arcCoverage.growth_role_unavailable`
- `arcCoverage.surface_materialization_missing`
- `arcCoverage.no_production_ready_route_for_growth_bundle`
- `formReadiness.verified_form_required`
- `arcCoherence.required_relation_missing`
- `compilerMaterialization.stage_missing`

- [x] **Step 8: Gate coordinator route selection on production-ready capability**

In `packages/learning_core/lib/src/focus_coordinator.dart`, update candidate generation before route instantiation:

- Build route capability keys from the route-specific bundle, family id, arc id, intended rung, and primary upgrade axis.
- Ask `A1RouteCapabilityRegistry` whether the route is selectable in normal Focus.
- Skip or block routes that are `targetIdsOnly`, `pendingFormReadiness`, `pendingCoherence`, `pendingCompilerPreflight`, or `unsupported`.
- If no production-ready route can satisfy the support/growth/refresh bundle, return a precise `arcCoverage.no_production_ready_route_for_growth_bundle` blocker with the rejected route keys and first downstream owner.
- Preserve Task 16G visible itinerary scoring for routes that pass this eligibility gate.

Do not use route capability to weaken support/growth requirements. If a route cannot carry the bundle, the repair path is route capability, metadata readiness, forms, compiler, or coherence, not a silent fallback to a smaller lesson.

- [x] **Step 9: Add coordinator blocker regression tests**

In `packages/learning_core/test/focus_coordinator_arc_candidate_test.dart`, add tests:

```dart
test('normal Focus does not select pending route capability', () {
  // Seed a support-growth bundle that only a pending route could satisfy.
  // Expected: owned arcCoverage blocker, not a rendered hardline A1 lesson.
});

test('normal Focus reports route capability owner instead of generic no-candidate blocker', () {
  // Seed viable memory and inventory growth, then make route capability unavailable.
  // Expected blocker: arcCoverage.no_production_ready_route_for_growth_bundle.
});
```

These tests should use the production coordinator path. Do not add a test-only bypass that marks a pending route production-ready.

- [x] **Step 10: Connect 12-lesson audit output to capability findings**

In `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart`, print route capability evidence for each lesson candidate:

- selected route key;
- capability status;
- materialization mode;
- support/growth/refresh target ids requested;
- support/growth/refresh target ids visibly materialized;
- rejected route capability reasons;
- first downstream owner when route capability blocks.

The report should make it clear whether a same-feeling or blocked lesson is caused by route scarcity, target-id-only materialization, form readiness, coherence, compiler materialization, or coordinator scoring.

- [x] **Step 11: Verify**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_arc_capability_audit_test.dart \
  test/focus_coordinator_arc_candidate_test.dart

cd ../../apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  --concurrency=1 -r expanded
```

Expected: PASS. The route capability audit must show route-keyed status/materialization rows. Coordinator tests must prove pending or target-id-only routes do not render normal Focus lessons. The 12-lesson audit must report route capability findings separately from form, coherence, compiler, and coordinator scoring findings.

- [x] **Step 12: Task 17 exit decision**

Review the route capability and 12-lesson reports before continuing:

- If exact visible repeats returned, stop and repair Task 16G.
- If support/growth bundles exist but every route is `targetIdsOnly` or pending, continue to Task 18 only after the report names the route key, missing rung/axis/role, and first downstream owner for the priority route set.
- If bad forms are the first blocker, continue to Task 19/20 with exact verified form keys.
- If compiler stages cannot carry materialized route targets, continue to Task 21 with exact stage ids.
- If incoherent turns are the first blocker, continue to Task 22 with exact coherence relation ids.
- If a route is marked production-ready but the proof helper shows missing visible targets, repair Task 17 before continuing.

- [x] **Step 13: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_route_capability_registry.dart \
  packages/learning_core/lib/src/a1_route_materialization_proof.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/lib/src/focus_coordinator.dart \
  packages/learning_core/test/a1_arc_capability_audit_test.dart \
  packages/learning_core/test/focus_coordinator_arc_candidate_test.dart \
  apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart
git commit -m "feat: add A1 route capability registry"
```

## Task 17B: Thought Depth Capability Contract Extension

**Purpose:** Future-proof the completed Task 17 route capability registry so routes can later support connected thought growth without hard-coded generator string stitching.

**Task 17 dependency:** Task 17 already created `A1RouteCapabilityKey`, `A1RouteCapability`, `A1RouteCapabilityStatus`, materialization modes, route-keyed lookup, proof helpers, and coordinator eligibility gates. Task 17B must extend that same shared route capability surface. Do not create a separate thought-depth registry that the coordinator, generator, and audits can drift away from.

**Audit finding addressed:** future product gap where a route can be production-ready for a short direct answer but has no truthful way to declare whether it supports answer detail, reason, sequence, contrast, choice, ask-back, or multi-sentence response depth.

**Remediation Decision Record:**

```text
productFailure: the app can eventually need longer human-like responses, but current route capability only describes shallow route/rung/axis support
firstFailingLayer: arcCoverage capability contract
evidence: Task 17 route capability has rungs and upgrade axes but no explicit thought-depth rungs, thought operations, connector dependencies, clause budget, or owned thought-depth blockers
selectedRepair: extend A1RouteCapability with thought-depth and thought-operation declarations before Tasks 18-22 depend on route readiness
whyThisRepairFirst: later metadata/coherence/compiler work should know whether a route is blocked for thought depth instead of discovering the gap in the generator
productionBehaviorChanged: no immediate learner-visible change; audits and selection can distinguish direct-answer readiness from future thought-depth readiness
backendProof: route capability tests prove routes can be direct-answer ready while reason/sequence/multi-sentence thought depth remains exactly blocked
uiProductCheckpoint: none expected yet; future UI checks should use these fields to explain why longer response growth is unavailable
remainingOwnedBlocker: Task 19/20 own verified metadata/forms/connectors; Task 21 owns compiler stages; Task 22 owns coherence preconditions; a future thought-depth implementation task owns long-response generation
```

**Files:**

- Modify: `packages/learning_core/lib/src/a1_route_capability_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_route_materialization_proof.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`
- Modify: `packages/learning_core/test/a1_arc_capability_audit_test.dart`
- Modify: `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart`

- [ ] **Step 1: Add failing thought-depth capability tests**

In `packages/learning_core/test/a1_arc_capability_audit_test.dart`, add:

```dart
test('direct-answer route readiness is separate from thought-depth readiness', () {
  final registry = A1RouteCapabilityRegistry.initial();
  final capability = registry.capabilityFor(const A1RouteCapabilityKey(
    familyId: 'daily_activities',
    arcId: 'activity_time_arc',
    rung: A1ProgressionRung.revisitSupport,
    upgradeAxis: 'support_growth',
  ));

  expect(capability, isNotNull);
  expect(
    capability!.supportedThoughtDepthRungs,
    contains(A1ThoughtDepthRung.directAnswer),
  );
  expect(
    capability.supportedThoughtDepthRungs,
    isNot(contains(A1ThoughtDepthRung.multiSentenceResponse)),
    reason:
        'current short route readiness must not imply future multi-sentence response readiness',
  );
  expect(
    capability.thoughtDepthBlockerFor(A1ThoughtDepthRung.multiSentenceResponse),
    'arcCoverage.thought_depth_rung_unavailable',
  );
});

test('reason thought depth requires connector and coherence dependencies', () {
  final registry = A1RouteCapabilityRegistry.initial();
  final stateReason = registry.capabilities.where((capability) =>
      capability.arcId == 'state_reason_arc' &&
      capability.supportedThoughtDepthRungs.contains(
        A1ThoughtDepthRung.answerWithReason,
      ));

  for (final capability in stateReason) {
    expect(capability.requiredThoughtConnectorTargetIds, contains('connector.reason.3ashan'));
    expect(capability.requiredThoughtCoherenceRelationIds, contains('reason_after_claim'));
    expect(
      capability.supportedThoughtOperations,
      contains(A1ThoughtOperation.addReason),
    );
  }
});
```

- [ ] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_arc_capability_audit_test.dart -r expanded
```

Expected: FAIL because `A1ThoughtDepthRung`, `A1ThoughtOperation`, thought-depth fields, and `thoughtDepthBlockerFor` do not exist.

- [ ] **Step 3: Add thought-depth enums to the route capability file**

In `packages/learning_core/lib/src/a1_route_capability_registry.dart`, add:

```dart
enum A1ThoughtDepthRung {
  directAnswer,
  answerWithDetail,
  answerWithContext,
  answerWithReason,
  answerWithDescriptionOrEvaluation,
  linkedTwoClauseThought,
  contrastOrChoice,
  multiSentenceResponse,
  askBackOrContinue,
}

enum A1ThoughtOperation {
  addObject,
  addAdjective,
  addIntensifier,
  addTime,
  addPlace,
  addReason,
  addSequence,
  addContrast,
  addChoice,
  addAskBack,
  changePronoun,
  changeTense,
  changeSubject,
}
```

- [ ] **Step 4: Extend A1RouteCapability**

Add these fields to `A1RouteCapability`:

```dart
required this.supportedThoughtDepthRungs,
required this.supportedThoughtOperations,
required this.requiredThoughtConnectorTargetIds,
required this.requiredThoughtBridgeRelationIds,
required this.requiredThoughtCoherenceRelationIds,
required this.maxLearnerResponseClauseCount,
```

and these public members:

```dart
final List<A1ThoughtDepthRung> supportedThoughtDepthRungs;
final List<A1ThoughtOperation> supportedThoughtOperations;
final List<String> requiredThoughtConnectorTargetIds;
final List<String> requiredThoughtBridgeRelationIds;
final List<String> requiredThoughtCoherenceRelationIds;
final int maxLearnerResponseClauseCount;

String thoughtDepthBlockerFor(A1ThoughtDepthRung rung) {
  if (supportedThoughtDepthRungs.contains(rung)) return '';
  return 'arcCoverage.thought_depth_rung_unavailable';
}
```

Every constructor call in `A1RouteCapabilityRegistry.initial()` must set these fields explicitly. Do not use nullable defaults that hide missing declarations.

- [ ] **Step 5: Populate current routes conservatively**

Update capability construction helpers:

- `_firstContactCapability` should advertise:
  - `supportedThoughtDepthRungs: [A1ThoughtDepthRung.directAnswer]`;
  - `supportedThoughtOperations: []`;
  - `maxLearnerResponseClauseCount: 1`.
- Current support-growth capability should advertise only the thought depth it can actually prove. For most current routes this is:
  - `directAnswer`;
  - sometimes `answerWithDetail` or `answerWithContext` when the final transcript visibly includes that relation.
- `state_reason_arc` may advertise `answerWithReason` only when it declares:
  - `requiredThoughtConnectorTargetIds: ['connector.reason.3ashan']`;
  - `requiredThoughtCoherenceRelationIds: ['reason_after_claim']`;
  - `supportedThoughtOperations: [A1ThoughtOperation.addReason]`.
- No current route should advertise `multiSentenceResponse` unless a production proof can show more than one learner response clause survives route instantiation and compiler materialization.

- [ ] **Step 6: Update materialization proof and audits**

Update `packages/learning_core/lib/src/a1_route_materialization_proof.dart` and `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart` so route rows include:

```text
supportedThoughtDepthRungs
supportedThoughtOperations
requiredThoughtConnectorTargetIds
requiredThoughtBridgeRelationIds
requiredThoughtCoherenceRelationIds
maxLearnerResponseClauseCount
thoughtDepthBlockers
```

The proof helper does not need to generate long responses in this task. It only needs to report that a requested thought rung is unsupported or unproven.

- [ ] **Step 7: Update 12-lesson audit output**

Update `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart` so the product report can later show why a route did not deepen the learner response. Add columns or trace fields for:

```text
thoughtDepth
thoughtOperations
thoughtDepthBlockers
maxLearnerResponseClauseCount
```

For now, most rows should show `directAnswer` or a shallow detail/context rung. That is acceptable; silent omission is not.

- [ ] **Step 8: Verify Task 17B**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_arc_capability_audit_test.dart -r expanded

cd ../../apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  --concurrency=1 -r expanded
```

Expected: PASS. The audit must prove that current direct-answer readiness does not imply reason, sequence, ask-back, or multi-sentence response readiness.

- [ ] **Step 9: Continue gate**

Before Task 18 implementation begins:

- If route capability rows do not expose thought-depth fields, do not proceed. Task 18 would be building route readiness on a shallow contract.
- If any current route advertises `multiSentenceResponse` without proof, revert that claim to an owned blocker.
- If `answerWithReason` is claimed without connector and coherence requirements, mark the route pending and continue to Task 22 for coherence.

- [ ] **Step 10: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_route_capability_registry.dart \
  packages/learning_core/lib/src/a1_route_materialization_proof.dart \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_arc_capability_audit_test.dart \
  apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md
git commit -m "feat: add A1 thought depth route contract"
```

## Task 18: Priority Route Set Readiness And Minimal Coherence Gate

**Purpose:** Promote a small, memory-led A1 route set toward production readiness while preventing obviously incoherent route candidates from being treated as ready.

**Task 16/17 dependency:** Task 18 must consume the route-specific growth bundles, visible itinerary scoring, route capability registry, route materialization proof helper, and thought-depth capability contract completed in Tasks 16F, 16G, 17, and 17B. Do not reintroduce preference-only route promotion, arc-id-only lookup, shallow route readiness, or local route exceptions. A route is eligible for normal Focus only when route capability and the Task 18 minimal coherence preflight both pass.

**Audit finding addressed:** `arcCoverage.support_blend_unavailable`, `arcCoverage.no_production_ready_route_for_growth_bundle`, `arcCoherence.entity_agreement_mismatch`, `arcCoherence.answer_relation_mismatch`, and route scarcity findings from the 12-lesson product audits.

**Remediation Decision Record:**

```text
productFailure: lessons can repeat a shell, promote a route that has only target ids, or sound incoherent even when memory asks for growth
firstFailingLayer: arcCoverage with minimal arcCoherence guard
evidence: Task 17 proves route keys exist, but route readiness still does not distinguish route scarcity from bad relation chains
selectedRepair: add priority route set readiness plus a minimal route coherence preflight consumed by coordinator and audits
whyThisRepairFirst: metadata/form repairs cannot prove product movement if the coordinator can still choose a route that is unready or logically broken
productionBehaviorChanged: normal Focus can select only route-keyed, minimally coherent priority route candidates or return an owned blocker
backendProof: route capability tests and 12-lesson audits show readiness/coherence reasons separately from metadata/form/compiler blockers
uiProductCheckpoint: learner should stop seeing promoted chains with mismatched person/entity references or possession/desire jumps without a bridge
remainingOwnedBlocker: Task 19/20 own missing metadata/forms; Task 21 owns full compiler materialization; Task 22 deepens coherence beyond this minimal gate
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_route_coherence_preflight.dart`
- Modify: `packages/learning_core/lib/src/a1_route_capability_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_route_materialization_proof.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`
- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Test: `packages/learning_core/test/a1_route_coherence_preflight_test.dart`
- Modify: `packages/learning_core/test/a1_arc_capability_audit_test.dart`
- Modify: `packages/learning_core/test/focus_coordinator_arc_candidate_test.dart`
- Modify: `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart`

- [x] **Step 1: Write failing minimal coherence preflight tests**

Create `packages/learning_core/test/a1_route_coherence_preflight_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1RouteCoherencePreflight', () {
    test('passes coherent activity time route', () {
      final result = const A1RouteCoherencePreflight().check(
        routeKey: const A1RouteCapabilityKey(
          familyId: 'daily_activities',
          arcId: 'activity_time_arc',
          rung: A1ProgressionRung.revisitSupport,
          upgradeAxis: 'time_context',
        ),
        turns: const [
          A1RouteCoherenceTurn(
            speaker: 'tutor',
            routeRole: 'question.activity_time',
            text: 'enta hate3mel eh bukra?',
            subjectId: 'pronoun.enta',
            relationId: 'activity_time_question',
            objectTargetIds: ['time.bukra'],
          ),
          A1RouteCoherenceTurn(
            speaker: 'learner',
            routeRole: 'answer.activity_time',
            text: 'ana hazaker bukra',
            subjectId: 'pronoun.ana',
            relationId: 'activity_time_answer',
            objectTargetIds: ['predicate.study', 'time.bukra'],
          ),
        ],
      );

      expect(result.isReady, isTrue);
      expect(result.findingCodes, isEmpty);
    });

    test('blocks entity agreement mismatch before route promotion', () {
      final result = const A1RouteCoherencePreflight().check(
        routeKey: const A1RouteCapabilityKey(
          familyId: 'people_relationships',
          arcId: 'person_reference_arc',
          rung: A1ProgressionRung.revisitSupport,
          upgradeAxis: 'person_reference',
        ),
        turns: const [
          A1RouteCoherenceTurn(
            speaker: 'learner',
            routeRole: 'answer.person_reference',
            text: 'da akhi',
            subjectId: 'person.my_brother',
            relationId: 'person_reference_introduction',
            grammaticalGender: 'masculine',
            objectTargetIds: ['person.brother'],
          ),
          A1RouteCoherenceTurn(
            speaker: 'tutor',
            routeRole: 'question.person_detail',
            text: 'heyya bet3mel eh?',
            subjectId: 'person.my_brother',
            relationId: 'person_detail_question',
            grammaticalGender: 'feminine',
            objectTargetIds: ['predicate.do'],
          ),
        ],
      );

      expect(result.isReady, isFalse);
      expect(result.findingCodes, contains('arcCoherence.entity_agreement_mismatch'));
    });

    test('blocks possession question answered as desire without bridge', () {
      final result = const A1RouteCoherencePreflight().check(
        routeKey: const A1RouteCapabilityKey(
          familyId: 'home_objects_possessions',
          arcId: 'request_detail_arc',
          rung: A1ProgressionRung.revisitSupport,
          upgradeAxis: 'object_slot_change',
        ),
        turns: const [
          A1RouteCoherenceTurn(
            speaker: 'tutor',
            routeRole: 'question.possession',
            text: 'enta 3andak gazma?',
            subjectId: 'pronoun.enta',
            relationId: 'possession_question',
            objectTargetIds: ['clothing.shoes'],
          ),
          A1RouteCoherenceTurn(
            speaker: 'learner',
            routeRole: 'answer.desire',
            text: 'ana 3ayiz gazma',
            subjectId: 'pronoun.ana',
            relationId: 'desire_answer',
            objectTargetIds: ['clothing.shoes'],
          ),
        ],
      );

      expect(result.isReady, isFalse);
      expect(result.findingCodes, contains('arcCoherence.answer_relation_mismatch'));
    });
  });
}
```

- [x] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_route_coherence_preflight_test.dart -r expanded
```

Expected: FAIL because `A1RouteCoherencePreflight` and `A1RouteCoherenceTurn` are not defined.

- [x] **Step 3: Implement minimal route coherence preflight model**

Create `packages/learning_core/lib/src/a1_route_coherence_preflight.dart` with these public types and checks:

```dart
import 'a1_route_capability_registry.dart';

final class A1RouteCoherenceTurn {
  const A1RouteCoherenceTurn({
    required this.speaker,
    required this.routeRole,
    required this.text,
    required this.subjectId,
    required this.relationId,
    required this.objectTargetIds,
    this.grammaticalGender = '',
    this.bridgeRelationIds = const [],
  });

  final String speaker;
  final String routeRole;
  final String text;
  final String subjectId;
  final String relationId;
  final List<String> objectTargetIds;
  final String grammaticalGender;
  final List<String> bridgeRelationIds;
}

final class A1RouteCoherencePreflightFinding {
  const A1RouteCoherencePreflightFinding({
    required this.code,
    required this.routeKeyId,
    required this.repairOwner,
    required this.repairAction,
  });

  final String code;
  final String routeKeyId;
  final String repairOwner;
  final String repairAction;
}

final class A1RouteCoherencePreflightResult {
  const A1RouteCoherencePreflightResult({
    required this.routeKey,
    required this.findings,
  });

  final A1RouteCapabilityKey routeKey;
  final List<A1RouteCoherencePreflightFinding> findings;

  bool get isReady => findings.isEmpty;
  List<String> get findingCodes => [
        for (final finding in findings) finding.code,
      ];
}

final class A1RouteCoherencePreflight {
  const A1RouteCoherencePreflight();

  A1RouteCoherencePreflightResult check({
    required A1RouteCapabilityKey routeKey,
    required List<A1RouteCoherenceTurn> turns,
  }) {
    final findings = <A1RouteCoherencePreflightFinding>[];
    findings.addAll(_entityAgreementFindings(routeKey, turns));
    findings.addAll(_questionAnswerRelationFindings(routeKey, turns));
    findings.addAll(_unsupportedReasonFindings(routeKey, turns));
    return A1RouteCoherencePreflightResult(
      routeKey: routeKey,
      findings: List.unmodifiable(findings),
    );
  }
}
```

Implement the private checks with deterministic rules:

- `person_reference_introduction` followed by `person_detail_question` for the same `subjectId` must keep the same non-empty `grammaticalGender`.
- `possession_question` followed by `desire_answer` must include bridge relation id `bridge.possession_to_desire`; without it, return `arcCoherence.answer_relation_mismatch`.
- `reason_question` must have an earlier turn whose `relationId` is one of `activity_time_answer`, `preference_answer`, `desire_answer`, or `possession_answer`; without it, return `arcCoherence.reason_without_prior_claim`.

- [x] **Step 4: Export the preflight**

Add this export to `packages/learning_core/lib/learning_core.dart`:

```dart
export 'src/a1_route_coherence_preflight.dart';
```

- [x] **Step 5: Verify minimal preflight passes**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_route_coherence_preflight_test.dart -r expanded
```

Expected: PASS. The pass must include one non-preference route and two negative cases.

- [x] **Step 6: Add priority route capability assertions**

In `packages/learning_core/test/a1_arc_capability_audit_test.dart`, add a test that checks all priority routes by route key:

```dart
test('priority route set has route-keyed readiness entries', () {
  final registry = A1RouteCapabilityRegistry.initial();
  final routeKeys = const [
    A1RouteCapabilityKey(
      familyId: 'daily_activities',
      arcId: 'activity_time_arc',
      rung: A1ProgressionRung.revisitSupport,
      upgradeAxis: 'time_context',
    ),
    A1RouteCapabilityKey(
      familyId: 'preferences_opinions',
      arcId: 'preference_alternative_arc',
      rung: A1ProgressionRung.revisitSupport,
      upgradeAxis: 'choice_contrast',
    ),
    A1RouteCapabilityKey(
      familyId: 'home_objects_possessions',
      arcId: 'request_detail_arc',
      rung: A1ProgressionRung.revisitSupport,
      upgradeAxis: 'object_slot_change',
    ),
    A1RouteCapabilityKey(
      familyId: 'people_relationships',
      arcId: 'person_reference_arc',
      rung: A1ProgressionRung.revisitSupport,
      upgradeAxis: 'person_reference',
    ),
  ];

  for (final routeKey in routeKeys) {
    final capability = registry.capabilityFor(routeKey);
    expect(capability, isNotNull, reason: routeKey.id);
    expect(
      capability!.status,
      isIn({
        A1RouteCapabilityStatus.productionReady,
        A1RouteCapabilityStatus.pendingFormReadiness,
        A1RouteCapabilityStatus.pendingCoherence,
        A1RouteCapabilityStatus.pendingCompilerPreflight,
      }),
      reason: routeKey.id,
    );
    expect(capability.materializationMode,
        isNot(A1RouteMaterializationMode.targetIdsOnly),
        reason: routeKey.id);
  }
});
```

- [x] **Step 7: Update route capability registry for priority set**

Modify `packages/learning_core/lib/src/a1_route_capability_registry.dart` so `A1RouteCapabilityRegistry.initial()` adds explicit support-growth entries for the priority route set. Each entry must include:

```dart
requiredMetadataKeys: const [
  'definition',
  'surface',
  'compiler.preflight_fields',
],
requiredCompilerStageIds: const [
  'goalConversation',
  'wordMatch',
  'roleBox',
  'boundedTyping',
  'finalConversation',
],
```

Use these readiness decisions:

- `daily_activities/activity_time_arc/time_context`: `productionReady` only if existing proof shows visible support and growth; otherwise `pendingFormReadiness` with `ownerBlockerCode: 'formReadiness.verified_form_required'`.
- `preferences_opinions/preference_alternative_arc/choice_contrast`: `pendingCoherence` until it has a passing relation fixture or `productionReady` if the fixture passes in Step 8.
- `home_objects_possessions/request_detail_arc/object_slot_change`: `pendingCoherence` unless it declares and passes `bridge.possession_to_desire` or uses a possession-compatible answer relation.
- `people_relationships/person_reference_arc/person_reference`: `pendingCoherence` unless entity agreement passes.

Do not mark a route `productionReady` to satisfy the test if its required form, metadata, compiler, or coherence dependencies are still missing. Pending with an exact owner blocker is the correct output.

- [x] **Step 8: Connect preflight to coordinator candidate filtering**

Modify `packages/learning_core/lib/src/focus_coordinator.dart` where route capability eligibility is checked. The coordinator must run the new preflight for a route candidate when `requiredCoherenceRelationIds` is not empty or when the route belongs to the priority set. If the result fails, append the preflight finding codes to the candidate rejection reasons and return the existing owned blocked Focus result when no candidates remain.

The rejection reason must keep both the route capability and coherence owner visible:

```text
arcCoherence.entity_agreement_mismatch:<routeKeyId>
arcCoherence.answer_relation_mismatch:<routeKeyId>
arcCoherence.reason_without_prior_claim:<routeKeyId>
```

- [x] **Step 9: Update audits to print route readiness and minimal coherence separately**

Update `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart` and `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart` so each route row prints:

```text
routeKey
capabilityStatus
materializationMode
requiredCoherenceRelationIds
minimalCoherenceStatus
minimalCoherenceFindings
firstDownstreamOwner
```

This report must make it possible to tell whether the UI is blocked by route scarcity, form readiness, metadata readiness, coherence, compiler materialization, or coordinator scoring.

- [x] **Step 10: Verify Task 18**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_route_coherence_preflight_test.dart \
  test/a1_arc_capability_audit_test.dart \
  test/focus_coordinator_arc_candidate_test.dart -r expanded

cd ../../apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  --concurrency=1 -r expanded
```

Expected: PASS. The 12-lesson report must include route readiness and minimal coherence fields. If every support-growth route is pending, stop and list the first downstream owner before continuing to Task 19.

- [x] **Step 11: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_route_coherence_preflight.dart \
  packages/learning_core/lib/src/a1_route_capability_registry.dart \
  packages/learning_core/lib/src/a1_route_materialization_proof.dart \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/lib/src/focus_coordinator.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_route_coherence_preflight_test.dart \
  packages/learning_core/test/a1_arc_capability_audit_test.dart \
  packages/learning_core/test/focus_coordinator_arc_candidate_test.dart \
  apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart
git commit -m "feat: add A1 priority route readiness gate"
```

## Task 19: Route-Keyed Metadata And Verified Form Growth Contract

**Purpose:** Define the global metadata and verified-form contract that route selection, growth sourcing, generation, compiler preflight, audits, and UI proof all read.

**Task 18 dependency:** Task 19 must use the Task 18 priority route set and minimal coherence owner codes. Do not create a standalone metadata registry that cannot be joined back to `A1RouteCapabilityKey`.

**Audit finding addressed:** `metadataReadiness.progression_registry_missing`, `metadataReadiness.paradigm_form_unverified`, `metadataReadiness.compiler_field_missing`, `metadataReadiness.phrase_meaning_missing`, and placeholder definition findings.

**Remediation Decision Record:**

```text
productFailure: selected targets can be missing from matching/building/final cues, and conjugated forms can be wrong or invented
firstFailingLayer: metadataReadiness and formReadiness
evidence: Task 16/17 made memory growth visible, but generator/coordinator still lack verified metadata for person/tense/role expansion
selectedRepair: add route-keyed metadata requirements plus a global verified form registry/query surface
whyThisRepairFirst: growth cannot move into howwa/heyya/e7na/homma or new verbs safely unless the metadata contract can answer those queries
productionBehaviorChanged: route candidates and growth bundles can be blocked by exact missing metadata/form queries before generation
backendProof: metadata/form tests prove matrix coverage, unsupported-form blocking, synthetic fixture expansion, and route requirement lookup
uiProductCheckpoint: selected words and forms have learner-facing labels ready for matching/building/bounded/final stages
remainingOwnedBlocker: Task 20 owns generator consumption of these verified forms; Task 21 owns full compiler materialization
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_metadata_readiness_registry.dart`
- Create: `packages/learning_core/lib/src/a1_verified_form_registry.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/lib/src/a1_route_capability_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_growth_candidate_source.dart`
- Modify: `packages/learning_core/lib/src/a1_target_bundle.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`
- Test: `packages/learning_core/test/a1_verified_form_registry_test.dart`
- Modify: `packages/learning_core/test/a1_metadata_surface_progression_audit_test.dart`
- Modify: `packages/learning_core/test/a1_target_bundle_test.dart`
- Modify: `packages/learning_core/test/a1_support_rotation_policy_test.dart`

- [x] **Step 1: Write failing verified form registry tests**

Create `packages/learning_core/test/a1_verified_form_registry_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1VerifiedFormRegistry', () {
    test('returns verified forms by query across verbs and pronouns', () {
      final registry = A1VerifiedFormRegistry.initial();

      final studyFuture = registry.formsFor(const A1VerifiedFormQuery(
        lemmaId: 'predicate.study',
        tenseAspect: 'future',
        pronouns: ['ana'],
        routeRole: 'learner_answer_growth',
      ));
      expect(studyFuture.single.franco, 'ana hazaker');
      expect(studyFuture.single.englishCue, 'I will study');

      final likeThirdPerson = registry.formsFor(const A1VerifiedFormQuery(
        lemmaId: 'predicate.like',
        tenseAspect: 'present',
        pronouns: ['howwa', 'heyya'],
        routeRole: 'tutor_question_growth',
      ));
      expect(
        likeThirdPerson.map((form) => form.pronoun).toSet(),
        containsAll({'howwa', 'heyya'}),
      );
    });

    test('blocks unsupported invented forms', () {
      final registry = A1VerifiedFormRegistry.initial();

      expect(
        registry.formOrNull(surfaceTargetId: 'predicate.like.unsupported.ana_habb'),
        isNull,
      );
      expect(
        registry.formOrNull(surfaceTargetId: 'predicate.study.present.first.ana_azaker'),
        isNull,
      );
    });

    test('synthetic verified form becomes available without coordinator changes', () {
      final registry = A1VerifiedFormRegistry(
        forms: [
          ...A1VerifiedFormRegistry.initial().forms,
          const A1VerifiedForm(
            lemmaId: 'predicate.clean',
            canonicalTargetId: 'predicate.clean',
            surfaceTargetId: 'predicate.clean.present.third_masc.howwa_binaddaf',
            semanticFamilyId: 'daily_activities',
            pronounTargetId: 'pronoun.howwa',
            pronoun: 'howwa',
            person: 'third',
            number: 'singular',
            gender: 'masculine',
            tenseAspect: 'present',
            franco: 'howwa binaddaf',
            arabicScript: '',
            englishCue: 'he cleans/is cleaning',
            usageNote: 'Synthetic fixture proving metadata-driven expansion.',
            acceptedVariants: ['howwa binaddaf'],
            utilityTier: 'core',
            routeRoles: ['tutor_question_growth', 'learner_answer_growth'],
            slotFamilyIds: ['daily_activity_action'],
            readiness: A1VerifiedFormReadiness.productionReady,
          ),
        ],
      );

      final forms = registry.formsFor(const A1VerifiedFormQuery(
        lemmaId: 'predicate.clean',
        tenseAspect: 'present',
        pronouns: ['howwa'],
        routeRole: 'learner_answer_growth',
      ));

      expect(forms.single.franco, 'howwa binaddaf');
    });
  });
}
```

- [x] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_verified_form_registry_test.dart -r expanded
```

Expected: FAIL because the verified form registry types do not exist.

- [x] **Step 3: Implement verified form registry**

Create `packages/learning_core/lib/src/a1_verified_form_registry.dart` with these public types:

```dart
enum A1VerifiedFormReadiness {
  productionReady,
  reviewRequired,
  blocked,
}

final class A1VerifiedFormQuery {
  const A1VerifiedFormQuery({
    required this.lemmaId,
    required this.tenseAspect,
    required this.pronouns,
    required this.routeRole,
  });

  final String lemmaId;
  final String tenseAspect;
  final List<String> pronouns;
  final String routeRole;
}

final class A1VerifiedForm {
  const A1VerifiedForm({
    required this.lemmaId,
    required this.canonicalTargetId,
    required this.surfaceTargetId,
    required this.semanticFamilyId,
    required this.pronounTargetId,
    required this.pronoun,
    required this.person,
    required this.number,
    required this.gender,
    required this.tenseAspect,
    required this.franco,
    required this.arabicScript,
    required this.englishCue,
    required this.usageNote,
    required this.acceptedVariants,
    required this.utilityTier,
    required this.routeRoles,
    required this.slotFamilyIds,
    required this.readiness,
  });

  final String lemmaId;
  final String canonicalTargetId;
  final String surfaceTargetId;
  final String semanticFamilyId;
  final String pronounTargetId;
  final String pronoun;
  final String person;
  final String number;
  final String gender;
  final String tenseAspect;
  final String franco;
  final String arabicScript;
  final String englishCue;
  final String usageNote;
  final List<String> acceptedVariants;
  final String utilityTier;
  final List<String> routeRoles;
  final List<String> slotFamilyIds;
  final A1VerifiedFormReadiness readiness;
}

final class A1VerifiedFormRegistry {
  const A1VerifiedFormRegistry({required this.forms});

  factory A1VerifiedFormRegistry.initial() {
    return const A1VerifiedFormRegistry(forms: _initialA1VerifiedForms);
  }

  final List<A1VerifiedForm> forms;

  List<A1VerifiedForm> formsFor(A1VerifiedFormQuery query) {
    return [
      for (final form in forms)
        if (form.lemmaId == query.lemmaId &&
            form.tenseAspect == query.tenseAspect &&
            query.pronouns.contains(form.pronoun) &&
            form.routeRoles.contains(query.routeRole) &&
            form.readiness == A1VerifiedFormReadiness.productionReady)
          form,
    ];
  }

  A1VerifiedForm? formOrNull({required String surfaceTargetId}) {
    for (final form in forms) {
      if (form.surfaceTargetId == surfaceTargetId &&
          form.readiness == A1VerifiedFormReadiness.productionReady) {
        return form;
      }
    }
    return null;
  }

  List<A1VerifiedForm> growthOptionsFor({
    required String knownSurfaceTargetId,
    required String upgradeAxis,
    required String routeRole,
  }) {
    final known = formOrNull(surfaceTargetId: knownSurfaceTargetId);
    if (known == null) return const [];
    return [
      for (final form in forms)
        if (form.lemmaId == known.lemmaId &&
            form.surfaceTargetId != known.surfaceTargetId &&
            form.routeRoles.contains(routeRole) &&
            form.readiness == A1VerifiedFormReadiness.productionReady &&
            _matchesUpgradeAxis(known: known, candidate: form, upgradeAxis: upgradeAxis))
          form,
    ];
  }
}
```

The helper `_matchesUpgradeAxis` must support:

- `pronoun_person_shift`: candidate pronoun differs from known pronoun;
- `tense_aspect_shift`: candidate tense/aspect differs from known tense/aspect;
- `support_growth`: candidate differs by pronoun, tense/aspect, or both.

- [x] **Step 4: Seed minimum verified form matrix**

In `packages/learning_core/lib/src/a1_verified_form_registry.dart`, add `_initialA1VerifiedForms` with production-ready rows for the priority verbs used by the current route set:

```text
predicate.like: ana, enta, enti, howwa, heyya, e7na, homma in present
predicate.want: ana, enta, enti, howwa, heyya, e7na, homma in present
predicate.study: ana, enta, enti, howwa, heyya, e7na, homma in present and future
predicate.do: ana, enta, enti, howwa, heyya, e7na, homma in present and future
predicate.work: ana, enta, enti, howwa, heyya, e7na, homma in present and future
```

Each row must include a learner-facing `englishCue`, accepted variants, route roles, slot family ids, and a `surfaceTargetId` that encodes lemma, tense/aspect, pronoun, and surface. Do not include unsupported forms such as `ana habb` or `ana azaker`.

- [x] **Step 5: Write failing route-keyed metadata readiness tests**

In `packages/learning_core/test/a1_metadata_surface_progression_audit_test.dart`, add:

```dart
test('priority route metadata requirements are keyed by route capability key', () {
  final registry = A1MetadataReadinessRegistry.initial();
  final requirements = registry.requirementsFor(const A1RouteCapabilityKey(
    familyId: 'daily_activities',
    arcId: 'activity_time_arc',
    rung: A1ProgressionRung.revisitSupport,
    upgradeAxis: 'time_context',
  ));

  expect(requirements.requiredMeaningTargetIds, contains('predicate.study'));
  expect(requirements.requiredFormQueries, isNotEmpty);
  expect(requirements.requiredCompilerFields, containsAll([
    'preferredFrancoArabic',
    'englishGloss',
    'progressLabel',
    'partOfSpeech',
    'slotCategory',
    'semanticRole',
    'routeRoles',
  ]));
});

test('metadata readiness reports exact missing form query', () {
  final registry = A1MetadataReadinessRegistry(
    routeRequirements: [
      A1RouteMetadataRequirements(
        routeKey: const A1RouteCapabilityKey(
          familyId: 'daily_activities',
          arcId: 'activity_time_arc',
          rung: A1ProgressionRung.revisitSupport,
          upgradeAxis: 'time_context',
        ),
        requiredMeaningTargetIds: const ['predicate.study'],
        requiredSurfaceTargetIds: const ['predicate.study'],
        requiredPhraseMeaningIds: const [],
        requiredFormQueries: const [
          A1VerifiedFormQuery(
            lemmaId: 'predicate.study',
            tenseAspect: 'past',
            pronouns: ['homma'],
            routeRole: 'learner_answer_growth',
          ),
        ],
        requiredCompilerFields: const ['englishGloss'],
        requiredSlotFamilyIds: const ['daily_activity_action'],
        requiredCoherenceRelationIds: const ['activity_time_relation'],
      ),
    ],
  );

  final readiness = registry.check(
    routeKey: const A1RouteCapabilityKey(
      familyId: 'daily_activities',
      arcId: 'activity_time_arc',
      rung: A1ProgressionRung.revisitSupport,
      upgradeAxis: 'time_context',
    ),
    forms: A1VerifiedFormRegistry.initial(),
  );

  expect(readiness.isReady, isFalse);
  expect(readiness.blockerCodes, contains('metadataReadiness.paradigm_form_unverified'));
  expect(readiness.missingFormQueries.single.lemmaId, 'predicate.study');
});
```

- [x] **Step 6: Implement route-keyed metadata readiness registry**

Create `packages/learning_core/lib/src/a1_metadata_readiness_registry.dart` with:

```dart
import 'a1_route_capability_registry.dart';
import 'a1_verified_form_registry.dart';

final class A1RouteMetadataRequirements {
  const A1RouteMetadataRequirements({
    required this.routeKey,
    required this.requiredMeaningTargetIds,
    required this.requiredSurfaceTargetIds,
    required this.requiredPhraseMeaningIds,
    required this.requiredFormQueries,
    required this.requiredCompilerFields,
    required this.requiredSlotFamilyIds,
    required this.requiredCoherenceRelationIds,
  });

  final A1RouteCapabilityKey routeKey;
  final List<String> requiredMeaningTargetIds;
  final List<String> requiredSurfaceTargetIds;
  final List<String> requiredPhraseMeaningIds;
  final List<A1VerifiedFormQuery> requiredFormQueries;
  final List<String> requiredCompilerFields;
  final List<String> requiredSlotFamilyIds;
  final List<String> requiredCoherenceRelationIds;
}

final class A1MetadataReadinessResult {
  const A1MetadataReadinessResult({
    required this.routeKey,
    required this.missingMeaningTargetIds,
    required this.missingSurfaceTargetIds,
    required this.missingPhraseMeaningIds,
    required this.missingFormQueries,
    required this.missingCompilerFields,
    required this.blockerCodes,
  });

  final A1RouteCapabilityKey routeKey;
  final List<String> missingMeaningTargetIds;
  final List<String> missingSurfaceTargetIds;
  final List<String> missingPhraseMeaningIds;
  final List<A1VerifiedFormQuery> missingFormQueries;
  final List<String> missingCompilerFields;
  final List<String> blockerCodes;

  bool get isReady => blockerCodes.isEmpty;
}

final class A1MetadataReadinessRegistry {
  const A1MetadataReadinessRegistry({required this.routeRequirements});

  factory A1MetadataReadinessRegistry.initial() {
    return const A1MetadataReadinessRegistry(
      routeRequirements: _initialA1RouteMetadataRequirements,
    );
  }

  final List<A1RouteMetadataRequirements> routeRequirements;

  A1RouteMetadataRequirements requirementsFor(A1RouteCapabilityKey routeKey) {
    return routeRequirements.singleWhere(
      (requirements) => requirements.routeKey == routeKey,
      orElse: () => throw ArgumentError(
        'No A1 metadata requirements for ${routeKey.id}',
      ),
    );
  }

  A1MetadataReadinessResult check({
    required A1RouteCapabilityKey routeKey,
    required A1VerifiedFormRegistry forms,
  }) {
    final requirements = requirementsFor(routeKey);
    final missingFormQueries = [
      for (final query in requirements.requiredFormQueries)
        if (forms.formsFor(query).isEmpty) query,
    ];
    final blockerCodes = <String>[
      if (missingFormQueries.isNotEmpty)
        'metadataReadiness.paradigm_form_unverified',
    ];
    return A1MetadataReadinessResult(
      routeKey: routeKey,
      missingMeaningTargetIds: const [],
      missingSurfaceTargetIds: const [],
      missingPhraseMeaningIds: const [],
      missingFormQueries: List.unmodifiable(missingFormQueries),
      missingCompilerFields: const [],
      blockerCodes: List.unmodifiable(blockerCodes),
    );
  }
}
```

The first implementation may use existing metadata audits to fill meaning/surface/compiler gap lists, but it must always return exact ids and exact form query values.

- [x] **Step 7: Connect route capability and metadata requirements**

Modify `packages/learning_core/lib/src/a1_route_capability_registry.dart` so priority route entries include metadata requirement keys that line up with `A1MetadataReadinessRegistry.initial()`. The route registry must not have a production-ready priority route with no metadata requirement row.

Add this assertion to `packages/learning_core/test/a1_arc_capability_audit_test.dart`:

```dart
test('production-ready priority routes have metadata requirement rows', () {
  final routes = A1RouteCapabilityRegistry.initial();
  final metadata = A1MetadataReadinessRegistry.initial();

  for (final capability in routes.capabilities.where(
    (capability) => capability.status == A1RouteCapabilityStatus.productionReady,
  )) {
    expect(
      () => metadata.requirementsFor(capability.key),
      returnsNormally,
      reason: capability.key.id,
    );
  }
});
```

- [x] **Step 8: Export registries**

Add:

```dart
export 'src/a1_metadata_readiness_registry.dart';
export 'src/a1_verified_form_registry.dart';
```

to `packages/learning_core/lib/learning_core.dart`.

- [x] **Step 9: Connect growth sourcing to verified form queries**

Modify `packages/learning_core/lib/src/a1_growth_candidate_source.dart` and `packages/learning_core/lib/src/a1_target_bundle.dart` so sourced growth can include verified form ids. The target bundle must expose:

```dart
selectedParadigmExpansionSurfaceTargetId
selectedParadigmExpansionAxis
selectedParadigmExpansionLemmaId
selectedParadigmExpansionPronoun
selectedParadigmExpansionTenseAspect
```

When memory says a learner knows a support form well, `growthOptionsFor` should provide next forms on `pronoun_person_shift` or `tense_aspect_shift`. Do not add hard-coded branches for `howwa`, `heyya`, `e7na`, or `homma`; they must appear because their verified form rows match the query.

- [x] **Step 10: Update audits to show exact metadata/form gaps**

Modify `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart` and `packages/learning_core/test/a1_metadata_surface_progression_audit_test.dart` so reports include:

```text
routeKey
missingMeaningTargetIds
missingSurfaceTargetIds
missingPhraseMeaningIds
missingFormQueries
missingCompilerFields
metadataReadiness.paradigm_form_unverified
metadataReadiness.compiler_field_missing
```

Remove any report path that only says `route_growth_metadata_registry` without exact ids.

- [x] **Step 11: Verify Task 19**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_verified_form_registry_test.dart \
  test/a1_metadata_surface_progression_audit_test.dart \
  test/a1_target_bundle_test.dart \
  test/a1_support_rotation_policy_test.dart \
  test/a1_arc_capability_audit_test.dart -r expanded
```

Expected: PASS. The tests must prove at least one non-preference route, one synthetic fixture, and one unsupported invented form.

- [x] **Step 12: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_metadata_readiness_registry.dart \
  packages/learning_core/lib/src/a1_verified_form_registry.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/lib/src/a1_route_capability_registry.dart \
  packages/learning_core/lib/src/a1_growth_candidate_source.dart \
  packages/learning_core/lib/src/a1_target_bundle.dart \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_verified_form_registry_test.dart \
  packages/learning_core/test/a1_metadata_surface_progression_audit_test.dart \
  packages/learning_core/test/a1_target_bundle_test.dart \
  packages/learning_core/test/a1_support_rotation_policy_test.dart \
  packages/learning_core/test/a1_arc_capability_audit_test.dart
git commit -m "feat: add A1 verified form metadata contract"
```

## Task 20: Verified Metadata Repairs And Generator Integration

**Purpose:** Make production route generation consume verified metadata globally so learner-visible lessons use correct forms, definitions, matching targets, and compiler-readable fields.

**Task 19 dependency:** Task 20 must use `A1VerifiedFormRegistry`, `A1VerifiedFormQuery`, `A1MetadataReadinessRegistry`, and route-keyed requirements from Task 19. It must not create a second local form table inside the arc instantiator.

**Audit finding addressed:** `metadataReadiness.definition_missing`, `metadataReadiness.phrase_meaning_missing`, `metadataReadiness.compiler_field_missing`, `metadataReadiness.paradigm_form_unverified`, known bad forms such as `ana azaker bukra`, and missing learner-visible items in matching/sentence building.

**Remediation Decision Record:**

```text
productFailure: the generator can still render wrong forms or omit selected words from learner-facing stages even after memory chooses better growth
firstFailingLayer: generator metadata consumption and metadataReadiness repair
evidence: UI showed ana azaker where ana hazaker was required, missing alam/3amel/da-style matching items, and duplicated core/article targets
selectedRepair: add a verified surface realizer, seed priority metadata/forms, and route generation through verified form queries
whyThisRepairFirst: route and memory improvements are only visible if the generated conversation and lesson stages can render the selected material correctly
productionBehaviorChanged: A1 arc instantiation uses verified forms or returns exact readiness blockers; selected target/form fields are compiler-readable
backendProof: instantiator, metadata, and 12-lesson tests prove correct forms, no invented surfaces, route-family generality, and compiler payload readability
uiProductCheckpoint: Focus lessons should show correct forms and selected words in goal conversation, matching, building, bounded typing, and final cue stages
remainingOwnedBlocker: Task 21 owns full compiler preflight; Task 22 owns richer conversation coherence; later metadata expansion can add rows without code changes
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_verified_surface_realizer.dart`
- Modify: `packages/learning_core/lib/src/a1_conversation_arc_instantiator.dart`
- Modify: `packages/learning_core/lib/src/a1_conversation_arc_models.dart`
- Modify: `packages/learning_core/lib/src/a1_metadata_readiness_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_verified_form_registry.dart`
- Modify: `packages/learning_core/lib/src/starter_language_metadata.dart`
- Modify: `packages/learning_core/lib/src/verb_paradigm_metadata.dart`
- Modify: `packages/learning_core/lib/src/a1_target_bundle.dart`
- Modify: `packages/learning_core/lib/src/a1_growth_candidate_source.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Test: `packages/learning_core/test/a1_verified_surface_realizer_test.dart`
- Modify: `packages/learning_core/test/a1_conversation_arc_instantiator_test.dart`
- Modify: `packages/learning_core/test/a1_metadata_surface_progression_audit_test.dart`
- Modify: `packages/learning_core/test/a1_turn_ladder_metadata_coverage_test.dart`
- Modify: `packages/learning_core/test/verb_paradigm_metadata_test.dart`
- Modify: `packages/learning_core/test/starter_language_metadata_test.dart`
- Modify: `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart`

- [x] **Step 1: Write failing verified surface realizer tests**

Create `packages/learning_core/test/a1_verified_surface_realizer_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1VerifiedSurfaceRealizer', () {
    test('realizes exact future study surface from metadata', () {
      final realizer = A1VerifiedSurfaceRealizer(
        forms: A1VerifiedFormRegistry.initial(),
      );

      final result = realizer.requireForm(const A1VerifiedFormQuery(
        lemmaId: 'predicate.study',
        tenseAspect: 'future',
        pronouns: ['ana'],
        routeRole: 'learner_answer_growth',
      ));

      expect(result.isReady, isTrue);
      expect(result.form!.franco, 'ana hazaker');
      expect(result.form!.englishCue, 'I will study');
    });

    test('returns owned blocker instead of invented present form', () {
      final realizer = A1VerifiedSurfaceRealizer(
        forms: A1VerifiedFormRegistry.initial(),
      );

      final result = realizer.requireForm(const A1VerifiedFormQuery(
        lemmaId: 'predicate.study',
        tenseAspect: 'present',
        pronouns: ['ana_unsafe'],
        routeRole: 'learner_answer_growth',
      ));

      expect(result.isReady, isFalse);
      expect(result.blockerCode, 'metadataReadiness.paradigm_form_unverified');
      expect(result.fallbackText, isEmpty);
    });
  });
}
```

- [x] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_verified_surface_realizer_test.dart -r expanded
```

Expected: FAIL because `A1VerifiedSurfaceRealizer` is not defined.

- [x] **Step 3: Implement verified surface realizer**

Create `packages/learning_core/lib/src/a1_verified_surface_realizer.dart`:

```dart
import 'a1_verified_form_registry.dart';

final class A1VerifiedSurfaceRealizationResult {
  const A1VerifiedSurfaceRealizationResult({
    required this.form,
    required this.blockerCode,
    required this.fallbackText,
  });

  final A1VerifiedForm? form;
  final String blockerCode;
  final String fallbackText;

  bool get isReady => form != null && blockerCode.isEmpty;
}

final class A1VerifiedSurfaceRealizer {
  const A1VerifiedSurfaceRealizer({required this.forms});

  final A1VerifiedFormRegistry forms;

  A1VerifiedSurfaceRealizationResult requireForm(A1VerifiedFormQuery query) {
    final matches = forms.formsFor(query);
    if (matches.isEmpty) {
      return const A1VerifiedSurfaceRealizationResult(
        form: null,
        blockerCode: 'metadataReadiness.paradigm_form_unverified',
        fallbackText: '',
      );
    }
    return A1VerifiedSurfaceRealizationResult(
      form: matches.first,
      blockerCode: '',
      fallbackText: '',
    );
  }
}
```

Export it from `packages/learning_core/lib/learning_core.dart`.

- [x] **Step 4: Add generator regression tests for known bad forms**

In `packages/learning_core/test/a1_conversation_arc_instantiator_test.dart`, add tests for current production failures:

```dart
test('activity time route uses verified future first-person study form', () {
  final result = A1ConversationArcInstantiator(
    forms: A1VerifiedFormRegistry.initial(),
  ).instantiateFamily(
    familyId: 'daily_activities',
    arcId: 'activity_time_arc',
    maturityLevel: A1ConversationMaturityLevel.mature,
    acceptedCount: 2,
    rejectedCount: 0,
    memorySummary: 'known=bukra; growth=predicate.study.future.ana',
  );

  final text = result.acceptedThreads.single.turns.map((turn) => turn.text).join(' | ');
  expect(text, contains('ana hazaker'));
  expect(text, isNot(contains('ana azaker')));
});

test('verified person shift forms can appear outside ana and enta', () {
  final result = A1ConversationArcInstantiator(
    forms: A1VerifiedFormRegistry.initial(),
  ).instantiateFamily(
    familyId: 'preferences_opinions',
    arcId: 'preference_alternative_arc',
    maturityLevel: A1ConversationMaturityLevel.mature,
    acceptedCount: 3,
    rejectedCount: 0,
    memorySummary: 'growth=pronoun_person_shift:howwa,heyya',
  );

  final text = result.acceptedThreads.single.turns.map((turn) => turn.text).join(' | ');
  expect(text, anyOf(contains('howwa bihebb'), contains('heyya bithebb')));
  expect(text, isNot(contains('ana habb')));
});
```

- [x] **Step 5: Update arc instantiator constructor and route generation**

Modify `packages/learning_core/lib/src/a1_conversation_arc_instantiator.dart` so the constructor accepts:

```dart
const A1ConversationArcInstantiator({
  A1ConversationArcCatalog? catalog,
  A1VerifiedFormRegistry? forms,
  A1VerifiedSurfaceRealizer? surfaceRealizer,
});
```

The instantiator must use `surfaceRealizer.requireForm()` for production form-dependent moves. Replace unsafe helper branches that synthesize forms by text operations, including future/present study/do/work/like/want surfaces. The route move builders must use `A1VerifiedForm.franco` for visible text and `A1VerifiedForm.surfaceTargetId` for evidence/progress/route target ids.

Do not keep a production branch that creates `ha$verb`, `b$verb`, or `ana $baseVerb` when a verified form query fails. The only allowed production result on a missing form is an owned blocker reported through readiness/proof surfaces.

- [x] **Step 6: Repair priority metadata rows and compiler-readable fields**

Modify `packages/learning_core/lib/src/starter_language_metadata.dart` and `packages/learning_core/lib/src/verb_paradigm_metadata.dart` so every priority route target and verified form target has:

```text
preferredFrancoArabic
englishGloss
progressLabel
partOfSpeech
slotCategory
semanticRole
routeRoles
slotPoolIds
distractorPoolIds
acceptedVariants
utilityTier
```

Repair known missing learner-facing metadata for:

```text
3amel
hat3mel
hazaker
bazaker
alam
da
walla
rabina maaok
kitab/el kitab article-core relationship
```

Article-bearing forms such as `el kitab` must keep sentence-surface correctness but must not create a separate core-word mastery identity from `kitab`. The metadata should expose the article as a surface/context feature and the core target as the memory identity.

- [x] **Step 7: Add metadata-to-compiler proof tests for two route families**

In `packages/learning_core/test/a1_turn_ladder_metadata_coverage_test.dart`, add a proof that selected route targets/forms reach lesson-stage payloads:

```dart
test('priority route selected metadata reaches teaching stages', () {
  final coordinator = FocusCoordinator();
  final result = coordinator.createA1ConversationArcFocusPlan(
    preferredFamilyId: 'daily_activities',
  );

  final bound = result.plan.boundLesson!;
  final stageText = bound.stages.map((stage) => stage.toString()).join('\n');
  final finalConversation = bound.stages.singleWhere(
    (stage) => stage.type == BoundLessonStageType.finalConversation,
  );

  expect(stageText, contains('hazaker'));
  expect(stageText, contains('I will study'));
  expect(finalConversation.metadata['a1ConversationArcId'], 'activity_time_arc');
});

test('non-activity priority route selected metadata reaches teaching stages', () {
  final coordinator = FocusCoordinator();
  final result = coordinator.createA1ConversationArcFocusPlan(
    preferredFamilyId: 'preferences_opinions',
  );

  final bound = result.plan.boundLesson!;
  final stageText = bound.stages.map((stage) => stage.toString()).join('\n');

  expect(stageText, isNot(contains('description description')));
  expect(stageText, isNot(contains('supporting line')));
  expect(stageText, anyOf(contains('bahebb'), contains('bihebb'), contains('bithebb')));
});
```

If these tests expose that `BoundLessonStage.toString()` is not a reliable payload proof, add a small helper inside the test file that extracts stage metadata, prompts, choices, and expected text from the existing stage fields. Do not change production behavior only to make `toString()` pass.

- [x] **Step 8: Connect target bundles to verified form growth**

Modify `packages/learning_core/lib/src/a1_target_bundle.dart` and `packages/learning_core/lib/src/a1_growth_candidate_source.dart` so a selected verified form growth candidate adds its `surfaceTargetId`, `canonicalTargetId`, pronoun, tense/aspect, and `englishCue` into the target bundle. The coordinator signature and audit rows must then be able to show:

```text
selectedParadigmExpansionSurfaceTargetId
selectedParadigmExpansionAxis
selectedParadigmExpansionPronoun
selectedParadigmExpansionTenseAspect
selectedGrowthCandidateIds
rejectedGrowthCandidateIds
```

The growth source should prefer known-but-not-mastered support before mastered support, and it should rotate support forms so `enta bethebb`, `kitab`, or `el medina` do not become the permanent anchor when other verified options exist.

- [x] **Step 9: Update mobile 12-lesson audit to print final conversation shapes and form growth**

Modify `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart` so each row prints:

```text
lessonIndex
routeKey
finalConversation
selectedSupportTargetIds
selectedGrowthCandidateIds
selectedParadigmExpansionSurfaceTargetId
selectedParadigmExpansionPronoun
selectedParadigmExpansionTenseAspect
formReadinessBlockers
metadataReadinessBlockers
compilerStageReadiness
```

The report must make exact repeats obvious. If an exact final conversation repeats, the row must name whether the repeat was allowed because it was productive growth, or blocked by missing route/form/metadata/compiler options.

- [x] **Step 10: Verify Task 20**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_verified_surface_realizer_test.dart \
  test/a1_conversation_arc_instantiator_test.dart \
  test/a1_metadata_surface_progression_audit_test.dart \
  test/a1_turn_ladder_metadata_coverage_test.dart \
  test/verb_paradigm_metadata_test.dart \
  test/starter_language_metadata_test.dart \
  test/a1_target_bundle_test.dart -r expanded

cd ../../apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  --concurrency=1 -r expanded
```

Expected: PASS. The 12-lesson report must show form growth and final conversation text. It should not contain `ana azaker`, `ana habb`, `description description`, or `supporting line`.

- [x] **Step 11: UI checkpoint before Task 21**

Start the app server and run one manual Focus pass:

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter run -d web-server --web-hostname 127.0.0.1 --web-port 7363
```

Open `http://127.0.0.1:7363/`. Complete one Focus lesson, start the next one, and record:

```text
first lesson final conversation:
second lesson final conversation:
visible changed route/axis:
visible changed form/pronoun/tense/object:
missing matching/building/bounded/final cue item:
owned blocker shown in backend audit:
```

If the backend tests pass but the UI repeats the exact same lesson without a productive-growth reason, stop before Task 21 and classify the blocker as `uiEvidenceLoop` or `coordinatorScoring` using the audit rows.

- [x] **Step 12: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_verified_surface_realizer.dart \
  packages/learning_core/lib/src/a1_conversation_arc_instantiator.dart \
  packages/learning_core/lib/src/a1_conversation_arc_models.dart \
  packages/learning_core/lib/src/a1_metadata_readiness_registry.dart \
  packages/learning_core/lib/src/a1_verified_form_registry.dart \
  packages/learning_core/lib/src/starter_language_metadata.dart \
  packages/learning_core/lib/src/verb_paradigm_metadata.dart \
  packages/learning_core/lib/src/a1_target_bundle.dart \
  packages/learning_core/lib/src/a1_growth_candidate_source.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_verified_surface_realizer_test.dart \
  packages/learning_core/test/a1_conversation_arc_instantiator_test.dart \
  packages/learning_core/test/a1_metadata_surface_progression_audit_test.dart \
  packages/learning_core/test/a1_turn_ladder_metadata_coverage_test.dart \
  packages/learning_core/test/verb_paradigm_metadata_test.dart \
  packages/learning_core/test/starter_language_metadata_test.dart \
  apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart
git commit -m "feat: use verified A1 metadata for route generation"
```

## Task 21: Compiler Preflight Materialization

**Purpose:** Prevent route candidates from reaching UI render unless the full Focus lesson can materialize.

**Audit finding addressed:** compiler preflight gap in `compilerMaterialization`.

**Remediation Decision Record:**

```text
productFailure: selected material can fail to appear in matching, role-building, bounded typing, final cue, or final proof
firstFailingLayer: compilerMaterialization
evidence: audit says sampled routes materialize but coordinator does not preflight candidates before committing
selectedRepair: add compiler preflight helper and require selected candidates to pass
whyThisRepairFirst: after capability and metadata are ready, candidate selection must prove the lesson can render before UI
productionBehaviorChanged: FocusCoordinator blocks candidates that cannot materialize full Focus stages
backendProof: compiler audit proves priority route materializes all required stages and proof targets
uiProductCheckpoint: learner should see fewer missing lesson sections for selected routes
remainingOwnedBlocker: uiEvidenceLoop owns failures when backend preflight passes but UI render omits material
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_compiler_preflight.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`
- Modify: `packages/learning_core/test/a1_compiler_materialization_audit_test.dart`

- [ ] **Step 1: Write failing preflight test**

In `packages/learning_core/test/a1_compiler_materialization_audit_test.dart`, add:

```dart
test('priority route passes compiler preflight before selection', () {
  final result = A1CompilerPreflight(
    coordinator: FocusCoordinator(),
  ).check(
    preferredFamilyId: 'preferences_opinions',
    requiredArcId: 'preference_alternative_arc',
  );

  expect(result.isReady, isTrue);
  expect(result.missingStages, isEmpty);
  expect(result.missingTargetIds, isEmpty);
});
```

- [ ] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_compiler_materialization_audit_test.dart
```

Expected: FAIL because `A1CompilerPreflight` is missing.

- [ ] **Step 3: Implement preflight helper**

Create `packages/learning_core/lib/src/a1_compiler_preflight.dart`:

```dart
import 'bound_lesson_instance.dart';
import 'focus_coordinator.dart';

final class A1CompilerPreflightResult {
  const A1CompilerPreflightResult({
    required this.isReady,
    required this.missingStages,
    required this.missingTargetIds,
  });

  final bool isReady;
  final List<String> missingStages;
  final List<String> missingTargetIds;
}

final class A1CompilerPreflight {
  const A1CompilerPreflight({required this.coordinator});

  final FocusCoordinator coordinator;

  A1CompilerPreflightResult check({
    required String preferredFamilyId,
    required String requiredArcId,
  }) {
    final result = coordinator.createA1ConversationArcFocusPlan(
      preferredFamilyId: preferredFamilyId,
    );
    final lesson = result.plan.boundLesson;
    final missingStages = <String>[];
    final missingTargets = <String>[];
    if (lesson == null) {
      return const A1CompilerPreflightResult(
        isReady: false,
        missingStages: ['boundLesson'],
        missingTargetIds: [],
      );
    }
    if (lesson.conversationTurns.isEmpty) {
      missingStages.add('goalConversation');
    }
    final hasFinal = lesson.stages.any(
      (stage) => stage.type == BoundLessonStageType.finalConversation,
    );
    if (!hasFinal) {
      missingStages.add('finalConversation');
    }
    final proofTargets = result.selectionSignature.finalProofTargetIds;
    if (proofTargets.isEmpty) {
      missingTargets.add('finalProofTargetIds');
    }
    return A1CompilerPreflightResult(
      isReady: missingStages.isEmpty && missingTargets.isEmpty,
      missingStages: List.unmodifiable(missingStages),
      missingTargetIds: List.unmodifiable(missingTargets),
    );
  }
}
```

- [ ] **Step 4: Export preflight**

Add:

```dart
export 'src/a1_compiler_preflight.dart';
```

to `packages/learning_core/lib/learning_core.dart`.

- [ ] **Step 5: Connect preflight to coordinator candidate acceptance**

Before committing an A1 candidate in `FocusCoordinator.createA1ConversationArcFocusPlan`, require preflight for the candidate's family/arc when the candidate came from a target bundle. If preflight fails, add a `compilerMaterialization` trace reason and let audit produce an owned blocker.

- [ ] **Step 6: Verify**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_compiler_materialization_audit_test.dart \
  test/a1_coordinator_decision_audit_test.dart
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_compiler_preflight.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/lib/src/focus_coordinator.dart \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/test/a1_compiler_materialization_audit_test.dart
git commit -m "feat: add A1 compiler preflight"
```

## Task 22: Deterministic A1 Dialogue Composition System

**Purpose:** Replace slot-only arc variation with a typed composition pipeline that can reuse known words in new coherent shapes, grow thought depth when vocabulary is already ready, and reject stale or incoherent dialogue before UI render.

**Audit finding addressed:** `arcCoherence.followup_relation_invalid`, `arcCoherence.same_route_stale_repeat`, `arcCoverage.support_blend_unavailable`, `metadataReadiness.semantic_compatibility_missing`, `compilerMaterialization.shape_target_missing`, and product rows where the first turn changes but the second half repeats the same shell.

**Remediation Decision Record:**

```text
productFailure: the system can teach new words while still producing narrow, repetitive, or incoherent conversations
firstFailingLayer: compositionPipeline with owned sublayers for metadataReadiness, arcCoverage, arcCoherence, compilerMaterialization, coordinatorPolicy, and uiEvidenceLoop
evidence: Tasks 16-20 made memory, target bundles, route capability, metadata, and verified forms stronger, but generation/coherence still cannot compose separately learned words into diverse thoughts
selectedRepair: add composition memory index, operation/frame/focus registries, semantic compatibility, typed dialogue candidates, coherence validator, candidate scoring, and shape proof
whyThisRepairFirst: the coordinator cannot reliably choose diverse lessons until generation exposes typed route shapes and coherence validates them before text is materialized
productionBehaviorChanged: normal A1 Focus selects typed dialogue candidates by operation/focus/relation/thought-depth score instead of accepting text-first route shells
backendProof: unit and audit tests prove cross-island composition, stale-shell rejection, typed coherence, compiler materialization, and shape-target proof
uiProductCheckpoint: UI-started lessons preserve operation/focus/frame/relation/thought evidence so later starts can select new shapes with mostly known words
remainingOwnedBlocker: broader long-response generation can follow after this first deterministic composition slice proves the contract
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_composition_memory_index.dart`
- Create: `packages/learning_core/lib/src/a1_semantic_compatibility_registry.dart`
- Create: `packages/learning_core/lib/src/a1_dialogue_operation_registry.dart`
- Create: `packages/learning_core/lib/src/a1_information_focus_policy.dart`
- Create: `packages/learning_core/lib/src/a1_route_frame_registry.dart`
- Create: `packages/learning_core/lib/src/a1_micro_situation_registry.dart`
- Create: `packages/learning_core/lib/src/a1_candidate_repair_policy.dart`
- Create: `packages/learning_core/lib/src/a1_surface_pattern_inventory.dart`
- Create: `packages/learning_core/lib/src/a1_answer_expectation_contract.dart`
- Create: `packages/learning_core/lib/src/a1_dialogue_candidate_generator.dart`
- Create: `packages/learning_core/lib/src/a1_dialogue_candidate_scoring.dart`
- Create: `packages/learning_core/lib/src/a1_coherence_validator.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/lib/src/a1_progression_contracts.dart`
- Modify: `packages/learning_core/lib/src/a1_coordinator_memory_profile.dart`
- Modify: `packages/learning_core/lib/src/a1_target_bundle.dart`
- Modify: `packages/learning_core/lib/src/a1_growth_inventory.dart`
- Modify: `packages/learning_core/lib/src/a1_route_capability_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_metadata_readiness_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_visible_itinerary.dart`
- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/lib/src/a1_conversation_arc_instantiator.dart`
- Modify: `packages/learning_core/lib/src/mastery_lesson_compiler.dart`
- Modify: `packages/learning_core/lib/src/a1_lesson_proof_contract.dart`
- Modify: `apps/mobile/lib/features/practice/focus_evidence_writer.dart`
- Modify: `apps/mobile/lib/shared/persistence/learner_memory_repository.dart`
- Modify: `apps/mobile/lib/features/practice/session_controller.dart` only if the proof payload drops shape targets before persistence

**Tests:**

- Create: `packages/learning_core/test/a1_composition_memory_index_test.dart`
- Create: `packages/learning_core/test/a1_semantic_compatibility_registry_test.dart`
- Create: `packages/learning_core/test/a1_dialogue_operation_registry_test.dart`
- Create: `packages/learning_core/test/a1_micro_situation_registry_test.dart`
- Create: `packages/learning_core/test/a1_candidate_repair_policy_test.dart`
- Create: `packages/learning_core/test/a1_surface_pattern_inventory_test.dart`
- Create: `packages/learning_core/test/a1_answer_expectation_contract_test.dart`
- Create: `packages/learning_core/test/a1_dialogue_candidate_generator_test.dart`
- Create: `packages/learning_core/test/a1_dialogue_candidate_scoring_test.dart`
- Modify: `packages/learning_core/test/a1_lesson_proof_contract_test.dart`
- Modify: `packages/learning_core/test/a1_coordinator_memory_profile_test.dart`
- Modify: `packages/learning_core/test/a1_target_bundle_test.dart`
- Modify: `packages/learning_core/test/a1_route_coherence_preflight_test.dart`
- Modify: `packages/learning_core/test/a1_conversation_coherence_progression_audit_test.dart`
- Modify: `packages/learning_core/test/a1_compiler_materialization_audit_test.dart`
- Modify: `packages/learning_core/test/a1_coordinator_decision_audit_test.dart`
- Modify: `packages/learning_core/test/a1_visible_itinerary_test.dart`
- Modify: `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart`
- Modify: `apps/mobile/test/a1_ui_completion_memory_regression_audit_test.dart`
- Modify: `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`

- [ ] **Step 1: Write failing shape-target proof and evidence tests**

In `packages/learning_core/test/a1_lesson_proof_contract_test.dart`, prove a selected A1 composition lesson carries shape targets:

```text
a1.operation.add_time
a1.focus.when_then_where
a1.frame.activity.time_place
a1.relation.question_focus_answered
a1.thought.depth_1.reason
```

Expected behavior:

- `frameTargetIds` includes route frame, relation ids, and thought-depth rung;
- `scenarioTargetIds` includes dialogue operation ids and information-focus id;
- `grammarTargetIds` includes verified form or agreement targets;
- `phraseTargetIds` includes connector/discourse phrase targets;
- canonical lexical targets are not replaced by shape targets;
- detail shape targets survive into `finalProofTargetIds` or the explicit detail evidence path used by rollups.

In `apps/mobile/test/a1_ui_completion_memory_regression_audit_test.dart`, complete a UI-started A1 lesson and assert `LearnerMemoryRepository.loadSurfaceAwareEvidenceEvents()` preserves lexical targets plus frame/scenario/grammar/phrase shape targets. If the UI event contains only lexical targets, fail with `uiEvidenceLoop.shape_target_missing_from_event`; if rollups drop them, fail with `uiEvidenceLoop.shape_target_missing_from_rollups`.

- [ ] **Step 2: Implement shape-target proof mapping**

Modify `A1LessonProofContract`, compiler final proof metadata, `focus_evidence_writer.dart`, and `LearnerMemoryRepository` only as needed to preserve the shape targets already carried by learning_core. Do not synthesize shape evidence in the UI when the core lesson did not declare it.

Add owner codes:

```text
compilerMaterialization.shape_target_missing
uiEvidenceLoop.shape_target_missing_from_event
uiEvidenceLoop.shape_target_missing_from_rollups
```

- [ ] **Step 3: Create composition memory index**

Create `A1CompositionMemoryIndex` from `A1CoordinatorMemoryProfile`, surface-aware rollups, verified form metadata, route/frame metadata, and recent visible itinerary history.

The index must expose:

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
practicedSemanticFactIds
practicedMicroSituationIds
practicedRelationSequenceIds
recentSecondHalfShapeFingerprints
recentSurfacePatternFamilies
recentOperationHistory
recentFocusPlanHistory
recentRelationSequenceHistory
recentThoughtDepthHistory
```

Required tests:

- separately learned `predicate.study`, `place.school`, `time.tomorrow`, `predicate.work`, and `connector.because` become a possible activity/time/place/reason opportunity only when all required metadata is present;
- known words without role metadata are listed under an owned `metadataReadiness` finding, not guessed into a role;
- `fact.study.self.place.school`, `fact.study.self.time.tomorrow`, and `fact.work.self.time.today` can be projected from separate proof events when the source targets, forms, and surface evidence are present;
- recent shape memory records operation/focus/relation/thought-depth history so the next lesson can avoid same-second-half loops.

- [ ] **Step 4: Add semantic compatibility and grammar-safety registry**

Create `A1SemanticCompatibilityRegistry` with at least:

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

Unknown combinations must fail closed with `metadataReadiness.semantic_compatibility_missing`. Tests must also cover missing reference pattern, adjective agreement, connector function, negation pattern, and unverified paradigm cell owner codes. The implementation must not guess whether an object can be referenced by a pronoun when safe reference metadata is missing.

- [ ] **Step 5: Add dialogue operation, route frame, and information-focus registries**

Create shared registries for the first production slice:

```text
operations:
add_time
add_place
add_topic
attribute_embed
reason_constraint
contrast
sequence_two_event
need_vs_have

route frames:
activity.time_place
activity.time_place_reason
activity.sequence
preference.reason
preference.contrast
possession.attribute
possession.need_vs_have
person.activity_context

information focus plans:
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

thought-depth rungs:
depth_0_label_or_fragment
depth_1_direct_clause
depth_2_clause_with_detail
depth_3_clause_with_time_place_topic
depth_4_reason_or_constraint
depth_5_contrast
depth_6_two_event_sequence
depth_7_multi_sentence_connected_answer
```

Each operation must declare allowed families, required known roles, allowed growth roles, required connectors, required coherence relations, metadata fields, max new lexical items, max new form items, learner-load cost, compatible information-focus plans, and shape target ids.

Each information-focus plan must declare question focus role, answer focus role, required known roles, allowed growth roles, compatible operations, compatible thought-depth rungs, required relation ids, forbidden recent-focus window, surface pattern families, and shape target ids.

Extend `A1RouteCapabilityRegistry` instead of creating a disconnected generator table. Route capability rows must advertise `routeFrameId`, `supportedOperationIds`, `supportedInformationFocusPlanIds`, `supportedThoughtDepthRungs`, required semantic compatibility edges, required metadata fields, required surface cells, and required compiler stages.

- [ ] **Step 6: Add micro-situation registry**

Create `packages/learning_core/lib/src/a1_micro_situation_registry.dart`. The first registry must include:

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

Each micro-situation row must declare:

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

Required tests in `packages/learning_core/test/a1_micro_situation_registry_test.dart`:

- `micro.activity.work_today_study_tomorrow` is available only when `fact.work.self.time.today`, `fact.study.self.time.tomorrow`, and a reason/constraint connector function are present;
- `micro.possession.need_object_because_constraint` blocks when size/space or reason metadata is missing;
- every initial micro-situation points to at least one operation, one focus plan, one thought-depth rung, one surface pattern family, and one `a1.*` shape target.

- [ ] **Step 7: Add bounded candidate search, repair policy, surface patterns, and answer expectations**

Create `packages/learning_core/lib/src/a1_candidate_repair_policy.dart`. The required search order is:

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

The search policy must declare max candidate count, role priority order, max new lexical items, max new form items, and trace reasons for every prune layer. It must be deterministic for the same memory profile and policy version.

The repair policy must attempt:

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

Create `packages/learning_core/lib/src/a1_surface_pattern_inventory.dart`. Required first pattern families:

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

Each surface pattern must declare operation id, focus id, thought-depth rung, role refs, form ids, connector ids, agreement features, accepted alias groups, renderable example ids, and blocked metadata codes.

Create `packages/learning_core/lib/src/a1_answer_expectation_contract.dart`. Every prompt must declare:

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

Required tests:

- `a1_candidate_repair_policy_test.dart` proves missing object reference metadata first removes unsafe reference, then tries explicit noun reference, then simplifies before blocking;
- `a1_candidate_repair_policy_test.dart` proves repair trace includes `repairActionId`, source candidate id, failed owner code, removed/replacement role ids, result candidate id, and result owner code;
- `a1_surface_pattern_inventory_test.dart` proves every initial operation/focus/depth row has a renderable pattern family or returns `metadataReadiness.surface_pattern_missing`;
- `a1_answer_expectation_contract_test.dart` rejects `tamam` as the only answer to a `why` prompt, rejects evaluation-only answers to `where` prompts, and accepts a short time correction for `focus.confirm_time` when the expected time role is present.

- [ ] **Step 8: Create typed dialogue candidate models and generator**

Create typed candidate and turn models in `a1_dialogue_candidate_generator.dart`. A candidate must declare:

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
microSituationIds
supportTargetIds
growthTargetIds
refreshTargetIds
shapeTargetIds
relationSequence
relationSequenceFingerprint
secondHalfShapeFingerprint
surfacePatternIds
answerExpectationIds
cannedPhraseIds
learnerLoadScore
requiredMetadataIds
requiredSurfaceCells
requiredCompilerStageIds
repairHistory
```

Each turn must declare dialogue act, question focus, answer focus, introduced/referenced entities, role refs, connector refs, required prior claims, allowed answer/follow-up relations, bridge relations, and surface pattern id.

The generator must produce at least these deterministic fixtures:

- `where_will_you_study -> I will study at school -> will it happen today -> no, tomorrow`;
- `when_will_you_study -> I will study tomorrow at school -> what will you study -> history`;
- `do_you_have_object -> I have small object -> do you need large object -> no/yes with reason`;
- `do_you_like_item -> I like item because reason -> contrast with another item`;
- `person activity context` with safe person reference metadata.

These are fixtures for behavior and audits, not hidden hard-coded lesson tracks. The generator should instantiate them from operations, frames, metadata, and memory index.

- [ ] **Step 9: Replace narrow coherence with typed coherence validation**

Create `A1CoherenceValidator` that validates typed plans, not final strings.

Required failures:

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

Tests must reject:

- a content question answered only by `tamam` or another canned acknowledgement;
- size/time/place questions answered by unrelated evaluation language;
- reason without a prior claim;
- contrast without contrastable facts;
- sequence without two compatible events;
- same first-turn change with the exact same second-half relation shape;
- unsafe object/person reference when metadata is missing.

- [ ] **Step 10: Add candidate scoring and visible-itinerary integration**

Create `A1DialogueCandidateScoring`. It must score only candidates that passed metadata, semantic compatibility, typed coherence, and compiler preflight gates.

Positive terms:

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
compilerPreflightPassed
coherencePassed
```

Negative/blocking terms:

```text
coherenceInvalid
semanticCompatibilityMissing
metadataRequiredMissing
compilerPreflightFailed
sameSecondHalfShape
sameRouteFrameRecent
sameOperationRecent
cannedPhraseOveruse
slotOnlyNovelty
learnerLoadTooHigh
repeatedSupportSurface
```

Required tests:

- a new noun in the same stale skeleton scores below the same known words in a new operation/focus/relation shape;
- when vocabulary is rich enough, `composition_growth` or `thought_depth_growth` can beat `lexical_growth`;
- recent operation and focus history cool down repeated shells across islands;
- learner load blocks a candidate that combines too many new lexical/form items at once.

The first scoring policy must enforce these freshness thresholds:

```text
maxSameSecondHalfShapeWindow = 3
minDistinctOperationsPerFiveValidStarts = 2
minDistinctInformationFocusPlansPerFiveValidStarts = 2
minDistinctRelationSequencesPerFiveValidStarts = 2
compositionGrowthAfterKnownRoleConcentration = required_if_available
sameRouteRequiresShapeChange = true
knownWordsNewShapeBeatsNewNounStaleShell = true
```

If a threshold cannot be met, the result must be an owned blocker from this set:

```text
arcCoverage.operation_inventory_too_small
arcCoverage.focus_inventory_too_small
arcCoverage.relation_sequence_inventory_too_small
metadataReadiness.semantic_compatibility_missing
metadataReadiness.surface_pattern_missing
arcCoherence.no_coherent_repair_candidate
compilerMaterialization.shape_target_missing
```

- [ ] **Step 11: Connect generator, validator, scoring, compiler, and coordinator**

Modify `FocusCoordinator.createA1ConversationArcFocusPlan` and candidate selection so the production pipeline is:

```text
memory profile
-> learning pressure
-> target bundle
-> composition memory index
-> semantic facts
-> micro-situation candidates
-> operation, route-frame, and information-focus candidates
-> thought-depth candidates
-> semantic compatibility and grammar-safety check
-> surface pattern and answer expectation lookup
-> typed dialogue candidate generation
-> candidate repair ladder when a rich candidate almost works
-> typed coherence validation
-> compiler materialization and shape proof check
-> candidate scoring
-> selected lesson
```

`A1ConversationArcInstantiator` should become a consumer of typed candidates. It may still realize current simple arcs, but the selected route shape must come from the typed plan, not from text-first fallback. If the instantiator cannot realize a typed candidate, return `arcCoverage.route_frame_unrealizable` or `surfaceRealization.renderable_variant_missing`.

- [ ] **Step 12: Verify Task 22**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_composition_memory_index_test.dart \
  test/a1_semantic_compatibility_registry_test.dart \
  test/a1_dialogue_operation_registry_test.dart \
  test/a1_micro_situation_registry_test.dart \
  test/a1_candidate_repair_policy_test.dart \
  test/a1_surface_pattern_inventory_test.dart \
  test/a1_answer_expectation_contract_test.dart \
  test/a1_dialogue_candidate_generator_test.dart \
  test/a1_dialogue_candidate_scoring_test.dart \
  test/a1_lesson_proof_contract_test.dart \
  test/a1_coordinator_memory_profile_test.dart \
  test/a1_target_bundle_test.dart \
  test/a1_route_coherence_preflight_test.dart \
  test/a1_conversation_coherence_progression_audit_test.dart \
  test/a1_compiler_materialization_audit_test.dart \
  test/a1_coordinator_decision_audit_test.dart \
  test/a1_visible_itinerary_test.dart

cd ../../apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  test/a1_ui_completion_memory_regression_audit_test.dart \
  test/a1_memory_led_product_progression_audit_test.dart \
  --concurrency=1
```

Expected: PASS, or a first-failing owned blocker that names the missing operation, route frame, compatibility edge, metadata field, coherence relation, compiler stage, or evidence path.

- [ ] **Step 13: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_composition_memory_index.dart \
  packages/learning_core/lib/src/a1_semantic_compatibility_registry.dart \
  packages/learning_core/lib/src/a1_dialogue_operation_registry.dart \
  packages/learning_core/lib/src/a1_information_focus_policy.dart \
  packages/learning_core/lib/src/a1_route_frame_registry.dart \
  packages/learning_core/lib/src/a1_micro_situation_registry.dart \
  packages/learning_core/lib/src/a1_candidate_repair_policy.dart \
  packages/learning_core/lib/src/a1_surface_pattern_inventory.dart \
  packages/learning_core/lib/src/a1_answer_expectation_contract.dart \
  packages/learning_core/lib/src/a1_dialogue_candidate_generator.dart \
  packages/learning_core/lib/src/a1_dialogue_candidate_scoring.dart \
  packages/learning_core/lib/src/a1_coherence_validator.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/lib/src/a1_progression_contracts.dart \
  packages/learning_core/lib/src/a1_coordinator_memory_profile.dart \
  packages/learning_core/lib/src/a1_target_bundle.dart \
  packages/learning_core/lib/src/a1_growth_inventory.dart \
  packages/learning_core/lib/src/a1_route_capability_registry.dart \
  packages/learning_core/lib/src/a1_metadata_readiness_registry.dart \
  packages/learning_core/lib/src/a1_visible_itinerary.dart \
  packages/learning_core/lib/src/focus_coordinator.dart \
  packages/learning_core/lib/src/a1_conversation_arc_instantiator.dart \
  packages/learning_core/lib/src/mastery_lesson_compiler.dart \
  packages/learning_core/lib/src/a1_lesson_proof_contract.dart \
  packages/learning_core/test/a1_composition_memory_index_test.dart \
  packages/learning_core/test/a1_semantic_compatibility_registry_test.dart \
  packages/learning_core/test/a1_dialogue_operation_registry_test.dart \
  packages/learning_core/test/a1_micro_situation_registry_test.dart \
  packages/learning_core/test/a1_candidate_repair_policy_test.dart \
  packages/learning_core/test/a1_surface_pattern_inventory_test.dart \
  packages/learning_core/test/a1_answer_expectation_contract_test.dart \
  packages/learning_core/test/a1_dialogue_candidate_generator_test.dart \
  packages/learning_core/test/a1_dialogue_candidate_scoring_test.dart \
  packages/learning_core/test/a1_lesson_proof_contract_test.dart \
  packages/learning_core/test/a1_coordinator_memory_profile_test.dart \
  packages/learning_core/test/a1_target_bundle_test.dart \
  packages/learning_core/test/a1_route_coherence_preflight_test.dart \
  packages/learning_core/test/a1_conversation_coherence_progression_audit_test.dart \
  packages/learning_core/test/a1_compiler_materialization_audit_test.dart \
  packages/learning_core/test/a1_coordinator_decision_audit_test.dart \
  packages/learning_core/test/a1_visible_itinerary_test.dart \
  apps/mobile/lib/features/practice/focus_evidence_writer.dart \
  apps/mobile/lib/shared/persistence/learner_memory_repository.dart \
  apps/mobile/lib/features/practice/session_controller.dart \
  apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  apps/mobile/test/a1_ui_completion_memory_regression_audit_test.dart \
  apps/mobile/test/a1_memory_led_product_progression_audit_test.dart
git commit -m "feat: add deterministic A1 dialogue composition"
```

## Task 22.0: Global Composition Product Shape Risk Gates

**Purpose:** Add a shared product-shape gate report before Tasks 22A-D so every memory, metadata, generation, coherence, and audit slice must say whether it is moving the app toward the intended global conversational behavior or exposing an owned blocker.

**Audit finding addressed:** The plan can otherwise complete local components while the product still repeats the same lesson shape, hides typed ineligibility behind legacy fallback, only works for seeded study/work examples, downgrades most complex attempts, or fails to prove that UI-written memory unlocks the same typed path as backend seed memory.

**Remediation Decision Record:**

```text
productFailure: global composition work can pass local tests while organic lessons still repeat, downgrade, or fall back
firstFailingLayer: productAudit.risk_gates_missing
evidence: stakeholder identified risks across memory projection/writeback, seeded vs organic proof, globality, surface bottleneck, coherence strictness, coherence looseness, scoring repetition, thought-depth progression, metadata readiness, and fallback masking
selectedRepair: add a shared risk gate model/report and require Tasks 22A-D to run or update it during verification
whyThisRepairFirst: prevents moving from one slice to the next when product-shape failures are visible but unowned
productionBehaviorChanged: none; audit/report behavior only
backendProof: risk gate test renders all ten gates with owner codes, statuses, required next actions, and blocking task list
uiProductCheckpoint: no UI behavior change; later UI product audits must feed the same gate report
remainingOwnedBlocker: gates may warn or report notMeasured in early slices, but product readiness cannot be claimed with fail rows that lack owner, evidence, and next action
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_global_composition_risk_gate_audit.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`

**Tests:**

- Create: `packages/learning_core/test/a1_global_composition_risk_gate_audit_test.dart`

- [ ] **Step 1: Write the failing risk gate audit model test**

Create `packages/learning_core/test/a1_global_composition_risk_gate_audit_test.dart` with this coverage:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1GlobalCompositionRiskGateAudit', () {
    test('baseline report includes every product-shape gate with owners and actions', () {
      final report = A1GlobalCompositionRiskGateAudit.currentBaseline();

      expect(
        report.rows.map((row) => row.gateId).toSet(),
        equals(A1GlobalCompositionRiskGateId.values.toSet()),
      );

      expect(report.rows, hasLength(10));
      for (final row in report.rows) {
        expect(row.ownerCode, isNotEmpty, reason: row.gateId.name);
        expect(row.evidence, isNotEmpty, reason: row.gateId.name);
        expect(row.requiredNextAction, isNotEmpty, reason: row.gateId.name);
        expect(row.printedAuditSection, isNotEmpty, reason: row.gateId.name);
      }
    });

    test('readiness is blocked when a failed gate has no owner evidence or action', () {
      final report = A1GlobalCompositionRiskGateReport(rows: [
        for (final id in A1GlobalCompositionRiskGateId.values)
          A1GlobalCompositionRiskGateRow(
            gateId: id,
            status: id == A1GlobalCompositionRiskGateId.memoryProjection
                ? A1GlobalCompositionRiskGateStatus.fail
                : A1GlobalCompositionRiskGateStatus.pass,
            firstFailingLayer: id == A1GlobalCompositionRiskGateId.memoryProjection
                ? 'memoryProfile'
                : 'none',
            ownerCode: id == A1GlobalCompositionRiskGateId.memoryProjection
                ? ''
                : 'productAudit',
            evidence: id == A1GlobalCompositionRiskGateId.memoryProjection
                ? ''
                : 'gate passed',
            requiredNextAction: id == A1GlobalCompositionRiskGateId.memoryProjection
                ? ''
                : 'continue',
            blockingTaskIds: id == A1GlobalCompositionRiskGateId.memoryProjection
                ? const ['22A']
                : const <String>[],
            printedAuditSection: id == A1GlobalCompositionRiskGateId.memoryProjection
                ? ''
                : 'risk-gates',
          ),
      ]);

      final validation = report.validate();

      expect(validation.isReadyForProductClaim, isFalse);
      expect(
        validation.blockers,
        contains(
          'memoryProjection fail requires ownerCode, evidence, requiredNextAction, and printedAuditSection',
        ),
      );
    });

    test('seeded and organic evidence must be named separately', () {
      final row = A1GlobalCompositionRiskGateRow(
        gateId: A1GlobalCompositionRiskGateId.seededVsOrganic,
        status: A1GlobalCompositionRiskGateStatus.warning,
        firstFailingLayer: 'uiEvidenceLoop',
        ownerCode: 'uiEvidenceLoop.seeded_organic_blurred',
        evidence: 'seeded candidates pass; organic UI completion has not produced semantic facts',
        requiredNextAction:
            'print seeded and organic audit sections separately before claiming typed readiness',
        blockingTaskIds: const ['22A', '22D'],
        printedAuditSection: 'seeded-vs-organic',
      );

      expect(row.namesSeededAndOrganicEvidence, isTrue);
    });
  });
}
```

- [ ] **Step 2: Run the risk gate audit test and confirm the missing type failure**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test test/a1_global_composition_risk_gate_audit_test.dart
```

Expected: FAIL with missing definitions for `A1GlobalCompositionRiskGateAudit`, `A1GlobalCompositionRiskGateReport`, `A1GlobalCompositionRiskGateRow`, `A1GlobalCompositionRiskGateId`, and `A1GlobalCompositionRiskGateStatus`.

- [ ] **Step 3: Implement the risk gate audit model**

Create `packages/learning_core/lib/src/a1_global_composition_risk_gate_audit.dart` with these public types and fields:

```dart
enum A1GlobalCompositionRiskGateId {
  memoryProjection,
  seededVsOrganic,
  globality,
  surfaceBottleneck,
  coherenceTooStrict,
  coherenceTooLoose,
  scoringRepetition,
  thoughtDepthProgression,
  metadataIslandReadiness,
  fallbackMasking,
}

enum A1GlobalCompositionRiskGateStatus {
  pass,
  warning,
  fail,
  notMeasured,
}

class A1GlobalCompositionRiskGateRow {
  const A1GlobalCompositionRiskGateRow({
    required this.gateId,
    required this.status,
    required this.firstFailingLayer,
    required this.ownerCode,
    required this.evidence,
    required this.requiredNextAction,
    required this.blockingTaskIds,
    required this.printedAuditSection,
  });

  final A1GlobalCompositionRiskGateId gateId;
  final A1GlobalCompositionRiskGateStatus status;
  final String firstFailingLayer;
  final String ownerCode;
  final String evidence;
  final String requiredNextAction;
  final List<String> blockingTaskIds;
  final String printedAuditSection;

  bool get namesSeededAndOrganicEvidence {
    if (gateId != A1GlobalCompositionRiskGateId.seededVsOrganic) {
      return true;
    }
    final combined = '${evidence.toLowerCase()} ${requiredNextAction.toLowerCase()}';
    return combined.contains('seeded') && combined.contains('organic');
  }
}

class A1GlobalCompositionRiskGateValidation {
  const A1GlobalCompositionRiskGateValidation({
    required this.blockers,
  });

  final List<String> blockers;

  bool get isReadyForProductClaim => blockers.isEmpty;
}

class A1GlobalCompositionRiskGateReport {
  const A1GlobalCompositionRiskGateReport({
    required this.rows,
  });

  final List<A1GlobalCompositionRiskGateRow> rows;

  A1GlobalCompositionRiskGateValidation validate() {
    final blockers = <String>[];
    final seen = rows.map((row) => row.gateId).toSet();
    for (final gateId in A1GlobalCompositionRiskGateId.values) {
      if (!seen.contains(gateId)) {
        blockers.add('${gateId.name} gate is missing from risk report');
      }
    }

    for (final row in rows) {
      final missingFailureEvidence = row.status == A1GlobalCompositionRiskGateStatus.fail &&
          (row.ownerCode.trim().isEmpty ||
              row.evidence.trim().isEmpty ||
              row.requiredNextAction.trim().isEmpty ||
              row.printedAuditSection.trim().isEmpty);
      if (missingFailureEvidence) {
        blockers.add(
          '${row.gateId.name} fail requires ownerCode, evidence, requiredNextAction, and printedAuditSection',
        );
      }

      if (!row.namesSeededAndOrganicEvidence) {
        blockers.add(
          '${row.gateId.name} must name seeded and organic evidence separately',
        );
      }
    }

    return A1GlobalCompositionRiskGateValidation(blockers: blockers);
  }

  String toAuditMarkdown() {
    final buffer = StringBuffer('### Global Composition Risk Gates\n\n');
    for (final row in rows) {
      buffer.writeln('- ${row.gateId.name}: ${row.status.name}');
      buffer.writeln('  - firstFailingLayer: ${row.firstFailingLayer}');
      buffer.writeln('  - ownerCode: ${row.ownerCode}');
      buffer.writeln('  - evidence: ${row.evidence}');
      buffer.writeln('  - requiredNextAction: ${row.requiredNextAction}');
      buffer.writeln('  - blockingTaskIds: ${row.blockingTaskIds.join(', ')}');
      buffer.writeln('  - printedAuditSection: ${row.printedAuditSection}');
    }
    return buffer.toString();
  }
}

class A1GlobalCompositionRiskGateAudit {
  const A1GlobalCompositionRiskGateAudit._();

  static A1GlobalCompositionRiskGateReport currentBaseline() {
    return const A1GlobalCompositionRiskGateReport(rows: [
      A1GlobalCompositionRiskGateRow(
        gateId: A1GlobalCompositionRiskGateId.memoryProjection,
        status: A1GlobalCompositionRiskGateStatus.warning,
        firstFailingLayer: 'memoryProfile',
        ownerCode: 'memoryProfile.semantic_projection_not_organic_yet',
        evidence: 'seeded semantic inventories can drive typed candidates; organic completion still needs Task 22A proof',
        requiredNextAction: 'Task 22A must print projected roles, semantic facts, missing metadata, and writeback source',
        blockingTaskIds: ['22A'],
        printedAuditSection: 'memory-projection',
      ),
      A1GlobalCompositionRiskGateRow(
        gateId: A1GlobalCompositionRiskGateId.seededVsOrganic,
        status: A1GlobalCompositionRiskGateStatus.warning,
        firstFailingLayer: 'uiEvidenceLoop',
        ownerCode: 'uiEvidenceLoop.seeded_organic_not_proven_equal',
        evidence: 'seeded typed generation is available; organic UI-written semantic facts are not yet proven equivalent',
        requiredNextAction: 'Task 22A and Task 22D must print seeded and organic transcripts in separate audit sections',
        blockingTaskIds: ['22A', '22D'],
        printedAuditSection: 'seeded-vs-organic',
      ),
      A1GlobalCompositionRiskGateRow(
        gateId: A1GlobalCompositionRiskGateId.globality,
        status: A1GlobalCompositionRiskGateStatus.notMeasured,
        firstFailingLayer: 'arcCoverage',
        ownerCode: 'arcCoverage.globality_not_measured',
        evidence: 'candidate output has not yet been required to span six or more islands and five or more operations',
        requiredNextAction: 'Task 22B must measure represented islands, operations, question demands, and thought rungs',
        blockingTaskIds: ['22B', '22D'],
        printedAuditSection: 'globality',
      ),
      A1GlobalCompositionRiskGateRow(
        gateId: A1GlobalCompositionRiskGateId.surfaceBottleneck,
        status: A1GlobalCompositionRiskGateStatus.notMeasured,
        firstFailingLayer: 'surfaceRealization',
        ownerCode: 'surfaceRealization.variant_capacity_not_measured',
        evidence: 'surface inventory has not yet proven multiple renderable forms per proposition plan',
        requiredNextAction: 'Task 22C must print realized variants per operation and flag any one-shape bottleneck',
        blockingTaskIds: ['22C'],
        printedAuditSection: 'surface-bottleneck',
      ),
      A1GlobalCompositionRiskGateRow(
        gateId: A1GlobalCompositionRiskGateId.coherenceTooStrict,
        status: A1GlobalCompositionRiskGateStatus.notMeasured,
        firstFailingLayer: 'arcCoherence',
        ownerCode: 'arcCoherence.strictness_not_measured',
        evidence: 'downgrade ratio and first-pass coherence ratio are not yet measured for global seeded inventories',
        requiredNextAction: 'Task 22C must report first-pass coherence ratio and downgrade ratio before selection',
        blockingTaskIds: ['22C', '22D'],
        printedAuditSection: 'coherence-strictness',
      ),
      A1GlobalCompositionRiskGateRow(
        gateId: A1GlobalCompositionRiskGateId.coherenceTooLoose,
        status: A1GlobalCompositionRiskGateStatus.warning,
        firstFailingLayer: 'arcCoherence',
        ownerCode: 'arcCoherence.semantic_naturalness_not_ai_judged',
        evidence: 'deterministic rules can reject known impossible combinations but cannot yet judge every odd-but-grammatical sentence',
        requiredNextAction: 'Task 22C must enforce situation rules; Task 22D must expose AI-ready naturalness adapter inputs without runtime dependency',
        blockingTaskIds: ['22C', '22D'],
        printedAuditSection: 'coherence-looseness',
      ),
      A1GlobalCompositionRiskGateRow(
        gateId: A1GlobalCompositionRiskGateId.scoringRepetition,
        status: A1GlobalCompositionRiskGateStatus.notMeasured,
        firstFailingLayer: 'coordinatorPolicy',
        ownerCode: 'coordinatorPolicy.repetition_pressure_not_measured',
        evidence: 'selection has not yet shown route, operation, demand, and surface novelty over twelve or more sessions',
        requiredNextAction: 'Task 22D must print repetition pressure and selected transcript diversity across the audit window',
        blockingTaskIds: ['22D'],
        printedAuditSection: 'scoring-repetition',
      ),
      A1GlobalCompositionRiskGateRow(
        gateId: A1GlobalCompositionRiskGateId.thoughtDepthProgression,
        status: A1GlobalCompositionRiskGateStatus.notMeasured,
        firstFailingLayer: 'arcCoverage',
        ownerCode: 'arcCoverage.thought_depth_not_measured',
        evidence: 'known vocabulary has not yet been proven to unlock higher answer rungs and multi-proposition replies',
        requiredNextAction: 'Task 22B must plan thought rungs; Task 22D must print the most complex selected transcript and rung id',
        blockingTaskIds: ['22B', '22D'],
        printedAuditSection: 'thought-depth',
      ),
      A1GlobalCompositionRiskGateRow(
        gateId: A1GlobalCompositionRiskGateId.metadataIslandReadiness,
        status: A1GlobalCompositionRiskGateStatus.warning,
        firstFailingLayer: 'metadataReadiness',
        ownerCode: 'metadataReadiness.island_manifest_incomplete',
        evidence: 'some vocabulary can still lack island, proposition-role, compatibility, or surface-form metadata',
        requiredNextAction: 'Task 22B must fail closed with missing metadata rows instead of adding generator branches',
        blockingTaskIds: ['22B'],
        printedAuditSection: 'metadata-island-readiness',
      ),
      A1GlobalCompositionRiskGateRow(
        gateId: A1GlobalCompositionRiskGateId.fallbackMasking,
        status: A1GlobalCompositionRiskGateStatus.warning,
        firstFailingLayer: 'typedEligibility',
        ownerCode: 'typedEligibility.legacy_can_mask_typed_failure',
        evidence: 'starter legacy remains allowed, but typed-eligible seeded memory must hard-fail instead of silently selecting legacy',
        requiredNextAction: 'Task 22D must print typed eligibility, typed attempt count, fallback reason, and first owned blocker',
        blockingTaskIds: ['22D'],
        printedAuditSection: 'fallback-masking',
      ),
    ]);
  }
}
```

- [ ] **Step 4: Export the risk gate audit model**

Modify `packages/learning_core/lib/learning_core.dart`:

```dart
export 'src/a1_global_composition_risk_gate_audit.dart';
```

- [ ] **Step 5: Run the risk gate audit test and confirm it passes**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test test/a1_global_composition_risk_gate_audit_test.dart
```

Expected: PASS. The test proves the audit contract exists and the baseline report can carry fail, warning, pass, and notMeasured states without losing owners, evidence, next actions, or blocking task ids.

- [ ] **Step 6: Add the risk gate report to the standing audit report**

Modify `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md` by adding or replacing a section named `Global Composition Risk Gates`. The section must paste the current `toAuditMarkdown()` output after each Task 22A-D verification pass.

Required section shape:

```markdown
### Global Composition Risk Gates

- memoryProjection: warning
  - firstFailingLayer: memoryProfile
  - ownerCode: memoryProfile.semantic_projection_not_organic_yet
  - evidence: seeded semantic inventories can drive typed candidates; organic completion still needs Task 22A proof
  - requiredNextAction: Task 22A must print projected roles, semantic facts, missing metadata, and writeback source
  - blockingTaskIds: 22A
  - printedAuditSection: memory-projection
- seededVsOrganic: warning
  - firstFailingLayer: uiEvidenceLoop
  - ownerCode: uiEvidenceLoop.seeded_organic_not_proven_equal
  - evidence: seeded typed generation is available; organic UI-written semantic facts are not yet proven equivalent
  - requiredNextAction: Task 22A and Task 22D must print seeded and organic transcripts in separate audit sections
  - blockingTaskIds: 22A, 22D
  - printedAuditSection: seeded-vs-organic
```

The section must include all ten rows after each Task 22A-D verification pass. Do not summarize a fail or warning row away; the point of the section is to keep the crack visible until a later task repairs it.

- [ ] **Step 7: Verify Task 22.0**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test test/a1_global_composition_risk_gate_audit_test.dart
```

Expected: PASS. The report is not expected to make all gates pass yet; it is expected to prove every gate is named, owned, evidenced, and tied to a blocking task or next action.

## Task 22A: Semantic Memory Projection And Writeback Spine

**Purpose:** Make organic backend and UI lesson completion expose the typed semantic roles, facts, and shape evidence needed by the global composition engine. The typed path may use seeded memory for early audits, but production behavior cannot depend on test-only semantic facts.

**Audit finding addressed:** The backend 12-lesson typed audit can show `semanticFacts:0` even after completed lessons because normal memory writeback still records mostly legacy lexical/shape targets instead of durable semantic roles and facts.

**Remediation Decision Record:**

```text
productFailure: typed candidate generation works with seeded semantic memory but is not organically unlocked by normal lesson completion
firstFailingLayer: memoryProfile/uiEvidenceLoop with dependencies on metadataReadiness
evidence: current 12-lesson backend audit prints legacy selections and semanticFacts:0 across all rows
selectedRepair: add semantic projection registry, semantic fact registry, semantic evidence writeback, and audit fields that show raw ids, projected roles, derived facts, and missing metadata
whyThisRepairFirst: a global generator cannot work until the memory profile exposes typed semantic inputs across islands
productionBehaviorChanged: final conversation proof writes semantic role/fact evidence alongside canonical, surface, frame, grammar, phrase, and scenario evidence
backendProof: backend 12+ lesson audit shows non-zero projected roles/facts after completed lessons or exact blockers for missing metadata
uiProductCheckpoint: UI-started completion writes the same semantic evidence that backend synthetic completion writes
remainingOwnedBlocker: starter legacy lessons may remain allowed until typed beginner manifests exist, but once semantic inventory exists typed generation must be attempted
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_semantic_memory_projection_registry.dart`
- Create: `packages/learning_core/lib/src/a1_semantic_fact_registry.dart`
- Create: `packages/learning_core/lib/src/a1_semantic_memory_writeback_contract.dart`
- Modify: `packages/learning_core/lib/src/a1_composition_memory_index.dart`
- Modify: `packages/learning_core/lib/src/a1_lesson_proof_contract.dart`
- Modify: `packages/learning_core/lib/src/learner_memory.dart`
- Modify: `packages/learning_core/lib/src/mastery_memory_graph.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `apps/mobile/lib/features/practice/focus_evidence_writer.dart`
- Modify: `apps/mobile/lib/features/practice/session_controller.dart`
- Modify: `apps/mobile/lib/shared/persistence/learner_memory_repository.dart`
- Modify if needed: `apps/mobile/lib/shared/persistence/app_database.dart`
- Regenerate if schema changes: `apps/mobile/lib/shared/persistence/app_database.g.dart`

**Tests:**

- Create: `packages/learning_core/test/a1_semantic_memory_projection_registry_test.dart`
- Create: `packages/learning_core/test/a1_semantic_fact_registry_test.dart`
- Create: `packages/learning_core/test/a1_semantic_memory_writeback_contract_test.dart`
- Modify: `packages/learning_core/test/a1_composition_memory_index_test.dart`
- Modify: `packages/learning_core/test/a1_backend_twelve_lesson_typed_audit_test.dart`
- Modify: `apps/mobile/test/a1_ui_completion_memory_regression_audit_test.dart`
- Modify: `apps/mobile/test/learner_memory_repository_test.dart`
- Modify: `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`

- [ ] **Step 1: Write semantic projection tests**

Create `packages/learning_core/test/a1_semantic_memory_projection_registry_test.dart` with cases that prove safe projection and fail-closed projection.

Required positive mappings:

```text
daily.action.study -> predicate.study
daily.action.work -> predicate.work
time.tomorrow -> time.tomorrow
time.today -> time.today
place.school -> place.school
connector.because -> connector.because with function reason
preference.item -> preference.item as category object role
possession.object -> possession.object as category object role
description.size.small -> description.size.small as attribute role
person.relationship.brother -> person.relationship.brother as person role
```

Required fail-closed mappings:

```text
time.anchor does not become time.today or time.tomorrow
daily.activity does not become predicate.study or predicate.work
home.object does not become a specific concrete object
connector.general does not become reason, contrast, sequence, or condition
unknown target ids return metadataReadiness.semantic_role_missing:<targetId>
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test test/a1_semantic_memory_projection_registry_test.dart
```

Expected before implementation: FAIL because `A1SemanticMemoryProjectionRegistry` does not exist.

- [ ] **Step 2: Implement semantic projection registry**

Create `A1SemanticMemoryProjectionRegistry` with immutable mapping rows:

```text
sourceTargetId
semanticRoleId
semanticRoleKind
semanticFamilyId
connectorFunction
projectionConfidence
requiresMetadataIds
findingWhenUnsafe
```

The implementation must expose:

```text
projectTarget(String targetId)
projectTargets(Iterable<String> targetIds)
findingsFor(Iterable<String> targetIds)
```

Projection confidence must be one of:

```text
direct
metadataBacked
categoryOnly
unsafe
unknown
```

Only `direct`, `metadataBacked`, and approved `categoryOnly` projections may enter typed candidate generation. `unsafe` and `unknown` projections become audit findings.

- [ ] **Step 3: Write semantic fact derivation tests**

Create `packages/learning_core/test/a1_semantic_fact_registry_test.dart`.

Required facts:

```text
predicate.study + place.school -> fact.study.self.place.school
predicate.study + time.tomorrow -> fact.study.self.time.tomorrow
predicate.study + topic.history -> fact.study.self.topic.history
predicate.work + time.today -> fact.work.self.time.today
predicate.have + possession.object -> fact.have.self.possession.object
possession.object + description.size.small -> fact.possession.object.description.size
predicate.like + preference.item -> fact.like.self.preference.item
person.relationship.brother + predicate.study -> fact.person.relationship.activity
```

Required negatives:

```text
predicate.study + time.anchor does not derive a specific time fact
preference.item alone does not derive fact.like.self.preference.item
connector.because alone does not derive any reason fact
description.size.small alone does not derive an object attribute fact
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test test/a1_semantic_fact_registry_test.dart
```

Expected before implementation: FAIL because `A1SemanticFactRegistry` does not exist.

- [ ] **Step 4: Implement semantic fact registry and integrate memory index**

Create `A1SemanticFactRegistry` with:

```text
deriveFacts(A1ProjectedSemanticInventory inventory)
factsForRoles(Set<String> roleIds)
missingFactPreconditions(A1ProjectedSemanticInventory inventory)
```

Modify `A1CompositionMemoryIndex.fromProfile` so it reads projection results before using any legacy prefix fallback. The index must expose:

```text
rawMemoryTargetIds
projectedSemanticRoleIds
projectedSemanticRolesByKind
projectionFindings
practicedSemanticFactIds
factDerivationFindings
typedEligibilityBlockers
```

The existing direct prefix behavior may remain only as a temporary compatibility fallback, and it must emit `metadataReadiness.prefix_projection_used:<targetId>` so audits can see where metadata still needs cleanup.

- [ ] **Step 5: Write semantic writeback tests**

Create `packages/learning_core/test/a1_semantic_memory_writeback_contract_test.dart` and update `apps/mobile/test/a1_ui_completion_memory_regression_audit_test.dart`.

The tests must complete a lesson whose final conversation proves:

```text
predicate.study
place.school
time.tomorrow
a1.frame.activity.time_place
a1.focus.where
a1.relation.question_focus_answered
a1.thought.depth_3_clause_with_time_place_topic
```

Expected writeback:

```text
canonical lexical proof remains present
surface/component/form proof remains present
frame/scenario/grammar/phrase shape proof remains present
semantic role evidence includes predicate.study, place.school, time.tomorrow
semantic fact evidence includes fact.study.self.place.school and fact.study.self.time.tomorrow
```

The UI regression must fail with `uiEvidenceLoop.semantic_fact_missing_from_event` if the UI event omits semantic fact evidence and `uiEvidenceLoop.semantic_fact_missing_from_rollups` if persistence drops it.

- [ ] **Step 6: Implement semantic writeback contract**

Add `A1SemanticMemoryWritebackContract` with:

```text
semanticRoleTargetIdsFor(A1LessonProofContract contract, String canonicalTargetId)
semanticFactTargetIdsFor(A1LessonProofContract contract, String canonicalTargetId)
semanticShapeTargetIdsFor(A1LessonProofContract contract, String canonicalTargetId)
```

Modify `LearningEvent` and `MasteryGraphEvidenceEvent` only if existing target kind lists cannot preserve semantic roles/facts without ambiguity. Preferred target kinds:

```text
semanticRole
semanticFact
```

If adding enum values requires persistence changes, update `app_database.dart`, regenerate the Drift file, and add repository migration coverage. If semantic roles/facts can be stored as scenario/frame evidence without losing meaning, do not change schema; instead add typed ids and audit fields that prove they survive.

- [ ] **Step 7: Upgrade 12+ lesson typed audit**

Modify `packages/learning_core/test/a1_backend_twelve_lesson_typed_audit_test.dart` so every row prints:

```text
rawMemoryTargetIds
projectedSemanticRoleIds
projectionFindings
semanticFacts
typedEligibilityBlockers
typedCandidatesGenerated
typedSelected
fallbackReason
full final conversation transcript
```

The audit may still allow legacy rows during starter memory, but after a seeded semantic inventory it must assert:

```text
semanticFactsCount > 0
typedCandidatesGenerated > 0
at least one selected typed candidate or exact owned blocker
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test test/a1_backend_twelve_lesson_typed_audit_test.dart
```

Expected after implementation: PASS and printed output explains whether typed is organic, seeded-only, or blocked by exact memory/metadata gaps.

- [ ] **Step 8: Verify Task 22A**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_semantic_memory_projection_registry_test.dart \
  test/a1_semantic_fact_registry_test.dart \
  test/a1_semantic_memory_writeback_contract_test.dart \
  test/a1_global_composition_risk_gate_audit_test.dart \
  test/a1_composition_memory_index_test.dart \
  test/a1_backend_twelve_lesson_typed_audit_test.dart

cd ../../apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_ui_completion_memory_regression_audit_test.dart \
  test/learner_memory_repository_test.dart \
  test/a1_memory_led_product_progression_audit_test.dart \
  --concurrency=1
```

Expected: PASS, or a first-failing owned blocker naming memory projection, metadata projection, semantic fact derivation, UI event write, persistence, rollup, or profile consumption.

After the run, replace `Global Composition Risk Gates` in `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md` with the current ten-row gate report. Task 22A may leave non-22A gates as `warning` or `notMeasured`, but memory projection, seeded-vs-organic evidence, and fallback masking must have explicit owner codes and next actions.

## Task 22B: Global Proposition And Island Manifest Contracts

**Purpose:** Replace fixture-style typed generation with global contracts that let the same operations work across daily activities, food/drink, preferences, shopping/possessions, people, movement/place, feelings/states, and repair.

**Audit finding addressed:** The seeded typed generator currently proves only five examples. It does not prove the product can keep expanding as vocabulary grows or as the user moves across islands.

**Remediation Decision Record:**

```text
productFailure: hardcoded candidates cannot scale beyond a niche memory example
firstFailingLayer: arcCoverage.global_composition_contract_missing
evidence: current A1DialogueCandidateGenerator.initial() produces a small fixed set even from rich memory
selectedRepair: add proposition graph, island manifests, global operation schemas, question demand contracts, answer shape schemas, thought-depth planner, and seeded cross-island fixtures
whyThisRepairFirst: the generator must have a global search space before coherence and scoring can prove real product growth
productionBehaviorChanged: candidate generation iterates over manifests, operations, question demands, and facts instead of candidate-specific if branches
backendProof: seeded multi-island inventory produces candidates across at least six islands without adding candidate-id branches
uiProductCheckpoint: no UI change yet; UI tests consume the same generated candidate traces later
remainingOwnedBlocker: surface realization may still block some global plans until Task 22C
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_proposition_graph.dart`
- Create: `packages/learning_core/lib/src/a1_island_composition_manifest_registry.dart`
- Create: `packages/learning_core/lib/src/a1_fact_graph.dart`
- Create: `packages/learning_core/lib/src/a1_operation_schema_registry.dart`
- Create: `packages/learning_core/lib/src/a1_question_demand_contract.dart`
- Create: `packages/learning_core/lib/src/a1_answer_shape_schema_registry.dart`
- Create: `packages/learning_core/lib/src/a1_thought_depth_planner.dart`
- Modify: `packages/learning_core/lib/src/a1_dialogue_candidate_generator.dart`
- Modify: `packages/learning_core/lib/src/a1_dialogue_operation_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_route_frame_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_information_focus_policy.dart`
- Modify: `packages/learning_core/lib/src/a1_micro_situation_registry.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`

**Tests:**

- Create: `packages/learning_core/test/a1_proposition_graph_test.dart`
- Create: `packages/learning_core/test/a1_island_composition_manifest_registry_test.dart`
- Create: `packages/learning_core/test/a1_fact_graph_test.dart`
- Create: `packages/learning_core/test/a1_operation_schema_registry_test.dart`
- Create: `packages/learning_core/test/a1_question_demand_contract_test.dart`
- Create: `packages/learning_core/test/a1_answer_shape_schema_registry_test.dart`
- Create: `packages/learning_core/test/a1_thought_depth_planner_test.dart`
- Modify: `packages/learning_core/test/a1_dialogue_candidate_generator_test.dart`
- Modify: `packages/learning_core/test/a1_micro_situation_registry_test.dart`

- [ ] **Step 1: Write proposition graph tests**

Create `a1_proposition_graph_test.dart`.

Required model behavior:

```text
proposition has predicateRef, subjectRef, objectRefs, timeRef, placeRef, topicRef, attributeRefs, stateRefs, polarity, sourceFactIds
relation has sourcePropositionId, targetPropositionId, relationType, requiredConnectorFunction
graph can report required roles, required connectors, source semantic facts, and target thought depth
graph rejects relation ids pointing at missing proposition ids
graph is stable-sorted for deterministic candidate ids
```

Acceptance examples:

```text
want tea now because thirsty:
  claim: predicate.want + object.drink.tea + time.now
  reason: state.thirsty
  relation: reason_supports_claim

need big bag because big book:
  claim: predicate.need + object.bag + attribute.big
  reason: predicate.have + object.book + attribute.big
  relation: containment_reason_supports_need

repair request:
  claim: predicate.understand negated
  request: action.say_again_slowly
  relation: repair_request_follows_confusion
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test test/a1_proposition_graph_test.dart
```

Expected before implementation: FAIL because proposition graph types do not exist.

- [ ] **Step 2: Implement proposition graph**

Create immutable graph types:

```text
A1PropositionGraph
A1PropositionNode
A1PropositionRelation
A1PropositionRoleRef
A1PropositionRelationType
A1PropositionGraphValidationResult
```

Relation types must include:

```text
answers_question
reason_supports_claim
contrast_between_claims
sequence_next_event
confirmation
correction
repair_request
state_explains_action
constraint_explains_need
```

The graph must expose deterministic ids so scoring and audits can fingerprint proposition shape separately from surface text.

- [ ] **Step 3: Write island manifest tests**

Create `a1_island_composition_manifest_registry_test.dart`.

Required first manifests:

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

Each manifest must declare:

```text
slotPoolIds
compatiblePredicateFamilies
allowedOperationIds
allowedQuestionDemandIds
allowedThoughtDepthRungs
routeFrameIds
surfacePatternFamilyIds
coherenceRelationIds
situationRuleIds
minimumRotationCoverage
```

Test assertions:

```text
ask_why appears in at least food_and_drink, shopping_possessions, people_relationships, feelings_states, movement_places
ask_where appears in at least daily_activities, food_and_drink, shopping_possessions, people_relationships, movement_places
contrast appears in at least preferences_opinions, food_and_drink, shopping_possessions, feelings_states
conversation_repair supports repair_request without requiring food/study-specific metadata
every manifest has at least one direct clause rung and one revisit/support-growth rung
```

- [ ] **Step 4: Implement island manifest registry**

Create `A1IslandCompositionManifestRegistry` and model:

```text
A1IslandCompositionManifest
A1IslandRotationCoverage
A1IslandManifestReadinessResult
```

The registry must not contain final surface strings. It may contain acceptance examples as ids only. If a manifest row points to a missing operation, question demand, thought rung, route frame, surface pattern, or coherence relation, readiness returns an owned blocker:

```text
arcCoverage.manifest_operation_missing:<islandId>/<operationId>
arcCoverage.manifest_question_demand_missing:<islandId>/<questionDemandId>
arcCoverage.manifest_thought_rung_missing:<islandId>/<rungId>
metadataReadiness.manifest_surface_pattern_missing:<islandId>/<patternFamilyId>
arcCoherence.manifest_relation_missing:<islandId>/<relationId>
```

- [ ] **Step 5: Write operation, demand, and answer-shape tests**

Create `a1_operation_schema_registry_test.dart`, `a1_question_demand_contract_test.dart`, and `a1_answer_shape_schema_registry_test.dart`.

Required global operations:

```text
ask_what
ask_where
ask_when
ask_yes_no
ask_reason
offer_alternative
confirm_or_correct
add_time
add_place
add_attribute
add_quantity
add_reason
add_contrast
combine_two_known_facts
sequence_events
expand_to_two_sentences
repair_request
```

Required question demands:

```text
ask_what_direct -> direct claim
ask_where_detail -> claim + place
ask_when_detail -> claim + time
ask_what_topic -> claim + topic/object
ask_why_reason -> claim + reason proposition + reason connector
ask_choice_contrast -> contrastable facts or values
ask_confirm_or_correct -> confirmation or correction
ask_sequence_next -> two compatible event propositions
ask_repair_request -> repair state + repair action/request
```

Required answer shape schemas:

```text
direct_clause
clause_with_one_detail
clause_with_two_details
claim_with_reason
contrast_with_reason
two_event_sequence
two_sentence_connected_answer
repair_request_answer
```

Tests must prove each demand names a minimum answer shape, each answer shape names required proposition roles/relations, and each operation declares max learner load.

- [ ] **Step 6: Implement operation, question demand, and answer-shape registries**

Implement:

```text
A1OperationSchemaRegistry
A1QuestionDemandContract
A1AnswerShapeSchemaRegistry
```

Each registry must expose readiness methods:

```text
operation(String id)
questionDemand(String id)
answerShape(String id)
compatibleForIsland(A1IslandCompositionManifest manifest)
findMissingDependencies(...)
```

Do not duplicate the old operation/focus registries. Either migrate those registries to these schemas or make the old registries thin adapters around the new global schemas.

- [ ] **Step 7: Write fact graph and thought-depth planner tests**

Create `a1_fact_graph_test.dart` and `a1_thought_depth_planner_test.dart`.

Fact graph tests must prove:

```text
separately learned tea + thirsty can form a food/drink reason proposition when connector.because exists
separately learned bag + big + book can form a shopping need/constraint proposition only when size compatibility is coherent
separately learned brother + home + tired can form people state/location propositions
separately learned tired + work + home can form feelings-to-action propositions
separately learned understand-negated + again/slowly can form repair_request proposition
```

Thought-depth planner tests must prove:

```text
few known roles selects direct_clause or one_detail
known predicate + object + time/place selects clause_with_two_details
known claim + reason fact + connector selects claim_with_reason
known contrastable facts selects contrast_with_reason
known two compatible events selects sequence
high recent success and enough facts selects two_sentence_connected_answer
missing verified forms blocks rung instead of selecting it
```

- [ ] **Step 8: Implement fact graph and thought-depth planner**

Create `A1FactGraph` that consumes `A1SemanticFactRegistry`, `A1SemanticCompatibilityRegistry`, island manifests, and projected inventory.

Create `A1ThoughtDepthPlanner` with policy fields:

```text
minimumKnownRolesByRung
minimumFactCountByRung
requiredConnectorFunctionsByRung
maxNewLexicalItemsByRung
maxNewFormItemsByRung
recentSuccessThresholdByRung
fallbackRungWhenBlocked
```

Planner output must include:

```text
selectedRung
eligibleRungs
blockedRungs
blockerCodes
reason
```

- [ ] **Step 9: Upgrade generator test from five fixtures to global output**

Modify `a1_dialogue_candidate_generator_test.dart` so the rich seeded inventory expects:

```text
at least 18 candidate plans
at least 6 represented islands
at least 5 global operations
at least 5 question demands
at least 5 thought rungs
the original 5 golden fixture shapes still reproducible
```

Add a second seed that introduces a new food/drink item through metadata and proves candidate count changes without adding a new candidate-specific branch.

- [ ] **Step 10: Verify Task 22B**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_proposition_graph_test.dart \
  test/a1_island_composition_manifest_registry_test.dart \
  test/a1_fact_graph_test.dart \
  test/a1_operation_schema_registry_test.dart \
  test/a1_question_demand_contract_test.dart \
  test/a1_answer_shape_schema_registry_test.dart \
  test/a1_thought_depth_planner_test.dart \
  test/a1_global_composition_risk_gate_audit_test.dart \
  test/a1_dialogue_candidate_generator_test.dart \
  test/a1_micro_situation_registry_test.dart
```

Expected: PASS, with the generator proving global plan count and cross-island coverage. If this passes only because of hardcoded candidate ids, the test must fail by checking that candidates reference global operation, island manifest, question demand, answer shape, and proposition graph ids.

After the run, replace `Global Composition Risk Gates` in `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md` with the current ten-row gate report. Task 22B must update globality, thought-depth progression, metadata island readiness, and seeded-vs-organic evidence rather than leaving those rows stale.

## Task 22C: Coherence-First Candidate Factory And Surface Realization

**Purpose:** Make coherence part of candidate construction instead of relying on frequent repair or downgrade. Repair and downgrade remain safety rails and audit signals, not the engine.

**Audit finding addressed:** A generator that creates longer sentences can still produce logically awkward or wrong lessons, such as a reason relation that is grammatically valid but situation-incoherent.

**Remediation Decision Record:**

```text
productFailure: longer generated answers can be structurally valid but logically awkward or incoherent
firstFailingLayer: arcCoherence.coherence_by_construction_missing
evidence: examples like need small bag because big book show surface-valid text is not enough
selectedRepair: add situation rules, coherent candidate factory, first-pass coherence metrics, and surface realization from proposition plans
whyThisRepairFirst: if incoherence is common, thought-depth growth will keep downgrading and the product will feel stuck
productionBehaviorChanged: candidates are emitted only after proposition, situation, discourse, thought-rung, and surface-safety checks pass
backendProof: cross-island negative fixtures are rejected before surface realization and downgrade rate is audited
uiProductCheckpoint: printed 12+ lesson UI/backend audits show coherence status and downgrade rate
remainingOwnedBlocker: AI naturalness can later improve awkward but valid outputs; it cannot replace deterministic coherence
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_situation_rule_registry.dart`
- Create: `packages/learning_core/lib/src/a1_coherent_candidate_factory.dart`
- Create: `packages/learning_core/lib/src/a1_surface_plan_realizer.dart`
- Create: `packages/learning_core/lib/src/a1_composition_health_metrics.dart`
- Modify: `packages/learning_core/lib/src/a1_coherence_validator.dart`
- Modify: `packages/learning_core/lib/src/a1_candidate_repair_policy.dart`
- Modify: `packages/learning_core/lib/src/a1_surface_pattern_inventory.dart`
- Modify: `packages/learning_core/lib/src/a1_conversation_arc_instantiator.dart`
- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`

**Tests:**

- Create: `packages/learning_core/test/a1_situation_rule_registry_test.dart`
- Create: `packages/learning_core/test/a1_coherent_candidate_factory_test.dart`
- Create: `packages/learning_core/test/a1_surface_plan_realizer_test.dart`
- Create: `packages/learning_core/test/a1_composition_health_metrics_test.dart`
- Modify: `packages/learning_core/test/a1_coherence_validator_test.dart`
- Modify: `packages/learning_core/test/a1_candidate_repair_policy_test.dart`
- Modify: `packages/learning_core/test/a1_conversation_coherence_progression_audit_test.dart`
- Modify: `packages/learning_core/test/a1_compiler_materialization_audit_test.dart`

- [ ] **Step 1: Write situation rule tests**

Create `a1_situation_rule_registry_test.dart`.

Required first rules:

```text
state.thirsty supports desire/drink
state.hungry supports desire/food
state.tired supports rest/not_work/go_home
work_today supports study_tomorrow
big_contained_object supports big_container_need
small_contained_object supports small_container_need
person_at_home can answer where/person_location
confusion supports repair_request
preference_item supports like/want reason only when reason surface is generic-safe or specific reason exists
```

Required negatives:

```text
big_contained_object does not support small_container_need
thirsty does not support food desire unless island manifest allows generic want and reason is weakened
hungry does not support drink desire unless a specific food/drink bridge rule exists
confusion + and + not_ok is not preferred when repair_request can be formed
reason relation cannot exist without prior claim proposition
```

- [ ] **Step 2: Implement situation rule registry**

Create `A1SituationRuleRegistry` with:

```text
supportsRelation(A1PropositionGraph graph, A1PropositionRelation relation)
rulesForIsland(String islandId)
missingRuleFindings(...)
```

Rule rows must declare:

```text
situationRuleId
islandIds
sourceRoleConstraints
targetRoleConstraints
relationType
requiredConnectorFunction
allowedAttributeAgreement
blockedAttributeAgreement
weakenedFallbackRelationType
metadataRequirementIds
```

- [ ] **Step 3: Write coherent candidate factory tests**

Create `a1_coherent_candidate_factory_test.dart`.

The test must seed a multi-island inventory and assert:

```text
factory emits candidates only after proposition graph validation
factory emits food, shopping, people, movement, feelings, repair, daily candidates from the same operation registry
small bag because big book is not emitted
big bag because big book is emitted when surface pattern exists
if big bag surface is unavailable, factory emits a simpler bag need candidate or exact surfaceRealization blocker
why prompts always include claim + reason propositions
where prompts always include place answer proposition
contrast prompts always include contrastable facts or values
repair request candidates prefer "do not understand + please repeat" over "do not understand and not okay" when repair vocabulary is known
```

- [ ] **Step 4: Implement coherent candidate factory**

Create `A1CoherentCandidateFactory` with pipeline:

```text
semantic inventory
-> island manifests
-> fact graph
-> thought-depth planner
-> question demand
-> operation schema
-> proposition graph candidates
-> situation rule gate
-> discourse relation gate
-> answer shape gate
-> grammar/surface-safety gate
-> surface plan lookup
-> typed candidate
```

The factory must expose every pruned candidate with:

```text
candidatePlanId
firstFailingLayer
ownerCode
missingIds
repairAttempted
downgradeAttempted
```

- [ ] **Step 5: Write surface plan realizer tests**

Create `a1_surface_plan_realizer_test.dart`.

Required behavior:

```text
realizes proposition plan through surface pattern family
uses verified forms, connectors, and aliases only
blocks unverified person/gender/object reference
renders explicit noun fallback when unsafe pronoun reference is missing
returns surfaceRealization.renderable_variant_missing when no approved pattern exists
preserves proposition ids and answer expectation ids in transcript turn metadata
```

- [ ] **Step 6: Implement surface plan realizer**

Create `A1SurfacePlanRealizer` that consumes:

```text
A1PropositionGraph
A1SurfacePatternInventory
A1AnswerExpectationContract
A1VerifiedSurfaceRealizer
A1VerifiedFormRegistry
```

Modify `A1ConversationArcInstantiator.instantiateTypedCandidate` so it realizes from surface plans and proposition graphs. Candidate-id switch statements may remain only for golden fixture compatibility tests and must emit `arcCoverage.fixture_realizer_used:<candidateId>` trace when used.

- [ ] **Step 7: Upgrade coherence validator and repair policy**

Modify `A1CoherenceValidator` to validate:

```text
slot compatibility
situation rule support
discourse relation support
thought rung fit
grammar/surface safety
answer expectation satisfaction
recent stale shape risk
```

Modify `A1CandidateRepairPolicy` so repair order is:

```text
remove_unsafe_reference
use_explicit_noun_reference
simplify_thought_depth
change_question_demand
remove_optional_reason_or_contrast
swap_compatible_role_value
change_operation
change_route_frame
return_owned_blocker
```

Repair/downgrade must not be hidden. Every repaired candidate keeps `repairHistory`.

- [ ] **Step 8: Add composition health metrics**

Create `A1CompositionHealthMetrics` and tests.

Required metrics:

```text
generatedPlanCount
firstPassCoherentCount
repairAttemptCount
repairSuccessCount
downgradeAttemptCount
downgradeSuccessCount
surfaceBlockedCount
compilerBlockedCount
legacyFallbackCount
coherenceFirstPassRatio
downgradeRatio
```

First policy thresholds:

```text
minCoherenceFirstPassRatioForSeededAudit = 0.70
maxDowngradeRatioForSeededAudit = 0.25
maxLegacyFallbackRatioAfterTypedEligibility = 0.20
```

If thresholds fail, audit owner codes:

```text
arcCoherence.coherence_underproduced
arcCoherence.downgrade_overused
surfaceRealization.renderable_variants_too_thin
arcCoverage.typed_inventory_too_thin
```

- [ ] **Step 9: Verify Task 22C**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_situation_rule_registry_test.dart \
  test/a1_coherent_candidate_factory_test.dart \
  test/a1_surface_plan_realizer_test.dart \
  test/a1_composition_health_metrics_test.dart \
  test/a1_global_composition_risk_gate_audit_test.dart \
  test/a1_coherence_validator_test.dart \
  test/a1_candidate_repair_policy_test.dart \
  test/a1_conversation_coherence_progression_audit_test.dart \
  test/a1_compiler_materialization_audit_test.dart
```

Expected: PASS. If repair or downgrade is common in seeded tests, the test must fail and name the first missing situation rule, operation, question demand, surface pattern, or metadata requirement.

After the run, replace `Global Composition Risk Gates` in `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md` with the current ten-row gate report. Task 22C must update surface bottleneck, coherence-too-strict, coherence-too-loose, and scoring-repetition evidence from the actual audit metrics.

## Task 22D: Cross-Island Product Audits And AI-Ready Naturalness Seam

**Purpose:** Prove the deterministic system creates expanding, coherent, cross-island conversation paths over 12+ sessions, while defining future AI insertion points that improve naturalness without owning core generation.

**Audit finding addressed:** Product validation cannot rely on unit tests that prove isolated candidates. The stakeholder needs to see full conversations over time, including reused vocabulary in new shapes, thought-depth growth, island rotation, coherence status, and exact blockers.

**Remediation Decision Record:**

```text
productFailure: without printed multi-session transcripts, a local fix can look correct while the product still feels repetitive or narrow
firstFailingLayer: productAudit.coverage_and_visibility_missing
evidence: current audits can prove wiring but not enough cross-island output volume or thought-rung progression
selectedRepair: add seeded and organic 12+ lesson audits, cross-island coverage thresholds, composition health report, and AI adapter interface tests
whyThisRepairFirst: execution must be able to see whether the product shape is actually emerging before UI polish or AI naturalness work
productionBehaviorChanged: none directly except richer traces; coordinator behavior changes come from Tasks 22A-22C
backendProof: 12+ and 24+ lesson audits print full transcripts and pass coverage thresholds or exact owner blockers
uiProductCheckpoint: UI/controller audit proves renderable lessons use the same typed memory and composition traces
remainingOwnedBlocker: runtime AI is still non-goal; later tasks may implement naturalness adapter behind deterministic validation
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_naturalness_rewrite_adapter.dart`
- Create: `packages/learning_core/test/a1_global_composition_seeded_audit_test.dart`
- Create: `packages/learning_core/test/a1_naturalness_rewrite_adapter_test.dart`
- Modify: `packages/learning_core/test/a1_backend_twelve_lesson_typed_audit_test.dart`
- Modify: `packages/learning_core/test/a1_coordinator_decision_audit_test.dart`
- Modify: `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`
- Modify: `apps/mobile/test/a1_focus_route_growth_bundle_progression_audit_test.dart`
- Modify: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`

- [ ] **Step 1: Create seeded global composition audit**

Create `packages/learning_core/test/a1_global_composition_seeded_audit_test.dart`.

The seeded inventory must include enough typed memory for:

```text
daily_activities: study, work, school, home, today, tomorrow, history, because
food_and_drink: want, like, tea, coffee, meat, fish, hungry, thirsty, now, because
shopping_possessions: need, have, bag, book, big, small, money, because
people_relationships: brother, mother, home, work, tired, today, because
movement_places: go, come, school, home, cafe, today, tomorrow, then
feelings_states: tired, happy, hungry, cold, okay, not_ok, because
conversation_repair: understand, again, slowly, please, hard
```

The audit must run at least 24 candidate selections or 12 full lesson starts and print every selected conversation:

```text
index
islandId
familyId
routeFrameId
operationIds
questionDemandId
thoughtDepthRung
propositionFingerprint
semanticFacts
coherenceStatus
repairHistory
downgradeHistory
scoreTerms
full transcript
```

Required assertions:

```text
representedIslands >= 6
representedOperations >= 6
representedQuestionDemands >= 6
representedThoughtDepthRungs >= 4
fullTranscriptCount >= 12
exactTranscriptRepeats == 0 unless explicit refresh owner
coherenceFirstPassRatio >= 0.70
downgradeRatio <= 0.25
typedSelectedCount > legacyFallbackCount
```

If the seed cannot pass, the audit must print the first owner among memory projection, metadata readiness, operation inventory, island manifest, situation rule, surface realization, compiler materialization, coherence, or scoring.

- [ ] **Step 2: Upgrade organic 12-lesson backend audit**

Modify `a1_backend_twelve_lesson_typed_audit_test.dart` so it has two modes:

```text
organicLegacyStart:
  starts from normal empty/legacy memory, allows legacy starter rows, prints typed eligibility blockers
seededTypedStart:
  starts from typed semantic inventory, requires typed attempts and cross-island output
```

The audit must show whether the backend starts using the new system because memory organically wrote semantic facts or because the test seeded them. It must not blur these together.

- [ ] **Step 3: Upgrade UI/controller 12+ lesson audit**

Modify `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`.

The UI audit must print:

```text
rendered lesson id
final conversation turns
memory events written
projected semantic roles on next start
semantic facts on next start
selected island/frame/operation/focus/rung
coherence/repair/downgrade
legacy fallback reason
```

Acceptance:

```text
after semantic inventory exists, UI path attempts typed generation
if UI path remains legacy, blocker is uiEvidenceLoop, memoryProfile, metadataReadiness, or typedEligibility
the test output includes full conversations for stakeholder review
```

- [ ] **Step 4: Add AI-ready naturalness seam**

Create `A1NaturalnessRewriteAdapter` as an interface only:

```text
rewrite(A1NaturalnessRewriteRequest request)
```

Request fields:

```text
propositionGraph
questionDemandId
answerShapeId
learnerLevel
allowedTargetIds
allowedSurfaceForms
forbiddenTargetIds
requiredRelationIds
targetThoughtDepthRung
```

Response fields:

```text
surfaceVariants
usedTargetIds
usedSurfaceForms
preservedRelationIds
violations
```

The initial implementation must be deterministic and return the original surface plan. Tests must prove:

```text
AI adapter is not called by default production generation
adapter output must pass deterministic vocabulary/form/relation validation
adapter cannot add untracked vocabulary
adapter cannot change proposition meaning
adapter can be used in future as a naturalness improvement seam
```

- [ ] **Step 5: Update audit report note**

Append a section to `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md` using the actual values printed by the audit run. Do not leave blank fields in the report. Use this field order:

```markdown
## Global Typed Composition Product Audit

- Date: 2026-06-03 or the actual audit run date
- Organic 12-lesson typed status: organic typed / legacy starter / blocked, with owner code
- Seeded 12/24 lesson typed status: pass / blocked, with first owner code
- Represented islands: comma-separated island ids and count
- Represented operations: comma-separated operation ids and count
- Represented question demands: comma-separated demand ids and count
- Represented thought rungs: comma-separated rung ids and count
- Coherence first-pass ratio: numeric ratio from audit
- Downgrade ratio: numeric ratio from audit
- Legacy fallback ratio: numeric ratio from audit
- First selected transcript: exact printed transcript block
- Most complex selected transcript: exact printed transcript block and rung id
- First owned blocker if any: owner code plus missing ids
- Next repair owner: memoryProfile / uiEvidenceLoop / metadataReadiness / arcCoverage / arcCoherence / surfaceRealization / compilerMaterialization / coordinatorPolicy
```

- [ ] **Step 6: Verify Task 22D**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_global_composition_seeded_audit_test.dart \
  test/a1_backend_twelve_lesson_typed_audit_test.dart \
  test/a1_naturalness_rewrite_adapter_test.dart \
  test/a1_global_composition_risk_gate_audit_test.dart \
  test/a1_coordinator_decision_audit_test.dart

cd ../../apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_memory_led_product_progression_audit_test.dart \
  test/a1_focus_route_growth_bundle_progression_audit_test.dart \
  --concurrency=1
```

Expected: PASS. The output must include full transcripts, not only summary counts.

After the run, replace `Global Composition Risk Gates` in `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md` with the current ten-row gate report. Task 22D is the first major product checkpoint; it must leave no `fail` row unowned and must separate seeded typed transcripts from organic backend/UI transcripts.

## Task 22E: Seeded Dialogue Obligation And Move-Sequence Planner

**Purpose:** Upgrade seeded typed/global composition from isolated renderable question/answer pairs into contextual, multi-exchange, globally reusable conversational paths. The system must use the same words in different dialogue shapes without returning to fixed arc-generator scripts.

**Audit finding addressed:** The seeded global audit can now produce renderable typed transcripts across islands, but too many examples collapse to one tutor/learner exchange and generic prompts such as `eh?`, `leh?`, or `feen?`. That proves surface generation exists, but it does not yet prove the intended product shape: repeated vocabulary should feel newly unlocked through varied conversational paths, richer answer demands, and coherent follow-up obligations.

**Remediation Decision Record:**

```text
productFailure: typed seeded generation can render sentences but not enough contextual multi-turn conversation shape
firstFailingLayer: dialogueMovePlanner.contextual_path_missing
evidence: seeded audit printed first-pass renderable transcripts such as bare "eh?" and "leh?" prompts with only one back-and-forth
selectedRepair: add dialogue obligation contracts, a global move inventory, a move-sequence planner, contextual prompt realization, and audit thresholds for multi-exchange product shape
whyThisRepairFirst: before organic UI writeback is repaired, seeded typed memory must prove the generator can create the desired global conversation shape at all
productionBehaviorChanged: typed candidates choose an obligation and move sequence before surface realization; generic prompt fallback is blocked outside repair or anchored contexts
backendProof: seeded 12+/24+ audit prints full contextual transcripts across islands, move-sequence ids, obligation ids, and first owner blockers
uiProductCheckpoint: no organic UI writeback fix yet; UI/backend audits must continue to label organic legacy versus seeded typed starts separately
remainingOwnedBlocker: normal lesson completion still needs first-class semantic memory writeback in a later task
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_dialogue_obligation_contract.dart`
- Create: `packages/learning_core/lib/src/a1_dialogue_move_sequence_planner.dart`
- Create: `packages/learning_core/lib/src/a1_contextual_prompt_realizer.dart`
- Modify: `packages/learning_core/lib/src/a1_coherent_candidate_factory.dart`
- Modify: `packages/learning_core/lib/src/a1_surface_plan_realizer.dart`
- Modify: `packages/learning_core/lib/src/a1_coherence_validator.dart`
- Modify: `packages/learning_core/lib/src/a1_composition_health_metrics.dart`
- Modify: `packages/learning_core/lib/src/a1_naturalness_rewrite_adapter.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`

**Tests:**

- Create: `packages/learning_core/test/a1_dialogue_obligation_contract_test.dart`
- Create: `packages/learning_core/test/a1_dialogue_move_sequence_planner_test.dart`
- Create: `packages/learning_core/test/a1_contextual_prompt_realizer_test.dart`
- Modify: `packages/learning_core/test/a1_coherent_candidate_factory_test.dart`
- Modify: `packages/learning_core/test/a1_surface_plan_realizer_test.dart`
- Modify: `packages/learning_core/test/a1_global_composition_seeded_audit_test.dart`
- Modify: `packages/learning_core/test/a1_naturalness_rewrite_adapter_test.dart`
- Modify: `packages/learning_core/test/a1_global_composition_risk_gate_audit_test.dart`

**Seeded memory boundary for this task:**

Task 22E intentionally proves the desired shape with seeded semantic memory. It must not claim that organic UI/backend memory writeback is complete. The seeded inventory must expose the same contract organic writeback will later need:

```text
semantic role memory:
  predicate, object, person, place, time, topic, attribute, state, connector

semantic fact memory:
  claim facts
  support/reason facts
  contrastable facts
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
  verified forms
  safe reference patterns
  surface pattern families
  contextual prompt patterns
  connector surfaces
```

Later organic writeback work must write these fields from real lesson completion. Until that exists, every audit report must keep these modes separate:

```text
organicLegacyStart
seededTypedStart
organicTypedStart
```

- [ ] **Step 1: Write dialogue obligation contract tests**

Create `a1_dialogue_obligation_contract_test.dart`.

Required first obligation ids:

```text
ask_why_reason
ask_where_detail
ask_when_detail
ask_choice_contrast
ask_sequence_next
ask_supporting_fact
ask_repair_request
```

Required behavior:

```text
ask_why_reason requires anchored claim, contextual why question, reason answer, reason connector, and minimum two tutor/learner exchanges
ask_where_detail requires contextual place question and place-bearing answer
ask_when_detail requires contextual time question and time-bearing answer
ask_choice_contrast requires contrastable facts or contrastable slot values
ask_sequence_next requires two compatible event propositions and ordering relation
ask_supporting_fact requires a follow-up that asks for a missing support role
ask_repair_request permits short clarification moves only inside repair
normal obligations forbid bare first prompts such as "leh?", "eh?", and "feen?"
```

Globality assertions:

```text
ask_why_reason is compatible with at least daily_activities, food_and_drink, shopping_possessions, people_relationships, movement_places, feelings_states
ask_where_detail is compatible with at least daily_activities, food_and_drink, shopping_possessions, people_relationships, movement_places
ask_choice_contrast is compatible with at least preferences_opinions, food_and_drink, shopping_possessions, feelings_states
ask_repair_request is compatible with conversation_repair without any study/work-specific dependency
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test test/a1_dialogue_obligation_contract_test.dart
```

Expected before implementation: FAIL because obligation contracts do not exist.

- [ ] **Step 2: Implement dialogue obligation contracts**

Create:

```text
A1DialogueObligationContract
A1DialogueObligationRegistry
A1DialogueObligationReadinessResult
A1DialogueObligationRequirement
```

Each obligation row must declare:

```text
obligationId
allowedQuestionDemandIds
allowedAnswerShapeIds
minimumExchangeCount
requiredMoveKinds
requiredAnchorRoles
requiredAnswerRoles
requiredRelationTypes
requiredConnectorFunctions
allowedIslandIds
allowedShortPromptContexts
forbiddenBarePromptIds
metadataRequirementIds
```

Readiness must return owned blockers:

```text
dialogueObligation.anchor_missing:<obligationId>
dialogueObligation.answer_role_missing:<obligationId>/<roleId>
dialogueObligation.required_relation_missing:<obligationId>/<relationType>
dialogueObligation.minimum_exchange_missing:<obligationId>
dialogueObligation.bare_prompt_forbidden:<promptId>
metadataReadiness.dialogue_obligation_dependency_missing:<obligationId>/<metadataId>
```

- [ ] **Step 3: Write move-sequence planner tests**

Create `a1_dialogue_move_sequence_planner_test.dart`.

Required global move ids:

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

Seed a `study tomorrow because work today` proposition graph and assert the planner can produce at least three valid sequence ids:

```text
ask_claim -> answer_claim -> ask_contextual_reason -> answer_reason
ask_when_detail -> answer_detail -> ask_contextual_reason -> answer_reason
ask_supporting_fact -> answer_supporting_fact -> ask_claim -> answer_claim_with_reason
```

Seed food/drink, shopping/possessions, feelings/states, movement/places, people/relationships, preferences, and repair proposition graphs. Assert each can produce at least one sequence from the same move inventory without island-specific script ids.

Staleness assertions:

```text
recent opening move penalizes the same opening move
recent question demand penalizes the same demand when alternatives exist
recent second-half shape penalizes repeated follow-up/answer shape
same proposition graph can return with a different sequence id when surface metadata permits
if every alternative is blocked, planner returns owned blocker instead of generic prompt fallback
```

- [ ] **Step 4: Implement move-sequence planner**

Create `A1DialogueMoveSequencePlanner` with this pipeline:

```text
proposition graph
-> question demand
-> answer shape
-> obligation contract
-> eligible move candidates
-> sequence variants
-> contextual fallback tier
-> stale-shape scoring
-> owned blocker when none pass
```

Planner output:

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

Allowed fallback tiers:

```text
contextual_multi_exchange
simpler_contextual_multi_exchange
contextual_two_exchange
owned_blocker
```

Do not add generic one-word prompt fallback outside repair. If the planner cannot satisfy the obligation, return one of:

```text
dialogueMovePlanner.no_eligible_sequence
dialogueMovePlanner.stale_sequence_only
dialogueObligation.anchor_missing
dialogueObligation.minimum_exchange_missing
surfaceRealization.contextual_prompt_missing
```

- [ ] **Step 5: Write contextual prompt realizer tests**

Create `a1_contextual_prompt_realizer_test.dart`.

Required behavior:

```text
ask_contextual_reason for a study-tomorrow claim does not render as bare "leh?"
ask_contextual_reason includes the target predicate/time/place/object anchor when the surface pattern exists
ask_where_detail does not render as bare "feen?" unless the previous turn anchored the target activity/person/object
ask_when_detail does not render as bare "emta?" unless the previous turn anchored the target activity/event
food/drink, shopping, feelings, movement, people, preference, and repair examples all render contextual prompts from shared prompt families
second-person tutor questions use verified second-person forms, not learner first-person forms
short repair prompts are allowed only when the selected obligation is repair_request or an immediately prior anchor exists
```

Negative examples that must block:

```text
normal first prompt "leh?"
normal first prompt "eh?"
normal first prompt "feen?"
unverified second-person verb form
missing contextual prompt pattern
prompt asks reason when proposition graph has no reason relation
prompt asks place when proposition graph has no place-bearing answer
```

- [ ] **Step 6: Implement contextual prompt realization**

Create `A1ContextualPromptRealizer` or fold it into `A1SurfacePlanRealizer` behind a focused helper. The implementation must consume:

```text
A1DialogueMoveSequencePlan
A1PropositionGraph
A1SurfacePatternInventory
A1VerifiedSurfaceRealizer
A1VerifiedFormRegistry
A1AnswerExpectationContract
```

It must produce move-level surface plans where every tutor prompt and learner response preserves:

```text
moveId
obligationId
propositionIds
relationIds
questionDemandId
answerShapeId
expectedAnswerRoleIds
surfacePatternFamilyId
verifiedFormIds
```

Modify `A1SurfacePlanRealizer` so a typed candidate with a move-sequence plan renders the full multi-exchange transcript. Existing single-exchange fixture realization may remain only for explicit golden compatibility paths and must emit:

```text
arcCoverage.fixture_realizer_used:<candidateId>
```

- [ ] **Step 7: Wire move-sequence planning into candidate construction**

Modify `A1CoherentCandidateFactory` so candidate construction becomes:

```text
semantic inventory
-> island manifests
-> fact graph
-> thought-depth planner
-> question demand
-> proposition graph candidates
-> coherence/situation gates
-> answer shape
-> dialogue obligation
-> move-sequence planner
-> contextual surface realization
-> typed candidate
```

The factory must expose pruned sequence attempts with:

```text
candidatePlanId
sequenceId
obligationId
firstFailingLayer
ownerCode
missingIds
fallbackTier
repairAttempted
downgradeAttempted
```

Update `A1CoherenceValidator` to validate obligation fulfillment after realization:

```text
minimumExchangeCountSatisfied
anchorMovePresent
answerRoleSatisfied
requiredRelationPresent
barePromptAllowedByContext
questionDemandAnswered
```

- [ ] **Step 8: Add AI augmenter request preview tests**

Modify `a1_naturalness_rewrite_adapter_test.dart`.

Required behavior:

```text
move-sequence plan can produce A1NaturalnessRewriteRequest
request includes proposition graph, move sequence plan, question demand, answer shape, learner level, allowed targets/forms, forbidden targets, required relations, and thought rung
adapter cannot change proposition meaning
adapter cannot remove required move obligations
adapter cannot add untracked vocabulary or unverified forms
adapter output must pass deterministic obligation, vocabulary, form, proposition, and coherence validation
production generation does not call runtime AI by default
```

The initial adapter still returns deterministic/original surface variants. This task creates the seam so a future AI augmenter can improve naturalness without owning memory, proposition selection, move planning, scoring, or coherence.

- [ ] **Step 9: Upgrade seeded global product audit**

Modify `a1_global_composition_seeded_audit_test.dart`.

The audit must print every selected conversation with:

```text
index
islandId
familyId
routeFrameId
operationIds
questionDemandId
answerShapeId
thoughtDepthRung
obligationIds
moveSequenceId
moveIds
fallbackTier
propositionFingerprint
semanticFacts
coherenceStatus
obligationStatus
repairHistory
downgradeHistory
scoreTerms
full transcript
```

Required seeded assertions:

```text
fullTranscriptCount >= 12
representedIslands >= 6
representedQuestionDemands >= 6
representedThoughtDepthRungs >= 4
representedMoveSequences >= 5
normalTranscriptMinimumExchangeRatio >= 0.85
barePromptCountOutsideRepairOrAnchor == 0
contextualPromptRatio >= 0.70
sameGraphVariantCountForReasonGraph >= 3
exactTranscriptRepeats == 0 unless explicit refresh owner
coherenceFirstPassRatio >= 0.70
downgradeRatio <= 0.25
shortFallbackRatio <= 0.30
```

The audit must include at least these seeded scenarios as acceptance fixtures, while proving they are generated through global operations rather than candidate-id branches:

```text
daily_activities: study tomorrow because work today
food_and_drink: want tea now because thirsty
shopping_possessions: need big bag because have big book
people_relationships: brother at home because tired
movement_places: go home after school / go school then home
feelings_states: tired after work because worked today
preferences_opinions: like one item and not another when contrastable values exist
conversation_repair: do not understand + repeat slowly request
```

If a seeded scenario cannot pass, the audit must print the first owner among:

```text
memoryProfile
metadataReadiness
arcCoverage
dialogueObligation
dialogueMovePlanner
arcCoherence
surfaceRealization
compilerMaterialization
coordinatorPolicy
naturalnessAdapter
```

- [ ] **Step 10: Update risk gates and audit report**

Modify `a1_global_composition_risk_gate_audit_test.dart` and `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`.

Add or update gate evidence fields:

```text
dialogueObligationGate:
  fails when normal selected candidates do not satisfy obligation, anchor, answer role, or minimum exchange requirements

moveSequenceDiversityGate:
  fails when valid alternatives exist but the same opening, demand, second-half shape, or move-sequence id repeats beyond policy

contextualPromptGate:
  fails when normal first prompts use bare generic prompts or when contextual prompt patterns are missing without owner blockers

seededMemoryContractGate:
  warns when seeded memory contains fields that organic writeback does not yet write; fails only if the seeded generator proof omits required fields

naturalnessSeamGate:
  fails when the AI augmenter request lacks enough typed constraints to safely rewrite later
```

The audit report must include a `Seeded Dialogue Path Product Audit` section:

```markdown
## Seeded Dialogue Path Product Audit

- Date: actual audit run date
- Seeded status: pass / blocked, with first owner code
- Organic status: legacy starter / organic typed / blocked, with first owner code
- Represented islands: ids and count
- Represented question demands: ids and count
- Represented move sequences: ids and count
- Normal transcript minimum-exchange ratio: numeric
- Bare prompt count outside repair/anchor: numeric
- Contextual prompt ratio: numeric
- Same graph variant count: numeric and scenario id
- Coherence first-pass ratio: numeric
- Downgrade ratio: numeric
- Short fallback ratio: numeric
- Three selected transcript blocks that reuse similar words in different paths
- First owned blocker if any
- Required next owner
```

- [ ] **Step 11: Verify Task 22E**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_dialogue_obligation_contract_test.dart \
  test/a1_dialogue_move_sequence_planner_test.dart \
  test/a1_contextual_prompt_realizer_test.dart \
  test/a1_coherent_candidate_factory_test.dart \
  test/a1_surface_plan_realizer_test.dart \
  test/a1_global_composition_seeded_audit_test.dart \
  test/a1_naturalness_rewrite_adapter_test.dart \
  test/a1_global_composition_risk_gate_audit_test.dart
```

Expected: PASS. The output must include full transcripts, not only summary counts. If the seeded audit still produces one-exchange normal lessons or bare first prompts, the task is not complete even if candidate counts are high.

- [x] **Step 12: Add seeded selected dialogue path cooldown audit**

Create `packages/learning_core/test/a1_global_composition_seeded_selection_audit_test.dart`.

This audit is different from `a1_global_composition_seeded_audit_test.dart`.

```text
a1_global_composition_seeded_audit_test:
  prints candidate inventory
  proves coverage and available variants
  may show several variants of the same proposition graph together

a1_global_composition_seeded_selection_audit_test:
  simulates selected lesson starts
  records recent history after each selected lesson
  proves cooldown and freshness pressure across a 12-lesson selected sequence
```

The audit must not print every available candidate as if it were a lesson sequence. It must select one candidate per simulated lesson start, then update recent history before selecting the next candidate.

Required selected-history state:

```text
recentIslandIds
recentMainPredicateIds
recentMainObjectIds
recentQuestionDemandIds
recentMoveSequenceIds
recentSecondHalfShapeFingerprints
recentTranscriptFingerprints
recentPropositionFingerprints
```

Selection scoring must be deterministic and local to the audit until Task 23 wires this into coordinator traces:

```text
positive:
  differentRecentIsland
  differentRecentMainPredicate
  differentRecentQuestionDemand
  differentRecentMoveSequence
  higherThoughtDepthWhenReady
  crossIslandCoverageNeeded

negative:
  sameIslandWithinWindow
  sameMainPredicateWithinWindow
  sameQuestionDemandWithinWindow
  sameMoveSequenceWithinWindow
  sameTranscriptFingerprint
  samePropositionFingerprintWithoutMovePathChange
```

First cooldown window:

```text
recentIslandWindow = 2
recentMainPredicateWindow = 3
recentQuestionDemandWindow = 2
recentMoveSequenceWindow = 2
recentTranscriptWindow = 12
```

The selected audit must assert:

```text
selectedTranscriptCount >= 12
selectedRepresentedIslands >= 6
selectedRepresentedQuestionDemands >= 5
selectedRepresentedMoveSequences >= 5
exactTranscriptRepeats == 0
normalBarePromptCountOutsideRepairOrAnchor == 0
sameMainPredicateWithinCooldown == 0 unless explicit owner `coordinatorPolicy.cooldown_override_for_coverage`
sameIslandRunLength <= 2 unless explicit owner `coordinatorPolicy.same_island_depth_growth`
studyTomorrowReasonVariantsAvailable >= 3
studyTomorrowReasonVariantsSelectedBackToBack == 0
selectionTrace includes score terms and cooldown penalties for rejected near-repeats
```

The audit output must include:

```text
## Seeded Selected Dialogue Path Cooldown Audit

For each selected row:
index
candidateId
islandId
mainPredicateId
mainObjectId
questionDemandId
thoughtDepthRung
obligationIds
moveSequenceId
scoreTerms
cooldownPenaltyTerms
recentHistoryBeforeSelection
full transcript

Rejected near-repeat examples:
candidateId
rejectedBecause
scoreTerms
cooldownPenaltyTerms
```

Expected before implementation: FAIL because no selected-sequence audit exists and the current seeded audit prints candidate inventory only.

- [x] **Step 13: Implement seeded selected dialogue path cooldown helper**

Implement the smallest test-local helper first. If the helper grows beyond the audit file, move it to:

```text
packages/learning_core/lib/src/a1_seeded_dialogue_selection_audit.dart
```

Do not wire production coordinator behavior in this step. The point is to prove the selection contract against seeded typed candidates before Task 23 moves the same trace fields into production selection.

The helper must:

```text
1. build candidates with A1CoherentCandidateFactory.initial()
2. render each candidate with A1SurfacePlanRealizer and its dialogueMoveSequencePlan
3. score candidates against recent selected history
4. select the highest scoring renderable candidate
5. append selected candidate history
6. repeat until at least 12 selected rows exist or return an owned blocker
```

Required owner blockers:

```text
coordinatorPolicy.no_renderable_candidate_after_cooldown
coordinatorPolicy.cooldown_overconstrained
coordinatorPolicy.selection_repetition_pressure_not_applied
surfaceRealization.selected_candidate_not_renderable
```

If the helper must choose a near-repeat because all alternatives are blocked, it must record:

```text
cooldownOverrideOwner
cooldownOverrideReason
blockedAlternativeCount
firstBlockedAlternativeOwner
```

Do not allow silent fallback to candidate inventory order.

- [x] **Step 14: Update risk gates and report with selected cooldown evidence**

Modify `packages/learning_core/test/a1_global_composition_risk_gate_audit_test.dart` and `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`.

Update these gates:

```text
scoringRepetitionGate:
  status may become pass for seeded selection only when the selected audit proves cooldown pressure.
  organic remains warning until UI/backend writeback and coordinator selection use the same history.

moveSequenceDiversityGate:
  must distinguish variants available from variants selected.

seededMemoryContractGate:
  must state selected seeded history is audit-local until organic writeback records the same history fields.
```

Append this report section:

```markdown
## Seeded Selected Dialogue Path Cooldown Audit

- Date: actual audit run date
- Status: pass / blocked, with first owner code
- Selected transcript count: numeric
- Selected represented islands: ids and count
- Selected represented question demands: ids and count
- Selected represented move sequences: ids and count
- Exact transcript repeats: numeric
- Same main predicate within cooldown: numeric
- Same island max run length: numeric
- Study/work variants available: numeric
- Study/work variants selected back-to-back: numeric
- First three selected transcripts
- First rejected near-repeat and cooldown reason
- Remaining organic blocker: expected to be UI/backend memory writeback and coordinator trace integration
```

- [x] **Step 15: Verify seeded selected cooldown audit**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_global_composition_seeded_selection_audit_test.dart \
  test/a1_global_composition_seeded_audit_test.dart \
  test/a1_global_composition_risk_gate_audit_test.dart
```

Expected: PASS. The selected audit must print 12 selected transcripts in sequence order and must show recent-history state changing after each selected row.

Run a focused diff check:

```bash
git diff --check
```

- [ ] **Step 16: Commit**

```bash
git add \
  packages/learning_core/lib/src/a1_dialogue_obligation_contract.dart \
  packages/learning_core/lib/src/a1_dialogue_move_sequence_planner.dart \
  packages/learning_core/lib/src/a1_contextual_prompt_realizer.dart \
  packages/learning_core/lib/src/a1_coherent_candidate_factory.dart \
  packages/learning_core/lib/src/a1_surface_plan_realizer.dart \
  packages/learning_core/lib/src/a1_coherence_validator.dart \
  packages/learning_core/lib/src/a1_composition_health_metrics.dart \
  packages/learning_core/lib/src/a1_naturalness_rewrite_adapter.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_dialogue_obligation_contract_test.dart \
  packages/learning_core/test/a1_dialogue_move_sequence_planner_test.dart \
  packages/learning_core/test/a1_contextual_prompt_realizer_test.dart \
  packages/learning_core/test/a1_coherent_candidate_factory_test.dart \
  packages/learning_core/test/a1_surface_plan_realizer_test.dart \
  packages/learning_core/test/a1_global_composition_seeded_audit_test.dart \
  packages/learning_core/test/a1_global_composition_seeded_selection_audit_test.dart \
  packages/learning_core/test/a1_naturalness_rewrite_adapter_test.dart \
  packages/learning_core/test/a1_global_composition_risk_gate_audit_test.dart \
  docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md
git commit -m "feat: add contextual A1 dialogue path selection audit"
```

## Task 22F: Direct-Claim Follow-Up Opportunity Planner

**Purpose:** Replace generic direct-claim follow-up filler with a global, memory-driven follow-up opportunity layer. A direct claim such as `have(book)` must either expand into a coherent second thought such as `like(book)`, `read(book)`, or `need(bag because book big)` when memory and metadata prove it, or block selected multi-exchange output with an owned reason.

**Audit finding addressed:** The selected seeded dialogue audit now avoids repeated internal exchanges, but direct claims can still be padded with `tab keda tamam? / ah, tamam.` That avoids duplication but does not create the intended product shape. The product needs logical follow-up opportunities, shared scoring pressure, and a 24-round selected audit that proves direct claims use real adjacent facts rather than filler.

**Remediation Decision Record:**

```text
productFailure: direct-claim candidates can satisfy multi-exchange shape with generic confirmation filler instead of a real next thought
firstFailingLayer: followUpOpportunity.missing
evidence: selected seeded sequence included direct-claim paths that used `tab keda tamam? / ah, tamam.` because no follow-up opportunity graph existed
selectedRepair: add global affordance metadata, object-linked semantic facts, a ranked follow-up opportunity planner, candidate factory wiring, no-filler selection gates, and a 24-round selected audit
whyThisRepairFirst: Task 23 trace integration should trace meaningful selected/rejected follow-up opportunities, not preserve a known filler shape
productionBehaviorChanged: direct-claim multi-exchange candidates require real follow-up opportunities or owned blockers; generic confirmation fallback is no longer accepted for normal selected direct claims
backendProof: seeded 24-round selected audit prints every transcript, represented affordances, rejected near-repeats, overused predicate decisions, and first owner blockers
uiProductCheckpoint: no organic UI writeback fix yet; seeded facts must document the exact object-linked memory organic writeback will later need
remainingOwnedBlocker: organic UI/backend memory must later write object-linked facts and recent follow-up history from real lesson completion
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_follow_up_affordance_registry.dart`
- Create: `packages/learning_core/lib/src/a1_follow_up_metadata_readiness_matrix.dart`
- Create: `packages/learning_core/lib/src/a1_follow_up_opportunity_planner.dart`
- Modify: `packages/learning_core/lib/src/a1_composition_memory_index.dart`
- Modify: `packages/learning_core/lib/src/a1_semantic_fact_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_semantic_compatibility_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_coherent_candidate_factory.dart`
- Modify: `packages/learning_core/lib/src/a1_dialogue_move_sequence_planner.dart`
- Modify: `packages/learning_core/lib/src/a1_contextual_prompt_realizer.dart`
- Modify: `packages/learning_core/lib/src/a1_surface_pattern_inventory.dart`
- Modify: `packages/learning_core/lib/src/a1_verified_form_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_seeded_dialogue_selection_audit.dart`
- Modify: `packages/learning_core/lib/src/a1_global_composition_risk_gate_audit.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`

**Tests:**

- Create: `packages/learning_core/test/a1_follow_up_affordance_registry_test.dart`
- Create: `packages/learning_core/test/a1_follow_up_metadata_readiness_matrix_test.dart`
- Create: `packages/learning_core/test/a1_follow_up_opportunity_planner_test.dart`
- Create: `packages/learning_core/test/a1_global_composition_seeded_follow_up_24_audit_test.dart`
- Modify: `packages/learning_core/test/a1_global_composition_seeded_selection_audit_test.dart`
- Modify: `packages/learning_core/test/a1_coherent_candidate_factory_test.dart`
- Modify: `packages/learning_core/test/a1_contextual_prompt_realizer_test.dart`
- Modify: `packages/learning_core/test/a1_global_composition_risk_gate_audit_test.dart`

**Global product rules for this task:**

```text
1. Direct-claim multi-exchange output requires a real follow-up opportunity.
2. A generic confirmation fallback cannot satisfy normal selected multi-exchange output.
3. Follow-up opportunities are selected by global affordance metadata and memory facts, not candidate-id branches.
4. The planner uses the same cooldown, freshness, mastery, support/growth, and stale-shape pressure as seeded dialogue selection.
5. A mastered or overused predicate can be used as support/refresh, but it is deprioritized as growth when another coherent renderable follow-up exists.
6. Missing follow-up metadata or object-linked facts must produce owned blockers.
7. The first proof is seeded; organic UI/backend writeback remains separate until it writes the same object-linked facts and recent follow-up history.
```

- [x] **Step 1: Add failing affordance registry tests**

Create `packages/learning_core/test/a1_follow_up_affordance_registry_test.dart`.

Use this test shape:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1FollowUpAffordanceRegistry', () {
    test('declares global direct-claim follow-up affordances', () {
      final registry = A1FollowUpAffordanceRegistry.initial();

      expect(
        registry.affordanceIds,
        containsAll([
          'possession_to_preference',
          'possession_to_use',
          'possession_to_attribute',
          'possession_to_constraint',
          'activity_to_detail',
          'state_to_reason_or_action',
        ]),
      );

      final bookPreference = registry.affordance('possession_to_preference');
      expect(bookPreference.basePredicateIds, contains('predicate.have'));
      expect(bookPreference.followUpPredicateIds, contains('predicate.like'));
      expect(bookPreference.requiresSameObject, isTrue);
      expect(bookPreference.relationTypeId, 'possession_to_preference');
      expect(bookPreference.blockerWhenUnavailable,
          'followUpOpportunity.required_fact_missing');
    });

    test('does not encode book-only product behavior', () {
      final registry = A1FollowUpAffordanceRegistry.initial();

      for (final row in registry.affordances) {
        expect(row.affordanceId, isNot(contains('book')));
        expect(row.requiredObjectIds, isEmpty);
      }
    });
  });
}
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_follow_up_affordance_registry_test.dart
```

Expected before implementation: FAIL because `A1FollowUpAffordanceRegistry` does not exist.

- [x] **Step 2: Implement global affordance registry**

Create `packages/learning_core/lib/src/a1_follow_up_affordance_registry.dart`.

Define:

```dart
final class A1FollowUpAffordance {
  const A1FollowUpAffordance({
    required this.affordanceId,
    required this.basePredicateIds,
    required this.followUpPredicateIds,
    required this.baseRoleKinds,
    required this.followUpRoleKinds,
    required this.relationTypeId,
    required this.requiredConnectorFunctions,
    required this.requiresSameObject,
    required this.requiresAttribute,
    required this.requiresReasonRelation,
    required this.requiredCompatibilityEdgePatterns,
    required this.requiredObjectIds,
    required this.requiredSurfacePatternIds,
    required this.blockerWhenUnavailable,
  });

  final String affordanceId;
  final List<String> basePredicateIds;
  final List<String> followUpPredicateIds;
  final List<String> baseRoleKinds;
  final List<String> followUpRoleKinds;
  final String relationTypeId;
  final List<String> requiredConnectorFunctions;
  final bool requiresSameObject;
  final bool requiresAttribute;
  final bool requiresReasonRelation;
  final List<String> requiredCompatibilityEdgePatterns;
  final List<String> requiredObjectIds;
  final List<String> requiredSurfacePatternIds;
  final String blockerWhenUnavailable;
}

final class A1FollowUpAffordanceRegistry {
  const A1FollowUpAffordanceRegistry({required this.affordances});

  factory A1FollowUpAffordanceRegistry.initial() {
    return const A1FollowUpAffordanceRegistry(affordances: [
      A1FollowUpAffordance(
        affordanceId: 'possession_to_preference',
        basePredicateIds: ['predicate.have'],
        followUpPredicateIds: ['predicate.like'],
        baseRoleKinds: ['object'],
        followUpRoleKinds: ['object'],
        relationTypeId: 'possession_to_preference',
        requiredConnectorFunctions: [],
        requiresSameObject: true,
        requiresAttribute: false,
        requiresReasonRelation: false,
        requiredCompatibilityEdgePatterns: ['predicate.like->{object}'],
        requiredObjectIds: [],
        requiredSurfacePatternIds: ['pattern.followup.possession_preference'],
        blockerWhenUnavailable: 'followUpOpportunity.required_fact_missing',
      ),
      A1FollowUpAffordance(
        affordanceId: 'possession_to_use',
        basePredicateIds: ['predicate.have'],
        followUpPredicateIds: ['predicate.read', 'predicate.use', 'predicate.study'],
        baseRoleKinds: ['object'],
        followUpRoleKinds: ['object'],
        relationTypeId: 'possession_to_use',
        requiredConnectorFunctions: [],
        requiresSameObject: true,
        requiresAttribute: false,
        requiresReasonRelation: false,
        requiredCompatibilityEdgePatterns: ['{followUpPredicate}->{object}'],
        requiredObjectIds: [],
        requiredSurfacePatternIds: ['pattern.followup.possession_use'],
        blockerWhenUnavailable: 'followUpOpportunity.required_fact_missing',
      ),
      A1FollowUpAffordance(
        affordanceId: 'possession_to_attribute',
        basePredicateIds: ['predicate.have'],
        followUpPredicateIds: ['predicate.have'],
        baseRoleKinds: ['object', 'attribute'],
        followUpRoleKinds: ['attribute'],
        relationTypeId: 'possession_to_attribute',
        requiredConnectorFunctions: [],
        requiresSameObject: true,
        requiresAttribute: true,
        requiresReasonRelation: false,
        requiredCompatibilityEdgePatterns: ['{object}->{attribute}'],
        requiredObjectIds: [],
        requiredSurfacePatternIds: ['pattern.followup.possession_attribute'],
        blockerWhenUnavailable: 'followUpOpportunity.required_fact_missing',
      ),
      A1FollowUpAffordance(
        affordanceId: 'possession_to_constraint',
        basePredicateIds: ['predicate.have'],
        followUpPredicateIds: ['predicate.need'],
        baseRoleKinds: ['object', 'attribute'],
        followUpRoleKinds: ['object'],
        relationTypeId: 'possession_to_constraint',
        requiredConnectorFunctions: ['reason'],
        requiresSameObject: false,
        requiresAttribute: true,
        requiresReasonRelation: true,
        requiredCompatibilityEdgePatterns: ['predicate.need->{object}', 'connector.reason'],
        requiredObjectIds: [],
        requiredSurfacePatternIds: ['pattern.followup.possession_constraint'],
        blockerWhenUnavailable: 'followUpOpportunity.required_fact_missing',
      ),
      A1FollowUpAffordance(
        affordanceId: 'activity_to_detail',
        basePredicateIds: ['predicate.study', 'predicate.go', 'predicate.work'],
        followUpPredicateIds: ['predicate.study', 'predicate.go', 'predicate.work'],
        baseRoleKinds: ['predicate'],
        followUpRoleKinds: ['place', 'time', 'topic'],
        relationTypeId: 'activity_to_detail',
        requiredConnectorFunctions: [],
        requiresSameObject: false,
        requiresAttribute: false,
        requiresReasonRelation: false,
        requiredCompatibilityEdgePatterns: ['{predicate}->{detail}'],
        requiredObjectIds: [],
        requiredSurfacePatternIds: ['pattern.followup.activity_detail'],
        blockerWhenUnavailable: 'followUpOpportunity.required_fact_missing',
      ),
      A1FollowUpAffordance(
        affordanceId: 'state_to_reason_or_action',
        basePredicateIds: [],
        followUpPredicateIds: ['predicate.want', 'predicate.go', 'predicate.need'],
        baseRoleKinds: ['state'],
        followUpRoleKinds: ['predicate'],
        relationTypeId: 'state_to_reason_or_action',
        requiredConnectorFunctions: ['reason'],
        requiresSameObject: false,
        requiresAttribute: false,
        requiresReasonRelation: true,
        requiredCompatibilityEdgePatterns: ['state->{followUpPredicate}', 'connector.reason'],
        requiredObjectIds: [],
        requiredSurfacePatternIds: ['pattern.followup.state_reason_action'],
        blockerWhenUnavailable: 'followUpOpportunity.required_fact_missing',
      ),
    ]);
  }

  final List<A1FollowUpAffordance> affordances;

  List<String> get affordanceIds =>
      List.unmodifiable([for (final row in affordances) row.affordanceId]);

  A1FollowUpAffordance affordance(String affordanceId) {
    return affordances.singleWhere((row) => row.affordanceId == affordanceId);
  }
}
```

Export it from `packages/learning_core/lib/learning_core.dart`.

- [x] **Step 3: Add failing object-linked memory fact tests**

Modify or create tests around `A1SemanticFactRegistry` and `A1CompositionMemoryIndex`.

Required seeded fact behavior:

```dart
test('derives object-linked follow-up facts for direct claims', () {
  final facts = A1SemanticFactRegistry.initial().factsForRoles({
    'predicate.have',
    'predicate.like',
    'predicate.read',
    'object.book',
    'object.bag',
    'attribute.big',
  });

  expect(facts, contains('fact.have.self.book.big'));
  expect(facts, contains('fact.like.self.book'));
  expect(facts, contains('fact.read.self.book'));
  expect(facts, contains('fact.need.self.bag.big'), isFalse);
});
```

Also add a negative test:

```dart
test('generic preference item does not prove same-object book preference', () {
  final facts = A1SemanticFactRegistry.initial().factsForRoles({
    'predicate.like',
    'preference.item',
    'object.book',
  });

  expect(facts, contains('fact.like.self.preference.item'));
  expect(facts, isNot(contains('fact.like.self.book')));
});
```

Expected before implementation: FAIL because object-linked facts such as `fact.like.self.book` and `fact.read.self.book` are not derived.

- [x] **Step 4: Implement object-linked semantic fact support**

Modify `packages/learning_core/lib/src/a1_semantic_fact_registry.dart` and `packages/learning_core/lib/src/a1_composition_memory_index.dart`.

Add first object-linked fact rows:

```text
fact.have.self.book.big requires predicate.have + object.book + attribute.big
fact.have.self.book requires predicate.have + object.book
fact.like.self.book requires predicate.like + object.book
fact.read.self.book requires predicate.read + object.book
fact.need.self.bag.big requires predicate.need + object.bag + attribute.big
```

Do not remove existing broad facts such as `fact.like.self.preference.item`. Instead, ensure follow-up opportunity planning distinguishes:

```text
broad preference fact: may support older direct preference candidates
object-linked fact: required for same-object direct-claim follow-up
```

Update `A1SemanticCompatibilityRegistry.initial()` with first compatibility edges:

```text
predicate.have->object.book
predicate.have->object.bag
predicate.like->object.book
predicate.read->object.book
predicate.need->object.bag
object.book->attribute.big
object.bag->attribute.big
object.book->object.bag
```

Update `packages/learning_core/lib/src/a1_verified_form_registry.dart`, `packages/learning_core/lib/src/a1_surface_pattern_inventory.dart`, and `packages/learning_core/lib/src/a1_contextual_prompt_realizer.dart` with first renderable follow-up support:

```text
predicate.read:
  first-person learner form: ana ba2ra
  second-person tutor form: beta2ra
  routeRole: learner_answer_growth / tutor_question_anchor

pattern.followup.possession_preference
pattern.followup.possession_use
pattern.followup.possession_attribute
pattern.followup.possession_constraint
pattern.followup.activity_detail
pattern.followup.state_reason_action
```

- [x] **Step 4A: Add failing metadata readiness matrix tests**

Create `packages/learning_core/test/a1_follow_up_metadata_readiness_matrix_test.dart`.

Use this test shape:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1FollowUpMetadataReadinessMatrix', () {
    test('declares renderable metadata rows across multiple families and islands', () {
      final matrix = A1FollowUpMetadataReadinessMatrix.initial();

      expect(matrix.rows, hasLength(greaterThanOrEqualTo(5)));
      expect(matrix.renderableRows.map((row) => row.affordanceFamilyId).toSet(),
          containsAll([
        'possession_to_preference',
        'possession_to_use',
        'possession_to_constraint',
        'activity_to_detail',
        'state_to_reason_or_action',
      ]));
      expect(matrix.renderableRows.map((row) => row.islandId).toSet().length,
          greaterThanOrEqualTo(2));
    });

    test('each renderable row exposes all planner-readiness dependencies', () {
      final matrix = A1FollowUpMetadataReadinessMatrix.initial();

      for (final row in matrix.renderableRows) {
        expect(row.rowId, isNotEmpty);
        expect(row.affordanceId, isNotEmpty);
        expect(row.basePredicateIds, isNotEmpty);
        expect(row.baseRoleKinds, isNotEmpty);
        expect(row.followUpRoleKinds, isNotEmpty);
        expect(row.requiredSemanticFactPatterns, isNotEmpty);
        expect(row.requiredCompatibilityEdgeIds, isNotEmpty);
        expect(row.requiredSurfacePatternIds, isNotEmpty);
        expect(row.requiredAnswerExpectationIds, isNotEmpty);
        expect(row.requiredQuestionDemandIds, isNotEmpty);
        expect(row.supportedThoughtDepthRungs, isNotEmpty);
      }
    });

    test('same-object rows require object-linked fact patterns', () {
      final matrix = A1FollowUpMetadataReadinessMatrix.initial();

      final sameObjectRows = matrix.renderableRows.where(
        (row) => row.requiresSameObject,
      );

      expect(sameObjectRows, isNotEmpty);
      for (final row in sameObjectRows) {
        expect(row.requiredObjectLinkedFactPatterns, isNotEmpty);
      }
    });

    test('global rows can declare alternative semantic fact groups', () {
      final matrix = A1FollowUpMetadataReadinessMatrix.initial();

      final useRow = matrix.rows.singleWhere(
        (row) => row.rowId == 'shopping_possession.use_same_object',
      );
      expect(useRow.requiredAnySemanticFactPatternGroups.single,
          containsAll(['fact.read.self.{sameObject}', 'fact.use.self.{sameObject}']));

      final stateRow = matrix.rows.singleWhere(
        (row) => row.rowId == 'feelings_state.reason_or_action',
      );
      expect(stateRow.requiredAnySemanticFactPatternGroups.single,
          containsAll([
        'fact.want.self.{compatibleObject}',
        'fact.go.self.{compatiblePlace}',
      ]));
    });

    test('blocked rows keep first missing owner codes instead of disappearing', () {
      final matrix = A1FollowUpMetadataReadinessMatrix.initial();
      final blocked = matrix.rows.where((row) => row.isBlocked);

      for (final row in blocked) {
        expect(row.missingOwnerCodeByRequirement.values, isNotEmpty);
        expect(
          row.missingOwnerCodeByRequirement.values.every(
            (code) =>
                code.startsWith('metadataReadiness.') ||
                code.startsWith('surfaceRealization.') ||
                code.startsWith('arcCoherence.'),
          ),
          isTrue,
        );
      }
    });
  });
}
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_follow_up_metadata_readiness_matrix_test.dart
```

Expected before implementation: FAIL because `A1FollowUpMetadataReadinessMatrix` does not exist.

- [ ] **Step 4B: Implement follow-up metadata readiness matrix**

Create `packages/learning_core/lib/src/a1_follow_up_metadata_readiness_matrix.dart`.

Define:

```dart
enum A1FollowUpMetadataReadinessStatus { renderable, blocked }

final class A1FollowUpMetadataReadinessRow {
  const A1FollowUpMetadataReadinessRow({
    required this.rowId,
    required this.islandId,
    required this.affordanceFamilyId,
    required this.affordanceId,
    required this.basePredicateIds,
    required this.baseRoleKinds,
    required this.followUpPredicateIds,
    required this.followUpRoleKinds,
    required this.requiredSemanticFactPatterns,
    required this.requiredAnySemanticFactPatternGroups,
    required this.requiredObjectLinkedFactPatterns,
    required this.requiredCompatibilityEdgeIds,
    required this.requiredSituationRuleIds,
    required this.requiredConnectorFunctionIds,
    required this.requiredVerifiedFormIds,
    required this.requiredSurfacePatternIds,
    required this.requiredAnswerExpectationIds,
    required this.requiredQuestionDemandIds,
    required this.supportedThoughtDepthRungs,
    required this.missingOwnerCodeByRequirement,
    required this.readinessStatus,
    required this.requiresSameObject,
  });

  final String rowId;
  final String islandId;
  final String affordanceFamilyId;
  final String affordanceId;
  final List<String> basePredicateIds;
  final List<String> baseRoleKinds;
  final List<String> followUpPredicateIds;
  final List<String> followUpRoleKinds;
  final List<String> requiredSemanticFactPatterns;
  final List<List<String>> requiredAnySemanticFactPatternGroups;
  final List<String> requiredObjectLinkedFactPatterns;
  final List<String> requiredCompatibilityEdgeIds;
  final List<String> requiredSituationRuleIds;
  final List<String> requiredConnectorFunctionIds;
  final List<String> requiredVerifiedFormIds;
  final List<String> requiredSurfacePatternIds;
  final List<String> requiredAnswerExpectationIds;
  final List<String> requiredQuestionDemandIds;
  final List<String> supportedThoughtDepthRungs;
  final Map<String, String> missingOwnerCodeByRequirement;
  final A1FollowUpMetadataReadinessStatus readinessStatus;
  final bool requiresSameObject;

  bool get isRenderable =>
      readinessStatus == A1FollowUpMetadataReadinessStatus.renderable;
  bool get isBlocked =>
      readinessStatus == A1FollowUpMetadataReadinessStatus.blocked;
}

final class A1FollowUpMetadataReadinessMatrix {
  const A1FollowUpMetadataReadinessMatrix({required this.rows});

  factory A1FollowUpMetadataReadinessMatrix.initial() {
    return const A1FollowUpMetadataReadinessMatrix(rows: [
      A1FollowUpMetadataReadinessRow(
        rowId: 'shopping_possession.preference_same_object',
        islandId: 'shopping_possessions',
        affordanceFamilyId: 'possession_to_preference',
        affordanceId: 'possession_to_preference',
        basePredicateIds: ['predicate.have'],
        baseRoleKinds: ['object'],
        followUpPredicateIds: ['predicate.like'],
        followUpRoleKinds: ['object'],
        requiredSemanticFactPatterns: [
          'fact.have.self.{object}',
          'fact.like.self.{sameObject}',
        ],
        requiredAnySemanticFactPatternGroups: [],
        requiredObjectLinkedFactPatterns: ['fact.like.self.{sameObject}'],
        requiredCompatibilityEdgeIds: [
          'predicate.have->{object}',
          'predicate.like->{sameObject}',
        ],
        requiredSituationRuleIds: [],
        requiredConnectorFunctionIds: [],
        requiredVerifiedFormIds: [
          'form.have.1sg.present',
          'form.like.1sg.present',
          'form.like.2sg.present',
        ],
        requiredSurfacePatternIds: ['pattern.followup.possession_preference'],
        requiredAnswerExpectationIds: [
          'answer.followup.preference_same_object',
        ],
        requiredQuestionDemandIds: ['ask_preference_same_object'],
        supportedThoughtDepthRungs: [
          'depth_2_clause_with_detail',
          'depth_3_clause_with_time_place_topic',
        ],
        missingOwnerCodeByRequirement: {},
        readinessStatus: A1FollowUpMetadataReadinessStatus.renderable,
        requiresSameObject: true,
      ),
      A1FollowUpMetadataReadinessRow(
        rowId: 'shopping_possession.use_same_object',
        islandId: 'shopping_possessions',
        affordanceFamilyId: 'possession_to_use',
        affordanceId: 'possession_to_use',
        basePredicateIds: ['predicate.have'],
        baseRoleKinds: ['object'],
        followUpPredicateIds: ['predicate.read', 'predicate.use'],
        followUpRoleKinds: ['object'],
        requiredSemanticFactPatterns: [
          'fact.have.self.{object}',
        ],
        requiredAnySemanticFactPatternGroups: [
          ['fact.read.self.{sameObject}', 'fact.use.self.{sameObject}'],
        ],
        requiredObjectLinkedFactPatterns: [
          'fact.{usePredicate}.self.{sameObject}',
        ],
        requiredCompatibilityEdgeIds: [
          'predicate.have->{object}',
          '{usePredicate}->{sameObject}',
        ],
        requiredSituationRuleIds: [],
        requiredConnectorFunctionIds: [],
        requiredVerifiedFormIds: [
          'form.have.1sg.present',
          'form.read.1sg.present',
          'form.read.2sg.present',
        ],
        requiredSurfacePatternIds: ['pattern.followup.possession_use'],
        requiredAnswerExpectationIds: ['answer.followup.use_same_object'],
        requiredQuestionDemandIds: ['ask_use_same_object'],
        supportedThoughtDepthRungs: [
          'depth_2_clause_with_detail',
          'depth_4_reason_or_constraint',
        ],
        missingOwnerCodeByRequirement: {},
        readinessStatus: A1FollowUpMetadataReadinessStatus.renderable,
        requiresSameObject: true,
      ),
      A1FollowUpMetadataReadinessRow(
        rowId: 'shopping_possession.constraint_reason',
        islandId: 'shopping_possessions',
        affordanceFamilyId: 'possession_to_constraint',
        affordanceId: 'possession_to_constraint',
        basePredicateIds: ['predicate.have'],
        baseRoleKinds: ['object', 'attribute'],
        followUpPredicateIds: ['predicate.need'],
        followUpRoleKinds: ['object'],
        requiredSemanticFactPatterns: [
          'fact.have.self.{object}.{attribute}',
          'fact.need.self.{relatedObject}.{attribute}',
        ],
        requiredAnySemanticFactPatternGroups: [],
        requiredObjectLinkedFactPatterns: [],
        requiredCompatibilityEdgeIds: [
          'object.{base}->object.{related}',
          'predicate.need->{relatedObject}',
          'connector.reason',
        ],
        requiredSituationRuleIds: [
          'situation.object_attribute_requires_related_object',
        ],
        requiredConnectorFunctionIds: ['reason'],
        requiredVerifiedFormIds: [
          'form.have.1sg.present',
          'form.need.1sg.present',
          'connector.because',
        ],
        requiredSurfacePatternIds: ['pattern.followup.possession_constraint'],
        requiredAnswerExpectationIds: ['answer.followup.constraint_reason'],
        requiredQuestionDemandIds: ['ask_why_reason'],
        supportedThoughtDepthRungs: [
          'depth_4_reason_or_constraint',
          'depth_5_contrast',
        ],
        missingOwnerCodeByRequirement: {},
        readinessStatus: A1FollowUpMetadataReadinessStatus.renderable,
        requiresSameObject: false,
      ),
      A1FollowUpMetadataReadinessRow(
        rowId: 'daily_activity.detail',
        islandId: 'daily_activity',
        affordanceFamilyId: 'activity_to_detail',
        affordanceId: 'activity_to_detail',
        basePredicateIds: ['predicate.study', 'predicate.go', 'predicate.work'],
        baseRoleKinds: ['predicate'],
        followUpPredicateIds: ['predicate.study', 'predicate.go', 'predicate.work'],
        followUpRoleKinds: ['time', 'place', 'topic'],
        requiredSemanticFactPatterns: [
          'fact.{activity}.self.{detailRole}.{detailValue}',
        ],
        requiredAnySemanticFactPatternGroups: [],
        requiredObjectLinkedFactPatterns: [],
        requiredCompatibilityEdgeIds: ['{activityPredicate}->{detailRole}'],
        requiredSituationRuleIds: [],
        requiredConnectorFunctionIds: [],
        requiredVerifiedFormIds: [
          'form.study.1sg.future',
          'form.study.2sg.future',
          'form.go.1sg.present',
          'form.work.1sg.present',
        ],
        requiredSurfacePatternIds: ['pattern.followup.activity_detail'],
        requiredAnswerExpectationIds: ['answer.followup.activity_detail'],
        requiredQuestionDemandIds: [
          'ask_where_detail',
          'ask_when_detail',
          'ask_what_topic',
        ],
        supportedThoughtDepthRungs: [
          'depth_2_clause_with_detail',
          'depth_3_clause_with_time_place_topic',
        ],
        missingOwnerCodeByRequirement: {},
        readinessStatus: A1FollowUpMetadataReadinessStatus.renderable,
        requiresSameObject: false,
      ),
      A1FollowUpMetadataReadinessRow(
        rowId: 'feelings_state.reason_or_action',
        islandId: 'feelings_states',
        affordanceFamilyId: 'state_to_reason_or_action',
        affordanceId: 'state_to_reason_or_action',
        basePredicateIds: ['predicate.state'],
        baseRoleKinds: ['state'],
        followUpPredicateIds: ['predicate.want', 'predicate.go', 'predicate.need'],
        followUpRoleKinds: ['predicate', 'object', 'place'],
        requiredSemanticFactPatterns: [
          'fact.state.self.{state}',
        ],
        requiredAnySemanticFactPatternGroups: [
          ['fact.want.self.{compatibleObject}', 'fact.go.self.{compatiblePlace}'],
        ],
        requiredObjectLinkedFactPatterns: [],
        requiredCompatibilityEdgeIds: [
          'state->{followUpPredicate}',
          'connector.reason',
        ],
        requiredSituationRuleIds: ['situation.state_to_action'],
        requiredConnectorFunctionIds: ['reason'],
        requiredVerifiedFormIds: [
          'form.state.1sg.present',
          'form.want.1sg.present',
          'form.go.1sg.present',
          'connector.because',
        ],
        requiredSurfacePatternIds: ['pattern.followup.state_reason_action'],
        requiredAnswerExpectationIds: [
          'answer.followup.state_reason_or_action',
        ],
        requiredQuestionDemandIds: ['ask_why_reason', 'ask_what_action'],
        supportedThoughtDepthRungs: [
          'depth_4_reason_or_constraint',
          'depth_7_multi_sentence_connected_answer',
        ],
        missingOwnerCodeByRequirement: {},
        readinessStatus: A1FollowUpMetadataReadinessStatus.renderable,
        requiresSameObject: false,
      ),
    ]);
  }

  final List<A1FollowUpMetadataReadinessRow> rows;

  Iterable<A1FollowUpMetadataReadinessRow> get renderableRows =>
      rows.where((row) => row.isRenderable);

  Iterable<A1FollowUpMetadataReadinessRow> rowsForAffordance(
    String affordanceId,
  ) {
    return rows.where((row) => row.affordanceId == affordanceId);
  }
}
```

Add these first renderable rows. They are metadata readiness proofs, not candidate-id branches:

```text
shopping_possession.preference_same_object:
  islandId: shopping_possessions
  family: possession_to_preference
  affordance: possession_to_preference
  required facts: fact.have.self.{object}, fact.like.self.{sameObject}
  object-linked facts: fact.like.self.{sameObject}
  compatibility: predicate.have->{object}, predicate.like->{sameObject}
  surface: pattern.followup.possession_preference
  answer expectation: answer.followup.preference_same_object
  question demand: ask_preference_same_object
  rungs: depth_2_clause_with_detail, depth_3_clause_with_time_place_topic

shopping_possession.use_same_object:
  islandId: shopping_possessions
  family: possession_to_use
  affordance: possession_to_use
  required facts: fact.have.self.{object}
  alternative facts: fact.read.self.{sameObject} or fact.use.self.{sameObject}
  object-linked facts: fact.{usePredicate}.self.{sameObject}
  compatibility: predicate.have->{object}, {usePredicate}->{sameObject}
  surface: pattern.followup.possession_use
  answer expectation: answer.followup.use_same_object
  question demand: ask_use_same_object
  rungs: depth_2_clause_with_detail, depth_4_reason_or_constraint

shopping_possession.constraint_reason:
  islandId: shopping_possessions
  family: possession_to_constraint
  affordance: possession_to_constraint
  required facts: fact.have.self.{object}.{attribute}, fact.need.self.{relatedObject}.{attribute}
  situation: situation.object_attribute_requires_related_object
  connector: reason
  compatibility: object.{base}->object.{related}, predicate.need->{relatedObject}, connector.reason
  surface: pattern.followup.possession_constraint
  answer expectation: answer.followup.constraint_reason
  question demand: ask_why_reason
  rungs: depth_4_reason_or_constraint, depth_5_contrast

daily_activity.detail:
  islandId: daily_activity
  family: activity_to_detail
  affordance: activity_to_detail
  required facts: fact.{activity}.self.{detailRole}.{detailValue}
  compatibility: {activityPredicate}->{detailRole}
  surface: pattern.followup.activity_detail
  answer expectation: answer.followup.activity_detail
  question demand: ask_where_detail, ask_when_detail, ask_what_topic
  rungs: depth_2_clause_with_detail, depth_3_clause_with_time_place_topic

feelings_state.reason_or_action:
  islandId: feelings_states
  family: state_to_reason_or_action
  affordance: state_to_reason_or_action
  required facts: fact.state.self.{state}
  alternative facts: fact.want.self.{compatibleObject} or fact.go.self.{compatiblePlace}
  situation: situation.state_to_action
  connector: reason when a reason clause is selected
  compatibility: state->{followUpPredicate}, connector.reason
  surface: pattern.followup.state_reason_action
  answer expectation: answer.followup.state_reason_or_action
  question demand: ask_why_reason, ask_what_action
  rungs: depth_4_reason_or_constraint, depth_7_multi_sentence_connected_answer
```

Export the matrix from `packages/learning_core/lib/learning_core.dart`.

- [x] **Step 5: Add failing follow-up opportunity planner tests**

Create `packages/learning_core/test/a1_follow_up_opportunity_planner_test.dart`.

Required tests:

```dart
test('expands have book into preference when like book is known', () {
  final result = A1FollowUpOpportunityPlanner.initial().plan(
    baseCandidateId: 'candidate.have_book',
    baseGraph: _haveBookGraph(),
    memoryIndex: _seededIndex(
      factIds: [
        'fact.have.self.book',
        'fact.like.self.book',
      ],
      predicates: ['predicate.have', 'predicate.like'],
      objects: ['object.book'],
    ),
    recentHistory: const A1FollowUpOpportunityHistory.empty(),
  );

  expect(result.isReady, isTrue);
  expect(result.preferredOpportunity!.affordanceId,
      'possession_to_preference');
  expect(result.preferredOpportunity!.requiredSemanticFactIds,
      contains('fact.like.self.book'));
  expect(result.preferredOpportunity!.followUpGraph.fingerprint,
      contains('predicate.like'));
});

test('prefers read over like when like is overused and read is available', () {
  final result = A1FollowUpOpportunityPlanner.initial().plan(
    baseCandidateId: 'candidate.have_book',
    baseGraph: _haveBookGraph(),
    memoryIndex: _seededIndex(
      factIds: [
        'fact.have.self.book',
        'fact.like.self.book',
        'fact.read.self.book',
      ],
      predicates: ['predicate.have', 'predicate.like', 'predicate.read'],
      objects: ['object.book'],
    ),
    recentHistory: const A1FollowUpOpportunityHistory(
      recentPredicateIds: ['predicate.like', 'predicate.like', 'predicate.like'],
      masteredPredicateIds: ['predicate.like'],
      recentAffordanceIds: [],
      recentObjectIds: [],
      recentRelationTypeIds: [],
    ),
  );

  expect(result.isReady, isTrue);
  expect(result.preferredOpportunity!.affordanceId, 'possession_to_use');
  expect(result.preferredOpportunity!.scoreTerms,
      contains('growthPredicate.lessPracticed:predicate.read'));
  expect(result.rejectedOpportunities.any((row) {
    return row.affordanceId == 'possession_to_preference' &&
        row.cooldownPenaltyTerms.contains(
          'masteryPredicate.deprioritized:predicate.like',
        );
  }), isTrue);
});

test('blocks selected multi-exchange when no same-object follow-up exists', () {
  final result = A1FollowUpOpportunityPlanner.initial().plan(
    baseCandidateId: 'candidate.have_book',
    baseGraph: _haveBookGraph(),
    memoryIndex: _seededIndex(
      factIds: ['fact.have.self.book'],
      predicates: ['predicate.have'],
      objects: ['object.book'],
    ),
    recentHistory: const A1FollowUpOpportunityHistory.empty(),
  );

  expect(result.isReady, isFalse);
  expect(result.ownerBlockerCodes,
      contains('followUpOpportunity.none_available'));
});
```

Expected before implementation: FAIL because the planner and history model do not exist.

- [x] **Step 6: Implement follow-up opportunity planner**

Create `packages/learning_core/lib/src/a1_follow_up_opportunity_planner.dart`.

Define:

```text
A1FollowUpOpportunityHistory:
  recentPredicateIds
  masteredPredicateIds
  recentAffordanceIds
  recentObjectIds
  recentRelationTypeIds

A1FollowUpOpportunity:
  opportunityId
  affordanceId
  metadataReadinessRowId
  baseCandidateId
  relationTypeId
  basePropositionIds
  followUpGraph
  requiredSemanticFactIds
  requiredRoleIds
  requiredCompatibilityEdgeIds
  requiredSurfacePatternIds
  requiredVerifiedFormIds
  score
  scoreTerms
  cooldownPenaltyTerms
  ownerBlockerCodes

A1FollowUpOpportunityPlannerResult:
  opportunities
  rejectedOpportunities
  ownerBlockerCodes
  preferredOpportunity
  isReady
```

Planner pipeline:

```text
base graph claim
-> infer base role ids and base object ids
-> iterate global affordances
-> lookup renderable follow-up metadata readiness rows
-> require base predicate/role compatibility
-> require object-linked facts for same-object follow-ups
-> require semantic compatibility edges
-> require situation rule ids when the matrix row declares them
-> require verified form ids and surface pattern ids
-> require answer expectation ids and question demand ids
-> build expanded proposition graph
-> score with shared freshness/mastery/cooldown policy
-> return ranked opportunities or followUpOpportunity.none_available
```

First scoring terms:

```text
followUpOpportunity.available:<affordanceId>
sameObjectConnection:<objectId>
crossFactConnection:<factId>
newRelationType:<relationTypeId>
growthPredicate.lessPracticed:<predicateId>
supportPredicate.mastered:<predicateId>
```

First penalty terms:

```text
recentAffordance:<affordanceId>
recentPredicate:<predicateId>
recentObject:<objectId>
recentRelationType:<relationTypeId>
masteryPredicate.deprioritized:<predicateId>
missingFact:<factId>
missingCompatibility:<edgeId>
missingMetadataReadinessRow:<rowId>
missingSituationRule:<ruleId>
missingSurfacePattern:<patternId>
missingAnswerExpectation:<expectationId>
```

Use a small local scoring policy first, but put the constants in one private structure so Task 23 can move them into the shared coordinator trace/policy surface:

```text
freshAffordanceBonus
sameObjectConnectionBonus
crossFactConnectionBonus
lessPracticedGrowthBonus
masteredPredicatePenalty
recentPredicatePenalty
recentAffordancePenalty
recentObjectPenalty
```

- [x] **Step 7: Wire follow-up opportunities into coherent candidate construction**

Modify `packages/learning_core/lib/src/a1_coherent_candidate_factory.dart`.

Direct-claim plans must branch through the planner:

```text
direct claim plan
-> A1FollowUpOpportunityPlanner.plan
-> if preferred opportunity exists:
     emit expanded candidate with opportunity graph and shape targets
   else if explicit one-exchange direct claim is allowed:
     emit direct candidate marked single_exchange_allowed
   else:
     prune with followUpOpportunity.none_available
```

Add candidate fields through existing `growthTargetIds` and `shapeTargetIds` until Task 23 adds first-class trace fields:

```text
a1.follow_up_opportunity.<opportunityId>
a1.follow_up_affordance.<affordanceId>
a1.follow_up_relation.<relationTypeId>
```

Candidate factory prune findings must include:

```text
firstFailingLayer: followUpOpportunity
ownerCode: followUpOpportunity.none_available
missingIds: exact required fact / surface / compatibility ids
```

Do not add candidate-id branches such as `if book then like`. The selected rows must come from affordance ids and role/fact matching.

- [x] **Step 8: Remove generic confirmation fallback from selected normal paths**

Modify `packages/learning_core/lib/src/a1_contextual_prompt_realizer.dart`.

The realizer may keep `tab keda tamam? / ah, tamam.` only for an explicit confirmation move/obligation. It must not use that text to satisfy `ask_direct_claim` or `ask_supporting_fact` when no support proposition exists.

Expected owner blocker:

```text
surfaceRealization.generic_confirmation_fallback_forbidden
```

Update `packages/learning_core/test/a1_contextual_prompt_realizer_test.dart`:

```dart
test('blocks generic confirmation fallback for normal selected direct claims', () {
  final result = A1ContextualPromptRealizer.initial().realize(
    graph: _singleClaimLikeBookGraph(),
    moveSequencePlan: _directClaimWithSupportingFactButNoSupportPlan(),
  );

  expect(result.isRenderable, isFalse);
  expect(result.blockerCodes,
      contains('surfaceRealization.generic_confirmation_fallback_forbidden'));
});
```

- [x] **Step 9: Add 24-round selected follow-up audit**

Create `packages/learning_core/test/a1_global_composition_seeded_follow_up_24_audit_test.dart`.

The seeded memory must include enough global facts to prove several affordances:

```text
predicate.have
predicate.like
predicate.read
predicate.need
predicate.study
predicate.go
predicate.want
predicate.work
object.book
object.bag
object.drink.tea
object.food.meat
place.school
place.home
time.today
time.tomorrow
topic.history
attribute.big
state.thirsty
state.hungry
state.tired
connector.because

fact.have.self.book
fact.have.self.book.big
fact.like.self.book
fact.read.self.book
fact.need.self.bag.big
fact.study.self.topic.history
fact.study.self.place.school
fact.study.self.time.tomorrow
fact.work.self.time.today
fact.want.self.drink.tea
fact.state.self.thirsty
fact.want.self.food.meat
fact.state.self.hungry
fact.self.tired
```

The audit must run `selectionCount: 24` and print every selected transcript:

```text
index
candidateId
islandId
questionDemandId
thoughtDepthRung
moveSequenceId
followUpOpportunityId
followUpAffordanceId
followUpRelationTypeId
followUpMetadataReadinessRowId
mainPredicateId
mainObjectIds
scoreTerms
cooldownPenaltyTerms
recentHistoryBeforeSelection
full transcript
```

Assertions:

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
repeatedExchangePairsWithinSelectedTranscripts == 0
sameMainPredicateWithinCooldown == 0 unless explicit owner
overusedPredicateChosenAsGrowth == 0 unless no alternative owner
followUpOpportunityRejectedNearRepeats isNotEmpty
```

The audit cannot pass by satisfying only possession/book examples. The selected or renderable inventory must prove at least three follow-up affordance families across at least two islands, with at least one same-object expansion and at least one non-possession expansion. This keeps Task 22F global: adding another island should be a metadata/fact/surface readiness exercise, not a new hard-coded branch.

Required visible seeded scenarios in the printed sequence or rejected/available inventory:

```text
have(book) + like(book) -> possession_to_preference
have(book) + read(book) -> possession_to_use
have(big book) + need(bag) -> possession_to_constraint
study(history/school/tomorrow) -> activity_to_detail
state/thirst/hunger/tired -> state_to_reason_or_action
have(book) only -> followUpOpportunity.none_available when selected multi-exchange is required
like(book) over-practiced + read(book) available -> read/use chosen over like as growth
```

Expected before implementation: FAIL because the planner and selected audit fields do not exist and generic confirmation fallback can still pass.

- [x] **Step 10: Update risk gates and audit report**

Modify `packages/learning_core/lib/src/a1_global_composition_risk_gate_audit.dart`, `packages/learning_core/test/a1_global_composition_risk_gate_audit_test.dart`, and `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`.

Add or update evidence:

```text
scoringRepetition:
  includes 24-round selected follow-up audit, no generic confirmation fallback, and overused predicate pressure

globalFollowUpScale:
  fails if the 24-round selected follow-up audit proves fewer than three affordance families, fewer than two follow-up islands, no same-object expansion, or no non-possession expansion

metadataIslandReadiness:
  names object-linked facts, follow-up metadata readiness rows, compatibility edges, situation rules, answer expectations, and affordance metadata as required for direct-claim expansion

coherenceTooLoose:
  names follow-up relation validation and same-object fact requirements

contextualPrompt:
  fails if generic confirmation fallback appears in normal selected direct claims

seededMemoryContract:
  warns that seeded object-linked facts are proven but organic UI/backend writeback still has to write them
```

Append a report section:

```markdown
## Seeded Follow-Up Opportunity 24-Round Audit

- Date: 2026-06-03
- Seeded selected status: pass / blocked, with first owner code
- Selected transcript count: numeric
- Represented islands: ids and count
- Represented question demands: ids and count
- Represented move sequences: ids and count
- Represented follow-up affordances: ids and count
- Represented follow-up affordance families: ids and count
- Follow-up affordance islands: ids and count
- Follow-up metadata readiness rows: ids and count
- Renderable follow-up metadata readiness rows: ids and count
- Object-linked follow-ups selected: numeric
- Same-object follow-ups selected: numeric
- Non-possession follow-ups selected: numeric
- Selected follow-ups missing metadata rows: numeric
- Generic confirmation fallback count: numeric
- Repeated exchange pairs inside selected transcripts: numeric
- Same main predicate within cooldown: numeric
- Overused predicate chosen as growth: numeric
- First three selected object-linked follow-up transcripts
- First rejected near-repeat and cooldown reason
- First blocked direct-claim follow-up and owner code
- Remaining organic blocker: UI/backend object-linked semantic writeback and coordinator trace integration
```

- [x] **Step 11: Update Task 23 trace expectations**

Modify Task 23 tests and trace plan text when implementing Task 23 so every selected/rejected typed candidate can expose:

```text
followUpOpportunity.selected:<opportunityId>
followUpAffordance.selected:<affordanceId>
followUpRelation.selected:<relationTypeId>
followUpOpportunity.scoreTerm:<term>
followUpOpportunity.cooldownPenalty:<term>
followUpOpportunity.rejected:<ownerCode>
followUpOpportunity.requiredFact:<factId>
followUpOpportunity.requiredCompatibility:<edgeId>
```

Task 22F may add these as `growthTargetIds`/`shapeTargetIds` first. Task 23 must make them first-class trace fields.

- [x] **Step 12: Verify Task 22F**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_follow_up_affordance_registry_test.dart \
  test/a1_follow_up_opportunity_planner_test.dart \
  test/a1_contextual_prompt_realizer_test.dart \
  test/a1_coherent_candidate_factory_test.dart \
  test/a1_global_composition_seeded_selection_audit_test.dart \
  test/a1_global_composition_seeded_follow_up_24_audit_test.dart \
  test/a1_global_composition_risk_gate_audit_test.dart
```

Expected: PASS. The 24-round audit must print all selected transcripts and must show direct claims using real follow-up opportunities or owned blockers.

Run:

```bash
git diff --check
```

- [ ] **Step 13: Commit Task 22F**

```bash
git add \
  packages/learning_core/lib/src/a1_follow_up_affordance_registry.dart \
  packages/learning_core/lib/src/a1_follow_up_opportunity_planner.dart \
  packages/learning_core/lib/src/a1_composition_memory_index.dart \
  packages/learning_core/lib/src/a1_semantic_fact_registry.dart \
  packages/learning_core/lib/src/a1_semantic_compatibility_registry.dart \
  packages/learning_core/lib/src/a1_coherent_candidate_factory.dart \
  packages/learning_core/lib/src/a1_dialogue_move_sequence_planner.dart \
  packages/learning_core/lib/src/a1_contextual_prompt_realizer.dart \
  packages/learning_core/lib/src/a1_surface_pattern_inventory.dart \
  packages/learning_core/lib/src/a1_verified_form_registry.dart \
  packages/learning_core/lib/src/a1_seeded_dialogue_selection_audit.dart \
  packages/learning_core/lib/src/a1_global_composition_risk_gate_audit.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_follow_up_affordance_registry_test.dart \
  packages/learning_core/test/a1_follow_up_opportunity_planner_test.dart \
  packages/learning_core/test/a1_global_composition_seeded_follow_up_24_audit_test.dart \
  packages/learning_core/test/a1_global_composition_seeded_selection_audit_test.dart \
  packages/learning_core/test/a1_coherent_candidate_factory_test.dart \
  packages/learning_core/test/a1_contextual_prompt_realizer_test.dart \
  packages/learning_core/test/a1_global_composition_risk_gate_audit_test.dart \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md \
  docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md
git commit -m "feat: add A1 follow-up opportunity planning"
```

## Task 22G: Typed Generator Backend/UI Wiring And No-Legacy Route

**Purpose:** Make normal A1 Focus route through the typed generation system only. Empty memory must enter typed bootstrap, eligible memory must enter typed composition, and failure must produce an owned blocker. No product path may silently call the legacy arc fallback.

**Audit finding addressed:** seeded typed audits prove the new composition shape in `learning_core`, but backend/UI routing can still miss the new system or write memory that the typed generator cannot consume.

**Remediation Decision Record:**

```text
productFailure: typed generation exists but product routing can still behave as if legacy is the real source of lessons
firstFailingLayer: backend/UI generation route and memory projection/writeback spine
evidence: 22E/22F seeded audits pass without proving empty-memory product sessions or UI-written memory can drive the next typed lesson
selectedRepair: add a shared A1 generation mode policy and router consumed by FocusCoordinator, compiler preflight, session controller, and memory writer
whyThisRepairFirst: bootstrap and metadata expansion cannot be trusted until the product path proves it is actually using typed generation
productionBehaviorChanged: normal A1 Focus selects typed_bootstrap, typed_composition, or blocked; legacyFallbackAttempted is always false
backendProof: 12-session backend audit shows typed route, typed proof contract, facts written, and next lesson consuming those facts
uiProductCheckpoint: mobile session controller renders typed payloads and writes typed completion evidence
remainingOwnedBlocker: bootstrap.not_implemented remains until Task 22H creates the empty-memory starter generator
```

**Files:**

- Create: `packages/learning_core/lib/src/a1_generation_mode_policy.dart`
- Create: `packages/learning_core/lib/src/a1_typed_generation_router.dart`
- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/lib/src/focus_plan.dart`
- Modify: `packages/learning_core/lib/src/a1_compiler_preflight.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `apps/mobile/lib/features/practice/session_controller.dart`
- Modify: `apps/mobile/lib/features/practice/focus_evidence_writer.dart`
- Modify: `apps/mobile/lib/shared/persistence/learner_memory_repository.dart`
- Test: `packages/learning_core/test/a1_generation_mode_policy_test.dart`
- Test: `packages/learning_core/test/a1_typed_generation_router_test.dart`
- Test: `packages/learning_core/test/a1_backend_typed_route_no_legacy_audit_test.dart`
- Test: `apps/mobile/test/a1_typed_generation_ui_wiring_test.dart`

**Implementation progress note:** route policy, typed router, and a no-legacy backend harness have been implemented and verified in `packages/learning_core`. The production `FocusCoordinator` route, compiler preflight route, mobile render path, and mobile completion writeback are still not proven by this task.

- [x] **Step 1: Add failing generation mode policy tests**

Create `packages/learning_core/test/a1_generation_mode_policy_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1GenerationModePolicy', () {
    test('routes empty memory to typed bootstrap without legacy fallback', () {
      final policy = A1GenerationModePolicy.defaults();
      final result = policy.selectMode(
        memoryProfile: A1TypedMemoryProfile.empty(),
        typedReadiness: const A1TypedReadiness(
          renderableCompositionCandidateCount: 0,
          knownPredicateFrameCount: 0,
          knownSemanticRoleClassCount: 0,
          typedSemanticFactCount: 0,
          islandCount: 0,
          reasonCompatiblePairCount: 0,
        ),
      );

      expect(result.mode, A1GenerationMode.typedBootstrap);
      expect(result.legacyFallbackAttempted, isFalse);
      expect(result.blockerCode, isNull);
    });

    test('routes eligible memory to typed composition', () {
      final policy = A1GenerationModePolicy.defaults();
      final result = policy.selectMode(
        memoryProfile: A1TypedMemoryProfile.seededForComposition(),
        typedReadiness: const A1TypedReadiness(
          renderableCompositionCandidateCount: 14,
          knownPredicateFrameCount: 7,
          knownSemanticRoleClassCount: 12,
          typedSemanticFactCount: 16,
          islandCount: 4,
          reasonCompatiblePairCount: 2,
        ),
      );

      expect(result.mode, A1GenerationMode.typedComposition);
      expect(result.legacyFallbackAttempted, isFalse);
      expect(result.reasonCodes, contains('typedEligibility.composition_ready'));
    });

    test('blocks instead of calling legacy when typed route cannot render', () {
      final policy = A1GenerationModePolicy.defaults();
      final result = policy.selectMode(
        memoryProfile: A1TypedMemoryProfile.seededForComposition(),
        typedReadiness: const A1TypedReadiness(
          renderableCompositionCandidateCount: 0,
          knownPredicateFrameCount: 7,
          knownSemanticRoleClassCount: 12,
          typedSemanticFactCount: 16,
          islandCount: 4,
          reasonCompatiblePairCount: 2,
        ),
      );

      expect(result.mode, A1GenerationMode.blocked);
      expect(result.legacyFallbackAttempted, isFalse);
      expect(result.blockerCode, 'typedRoute.no_renderable_composition_candidate');
    });
  });
}
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test test/a1_generation_mode_policy_test.dart -r expanded
```

Expected: FAIL because the generation-mode policy types do not exist yet.

- [x] **Step 2: Implement the shared route policy**

Create `packages/learning_core/lib/src/a1_generation_mode_policy.dart` with:

```dart
enum A1GenerationMode { typedBootstrap, typedComposition, blocked }

class A1TypedReadiness {
  const A1TypedReadiness({
    required this.renderableCompositionCandidateCount,
    required this.knownPredicateFrameCount,
    required this.knownSemanticRoleClassCount,
    required this.typedSemanticFactCount,
    required this.islandCount,
    required this.reasonCompatiblePairCount,
  });

  final int renderableCompositionCandidateCount;
  final int knownPredicateFrameCount;
  final int knownSemanticRoleClassCount;
  final int typedSemanticFactCount;
  final int islandCount;
  final int reasonCompatiblePairCount;
}

class A1GenerationModeDecision {
  const A1GenerationModeDecision({
    required this.mode,
    required this.reasonCodes,
    required this.legacyFallbackAttempted,
    this.blockerCode,
  });

  final A1GenerationMode mode;
  final List<String> reasonCodes;
  final bool legacyFallbackAttempted;
  final String? blockerCode;
}

class A1TypedMemoryProfile {
  const A1TypedMemoryProfile({required this.hasAnyTypedFacts});

  final bool hasAnyTypedFacts;

  factory A1TypedMemoryProfile.empty() => const A1TypedMemoryProfile(hasAnyTypedFacts: false);
  factory A1TypedMemoryProfile.seededForComposition() => const A1TypedMemoryProfile(hasAnyTypedFacts: true);
}

class A1GenerationModePolicy {
  const A1GenerationModePolicy({
    required this.minimumIslandsTouched,
    required this.minimumKnownPredicateFrames,
    required this.minimumKnownSemanticRoleClasses,
    required this.minimumTypedSemanticFacts,
    required this.minimumReasonCompatiblePairs,
    required this.minimumRenderableCompositionCandidates,
  });

  factory A1GenerationModePolicy.defaults() => const A1GenerationModePolicy(
        minimumIslandsTouched: 3,
        minimumKnownPredicateFrames: 6,
        minimumKnownSemanticRoleClasses: 10,
        minimumTypedSemanticFacts: 12,
        minimumReasonCompatiblePairs: 1,
        minimumRenderableCompositionCandidates: 12,
      );

  final int minimumIslandsTouched;
  final int minimumKnownPredicateFrames;
  final int minimumKnownSemanticRoleClasses;
  final int minimumTypedSemanticFacts;
  final int minimumReasonCompatiblePairs;
  final int minimumRenderableCompositionCandidates;

  A1GenerationModeDecision selectMode({
    required A1TypedMemoryProfile memoryProfile,
    required A1TypedReadiness typedReadiness,
  }) {
    if (!memoryProfile.hasAnyTypedFacts) {
      return const A1GenerationModeDecision(
        mode: A1GenerationMode.typedBootstrap,
        reasonCodes: ['typedEligibility.empty_memory_bootstrap'],
        legacyFallbackAttempted: false,
      );
    }

    final memoryReady =
        typedReadiness.islandCount >= minimumIslandsTouched &&
        typedReadiness.knownPredicateFrameCount >= minimumKnownPredicateFrames &&
        typedReadiness.knownSemanticRoleClassCount >= minimumKnownSemanticRoleClasses &&
        typedReadiness.typedSemanticFactCount >= minimumTypedSemanticFacts &&
        typedReadiness.reasonCompatiblePairCount >= minimumReasonCompatiblePairs;

    if (!memoryReady) {
      return const A1GenerationModeDecision(
        mode: A1GenerationMode.typedBootstrap,
        reasonCodes: ['typedEligibility.needs_bootstrap_growth'],
        legacyFallbackAttempted: false,
      );
    }

    if (typedReadiness.renderableCompositionCandidateCount < minimumRenderableCompositionCandidates) {
      return const A1GenerationModeDecision(
        mode: A1GenerationMode.blocked,
        reasonCodes: ['typedEligibility.memory_ready_but_no_renderable_candidate'],
        legacyFallbackAttempted: false,
        blockerCode: 'typedRoute.no_renderable_composition_candidate',
      );
    }

    return const A1GenerationModeDecision(
      mode: A1GenerationMode.typedComposition,
      reasonCodes: ['typedEligibility.composition_ready'],
      legacyFallbackAttempted: false,
    );
  }
}
```

Export it from `packages/learning_core/lib/learning_core.dart`.

- [x] **Step 3: Add router tests proving no legacy route**

Create `packages/learning_core/test/a1_typed_generation_router_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('router never returns legacy for normal A1 Focus', () {
    final router = A1TypedGenerationRouter(
      modePolicy: A1GenerationModePolicy.defaults(),
      bootstrapGenerator: const A1RouteProbeGenerator(mode: A1GenerationMode.typedBootstrap),
      compositionGenerator: const A1RouteProbeGenerator(mode: A1GenerationMode.typedComposition),
    );

    final empty = router.plan(
      memoryProfile: A1TypedMemoryProfile.empty(),
      typedReadiness: const A1TypedReadiness(
        renderableCompositionCandidateCount: 0,
        knownPredicateFrameCount: 0,
        knownSemanticRoleClassCount: 0,
        typedSemanticFactCount: 0,
        islandCount: 0,
        reasonCompatiblePairCount: 0,
      ),
    );
    expect(empty.mode, A1GenerationMode.typedBootstrap);
    expect(empty.trace['legacyFallbackAttempted'], false);

    final seeded = router.plan(
      memoryProfile: A1TypedMemoryProfile.seededForComposition(),
      typedReadiness: const A1TypedReadiness(
        renderableCompositionCandidateCount: 12,
        knownPredicateFrameCount: 6,
        knownSemanticRoleClassCount: 10,
        typedSemanticFactCount: 12,
        islandCount: 3,
        reasonCompatiblePairCount: 1,
      ),
    );
    expect(seeded.mode, A1GenerationMode.typedComposition);
    expect(seeded.trace['legacyFallbackAttempted'], false);
  });
}
```

Expected first run: FAIL because the router and probe generator do not exist.

- [x] **Step 4: Implement typed route seam**

Create `packages/learning_core/lib/src/a1_typed_generation_router.dart` with:

```dart
abstract interface class A1TypedLessonGenerator {
  A1TypedLessonPlan generate();
}

class A1TypedLessonPlan {
  const A1TypedLessonPlan({required this.mode, required this.trace});

  final A1GenerationMode mode;
  final Map<String, Object?> trace;
}

class A1RouteProbeGenerator implements A1TypedLessonGenerator {
  const A1RouteProbeGenerator({required this.mode});

  final A1GenerationMode mode;

  @override
  A1TypedLessonPlan generate() => A1TypedLessonPlan(
        mode: mode,
        trace: {'generationMode': mode.name, 'legacyFallbackAttempted': false},
      );
}

class A1TypedGenerationRouter {
  const A1TypedGenerationRouter({
    required this.modePolicy,
    required this.bootstrapGenerator,
    required this.compositionGenerator,
  });

  final A1GenerationModePolicy modePolicy;
  final A1TypedLessonGenerator bootstrapGenerator;
  final A1TypedLessonGenerator compositionGenerator;

  A1TypedLessonPlan plan({
    required A1TypedMemoryProfile memoryProfile,
    required A1TypedReadiness typedReadiness,
  }) {
    final decision = modePolicy.selectMode(
      memoryProfile: memoryProfile,
      typedReadiness: typedReadiness,
    );
    if (decision.mode == A1GenerationMode.blocked) {
      return A1TypedLessonPlan(
        mode: A1GenerationMode.blocked,
        trace: {
          'generationMode': A1GenerationMode.blocked.name,
          'legacyFallbackAttempted': false,
          'routeReasonCodes': decision.reasonCodes,
          'blockerCode': decision.blockerCode,
        },
      );
    }
    final plan = decision.mode == A1GenerationMode.typedBootstrap
        ? bootstrapGenerator.generate()
        : compositionGenerator.generate();
    return A1TypedLessonPlan(
      mode: plan.mode,
      trace: {
        ...plan.trace,
        'generationMode': plan.mode.name,
        'legacyFallbackAttempted': false,
        'routeReasonCodes': decision.reasonCodes,
      },
    );
  }
}
```

Export it from `packages/learning_core/lib/learning_core.dart`.

- [ ] **Step 5: Wire FocusCoordinator and compiler preflight**

Modify `packages/learning_core/lib/src/focus_coordinator.dart` so normal A1 Focus asks `A1TypedGenerationRouter` for the route decision before any lesson materialization. Modify `packages/learning_core/lib/src/a1_compiler_preflight.dart` so typed bootstrap and typed composition plans run through the same materialization preflight.

Required trace fields:

```text
generationMode
legacyFallbackAttempted
routeReasonCodes
typedReadiness
blockerCode, when blocked
compilerPreflightStatus
```

Required blocker mapping:

```text
typedCompiler.no_surface_plan
typedCompiler.stage_materialization_failed
typedCompiler.missing_expected_answer
typedCompiler.proof_contract_missing_writeback
```

- [ ] **Step 6: Add backend no-legacy audit**

Create `packages/learning_core/test/a1_backend_typed_route_no_legacy_audit_test.dart`.

The audit must generate 12 lessons through the backend path and print:

```text
lessonIndex
generationMode
legacyFallbackAttempted=false
growthTargets
supportTargets
semanticFactsWritten
semanticFactsConsumedByNextLesson
compilerPreflightStatus
coherenceStatus
conversation
```

Assertions:

```dart
expect(rows, hasLength(12));
expect(rows.every((row) => row.legacyFallbackAttempted == false), isTrue);
expect(rows.where((row) => row.generationMode == A1GenerationMode.typedBootstrap), isNotEmpty);
expect(rows.every((row) => row.compilerPreflightStatus == 'pass'), isTrue);
```

- [ ] **Step 7: Wire mobile render and completion writeback**

Modify:

- `apps/mobile/lib/features/practice/session_controller.dart`
- `apps/mobile/lib/features/practice/focus_evidence_writer.dart`
- `apps/mobile/lib/shared/persistence/learner_memory_repository.dart`

The UI must read the typed proof contract from the lesson payload and write completion evidence without reinterpreting semantic facts locally.

Create `apps/mobile/test/a1_typed_generation_ui_wiring_test.dart` with assertions:

```dart
expect(rendered.generationMode, isNot('legacy'));
expect(rendered.typedProof.semanticFactsWritten, isNotEmpty);
expect(completionEvidence.legacyFallbackAttempted, isFalse);
expect(nextMemoryProjection.semanticFacts, containsAll(rendered.typedProof.semanticFactsWritten));
```

- [ ] **Step 8: Verify Task 22G**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_generation_mode_policy_test.dart \
  test/a1_typed_generation_router_test.dart \
  test/a1_backend_typed_route_no_legacy_audit_test.dart \
  -r expanded
cd ../..
/private/tmp/flutter-sdk/bin/flutter test apps/mobile/test/a1_typed_generation_ui_wiring_test.dart -r expanded
git diff --check
```

Expected: PASS. If the Flutter SDK path is missing, record `tooling.flutter_sdk_unavailable` and do not claim UI proof.

- [ ] **Step 9: Commit Task 22G**

```bash
git add \
  packages/learning_core/lib/src/a1_generation_mode_policy.dart \
  packages/learning_core/lib/src/a1_typed_generation_router.dart \
  packages/learning_core/lib/src/focus_coordinator.dart \
  packages/learning_core/lib/src/focus_plan.dart \
  packages/learning_core/lib/src/a1_compiler_preflight.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_generation_mode_policy_test.dart \
  packages/learning_core/test/a1_typed_generation_router_test.dart \
  packages/learning_core/test/a1_backend_typed_route_no_legacy_audit_test.dart \
  apps/mobile/lib/features/practice/session_controller.dart \
  apps/mobile/lib/features/practice/focus_evidence_writer.dart \
  apps/mobile/lib/shared/persistence/learner_memory_repository.dart \
  apps/mobile/test/a1_typed_generation_ui_wiring_test.dart \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md
git commit -m "feat: wire typed A1 generation route"
```

## Task 22H: Typed Beginner Bootstrap Generator

**Purpose:** Create the empty-memory and near-empty-memory first rung of the typed system. Bootstrap must produce simple beginner lessons, write typed semantic memory, rotate across islands, and graduate into normal typed composition when the learner is ready.

**Audit finding addressed:** removing legacy fallback requires a typed starter path. Without bootstrap, hardline typed routing either blocks new learners or tempts the system to reintroduce legacy arcs.

**Files:**

- Create: `packages/learning_core/lib/src/a1_bootstrap_progression_policy.dart`
- Create: `packages/learning_core/lib/src/a1_bootstrap_starter_catalog.dart`
- Create: `packages/learning_core/lib/src/a1_bootstrap_candidate_factory.dart`
- Modify: `packages/learning_core/lib/src/a1_generation_mode_policy.dart`
- Modify: `packages/learning_core/lib/src/a1_typed_generation_router.dart`
- Modify: `packages/learning_core/lib/src/a1_semantic_memory_writeback_contract.dart`
- Modify: `packages/learning_core/lib/src/a1_semantic_memory_projection_registry.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Test: `packages/learning_core/test/a1_bootstrap_progression_policy_test.dart`
- Test: `packages/learning_core/test/a1_bootstrap_starter_catalog_test.dart`
- Test: `packages/learning_core/test/a1_bootstrap_candidate_factory_test.dart`
- Test: `packages/learning_core/test/a1_empty_memory_bootstrap_12_audit_test.dart`
- Test: `packages/learning_core/test/a1_bootstrap_graduation_to_composition_test.dart`

**Implementation progress note:** typed bootstrap policy, starter catalog, candidate factory, 12-lesson empty-memory audit, and bootstrap graduation audit have been implemented and verified in `packages/learning_core`. Commit step remains open until the broader Task 22G-22J block is ready to package.

- [x] **Step 1: Add failing bootstrap progression tests**

Create `packages/learning_core/test/a1_bootstrap_progression_policy_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('empty memory starts at B0 one-exchange bootstrap', () {
    final policy = A1BootstrapProgressionPolicy.defaults();
    final rung = policy.selectRung(A1BootstrapProgress.empty());

    expect(rung.id, 'B0');
    expect(rung.maxExchangeCount, 1);
    expect(rung.allowedDetailAxes, isEmpty);
  });

  test('bootstrap graduates only when composition readiness is proven', () {
    final policy = A1BootstrapProgressionPolicy.defaults();
    final ready = const A1BootstrapProgress(
      islandsTouched: 3,
      knownPredicateFrames: 6,
      knownSemanticRoleClasses: 10,
      typedSemanticFacts: 12,
      concreteDetailFacts: 3,
      reasonCompatiblePairs: 1,
      renderableTypedCompositionCandidates: 12,
      recentExactTranscriptRepeats: 0,
    );

    expect(policy.canGraduate(ready), isTrue);
  });
}
```

Expected first run: FAIL because bootstrap policy types do not exist.

- [x] **Step 2: Implement bootstrap progression policy**

Create `packages/learning_core/lib/src/a1_bootstrap_progression_policy.dart` with rungs:

```text
B0: one predicate plus one concrete argument, maxExchangeCount=1
B1: simple predicate inventory across multiple islands, maxExchangeCount=1
B2: time/place/object-attribute/state/preference/topic detail, maxExchangeCount=2
B3: first because/when/with/need-for relation, maxExchangeCount=2
B4: graduated typed composition readiness, maxExchangeCount=3
```

The defaults must use the graduation thresholds from the spec:

```text
minimumIslandsTouched=3
minimumKnownPredicateFrames=6
minimumKnownSemanticRoleClasses=10
minimumTypedSemanticFacts=12
minimumConcreteDetailFacts=3
minimumReasonCompatiblePairs=1
minimumRenderableTypedCompositionCandidates=12
minimumRecentExactTranscriptRepeats=0
```

- [x] **Step 3: Add starter catalog tests**

Create `packages/learning_core/test/a1_bootstrap_starter_catalog_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('starter catalog covers multiple islands without one hard-coded topic', () {
    final catalog = A1BootstrapStarterCatalog.defaults();
    final entries = catalog.entriesForRung('B0');

    expect(entries.map((entry) => entry.islandId).toSet().length, greaterThanOrEqualTo(5));
    expect(entries.map((entry) => entry.predicateFrameId).toSet(), containsAll([
      'have_possessable',
      'want_preference',
      'need_resource',
      'go_destination',
      'feel_state',
    ]));
  });

  test('starter entries declare typed facts to write', () {
    final catalog = A1BootstrapStarterCatalog.defaults();
    for (final entry in catalog.entriesForRung('B0')) {
      expect(entry.semanticFactsToWrite, isNotEmpty, reason: entry.id);
      expect(entry.surfacePatternId, isNotEmpty, reason: entry.id);
      expect(entry.requiredMetadataClasses, isNotEmpty, reason: entry.id);
    }
  });
}
```

- [x] **Step 4: Implement metadata-backed starter catalog**

Create `packages/learning_core/lib/src/a1_bootstrap_starter_catalog.dart` with rows for:

```text
starter.have_possessable: possession, have_possessable, possessable_object
starter.want_preference: food_drink_preference, want_preference, preference_item
starter.need_resource: needs_resources, need_resource, useful_resource
starter.go_destination: places_movement, go_destination, destination
starter.feel_state: feelings_states, feel_state, physical_state | emotional_state
```

Each row must declare `surfacePatternId` and `semanticFactsToWrite`. This catalog is allowed to be small, but it must be row-driven so metadata expansion adds options without new branches.

- [x] **Step 5: Add bootstrap candidate factory tests**

Create `packages/learning_core/test/a1_bootstrap_candidate_factory_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('factory produces typed proof with beginner one-exchange conversation', () {
    final candidate = A1BootstrapCandidateFactory.defaults().generate(
      progress: A1BootstrapProgress.empty(),
      recentLessonFingerprints: const [],
    );

    expect(candidate.mode, A1GenerationMode.typedBootstrap);
    expect(candidate.exchanges, hasLength(1));
    expect(candidate.typedProof.semanticFactsWritten, isNotEmpty);
    expect(candidate.trace['legacyFallbackAttempted'], false);
  });

  test('factory rotates primary island when recent bootstrap used same island', () {
    final candidate = A1BootstrapCandidateFactory.defaults().generate(
      progress: A1BootstrapProgress.empty(),
      recentLessonFingerprints: const [
        A1VisibleLessonFingerprint(primaryIslandId: 'possession', transcriptHash: 'a'),
        A1VisibleLessonFingerprint(primaryIslandId: 'possession', transcriptHash: 'b'),
      ],
    );

    expect(candidate.primaryIslandId, isNot('possession'));
  });
}
```

- [x] **Step 6: Implement bootstrap candidate factory and typed writeback**

Create `packages/learning_core/lib/src/a1_bootstrap_candidate_factory.dart`.

Required behavior:

- choose rows from `A1BootstrapStarterCatalog`;
- downrank recent primary islands;
- select growth target from metadata class compatibility;
- emit typed proof fields consumed by `a1_semantic_memory_writeback_contract.dart`;
- set `generationMode = typedBootstrap`;
- never emit a legacy fallback trace.

If these proof fields are missing, add them to `packages/learning_core/lib/src/a1_semantic_memory_writeback_contract.dart`:

```text
semanticFactsWritten
predicateFramesPracticed
argumentRolesPracticed
grammarAxesPracticed
supportTargetsPracticed
growthTargetsPracticed
visibleTranscriptFingerprint
semanticLessonFingerprint
conversationShapeFingerprint
```

- [x] **Step 7: Add 12-lesson empty-memory bootstrap audit**

Create `packages/learning_core/test/a1_empty_memory_bootstrap_12_audit_test.dart`.

The audit must:

- start from empty memory;
- generate 12 lessons through `A1TypedGenerationRouter`;
- apply each lesson's typed writeback into the memory projection;
- print each full conversation;
- assert no legacy route;
- assert at least 3 islands touched;
- assert at least 5 starter predicate frames touched;
- assert no exact transcript repeat;
- assert memory facts written by one lesson are visible before the next lesson.

Required printed row shape:

```text
[#01] mode=typedBootstrap rung=B0 island=possession predicate=have_possessable
growth=[object.book] support=[]
factsWritten=[has(person.learner, object.book)]
conversation:
  tutor: ...
  learner: ...
```

- [x] **Step 8: Add bootstrap graduation audit**

Create `packages/learning_core/test/a1_bootstrap_graduation_to_composition_test.dart`.

Seed memory to satisfy thresholds and assert:

```dart
expect(policy.canGraduate(progress), isTrue);
expect(
  router.plan(memoryProfile: profile, typedReadiness: readiness).mode,
  A1GenerationMode.typedComposition,
);
```

Also assert that a near-miss profile stays in `typedBootstrap` and reports the missing readiness code.

- [x] **Step 9: Verify Task 22H**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_bootstrap_progression_policy_test.dart \
  test/a1_bootstrap_starter_catalog_test.dart \
  test/a1_bootstrap_candidate_factory_test.dart \
  test/a1_empty_memory_bootstrap_12_audit_test.dart \
  test/a1_bootstrap_graduation_to_composition_test.dart \
  test/a1_backend_typed_route_no_legacy_audit_test.dart \
  -r expanded
git diff --check
```

Expected: PASS. The 12-lesson audit must print conversation threads and show typed facts accumulating.

- [ ] **Step 10: Commit Task 22H**

```bash
git add \
  packages/learning_core/lib/src/a1_bootstrap_progression_policy.dart \
  packages/learning_core/lib/src/a1_bootstrap_starter_catalog.dart \
  packages/learning_core/lib/src/a1_bootstrap_candidate_factory.dart \
  packages/learning_core/lib/src/a1_generation_mode_policy.dart \
  packages/learning_core/lib/src/a1_typed_generation_router.dart \
  packages/learning_core/lib/src/a1_semantic_memory_writeback_contract.dart \
  packages/learning_core/lib/src/a1_semantic_memory_projection_registry.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_bootstrap_progression_policy_test.dart \
  packages/learning_core/test/a1_bootstrap_starter_catalog_test.dart \
  packages/learning_core/test/a1_bootstrap_candidate_factory_test.dart \
  packages/learning_core/test/a1_empty_memory_bootstrap_12_audit_test.dart \
  packages/learning_core/test/a1_bootstrap_graduation_to_composition_test.dart \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md
git commit -m "feat: add typed A1 bootstrap generator"
```

## Task 22I: Vocabulary-Scale Metadata Coverage And Grammar Axis Expansion

**Purpose:** Move the generator from narrow scripted compatibility toward global metadata-backed generation. Active vocabulary must become generatable, blocked with owner code, or intentionally inactive. The same metadata must unlock cross-island recombination and person/tense/detail growth.

**Audit finding addressed:** 22F proves a better follow-up shape for seeded rows, but expansion remains limited because many words lack semantic classes, predicate-frame compatibility, affordances, fact patterns, surface rules, and grammar-axis coverage.

**Files:**

- Create: `packages/learning_core/lib/src/a1_semantic_type_taxonomy.dart`
- Create: `packages/learning_core/lib/src/a1_predicate_frame_registry.dart`
- Create: `packages/learning_core/lib/src/a1_lexeme_metadata_registry.dart`
- Create: `packages/learning_core/lib/src/a1_metadata_coverage_audit.dart`
- Create: `packages/learning_core/lib/src/a1_golden_metadata_examples.dart`
- Create: `packages/learning_core/lib/src/a1_grammar_axis_policy.dart`
- Create: `packages/learning_core/test/fixtures/a1_synthetic_metadata_fixture.dart`
- Modify: `packages/learning_core/lib/src/a1_semantic_fact_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_semantic_compatibility_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_follow_up_opportunity_planner.dart`
- Modify: `packages/learning_core/lib/src/a1_contextual_prompt_realizer.dart`
- Modify: `packages/learning_core/lib/src/a1_coherent_candidate_factory.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Test: `packages/learning_core/test/a1_semantic_type_taxonomy_test.dart`
- Test: `packages/learning_core/test/a1_predicate_frame_registry_test.dart`
- Test: `packages/learning_core/test/a1_golden_metadata_examples_test.dart`
- Test: `packages/learning_core/test/a1_metadata_coverage_audit_test.dart`
- Test: `packages/learning_core/test/a1_active_vocabulary_metadata_coverage_test.dart`
- Test: `packages/learning_core/test/a1_metadata_slice_school_study_audit_test.dart`
- Test: `packages/learning_core/test/a1_metadata_slice_visibility_resources_audit_test.dart`
- Test: `packages/learning_core/test/a1_grammar_axis_policy_test.dart`
- Test: `packages/learning_core/test/a1_seeded_grammar_axis_24_audit_test.dart`
- Test: `packages/learning_core/test/a1_metadata_synthetic_stress_test.dart`

**Implementation progress note:** taxonomy, predicate frame registry, golden metadata examples, current compiled A1 vocabulary adapter/coverage audit, two metadata slice audits, grammar-axis policy/audit, and synthetic metadata stress test have been implemented and verified. The production migration in Step 7 is still open and has been expanded into Task 22I-P so it must prove real metadata consumption through the backend generator instead of only proving metadata availability.

- [x] **Step 1: Add taxonomy and predicate frame tests**

Create `packages/learning_core/test/a1_semantic_type_taxonomy_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('taxonomy exposes reusable semantic classes for global generation', () {
    final taxonomy = A1SemanticTypeTaxonomy.defaults();

    expect(taxonomy.hasClass('readable_object'), isTrue);
    expect(taxonomy.hasClass('writing_tool'), isTrue);
    expect(taxonomy.hasClass('light_source'), isTrue);
    expect(taxonomy.hasClass('visible_thing'), isTrue);
    expect(taxonomy.hasClass('physical_state'), isTrue);
    expect(taxonomy.hasClass('destination'), isTrue);
  });
}
```

Create `packages/learning_core/test/a1_predicate_frame_registry_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('predicate frames bind to semantic classes instead of single words', () {
    final frames = A1PredicateFrameRegistry.defaults();

    expect(frames.frame('read_readable_object').requiredClasses, contains('readable_object'));
    expect(frames.frame('write_with_tool').requiredClasses, contains('writing_tool'));
    expect(frames.frame('see_visible_thing').requiredClasses, contains('visible_thing'));
    expect(frames.frame('need_resource').requiredClasses, contains('useful_resource'));
  });
}
```

Expected first run: FAIL because taxonomy and predicate registry do not exist.

- [x] **Step 2: Implement taxonomy and predicate frame registry**

Create `packages/learning_core/lib/src/a1_semantic_type_taxonomy.dart` and `packages/learning_core/lib/src/a1_predicate_frame_registry.dart`.

Minimum class and frame coverage:

```text
classes:
  possessable_object, readable_object, writable_surface, writing_tool, container,
  useful_resource, light_source, visible_thing, preference_item, edible_item,
  drinkable_item, destination, home_place, school_place, work_place, topic,
  physical_state, emotional_state, cognitive_state, time_today, time_tomorrow,
  time_yesterday, study_action, work_action, movement_action

frames:
  have_possessable(person, possessable_object)
  want_preference(person, preference_item)
  need_resource(person, useful_resource)
  read_readable_object(person, readable_object)
  write_with_tool(person, writing_tool)
  study_topic_place_time(person, topic | school_place | time_tomorrow | time_today)
  work_place_time_tool(person, work_place | time_today | time_tomorrow | useful_resource)
  go_destination(person, destination)
  see_visible_thing(person, visible_thing)
  feel_state(person, physical_state | emotional_state | cognitive_state)
```

- [x] **Step 3: Add golden metadata tests**

Create `packages/learning_core/test/a1_golden_metadata_examples_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('golden metadata examples include required fields for used and underused words', () {
    final registry = A1LexemeMetadataRegistry.goldenExamples();

    for (final id in [
      'object.book',
      'object.bag',
      'object.pen',
      'object.notebook',
      'object.light',
      'drink.water',
      'place.school',
      'place.home',
      'time.today',
      'time.tomorrow',
      'topic.history',
      'state.tired',
      'predicate.study',
      'predicate.read',
      'predicate.write',
      'predicate.see',
    ]) {
      final row = registry.require(id);
      expect(row.surfaceForms, isNotEmpty, reason: id);
      expect(row.semanticClasses, isNotEmpty, reason: id);
      expect(row.islandMemberships, isNotEmpty, reason: id);
      expect(row.compatiblePredicateFrameIds, isNotEmpty, reason: id);
      expect(row.factPatternsUnlocked, isNotEmpty, reason: id);
      expect(row.surfacePatternRequirements, isNotEmpty, reason: id);
      expect(row.coverageState, A1MetadataCoverageState.generatable, reason: id);
    }
  });
}
```

- [x] **Step 4: Implement lexeme metadata registry and golden rows**

Create `packages/learning_core/lib/src/a1_lexeme_metadata_registry.dart` and `packages/learning_core/lib/src/a1_golden_metadata_examples.dart`.

Each `A1LexemeMetadataRow` must include:

```text
lexemeId
surfaceForms
partOfSpeech
semanticClasses
islandMemberships
compatiblePredicateFrameIds
argumentRoleKinds
factPatternsUnlocked
affordanceFamilies
surfacePatternRequirements
memoryWritebackFacts
grammarAxisCoverage
coherenceRules
exampleGeneratedSentences
coverageState
blockedReason, when blocked
```

Golden rows must include current common rows plus underused rows: `object.light`, `object.pen`, `object.notebook`, and `drink.water`.

- [x] **Step 5: Add whole-vocabulary coverage audit**

Create `packages/learning_core/test/a1_metadata_coverage_audit_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('all active vocabulary is generatable, blocked with owner code, or intentionally inactive', () {
    final report = A1MetadataCoverageAudit(
      metadata: A1LexemeMetadataRegistry.goldenExamples(),
      predicateFrames: A1PredicateFrameRegistry.defaults(),
      taxonomy: A1SemanticTypeTaxonomy.defaults(),
    ).run();

    expect(report.silentOrphanLexemeIds, isEmpty);
    expect(report.rowsWithoutPredicateFrame, isEmpty);
    expect(report.rowsWithoutSurfacePattern, isEmpty);
    expect(report.rowsWithoutFactPattern, isEmpty);
  });
}
```

Implement `packages/learning_core/lib/src/a1_metadata_coverage_audit.dart` so every blocked row carries `lexemeId`, `coverageState`, `ownerCode`, missing fields, and recommended repair.

- [x] **Step 6: Add current compiled A1 vocabulary metadata coverage**

Create `packages/learning_core/test/a1_active_vocabulary_metadata_coverage_test.dart`.

The test must load `apps/mobile/assets/content/egyptian-arabic.json`, filter `lexical_items` where `progression_band == a1`, and build metadata with:

```dart
final registry = A1LexemeMetadataRegistry.fromContentLexicalItems(items);
```

Assertions:

```dart
expect(activeIds.length, greaterThan(100));
for (final id in activeIds) {
  final row = registry.require(id);
  expect(row.surfaceForms, isNotEmpty, reason: id);
  expect(row.semanticClasses, isNotEmpty, reason: id);
  expect(row.islandMemberships, isNotEmpty, reason: id);
  expect(row.compatiblePredicateFrameIds, isNotEmpty, reason: id);
  expect(row.argumentRoleKinds, isNotEmpty, reason: id);
  expect(row.factPatternsUnlocked, isNotEmpty, reason: id);
  expect(row.affordanceFamilies, isNotEmpty, reason: id);
  expect(row.surfacePatternRequirements, isNotEmpty, reason: id);
  expect(row.memoryWritebackFacts, isNotEmpty, reason: id);
  expect(row.grammarAxisCoverage, isNotEmpty, reason: id);
  expect(row.coherenceRules, isNotEmpty, reason: id);
}
```

The mapper must derive word-specific metadata from each item. It may not apply only the handpicked golden tags. Examples:

```text
rest.drink.coffee -> drinkable_item, restaurant_item, want_preference/order_restaurant_item
rest.service.menu -> service_item, useful_resource, request_service_item
origin.place.egypt -> origin_place, destination, be_from_place
foundation.connector.but -> connector_contrast, connect_clause
daily.verb.did -> past_action, past grammar axis
```

- [ ] **Step 7: Migrate compatibility and fact planning to metadata**

**Split note:** this step is not complete until Task 22I-P proves the production generator consumes the current A1 metadata source for compatibility, fact planning, follow-up selection, surface planning, coherence ownership, and memory writeback.

Modify:

- `packages/learning_core/lib/src/a1_semantic_compatibility_registry.dart`
- `packages/learning_core/lib/src/a1_semantic_fact_registry.dart`
- `packages/learning_core/lib/src/a1_follow_up_opportunity_planner.dart`
- `packages/learning_core/lib/src/a1_coherent_candidate_factory.dart`

Required migration:

- predicate compatibility reads `compatiblePredicateFrameIds`;
- follow-up affordances read `affordanceFamilies`;
- direct-claim follow-ups prefer related predicate frames from metadata;
- fact writeback uses `memoryWritebackFacts` and `factPatternsUnlocked`;
- remaining handcrafted examples are wrapped in a named transitional adapter and reported by `A1MetadataCoverageAudit.transitionalScaffoldRows`.

Add assertions:

```dart
expect(planner.relatedOpportunitiesFor('object.book'), contains('read_readable_object'));
expect(planner.relatedOpportunitiesFor('object.pen'), contains('write_with_tool'));
expect(planner.relatedOpportunitiesFor('object.light'), contains('see_visible_thing'));
```

- [x] **Step 8: Add two metadata slice audits**

Create:

- `packages/learning_core/test/a1_metadata_slice_school_study_audit_test.dart`
- `packages/learning_core/test/a1_metadata_slice_visibility_resources_audit_test.dart`

The school/study slice must use at least:

```text
book, pen, notebook, school, history, today, tomorrow, study, read, write
```

The visibility/resources slice must use at least:

```text
light, water, home, office or room, need, see, want, go
```

Each audit must print 12 candidate conversations and assert no exact transcript repeats, at least three predicate frames, at least two detail axes, and no direct-claim fallback without an owned blocker.

- [x] **Step 9: Add grammar axis policy and seeded audit**

Create `packages/learning_core/test/a1_grammar_axis_policy_test.dart` and `packages/learning_core/test/a1_seeded_grammar_axis_24_audit_test.dart`.

The policy test must prove eligible axes unlock from metadata and memory:

```dart
final axes = A1GrammarAxisPolicy.defaults().eligibleAxes(
  memory: A1GrammarMemoryProjection.seeded(
    verifiedPersons: const ['1sg', '2sg', '3sg_m', '3sg_f', '1pl'],
    verifiedTenseAspects: const ['present_or_habitual', 'future', 'past'],
    verifiedPolarities: const ['affirmative', 'negative'],
    knownSupportLexemeCount: 40,
  ),
  metadata: A1LexemeMetadataRegistry.goldenExamples(),
);

expect(axes.persons, containsAll(['1sg', '2sg', '3sg_m', '3sg_f', '1pl']));
expect(axes.tenseAspects, containsAll(['present_or_habitual', 'future', 'past']));
expect(axes.answerLengthRungs, contains('reasoned_answer'));
```

The 24-round audit must print conversations and include:

- `1sg` and `2sg`;
- at least one of `3sg_m`, `3sg_f`, `1pl`, or `3pl`;
- present/future and past when seeded forms are available;
- affirmative and negative;
- one-clause, two-clause, and reasoned-answer rungs;
- at least two islands.

If an axis is missing, the audit must print owner counts for `grammarAxis.surface_form_missing`, `grammarAxis.memory_not_ready`, `grammarAxis.compiler_materialization_failed`, `grammarAxis.coherence_rejected`, and `grammarAxis.cooldown_downranked`.

- [x] **Step 10: Add synthetic metadata stress audit**

Create `packages/learning_core/test/fixtures/a1_synthetic_metadata_fixture.dart` and `packages/learning_core/test/a1_metadata_synthetic_stress_test.dart`.

The fixture generates fake metadata rows only for tests:

```dart
final fixture = A1SyntheticMetadataFixture.generate(
  lexemeCount: 1000,
  semanticClassPool: A1SemanticTypeTaxonomy.defaults().classIds,
  predicateFramePool: A1PredicateFrameRegistry.defaults().frameIds,
);
```

Run 1,000 synthetic rows on normal test runs. Add a tagged `stress` test for 10,000 rows. This does not require 10,000 production words.

- [x] **Step 11: Verify Task 22I**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_semantic_type_taxonomy_test.dart \
  test/a1_predicate_frame_registry_test.dart \
  test/a1_golden_metadata_examples_test.dart \
  test/a1_metadata_coverage_audit_test.dart \
  test/a1_active_vocabulary_metadata_coverage_test.dart \
  test/a1_metadata_slice_school_study_audit_test.dart \
  test/a1_metadata_slice_visibility_resources_audit_test.dart \
  test/a1_grammar_axis_policy_test.dart \
  test/a1_seeded_grammar_axis_24_audit_test.dart \
  test/a1_metadata_synthetic_stress_test.dart \
  -r expanded
git diff --check
```

Expected: PASS. Slice and 24-round audits must print full conversation threads and owner summaries.

- [ ] **Step 12: Commit Task 22I**

```bash
git add \
  packages/learning_core/lib/src/a1_semantic_type_taxonomy.dart \
  packages/learning_core/lib/src/a1_predicate_frame_registry.dart \
  packages/learning_core/lib/src/a1_lexeme_metadata_registry.dart \
  packages/learning_core/lib/src/a1_metadata_coverage_audit.dart \
  packages/learning_core/lib/src/a1_golden_metadata_examples.dart \
  packages/learning_core/lib/src/a1_grammar_axis_policy.dart \
  packages/learning_core/lib/src/a1_semantic_fact_registry.dart \
  packages/learning_core/lib/src/a1_semantic_compatibility_registry.dart \
  packages/learning_core/lib/src/a1_follow_up_opportunity_planner.dart \
  packages/learning_core/lib/src/a1_contextual_prompt_realizer.dart \
  packages/learning_core/lib/src/a1_coherent_candidate_factory.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/fixtures/a1_synthetic_metadata_fixture.dart \
  packages/learning_core/test/a1_semantic_type_taxonomy_test.dart \
  packages/learning_core/test/a1_predicate_frame_registry_test.dart \
  packages/learning_core/test/a1_golden_metadata_examples_test.dart \
  packages/learning_core/test/a1_metadata_coverage_audit_test.dart \
  packages/learning_core/test/a1_active_vocabulary_metadata_coverage_test.dart \
  packages/learning_core/test/a1_metadata_slice_school_study_audit_test.dart \
  packages/learning_core/test/a1_metadata_slice_visibility_resources_audit_test.dart \
  packages/learning_core/test/a1_grammar_axis_policy_test.dart \
  packages/learning_core/test/a1_seeded_grammar_axis_24_audit_test.dart \
  packages/learning_core/test/a1_metadata_synthetic_stress_test.dart \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md
git commit -m "feat: add vocabulary-scale A1 metadata coverage"
```

## Task 22I-P: Production Metadata Harness And Blocker Audit

**Purpose:** Prove that current production A1 metadata is not merely auditable, but is actually consumed by the typed bootstrap and typed composition generators. The system must load the current compiled A1 vocabulary metadata, generate backend lesson threads from it, expose owner-coded blockers when product shape fails, and keep the route compatible with future word-batch expansion.

**Audit finding addressed:** Task 22I can pass while the production generator still uses narrow handcrafted rows. This task makes metadata-to-generation wiring first class and prevents another loop where the product shape looks good only inside isolated school/book fixtures.

**Files:**

- Create: `packages/learning_core/lib/src/a1_production_metadata_source.dart`
- Create: `packages/learning_core/lib/src/a1_metadata_backed_candidate_harness.dart`
- Create: `packages/learning_core/lib/src/a1_metadata_production_blocker_report.dart`
- Create: `packages/learning_core/lib/src/a1_metadata_new_word_batch_contract.dart`
- Modify: `packages/learning_core/lib/src/a1_bootstrap_starter_catalog.dart`
- Modify: `packages/learning_core/lib/src/a1_bootstrap_candidate_factory.dart`
- Modify: `packages/learning_core/lib/src/a1_semantic_compatibility_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_semantic_fact_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_follow_up_opportunity_planner.dart`
- Modify: `packages/learning_core/lib/src/a1_coherent_candidate_factory.dart`
- Modify: `packages/learning_core/lib/src/a1_contextual_prompt_realizer.dart`
- Modify: `packages/learning_core/lib/src/a1_typed_generation_router.dart`
- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify when needed: `apps/mobile/lib/features/practice/session_controller.dart`
- Modify when needed: `apps/mobile/lib/features/practice/focus_evidence_writer.dart`
- Modify when needed: `apps/mobile/lib/shared/persistence/learner_memory_repository.dart`
- Test: `packages/learning_core/test/a1_production_metadata_source_test.dart`
- Test: `packages/learning_core/test/a1_metadata_backed_bootstrap_route_test.dart`
- Test: `packages/learning_core/test/a1_metadata_backed_seeded_composition_24_audit_test.dart`
- Test: `packages/learning_core/test/a1_metadata_production_blocker_audit_test.dart`
- Test: `packages/learning_core/test/a1_metadata_new_word_batch_contract_test.dart`
- Test: `packages/learning_core/test/a1_metadata_mastery_depth_100_word_audit_test.dart`
- Test when Flutter SDK is available: `apps/mobile/test/a1_metadata_typed_ui_route_audit_test.dart`

**Implementation progress note:** production metadata source, metadata-backed bootstrap route audit, metadata-backed seeded composition harness/audit, production blocker audit, new-word batch contract, and 100-word mastery-depth audit have been implemented and verified in `packages/learning_core`. The remaining open work is migrating the older semantic/follow-up/fact-planning components away from handcrafted rows and wiring this metadata harness through the real `FocusCoordinator`/mobile evidence path.

- [x] **Step 1: Add production metadata source tests**

Create `packages/learning_core/test/a1_production_metadata_source_test.dart`.

Required test shape:

```dart
import 'dart:convert';
import 'dart:io';

import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('production metadata source loads current compiled A1 lexical metadata', () {
    final content = jsonDecode(
      File('../../apps/mobile/assets/content/egyptian-arabic.json')
          .readAsStringSync(),
    ) as Map<String, Object?>;

    final source = A1ProductionMetadataSource.fromContentJson(content);
    final registry = source.lexemeMetadata;

    expect(source.sourceId, 'apps.mobile.egyptian_arabic_json.a1');
    expect(source.activeLexemeIds.length, greaterThan(100));
    expect(source.blockerReport.silentOrphanLexemeIds, isEmpty);

    for (final id in source.activeLexemeIds) {
      final row = registry.require(id);
      expect(row.semanticClasses, isNotEmpty, reason: id);
      expect(row.compatiblePredicateFrameIds, isNotEmpty, reason: id);
      expect(row.affordanceFamilies, isNotEmpty, reason: id);
      expect(row.memoryWritebackFacts, isNotEmpty, reason: id);
      expect(row.coherenceRules, isNotEmpty, reason: id);
    }
  });
}
```

Expected first run: FAIL until `A1ProductionMetadataSource` exists and the source exposes blocker reporting.

- [x] **Step 2: Implement production metadata source and blocker report**

Create `packages/learning_core/lib/src/a1_production_metadata_source.dart`.

Required public API:

```dart
class A1ProductionMetadataSource {
  const A1ProductionMetadataSource({
    required this.sourceId,
    required this.lexemeMetadata,
    required this.activeLexemeIds,
    required this.blockerReport,
  });

  final String sourceId;
  final A1LexemeMetadataRegistry lexemeMetadata;
  final List<String> activeLexemeIds;
  final A1MetadataProductionBlockerReport blockerReport;

  factory A1ProductionMetadataSource.fromContentJson(Map<String, Object?> json);
}
```

Create `packages/learning_core/lib/src/a1_metadata_production_blocker_report.dart`.

Required owner buckets:

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

The report must expose counts, affected lexeme ids, first failing owner, and a short repair hint for every affected row. It must not silently drop rows that have incomplete metadata.

- [x] **Step 3: Add metadata-backed bootstrap route audit**

Create `packages/learning_core/test/a1_metadata_backed_bootstrap_route_test.dart`.

The audit must:

- load `apps/mobile/assets/content/egyptian-arabic.json`;
- build `A1ProductionMetadataSource`;
- build bootstrap catalog entries from metadata instead of only static starter rows;
- run 12 lessons from empty memory through `A1TypedGenerationRouter`;
- apply typed writeback after each lesson;
- print full conversations;
- assert no legacy route, no exact transcript repeats, and facts written by one lesson are visible before the next lesson.

Required printed row shape:

```text
[#01] mode=typedBootstrap source=apps.mobile.egyptian_arabic_json.a1 island=...
growth=[...] support=[...] frames=[...] factsWritten=[...]
conversation:
  tutor: ...
  learner: ...
```

Assertions:

```dart
expect(rows, hasLength(12));
expect(rows.every((row) => row.legacyFallbackAttempted == false), isTrue);
expect(rows.map((row) => row.transcriptFingerprint).toSet(), hasLength(12));
expect(rows.map((row) => row.primaryIslandId).toSet().length, greaterThanOrEqualTo(5));
expect(rows.every((row) => row.semanticFactsWritten.isNotEmpty), isTrue);
```

- [x] **Step 4: Wire bootstrap catalog and factory to metadata**

Modify:

- `packages/learning_core/lib/src/a1_bootstrap_starter_catalog.dart`
- `packages/learning_core/lib/src/a1_bootstrap_candidate_factory.dart`

Required behavior:

- `A1BootstrapStarterCatalog.fromMetadata(A1LexemeMetadataRegistry metadata)` builds starter entries from rows whose classes and frames match starter predicates;
- static defaults remain only as a fallback for tests that explicitly request `A1BootstrapStarterCatalog.defaults()`;
- production bootstrap uses `fromMetadata`;
- recent island, predicate, object, and transcript cooldowns apply to metadata-backed rows;
- if no viable metadata-backed starter row exists, the route reports `metadata.no_bootstrap_starter_rows` or a more specific owner bucket.

- [x] **Step 5: Add seeded 24-lesson production metadata composition audit**

Create `packages/learning_core/test/a1_metadata_backed_seeded_composition_24_audit_test.dart`.

Seed memory from the production metadata source with enough known words and facts for at least:

```text
possession/resources
food/drink/preference
place/movement
study/work/activity
feelings/states
visibility/objects
restaurant/service/payment when metadata provides viable rows
```

The audit must run 24 typed composition lessons, print every full conversation, and assert:

```dart
expect(rows, hasLength(24));
expect(rows.every((row) => row.generationMode == A1GenerationMode.typedComposition), isTrue);
expect(rows.map((row) => row.primaryIslandId).toSet().length, greaterThanOrEqualTo(4));
expect(rows.expand((row) => row.predicateFrameIds).toSet().length, greaterThanOrEqualTo(8));
expect(rows.expand((row) => row.detailAxes).toSet().length, greaterThanOrEqualTo(3));
expect(rows.map((row) => row.transcriptFingerprint).toSet(), hasLength(24));
expect(rows.where((row) => row.slotOnlyNovelty).length, 0);
expect(rows.where((row) => row.repeatedMoveSequenceWithoutOwner).length, 0);
expect(rows.map((row) => row.conversationShapeFingerprint).whereOverLimit(2), isEmpty);
expect(rows.where((row) => row.sameSecondExchangeShapeAsFirst).length, 0);
expect(rows.where((row) => row.usedOverpracticedGrowthTargetWithoutOwner).length, 0);
```

The audit must print `visibleTranscriptFingerprint`, `conversationShapeFingerprint`, `moveSequenceFingerprint`, opening move id, question demand id, second-half shape id, and score/cooldown terms for every row. If current metadata cannot satisfy a threshold, the failing output must print the blocker report and the first failing owner bucket. The test should fail when the system silently returns narrow repeated lessons without owner codes. A different concrete object, food, drink, place, service item, or activity does not count as enough novelty when the opening move, question demand, second-half shape, relation sequence, and thought-depth rung are unchanged.

- [ ] **Step 6: Migrate composition planning components to metadata**

**Split note:** the new `A1MetadataBackedCandidateHarness` proves metadata-backed composition in `learning_core`, but the older semantic compatibility registry, fact registry, follow-up planner, coherent candidate factory, and contextual prompt realizer still need their transitional handcrafted assumptions migrated or explicitly counted as scaffolds.

Modify:

- `packages/learning_core/lib/src/a1_semantic_compatibility_registry.dart`
- `packages/learning_core/lib/src/a1_semantic_fact_registry.dart`
- `packages/learning_core/lib/src/a1_follow_up_opportunity_planner.dart`
- `packages/learning_core/lib/src/a1_coherent_candidate_factory.dart`
- `packages/learning_core/lib/src/a1_contextual_prompt_realizer.dart`

Required behavior:

- compatibility is derived from `compatiblePredicateFrameIds`, `semanticClasses`, and `argumentRoleKinds`;
- fact construction uses `factPatternsUnlocked` and `memoryWritebackFacts`;
- follow-up opportunities use `affordanceFamilies`, related frame ids, and cooldown state;
- production metadata-backed composition uses the dialogue move-sequence contract instead of one fixed profile per predicate frame;
- candidate scoring applies separate cooldowns for transcript, island, predicate frame, concrete growth target, conversation shape, opening move, question demand, second-half shape, and move-sequence fingerprint;
- global move families include direct claim, situation prompt, choice/contrast, detail expansion, reason/constraint, sequence/next event, transfer/affordance, and repair/clarification;
- repeated slot-substitution shells such as `What will you order? / I will order X / Do you want X now? / Yes...` are rejected or heavily penalized even when `X` is new;
- contextual prompt realization reads `surfacePatternRequirements` and verified surface forms;
- coherence preconditions read `coherenceRules` and frame/affordance compatibility;
- the candidate trace includes `metadataSourceIds` for every selected growth/support/follow-up row;
- any remaining handcrafted row is emitted through a named `transitionalScaffold` field and counted in the blocker report.

- [x] **Step 7: Add production blocker audit**

Create `packages/learning_core/test/a1_metadata_production_blocker_audit_test.dart`.

The audit must create deliberate broken metadata rows and prove the harness attributes failures to the correct owner:

```dart
expect(report.ownerCount('metadata.semantic_class_missing'), greaterThan(0));
expect(report.ownerCount('metadata.predicate_frame_missing'), greaterThan(0));
expect(report.ownerCount('metadata.affordance_missing'), greaterThan(0));
expect(report.ownerCount('memory.writeback_fact_missing'), greaterThan(0));
expect(report.ownerCount('grammar.axis_surface_missing'), greaterThan(0));
expect(report.silentFailureCount, 0);
```

Also run the current production metadata source and assert all failures, if any, have owner codes and repair hints:

```dart
for (final blocker in report.blockers) {
  expect(blocker.ownerCode, isNotEmpty, reason: blocker.lexemeId);
  expect(blocker.repairHint, isNotEmpty, reason: blocker.lexemeId);
}
```

- [x] **Step 8: Add new-word batch contract audit**

Create `packages/learning_core/test/a1_metadata_new_word_batch_contract_test.dart`.

Use a small synthetic production-like batch that represents future metadata additions:

```text
object.tree
place.outside
predicate.walk
predicate.see
state.cold
object.light
time.morning
```

The test must append those rows to the current metadata registry and assert:

```dart
expect(batchReport.silentOrphanLexemeIds, isEmpty);
expect(batchReport.rowsConnectedToExistingIslands.length, batchLexemeIds.length);
expect(batchReport.generatedSliceRows.length, greaterThanOrEqualTo(6));
expect(batchReport.ownerCount('metadata.active_row_missing'), 0);
```

The generated slice must prove that new rows connect to existing classes and frames, for example:

```text
see(person, visible_thing)
walk(person, destination | place | time)
feel(person, physical_state)
need(person, useful_resource)
```

This audit is the future expansion framework: adding another 100 words means adding metadata rows and running the same batch contract, not creating new hard-coded generator branches.

- [x] **Step 9: Add 100-word mastery-depth audit**

Create `packages/learning_core/test/a1_metadata_mastery_depth_100_word_audit_test.dart`.

Use the first production-ready 100 A1 rows from `A1ProductionMetadataSource`, seed them as known, then run a 24-lesson composition audit that favors shape growth over pure lexical growth.

Assertions:

```dart
expect(rows.expand((row) => row.grammarAxes).toSet(), contains('1sg'));
expect(rows.expand((row) => row.grammarAxes).toSet(), contains('2sg'));
expect(rows.expand((row) => row.answerLengthRungs).toSet(), contains('two_clause'));
expect(rows.expand((row) => row.thoughtDepthRungs).toSet(), contains('depth_3_clause_with_time_place_topic'));
expect(rows.where((row) => row.growthMode == 'thought_depth_growth'), isNotEmpty);
expect(rows.where((row) => row.growthMode == 'same_words_new_shape'), isNotEmpty);
```

If past tense, third person, plural, or reasoned answers are not produced, the audit must print whether the blocker is metadata, memory projection, surface realization, grammar policy, compiler materialization, or coherence. This keeps "can the learner master 100 words in many ways" visible instead of relying on a future manual review.

- [ ] **Step 10: Wire production route through FocusCoordinator and mobile evidence path**

Modify:

- `packages/learning_core/lib/src/a1_typed_generation_router.dart`
- `packages/learning_core/lib/src/focus_coordinator.dart`
- `apps/mobile/lib/features/practice/session_controller.dart`
- `apps/mobile/lib/features/practice/focus_evidence_writer.dart`
- `apps/mobile/lib/shared/persistence/learner_memory_repository.dart`

Required behavior:

- normal A1 Focus builds or receives `A1ProductionMetadataSource`;
- typed bootstrap and typed composition both use metadata-backed candidate sources;
- lesson payloads expose `metadataSourceIds`, typed proof facts, grammar axes, and shape fingerprints;
- UI completion writes the proof contract facts without locally reinterpreting the semantics;
- the next backend lesson can consume the facts written by the UI path.

Create `apps/mobile/test/a1_metadata_typed_ui_route_audit_test.dart` when the local Flutter SDK is available. Required assertions:

```dart
expect(rendered.generationMode, isNot('legacy'));
expect(rendered.metadataSourceIds, isNotEmpty);
expect(rendered.typedProof.semanticFactsWritten, isNotEmpty);
expect(completionEvidence.legacyFallbackAttempted, isFalse);
expect(nextMemoryProjection.semanticFacts, containsAll(rendered.typedProof.semanticFactsWritten));
```

- [ ] **Step 11: Verify Task 22I-P**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_production_metadata_source_test.dart \
  test/a1_metadata_backed_bootstrap_route_test.dart \
  test/a1_metadata_backed_seeded_composition_24_audit_test.dart \
  test/a1_metadata_production_blocker_audit_test.dart \
  test/a1_metadata_new_word_batch_contract_test.dart \
  test/a1_metadata_mastery_depth_100_word_audit_test.dart \
  -r expanded
cd ../..
/private/tmp/flutter-sdk/bin/flutter test apps/mobile/test/a1_metadata_typed_ui_route_audit_test.dart -r expanded
git diff --check
```

Expected: PASS when Flutter SDK is available. If the Flutter SDK is unavailable, record `tooling.flutter_sdk_unavailable`, run the `learning_core` tests, and do not claim UI proof.

- [ ] **Step 12: Commit Task 22I-P**

```bash
git add \
  packages/learning_core/lib/src/a1_production_metadata_source.dart \
  packages/learning_core/lib/src/a1_metadata_backed_candidate_harness.dart \
  packages/learning_core/lib/src/a1_metadata_production_blocker_report.dart \
  packages/learning_core/lib/src/a1_metadata_new_word_batch_contract.dart \
  packages/learning_core/lib/src/a1_bootstrap_starter_catalog.dart \
  packages/learning_core/lib/src/a1_bootstrap_candidate_factory.dart \
  packages/learning_core/lib/src/a1_semantic_compatibility_registry.dart \
  packages/learning_core/lib/src/a1_semantic_fact_registry.dart \
  packages/learning_core/lib/src/a1_follow_up_opportunity_planner.dart \
  packages/learning_core/lib/src/a1_coherent_candidate_factory.dart \
  packages/learning_core/lib/src/a1_contextual_prompt_realizer.dart \
  packages/learning_core/lib/src/a1_typed_generation_router.dart \
  packages/learning_core/lib/src/focus_coordinator.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_production_metadata_source_test.dart \
  packages/learning_core/test/a1_metadata_backed_bootstrap_route_test.dart \
  packages/learning_core/test/a1_metadata_backed_seeded_composition_24_audit_test.dart \
  packages/learning_core/test/a1_metadata_production_blocker_audit_test.dart \
  packages/learning_core/test/a1_metadata_new_word_batch_contract_test.dart \
  packages/learning_core/test/a1_metadata_mastery_depth_100_word_audit_test.dart \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md
git commit -m "feat: wire production metadata into typed A1 generation"
```

## Task 22K: Egyptian Arabic Metadata Expansion Contract

**Purpose:** Add the contract layer that lets the project safely nearly double Egyptian Arabic metadata across eight non-restaurant world packets without destabilizing the current metadata-backed bridge. This task does not invent or bulk-add unverified words. It makes paradigm, readiness, negative polarity, and learning-priority metadata first-class so curated batches can drop into the working system safely.

**Expansion categories:**

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

**Files:**

- Modify: `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- Modify: `docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md`
- Modify: `packages/learning_core/lib/src/a1_lexeme_metadata_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_metadata_production_blocker_report.dart`
- Modify: `packages/learning_core/lib/src/a1_metadata_backed_candidate_harness.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Test: `packages/learning_core/test/a1_metadata_activation_contract_test.dart`
- Test: `packages/learning_core/test/a1_active_vocabulary_metadata_coverage_test.dart`
- Test: `packages/learning_core/test/a1_metadata_backed_seeded_composition_24_audit_test.dart`

**Implementation note:** Current local content has only two reviewed non-A1 rows, so the first implementation should not bulk-promote words. Use existing reviewed A1 rows and synthetic test rows to prove the contract. A later curated vocabulary task can add the 150-200 verified rows category by category.

- [x] **Step 1: Write failing activation contract tests**

Create `packages/learning_core/test/a1_metadata_activation_contract_test.dart`.

The test must prove:

```dart
final registry = A1LexemeMetadataRegistry.fromContentLexicalItems([
  {
    'id': 'verb.study.present.i',
    'english': 'I study',
    'canonical': 'bazaker',
    'part_of_speech': 'verb',
    'slot_categories': ['verb_present_i', 'study'],
    'situation_tags': ['school_study'],
    'function_tags': ['study_activity'],
    'progression_band': 'a1',
    'review_status': 'reviewed',
    'utility_score': 5,
    'combinatoric_score': 5,
    'personal_score': 4,
  },
  {
    'id': 'verb.study.present.negative.i',
    'english': 'I do not study',
    'canonical': 'mabazakeresh',
    'part_of_speech': 'verb',
    'slot_categories': ['verb_present_i'],
    'situation_tags': ['school_study'],
    'function_tags': ['study_activity', 'negative'],
    'progression_band': 'a1',
    'review_status': 'reviewed',
    'utility_score': 5,
    'combinatoric_score': 5,
    'personal_score': 4,
  },
]);

final positive = registry.require('verb.study.present.i');
expect(positive.verbFamilyId, 'verb.study');
expect(positive.lemmaId, 'verb.study');
expect(positive.person, '1sg');
expect(positive.tenseAspect, 'present_or_habitual');
expect(positive.polarity, 'affirmative');
expect(positive.generationReadiness, 'bridge_safe');
expect(positive.learningPriorityScore, greaterThan(0));

final negative = registry.require('verb.study.present.negative.i');
expect(negative.verbFamilyId, 'verb.study');
expect(negative.polarity, 'negative');
expect(negative.generationReadiness, 'metadata_only');
expect(negative.dialogueRoleEligibility, isNot(contains('learner_self_answer')));

expect(
  registry.rowsByLearningPriority.first.lexemeId,
  'verb.study.present.i',
);
```

Expected before implementation: FAIL because row-level paradigm, readiness, role eligibility, and priority fields are not exposed.

- [x] **Step 2: Implement row-level paradigm/readiness/priority fields**

Modify `A1LexemeMetadataRow` in `packages/learning_core/lib/src/a1_lexeme_metadata_registry.dart` to expose optional fields with safe defaults:

```dart
final String verbFamilyId;
final String lemmaId;
final String person;
final String gender;
final String number;
final String tenseAspect;
final String polarity;
final List<String> speakerRoleEligibility;
final List<String> dialogueRoleEligibility;
final String positiveCounterpartId;
final String negativeCounterpartId;
final String generationReadiness;
final int learningPriorityScore;
```

Parsing rules:

- explicit content metadata wins when present;
- verb rows infer `verbFamilyId` and `lemmaId` from the stable id prefix before tense/person/polarity tokens;
- `verb_present_i` and `.present.i` infer `1sg`;
- `you_m`/`you_f` infer `2sg_m`/`2sg_f`;
- `past` and `future` infer tense/aspect;
- `negative`, `dont`, `do_not`, `mesh`, `ma...sh`, or `m...sh` markers infer negative polarity only when the row metadata or id clearly marks the row negative;
- negative verb forms default to `metadata_only`;
- affirmative first-person present/habitual verb rows can be `bridge_safe`;
- bare second-person forms are tutor-question/support eligible but not learner-self-answer eligible;
- priority derives from `utility_score`, `combinatoric_score`, `personal_score`, review status, readiness, and explicit priority fields when present.

- [x] **Step 3: Add blocker ownership for incomplete expansion rows**

Modify `packages/learning_core/lib/src/a1_metadata_production_blocker_report.dart`.

Add owner buckets:

```text
metadata.verb_family_missing
metadata.lemma_missing
grammar.person_missing
grammar.tense_aspect_missing
grammar.polarity_missing
metadata.generation_readiness_missing
metadata.learning_priority_missing
```

Only require verb-family/person/tense/polarity blockers for rows where `partOfSpeech == verb`. Chunks with fixed negative meaning should not be forced into full verb paradigms, but they must expose polarity and readiness.

- [x] **Step 4: Gate bridge consumption by readiness**

Modify `packages/learning_core/lib/src/a1_metadata_backed_candidate_harness.dart`.

The bridge may only select rows where:

```dart
row.generationReadiness == 'bridge_safe' ||
row.generationReadiness == 'planner_safe' ||
row.generationReadiness == 'production_ready'
```

For `practice_action_form`, keep the stricter requirement:

```text
1sg + present_or_habitual + affirmative + not 2sg + not past + not future
```

This prevents negative and future/past rows from entering old today/tomorrow self-answer templates.

- [x] **Step 5: Preserve active vocabulary coverage**

Update `packages/learning_core/test/a1_active_vocabulary_metadata_coverage_test.dart` to assert representative existing rows have the new metadata:

```dart
expect(registry.require('verb.eat.present.i').verbFamilyId, 'verb.eat');
expect(registry.require('verb.eat.present.i').generationReadiness, 'bridge_safe');
expect(registry.require('verb.eat.present.you_m.bare').dialogueRoleEligibility,
    isNot(contains('learner_self_answer')));
expect(registry.require('foundation.helper.dont_know').polarity, 'negative');
expect(registry.require('foundation.helper.dont_know').generationReadiness,
    anyOf('recognition_support', 'bridge_safe', 'production_ready'));
```

- [x] **Step 6: Verify Task 22K**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_metadata_activation_contract_test.dart \
  test/a1_active_vocabulary_metadata_coverage_test.dart \
  test/a1_metadata_backed_seeded_composition_24_audit_test.dart \
  test/a1_metadata_production_blocker_audit_test.dart \
  test/a1_metadata_mastery_depth_100_word_audit_test.dart \
  test/a1_production_metadata_source_test.dart \
  test/a1_metadata_new_word_batch_contract_test.dart \
  -r expanded
cd ../..
git diff --check
```

Expected: PASS. The seeded audit should still print coherent bridge-safe rows. Negative rows should exist as metadata/readiness concepts but should not appear in bridge self-answer production unless explicitly unlocked by a future planner-safe route.

- [ ] **Step 7: Commit Task 22K**

```bash
git add \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md \
  packages/learning_core/lib/src/a1_lexeme_metadata_registry.dart \
  packages/learning_core/lib/src/a1_metadata_production_blocker_report.dart \
  packages/learning_core/lib/src/a1_metadata_backed_candidate_harness.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_metadata_activation_contract_test.dart \
  packages/learning_core/test/a1_active_vocabulary_metadata_coverage_test.dart \
  packages/learning_core/test/a1_metadata_backed_seeded_composition_24_audit_test.dart
git commit -m "feat: add A1 metadata activation contract"
```

## Task 22L: Balanced Island Viability Metadata Batch

**Purpose:** Add the first concrete reviewed A1 vocabulary batch across the eight expansion categories so the metadata bridge can visibly leave the restaurant-heavy world while still passing deterministic safety, readiness, and coherence guards.

**Expansion categories covered:**

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

**Files:**

- Modify: `apps/mobile/assets/content/egyptian-arabic.json`
- Modify: `packages/learning_core/lib/src/a1_lexeme_metadata_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_metadata_backed_candidate_harness.dart`
- Modify: `packages/learning_core/lib/src/a1_predicate_frame_registry.dart`
- Modify: `packages/learning_core/lib/src/a1_semantic_type_taxonomy.dart`
- Modify: `apps/mobile/test/content_loading_test.dart`
- Modify: `packages/learning_core/test/a1_metadata_backed_seeded_composition_24_audit_test.dart`
- Test: `packages/learning_core/test/a1_balanced_island_viability_batch_test.dart`

**Implementation note:** This task intentionally skips a separate physical/manual review gate per user direction. Acceptance is test-gated by JSON parsing, mobile content loading, metadata coverage, blocker ownership, seeded 24-row conversation audit, and balanced island viability assertions. New negative verb rows are metadata-only. Person entities are blocked from possession/object-pronoun follow-ups, and feeling adjectives map to `feel_state`, not restaurant modifiers.

- [x] **Step 1: Write failing balanced-island viability test**

Created `packages/learning_core/test/a1_balanced_island_viability_batch_test.dart`.

The test proves:

- compiled A1 lexical rows are at least 220 rows;
- reviewed A1 lexical rows are at least 175 rows;
- every expansion category has at least six reviewed A1 rows;
- restaurant rows are no more than 45% of reviewed A1 rows;
- representative new rows expose paradigm/readiness/priority metadata;
- the seeded 24-row bridge includes `daily_actions`, `possession`, `places_movement`, `visibility_resources`, `people_social`, and `feelings_states`;
- restaurant-adjacent bridge rows are at most 8 out of 24.

Verified red before implementation:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_balanced_island_viability_batch_test.dart \
  -r expanded
```

Expected before implementation: FAIL due to only 159 A1 rows, missing new verb rows, and no people/feelings bridge output.

- [x] **Step 2: Add balanced A1 metadata rows**

Added reviewed A1 rows to `apps/mobile/assets/content/egyptian-arabic.json`:

- verb families: `write`, `read`, `study`, `sleep`;
- each verb family includes first-person present, second-person masculine/feminine present, first-person past, first-person future, and first-person negative metadata;
- home objects: key, door, room, kitchen, bed, window, light, clothes;
- school/study words: book, pen, notebook, lesson, class, teacher, homework, question;
- movement/city words: street, store, station, bus, car, metro, taxi, hospital;
- people/social words: friend, mother, father, brother, sister, family, child, people;
- feeling/state words: tired, happy, sad, hungry, thirsty, busy, okay, sick;
- time/sequence words: morning, night, now, later, after that, before that, every day, early;
- discourse-glue words: also, maybe, okay, yes, no, why, then okay, I mean.

- [x] **Step 3: Add global semantic mappings**

Updated `A1LexemeMetadataRegistry` so tags map globally:

- `person_entity`, `family_member`, `social_person` -> person/social routes;
- `physical_state`, `emotional_state`, `cognitive_state` -> `feel_state`;
- `readable_object`, `writing_tool`, `visible_thing`, `useful_resource`, `school_place`, `home_place`, `work_place`, `topic` -> existing frame contracts;
- study/read/write/work/see actions map to their action semantic classes.

- [x] **Step 4: Add bridge support for people and feeling states**

Updated `A1MetadataBackedCandidateHarness`:

- `talk_to_person` profiles for simple people/social turns;
- `feel_state` profiles for simple feeling/state turns;
- role gates rejecting person entities from `have_possessable`;
- role gates rejecting person entities from object-pronoun visibility follow-ups.

- [x] **Step 5: Add role-leak audit guards**

Updated `a1_metadata_backed_seeded_composition_24_audit_test.dart` so future audits reject:

- people used as possessed objects;
- people used in `see_visible_thing.visibility_place_detail` follow-ups that ask `Do you need it?`.

- [x] **Step 6: Update mobile content-loading count invariant**

Updated `apps/mobile/test/content_loading_test.dart` so seed prompt loading asserts at least 13 prompts plus required IDs, not exactly 13 prompts. This avoids breaking content loading when valid new prompts already exist in the asset.

- [x] **Step 7: Verify Task 22L**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_balanced_island_viability_batch_test.dart \
  test/a1_metadata_activation_contract_test.dart \
  test/a1_active_vocabulary_metadata_coverage_test.dart \
  test/a1_metadata_backed_seeded_composition_24_audit_test.dart \
  test/a1_metadata_production_blocker_audit_test.dart \
  test/a1_metadata_mastery_depth_100_word_audit_test.dart \
  test/a1_production_metadata_source_test.dart \
  test/a1_metadata_new_word_batch_contract_test.dart \
  -r expanded

cd ../../apps/mobile
/private/tmp/flutter-stable/bin/flutter test test/content_loading_test.dart
```

Expected: PASS. The latest seeded 24-row bridge audit should now include people/social, feelings/states, visibility/resources, home/key, school/book, daily action, and movement-city rows before returning to restaurant rows.

- [ ] **Step 8: Commit Task 22L**

```bash
git add \
  apps/mobile/assets/content/egyptian-arabic.json \
  apps/mobile/test/content_loading_test.dart \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md \
  packages/learning_core/lib/src/a1_lexeme_metadata_registry.dart \
  packages/learning_core/lib/src/a1_metadata_backed_candidate_harness.dart \
  packages/learning_core/lib/src/a1_predicate_frame_registry.dart \
  packages/learning_core/lib/src/a1_semantic_type_taxonomy.dart \
  packages/learning_core/test/a1_balanced_island_viability_batch_test.dart \
  packages/learning_core/test/a1_metadata_backed_seeded_composition_24_audit_test.dart
git commit -m "feat: add balanced A1 island metadata batch"
```

## Task 22M: Product Spine Reattachment Plan And Current-State Audit

**Purpose:** Stop the metadata bridge from becoming the product path. Capture the current product shape, classify existing middle contracts, and define the integration gate that must happen before writing new production wiring.

**Status:** Documentation and audit-planning only. Do not implement new product code in this task.

**Current understanding:**

- `StarterLanguageMetadata.v1` is still the working quality reference because it behaves like a small curriculum graph with slot pools, upgrade paths, route compatibility, verb paradigms, and progress ordering.
- `apps/mobile/assets/content/egyptian-arabic.json` remains the app's broad compiled content inventory and the current default mobile asset.
- `apps/mobile/assets/content/egyptian-arabic-a1-production.json` is the intended curated A1 product-facing manifest shape, but it is not yet wired into the real coordinator path.
- `A1ProductionMetadataSource` can parse production-style rows and can be the source boundary for the manifest, but most product systems still default to `StarterLanguageMetadata.v1` or the broad compiled JSON.
- `A1MetadataBackedCandidateHarness` is backend code and useful diagnostic pressure, but its `metadata_backed_profile_bridge` trace means it is not final product architecture.
- The 24-count bridge audit is valuable as an acceptance-criteria source: restaurant drift, island balance, semantic role leaks, negative-form readiness, verb-family coverage, and repetitive route shape are real risks.
- The next success condition is not "24 better bridge conversations." The next success condition is "24 product-spine lessons generated from the curated A1 manifest materialize into UI-ready payloads and write memory that the next lesson consumes."

**Files to update in this task:**

- Modify: `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- Modify: `docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md`
- Modify: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`

**No production-code files are allowed in this task.**

- [x] **Step 1: Add product-spine reattachment contract to the spec**

Document that the real proof path is:

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

Document that robust generation, after memory readiness, routes through:

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

Document that audits producing only abstract transcripts or bridge-only candidates are diagnostic-only and cannot count as product completion.

- [x] **Step 2: Add A1 production manifest role to the spec**

Document the source layering:

```text
broad content inventory
-> curated A1 production manifest
-> starter-like metadata repository / slot resolver adapter
-> product lesson spine
```

Document that the manifest should be balanced and starter-like without becoming restaurant-heavy:

- enough foundation, daily routine, home, school, movement, people, feeling/state, time, discourse, and food/drink coverage;
- minimal restaurant/service rows only where they unlock high-value service affordances;
- explicit verb family, lemma, person, gender/number when relevant, tense/aspect, polarity, positive/negative counterpart, readiness, and learning priority metadata;
- negative forms default to metadata-only or recognition/support-only until a negative route explicitly unlocks learner production;
- no fake Egyptian Arabic forms;
- deterministic priority that never bypasses readiness, coherence, or renderability gates.

- [x] **Step 3: Add bootstrap-to-robust graduation contract to the spec**

Document that bootstrap and robust generation share the same manifest, memory writeback, validator, compiler/materializer, and UI payload contracts.

Document that graduation is memory/readiness based, using:

- support-word breadth across islands;
- seen verb-family and answer-shape coverage;
- known noun/place/state anchors;
- successful memory writeback evidence;
- target bundle viability;
- route capability and compiler materialization readiness.

- [x] **Step 4: Add existing-contract preservation rule to the spec**

Document the no-bypass rule:

```text
manifest -> transcript
```

is not a product path.

The product path must expose the first failing owner if a manifest row cannot pass through target selection, graph/planner/coherence, compiler/materializer, UI payload, or memory writeback.

Existing middle contracts must be classified as:

- `product_spine`
- `diagnostic_scaffold`
- `legacy_fallback`
- `retirement_candidate`

- [x] **Step 5: Add current product-shape understanding to the spec**

Record:

- mobile default loading still points at `assets/content/egyptian-arabic.json`;
- many app/backend systems still use `StarterLanguageMetadata.v1`;
- the bridge audit is backend-level but transitional;
- the A1 production manifest is parseable but not yet the real coordinator source;
- bridge findings become acceptance criteria, not architecture;
- next proof must produce app-renderable payloads and real memory evidence.

- [x] **Step 6: Add product-spine audit requirements to the spec**

Add required audits:

- product spine map audit;
- A1 production manifest reachability audit;
- bootstrap graduation audit;
- 24-lesson product-spine audit;
- UI renderability audit.

Each audit must report trace ownership and whether any diagnostic bridge or legacy fallback was used.

- [x] **Step 7: Add current-state audit report**

Update `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md` with a product-spine reset audit containing:

- current backend/app wiring;
- what the bridge proved;
- what remains unwired;
- component inventory table;
- no-bypass integration rule;
- proposed product audit gates;
- readiness criteria for bootstrap graduation.

- [x] **Step 8: User review gate before implementation**

Stop after docs are updated. The user must review the product-spine reset before any new implementation task writes production code.

Review question:

```text
Does this product-spine reset correctly preserve the existing memory/coordinator/compiler work while moving the new A1 manifest toward app-renderable lessons?
```

Review result: approved by user direction to proceed with Task 22M. The next implementation task may begin only when explicitly requested.

## Task 22N: Product Spine Map Audit And Manifest Reachability Gate

**Purpose:** First implementation task after user approval. Inventory the existing product contracts and prove whether the curated A1 production manifest can enter the starter-like metadata repository/slot-resolver path without bypassing the real lesson spine.

**Status:** Implemented as the first product-spine reattachment gate after Task 22M approval.

**Files:**

- Create: `packages/learning_core/lib/src/a1_product_spine_map_audit.dart`
- Create: `packages/learning_core/test/a1_product_spine_map_audit_test.dart`
- Modify: `packages/learning_core/lib/src/a1_production_metadata_source.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`

**Acceptance shape:**

- inventories owners for memory, rung/progression, target selection, metadata source, slot resolver, bootstrap, proposition graph, dialogue obligation, move sequence, follow-up planner, coherence/scoring, validator, compiler/materializer, UI payload/session controller, memory writeback, and fallback;
- classifies each as `product_spine`, `diagnostic_scaffold`, `legacy_fallback`, or `retirement_candidate`;
- proves representative A1 production manifest rows can reach the existing metadata resolver/source path;
- fails if the proof directly creates transcripts from manifest rows;
- prints blockers by first failing owner.

- [x] **Step 1: Write failing product-spine map/reachability audit**

Created `packages/learning_core/test/a1_product_spine_map_audit_test.dart`.

The initial red run failed because:

- `A1ProductSpineMapAudit` did not exist;
- `A1ProductSpineComponentStatus` did not exist;
- `A1ProductionMetadataSource.toLanguageMetadataRepository()` did not exist.

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_spine_map_audit_test.dart \
  -r expanded
```

Expected red: compile failure for missing audit and adapter APIs.

- [x] **Step 2: Add reusable product-spine map audit**

Created `packages/learning_core/lib/src/a1_product_spine_map_audit.dart`.

The audit classifies the current owners:

- product spine: memory read model, memory writeback, rung/progression policy, target bundle selection, production metadata source, starter-like slot resolver, bootstrap generator, generation mode policy, proposition graph, dialogue obligation, move-sequence planner, follow-up planner, coherence/scoring, validator, compiler/materializer, UI session payload;
- diagnostic scaffold: `metadata_backed_profile_bridge`;
- legacy fallback: `StarterLanguageMetadata.v1` default/fallback path.

- [x] **Step 3: Add manifest-to-starter-like repository adapter**

Updated `A1ProductionMetadataSource` with:

```dart
LanguageMetadataRepository toLanguageMetadataRepository()
```

The adapter creates an `InMemoryLanguageMetadataRepository` from `A1LexemeMetadataRow`s so the curated manifest can enter the existing `LanguageMetadataRepository -> A1MetadataSlotResolver -> A1GrowthCandidateSource` path.

Important constraints:

- `production_ready`, `planner_safe`, and `bridge_safe` rows become selectable;
- `metadata_only` and `recognition_support` rows remain structurally ready but non-selectable;
- negative verb forms therefore remain out of learner-production selection unless a later route explicitly unlocks them;
- no transcript generation is performed by the adapter.

- [x] **Step 4: Export the product-spine map audit**

Updated `packages/learning_core/lib/learning_core.dart` so the audit is available through the package boundary.

- [x] **Step 5: Verify Task 22N**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_spine_map_audit_test.dart \
  test/a1_production_curriculum_manifest_test.dart \
  test/a1_production_metadata_source_test.dart \
  -r expanded
```

Expected: PASS.

Run:

```bash
cd ../..
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart format \
  packages/learning_core/lib/src/a1_product_spine_map_audit.dart \
  packages/learning_core/lib/src/a1_production_metadata_source.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_product_spine_map_audit_test.dart \
  --set-exit-if-changed
git diff --check
```

Expected: format stable and no whitespace errors.

## Task 22O: App Product-Path Participation Audit

**Purpose:** Prove what the current app-renderable Focus path actually consumes before wiring more robust generator behavior. This audit must distinguish "component exists in the codebase" from "component participated in the lesson path the UI will render."

**Status:** Implemented as an observational audit. It does not modify selection behavior; it reports current participation and missing owners.

**Files:**

- Create: `apps/mobile/lib/features/practice/a1_product_path_participation_audit.dart`
- Create: `apps/mobile/test/a1_product_path_participation_audit_test.dart`

**Acceptance shape:**

- runs through `FocusMasteryPlanGateway.start(mode: mainFocus)`, not a bridge harness or lower-level proof fixture;
- writes accepted final-conversation evidence through `FocusEvidenceWriter`;
- records selection signatures through `FocusStartLeaseRepository` so later starts see realistic recent-start context;
- reports each start's family, arc, transcript, memory rollups, writeback result, trace, and component participation ledger;
- marks a component as used only when the app path exposes evidence for it in the ready plan, trace, compiler output, UI readiness, or memory writeback;
- reports missing product-spine components by first missing owner instead of failing silently or treating diagnostic paths as production.

- [x] **Step 1: Add failing app-path participation test**

Created `apps/mobile/test/a1_product_path_participation_audit_test.dart`.

The initial red run failed because `A1ProductPathParticipationAudit` and `A1ProductPathParticipationRow` did not exist.

Run:

```bash
cd apps/mobile
/private/tmp/flutter-stable/bin/flutter test --no-pub \
  test/a1_product_path_participation_audit_test.dart
```

Expected red: compile failure for missing audit API.

- [x] **Step 2: Add app-path participation audit**

Created `apps/mobile/lib/features/practice/a1_product_path_participation_audit.dart`.

The audit records these component ids for each app-renderable start:

- `app_gateway`
- `production_manifest_source`
- `memory_read_model`
- `memory_graph_projection`
- `target_bundle_selection`
- `generation_mode_policy`
- `typed_candidate_scoring`
- `proposition_graph`
- `dialogue_obligation`
- `move_sequence_planner`
- `follow_up_planner`
- `coherence_scoring`
- `compiler_materializer`
- `ui_readiness`
- `memory_writeback_evidence`
- `next_lesson_memory_consumption`
- `metadata_backed_profile_bridge_absent`
- `legacy_fallback_absent`

- [x] **Step 3: Verify Task 22O**

Run:

```bash
cd apps/mobile
/private/tmp/flutter-stable/bin/flutter test --no-pub \
  test/a1_product_path_participation_audit_test.dart
```

Expected: PASS and print the participation ledger.

Current result:

- app path, compiler/materializer, UI readiness, writeback, no bridge, and no legacy fallback are observed;
- memory graph projection and target bundle selection are observed after the first writeback;
- missing product-spine components are `production_manifest_source`, `generation_mode_policy`, `typed_candidate_scoring`, `proposition_graph`, `dialogue_obligation`, `move_sequence_planner`, and `follow_up_planner`;
- first missing owner is `metadataReadiness.production_manifest_source_not_observed`.

## Task 22P: Full Product-Path Integration Ladder

**Purpose:** Turn the current component inventory into a new first-class A1 backend product coordinator: the same path the UI will hydrate must consume production metadata, select targets from memory, choose bootstrap or robust generation, plan dialogue through the typed middle contracts, materialize a renderable lesson, write memory, and let the next lesson consume that memory. This task is the reset away from sandbox proofs and away from further patching of the old `FocusCoordinator` fallback shape.

**Status:** In progress. Steps 1-5 proved the old app path can observe production metadata and generation-mode traces, but they also exposed the architectural problem: bootstrap remains a mode label over the hardline A1 arc materializer. The remaining Task 22P work is now revised to create a clean `A1ProductCoordinator`/`A1ProductSpineCoordinator` boundary. The old `FocusCoordinator` may stay as a legacy comparison path, but it cannot satisfy product-spine proof.

**Product rule:** A slice is not complete because a component exists or a unit test passes. A slice is complete only when the new A1 product coordinator participates in the app-path backend or injected gateway proof, the before/after trace shows the intended behavior changed, and the blocker report names the first owner when it cannot continue. Any passing proof that calls the old hardline A1 arc catalog/instantiator, metadata-backed bridge transcript, or legacy seed/routine path is invalid for Task 22P.

**Files:**

- Modify: `apps/mobile/lib/features/practice/a1_product_path_participation_audit.dart`
- Modify: `apps/mobile/test/a1_product_path_participation_audit_test.dart`
- Modify: `apps/mobile/lib/shared/content/kalami_content.dart`
- Modify: `apps/mobile/lib/shared/state/providers.dart`
- Modify: `apps/mobile/lib/features/practice/focus_mastery_plan_gateway.dart`
- Modify: `apps/mobile/lib/features/practice/focus_evidence_writer.dart`
- Modify: `apps/mobile/lib/shared/persistence/learner_memory_repository.dart`
- Create: `packages/learning_core/lib/src/a1_product_coordinator.dart`
- Create: `packages/learning_core/lib/src/a1_product_coordinator_contract.dart`
- Create: `packages/learning_core/lib/src/a1_product_generation_pressure_report.dart`
- Create: `packages/learning_core/lib/src/a1_product_growth_mode_policy.dart`
- Create: `packages/learning_core/lib/src/a1_product_lesson_materializer.dart`
- Create: `packages/learning_core/lib/src/a1_product_robust_candidate_generator.dart`
- Create: `packages/learning_core/test/a1_product_coordinator_contract_test.dart`
- Create: `packages/learning_core/test/a1_product_coordinator_bootstrap_test.dart`
- Create: `packages/learning_core/test/a1_product_coordinator_growth_mode_arbitration_test.dart`
- Create: `packages/learning_core/test/a1_product_generator_failure_pressure_test.dart`
- Create: `packages/learning_core/test/a1_product_coordinator_no_legacy_test.dart`
- Create: `packages/learning_core/test/a1_product_growth_mode_policy_test.dart`
- Modify: `packages/learning_core/lib/src/a1_production_metadata_source.dart`
- Modify: `packages/learning_core/lib/src/a1_typed_generation_router.dart`
- Modify: `packages/learning_core/lib/src/a1_generation_mode_policy.dart`
- Modify: `packages/learning_core/lib/src/a1_bootstrap_candidate_factory.dart`
- Modify: `packages/learning_core/lib/src/a1_bootstrap_starter_catalog.dart`
- Modify: `packages/learning_core/lib/src/a1_dialogue_candidate_generator.dart`
- Modify: `packages/learning_core/lib/src/a1_dialogue_candidate_scoring.dart`
- Modify: `packages/learning_core/lib/src/a1_proposition_graph.dart`
- Modify: `packages/learning_core/lib/src/a1_dialogue_obligation_contract.dart`
- Modify: `packages/learning_core/lib/src/a1_dialogue_move_sequence_planner.dart`
- Modify: `packages/learning_core/lib/src/a1_follow_up_opportunity_planner.dart`
- Modify: `packages/learning_core/lib/src/a1_coherence_validator.dart`
- Modify: `packages/learning_core/lib/src/a1_surface_plan_realizer.dart`
- Modify: `packages/learning_core/lib/src/a1_compiler_preflight.dart`
- Modify: `packages/learning_core/lib/src/a1_semantic_memory_writeback_contract.dart`
- Read or extract only if needed: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Test: `apps/mobile/test/a1_product_path_participation_audit_test.dart`
- Test: `packages/learning_core/test/a1_production_metadata_source_test.dart`
- Test: `packages/learning_core/test/a1_typed_generation_router_test.dart`
- Test: `packages/learning_core/test/a1_generation_mode_policy_test.dart`
- Test: `packages/learning_core/test/a1_bootstrap_graduation_to_composition_test.dart`
- Test: `packages/learning_core/test/a1_dialogue_candidate_generator_test.dart`
- Test: `packages/learning_core/test/a1_dialogue_candidate_scoring_test.dart`
- Test: `packages/learning_core/test/a1_proposition_graph_test.dart`
- Test: `packages/learning_core/test/a1_dialogue_obligation_contract_test.dart`
- Test: `packages/learning_core/test/a1_dialogue_move_sequence_planner_test.dart`
- Test: `packages/learning_core/test/a1_follow_up_opportunity_planner_test.dart`
- Test: `packages/learning_core/test/a1_coherence_validator_test.dart`
- Test: `packages/learning_core/test/a1_surface_plan_realizer_test.dart`
- Test: `packages/learning_core/test/a1_semantic_memory_writeback_contract_test.dart`
- Create: `packages/learning_core/test/a1_metadata_source_parity_test.dart`
- Create: `packages/learning_core/test/a1_limited_vocabulary_product_path_stress_test.dart`
- Create: `apps/mobile/test/a1_long_run_product_path_audit_test.dart`

**Canonical path to prove:**

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

**Coordinator boundary to build:**

```text
A1ProductCoordinator
  input:
    A1 production metadata repository/source
    surface-aware memory graph or typed memory profile
    recent visible lesson fingerprints
    learner/script profile where form choice needs it
  collaborators:
    memory index builder
    target bundle planner
    generation mode policy/router
    typed bootstrap generator
    robust composition generator
    graph/obligation/move/follow-up planners
    coherence/scoring strategy
    surface realizer
    validator/preflight
    compiler/materializer adapter
    writeback contract builder
  output:
    A1ProductCoordinatorResult.ready(...)
    A1ProductCoordinatorResult.blocked(ownerCode: ...)
    selected growth mode and selected rung
```

The new coordinator must be boring in the best way: one sequence, clear inputs and outputs, small replaceable collaborators, and no hidden rescue path. It can reuse helpers from `FocusCoordinator` only after those helpers are product-agnostic or wrapped behind the new coordinator contract.

**Before/after proof standard for every slice:**

```text
before: Task 22O participation audit does not observe the component, or observes the old blocker/output
local proof: focused test proves the component's own input/output behavior
app-path proof: A1ProductCoordinator path or FocusMasteryPlanGateway injected with A1ProductCoordinator observes the component and prints changed transcript/trace/blocker/writeback
acceptance: changed output matches the intended product result, not merely "different"
blocked acceptance: first failing owner and repair route are printed
```

**Legacy comparison rule:**

```text
allowed:
  run old FocusCoordinator to compare transcript quality, compiler shape, or memory effects
not allowed:
  use old FocusCoordinator, A1ConversationArcCatalog, A1ConversationArcInstantiator,
  A1MetadataBackedCandidateHarness, or seed/routine fallback to make a Task 22P
  product proof pass
required trace if old path is invoked in tests:
  legacyComparison.used:true
  productProofEligible:false
```

- [x] **Step 1: Preserve the Task 22O baseline as the integration starting line**

Run:

```bash
cd apps/mobile
/private/tmp/flutter-stable/bin/flutter test --no-pub \
  test/a1_product_path_participation_audit_test.dart \
  -r expanded
```

Expected current baseline:

```text
observed: app_gateway, compiler_materializer, ui_readiness, memory_writeback_evidence, metadata_backed_profile_bridge_absent, legacy_fallback_absent
observed after writeback: memory_graph_projection, target_bundle_selection
missing: production_manifest_source, generation_mode_policy, typed_candidate_scoring, proposition_graph, dialogue_obligation, move_sequence_planner, follow_up_planner
firstMissingOwner: metadataReadiness.production_manifest_source_not_observed
```

Do not change downstream generator behavior before this baseline is printed and copied into the task note or audit report.

Baseline captured:

```text
starts: 6
firstMissingOwner: metadataReadiness.production_manifest_source_not_observed
observed: app_gateway, coherence_scoring, compiler_materializer, ui_readiness, memory_writeback_evidence, metadata_backed_profile_bridge_absent, legacy_fallback_absent
observed after first writeback: memory_graph_projection, target_bundle_selection, next_lesson_memory_consumption
missing: production_manifest_source, generation_mode_policy, typed_candidate_scoring, proposition_graph, dialogue_obligation, move_sequence_planner, follow_up_planner
```

- [x] **Step 2: Extend the app-path audit with before/after component deltas**

Update `apps/mobile/lib/features/practice/a1_product_path_participation_audit.dart` so each row records:

```text
lessonIndex
generationMode
metadataSourceId
primaryIsland
growthTargetIds
supportTargetIds
grammarAxisIds
componentLedger
selectedTraceTerms
blockedOwnerCodes
transcriptFingerprint
writebackFactIds
nextStartConsumedFactIds
```

Update `apps/mobile/test/a1_product_path_participation_audit_test.dart` to fail if:

- a component is marked observed without trace/payload/writeback evidence;
- a blocker lacks an owner prefix;
- a transcript changes but the trace cannot explain which component caused the change;
- the next lesson claims memory consumption without matching prior writeback facts.

Run:

```bash
cd apps/mobile
/private/tmp/flutter-stable/bin/flutter test --no-pub \
  test/a1_product_path_participation_audit_test.dart
```

Expected: PASS with the current missing owners still intact.

Verified:

```text
flutter test --no-pub test/a1_product_path_participation_audit_test.dart: PASS
flutter analyze --no-pub lib/features/practice/a1_product_path_participation_audit.dart test/a1_product_path_participation_audit_test.dart: no issues
```

The audit now prints `generationMode`, `metadataSourceId`, `primaryIsland`, growth/support/grammar target ids, selected trace terms, blocked owner codes, transcript fingerprints, writeback fact ids, and prior writeback facts consumed by each later start. Current generation mode remains `unobserved` and current metadata source remains `assets/content/egyptian-arabic.json`, preserving the Step 3 blocker.

- [x] **Step 3: Prove JSON-to-Dart metadata parity before making JSON the app source**

Create `packages/learning_core/test/a1_metadata_source_parity_test.dart`.

The test must build:

```text
native-like repository: representative starter-shaped rows
json-derived repository: A1ProductionMetadataSource.toLanguageMetadataRepository()
representative targets: one verb, one object, one place, one time anchor, one connector, one negative/non-production form
```

Assert both repositories agree on:

```text
lexeme id
semantic type
island id
readiness
priority rank order
support/growth eligibility
surface availability
slot resolver compatibility
route capability or owned blocked state
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_production_metadata_source_test.dart \
  test/a1_metadata_source_parity_test.dart \
  -r expanded
```

Expected: PASS. If parity fails, do not hand-maintain a second Dart vocabulary; name whether the missing behavior is an authored JSON field, adapter mapping, readiness rule, priority rule, or native-only code path.

Verified:

```text
red: a1_metadata_source_parity_test failed because accepted_franco_variants did not survive JSON -> LanguageMetadataRepository
green: dart test test/a1_production_metadata_source_test.dart test/a1_metadata_source_parity_test.dart: PASS
dart analyze lib/src/a1_lexeme_metadata_registry.dart lib/src/a1_production_metadata_source.dart test/a1_metadata_source_parity_test.dart: no issues
```

Repairs made:

```text
adapter mapping: A1LexemeMetadataRow now keeps approved Franco aliases separate from broad surface forms so English glosses do not become learner-facing aliases.
adapter mapping: A1ProductionMetadataSource now publishes accepted Franco aliases to LanguageMetadataNode.approvedFrancoAliases.
metadata parity: polarity is emitted as utility metadata, and non-affirmative polarity is emitted as a grammar feature.
metadata parity: person and tense/aspect derivation no longer apply default learner axes to non-verb/non-pronoun lexical rows.
semantic typing: place/person nouns no longer leak into possessable-object pools.
```

- [x] **Step 4: Inject the production metadata source into the app-path backend**

Wire the app gateway/provider path so `FocusMasteryPlanGateway.start(mode: mainFocus)` can receive the production metadata repository instead of only the default starter/static repository.

Expected implementation shape:

```text
Kalami content loader reads authored JSON
-> A1ProductionMetadataSource parses/validates rows
-> toLanguageMetadataRepository() produces execution repository
-> FocusMasteryPlanGateway/FocusCoordinator receive repository through provider or constructor injection
```

Do not generate transcripts directly from the JSON source. The JSON-derived repository must enter the same target bundle, generator, compiler, and memory path.

Run:

```bash
cd apps/mobile
/private/tmp/flutter-stable/bin/flutter test --no-pub \
  test/content_loading_test.dart \
  test/a1_product_path_participation_audit_test.dart \
  -r expanded
```

Expected after this slice:

```text
production_manifest_source: observed
firstMissingOwner: generationMode.generation_mode_policy_not_observed
```

Verified:

```text
red: app-path audit failed because JSON-derived production metadata reached FocusCoordinator but no trace made the metadata source observable.
green: flutter test --no-pub test/content_loading_test.dart test/a1_product_path_participation_audit_test.dart -r expanded: PASS
flutter analyze --no-pub lib/shared/content/kalami_content.dart test/content_loading_test.dart test/a1_product_path_participation_audit_test.dart: no issues
dart analyze lib/src/focus_coordinator.dart lib/src/a1_production_metadata_source.dart: no issues
```

Implementation result:

```text
KalamiContent now preserves the loaded source JSON and exposes toA1ProductionMetadataSource().
The app-path audit has a constructor-injected gateway proof that feeds the JSON-derived LanguageMetadataRepository into FocusCoordinator.
FocusCoordinator emits production metadata source trace terms when its repository carries source.a1_production_manifest / a1_production_manifest.derived_metadata_v1.
Injected production path now observes production_manifest_source and moves firstMissingOwner to generationMode.generation_mode_policy_not_observed.
Default app gateway remains intentionally unchanged in the baseline audit, so the audit still distinguishes starter/default behavior from the production-injected path.
```

- [x] **Step 5: Wire generation mode policy into the app path**

Connect `A1GenerationModePolicy` and `A1TypedGenerationRouter` at the coordinator boundary so every app-path lesson has an explicit mode:

```text
bootstrap: empty or weak memory, safer curated targets, same UI/writeback contract
robust: enough memory/readiness to use graph/planner/coherence path
blocked: first owner explains why neither mode can safely run
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_generation_mode_policy_test.dart \
  test/a1_typed_generation_router_test.dart \
  test/a1_bootstrap_graduation_to_composition_test.dart

cd ../../apps/mobile
/private/tmp/flutter-stable/bin/flutter test --no-pub \
  test/a1_product_path_participation_audit_test.dart \
  -r expanded
```

Expected after this slice:

```text
empty memory: generationMode=bootstrap
seeded ready memory: generationMode=robust or blocked with readiness owner
generation_mode_policy: observed
firstMissingOwner: typedCandidate.typed_candidate_scoring_not_observed
```

Verified:

```text
red: injected app-path audit failed because generationMode was unobserved and generation_mode_policy was missing.
green: dart test test/a1_generation_mode_policy_test.dart test/a1_typed_generation_router_test.dart test/a1_bootstrap_graduation_to_composition_test.dart -r expanded: PASS
green: flutter test --no-pub test/content_loading_test.dart test/a1_product_path_participation_audit_test.dart -r expanded: PASS
flutter analyze --no-pub lib/features/practice/a1_product_path_participation_audit.dart lib/shared/content/kalami_content.dart test/content_loading_test.dart test/a1_product_path_participation_audit_test.dart: no issues
dart analyze lib/src/focus_coordinator.dart lib/src/a1_generation_mode_policy.dart lib/src/a1_typed_generation_router.dart test/a1_generation_mode_policy_test.dart test/a1_typed_generation_router_test.dart test/a1_bootstrap_graduation_to_composition_test.dart: no issues
```

Implementation result:

```text
FocusCoordinator now derives a generation-mode runtime from coordinator memory, typed readiness counts, A1GenerationModePolicy.defaults(), and A1TypedGenerationRouter.
Selected app-path rows emit generationMode:typedBootstrap, policy/router trace terms, readiness counts, and legacyFallbackAttempted:false.
Typed composition selection is attempted only when the mode policy returns typedComposition; bootstrap keeps the current hardline A1 arc materializer but no longer hides the lane decision.
Bootstrap mode still preserves compositionMemory trace terms so next-start memory consumption remains provable.
The product-path audit now reports generation_mode_policy observed and moves the injected production path firstMissingOwner to typedCandidate.typed_candidate_scoring_not_observed.
```

- [x] **Step 6: Add the new A1 product coordinator contract tests**

Create `packages/learning_core/test/a1_product_coordinator_contract_test.dart`.

The first tests must define the product boundary before implementation:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1ProductCoordinator contract', () {
    test('blocked result requires first owner and is not product ready', () {
      const result = A1ProductCoordinatorResult.blocked(
        ownerCode: 'bootstrap.no_renderable_candidate',
        trace: ['generationMode:typedBootstrap'],
      );

      expect(result.isReady, isFalse);
      expect(result.ownerCode, 'bootstrap.no_renderable_candidate');
      expect(result.productProofEligible, isFalse);
      expect(result.trace, contains('generationMode:typedBootstrap'));
    });

    test('ready result records component ledger and writeback contract', () {
      final result = A1ProductCoordinatorResult.ready(
        lesson: A1ProductLessonPayload.fixture(
          visibleTranscriptFingerprint: 'visible.fixture.1',
          semanticLessonFingerprint: 'semantic.fixture.1',
        ),
        generationMode: A1GenerationMode.typedBootstrap,
        growthMode: A1ProductGrowthMode.lexicalGrowth,
        componentLedger: const {
          'production_manifest_source': true,
          'generation_mode_policy': true,
          'bootstrap_generator': true,
          'compiler_materializer': true,
          'memory_writeback_contract': true,
        },
        trace: const ['legacyFallbackAttempted:false'],
      );

      expect(result.isReady, isTrue);
      expect(result.productProofEligible, isTrue);
      expect(result.componentLedger['bootstrap_generator'], isTrue);
      expect(result.trace, isNot(contains('legacyComparison.used:true')));
    });
  });
}
```

Expected first run: FAIL because the new coordinator contract types do not exist.

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_coordinator_contract_test.dart \
  -r expanded
```

- [x] **Step 7: Implement minimal coordinator contract models**

Create `packages/learning_core/lib/src/a1_product_coordinator_contract.dart`.

Required public types:

```dart
enum A1ProductCoordinatorStage {
  metadataSource,
  memoryProfile,
  targetBundle,
  generationMode,
  bootstrapGenerator,
  robustGenerator,
  propositionGraph,
  dialogueObligation,
  moveSequencePlanner,
  followUpPlanner,
  coherenceScoring,
  realizer,
  validator,
  compilerMaterializer,
  memoryWritebackContract,
}

enum A1ProductGrowthMode {
  lexicalGrowth,
  formGrowth,
  relationGrowth,
  compositionGrowth,
  thoughtDepthGrowth,
  refreshOrRepair,
  blocked,
}

final class A1ProductLessonPayload {
  const A1ProductLessonPayload({
    required this.visibleTranscript,
    required this.visibleTranscriptFingerprint,
    required this.semanticLessonFingerprint,
    required this.generationMode,
    required this.growthMode,
    required this.primaryIslandId,
    required this.growthTargetIds,
    required this.supportTargetIds,
    required this.grammarAxisIds,
    required this.writebackFactIds,
  });

  factory A1ProductLessonPayload.fixture({
    String visibleTranscriptFingerprint = 'visible.fixture',
    String semanticLessonFingerprint = 'semantic.fixture',
  }) {
    return A1ProductLessonPayload(
      visibleTranscript: 'Tutor: Do you have a book?\nLearner: Yes, I have a book.',
      visibleTranscriptFingerprint: visibleTranscriptFingerprint,
      semanticLessonFingerprint: semanticLessonFingerprint,
      generationMode: A1GenerationMode.typedBootstrap,
      growthMode: A1ProductGrowthMode.lexicalGrowth,
      primaryIslandId: 'possession',
      growthTargetIds: const ['object.book'],
      supportTargetIds: const [],
      grammarAxisIds: const ['1sg', '2sg', 'present_or_habitual', 'affirmative'],
      writebackFactIds: const ['fact.have.self.object.book'],
    );
  }

  final String visibleTranscript;
  final String visibleTranscriptFingerprint;
  final String semanticLessonFingerprint;
  final A1GenerationMode generationMode;
  final A1ProductGrowthMode growthMode;
  final String primaryIslandId;
  final List<String> growthTargetIds;
  final List<String> supportTargetIds;
  final List<String> grammarAxisIds;
  final List<String> writebackFactIds;
}

sealed class A1ProductCoordinatorResult {
  const A1ProductCoordinatorResult({
    required this.generationMode,
    required this.growthMode,
    required this.componentLedger,
    required this.trace,
    required this.productProofEligible,
    this.lesson,
    this.ownerCode = '',
  });

  const factory A1ProductCoordinatorResult.ready({
    required A1ProductLessonPayload lesson,
    required A1GenerationMode generationMode,
    required A1ProductGrowthMode growthMode,
    required Map<String, bool> componentLedger,
    required List<String> trace,
  }) = A1ProductCoordinatorReady;

  const factory A1ProductCoordinatorResult.blocked({
    required String ownerCode,
    required List<String> trace,
    A1GenerationMode generationMode,
    A1ProductGrowthMode growthMode,
    Map<String, bool> componentLedger,
  }) = A1ProductCoordinatorBlocked;

  final A1GenerationMode generationMode;
  final A1ProductGrowthMode growthMode;
  final Map<String, bool> componentLedger;
  final List<String> trace;
  final bool productProofEligible;
  final A1ProductLessonPayload? lesson;
  final String ownerCode;

  bool get isReady => this is A1ProductCoordinatorReady;
}
```

Export the new file from `packages/learning_core/lib/learning_core.dart`.

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_coordinator_contract_test.dart \
  -r expanded
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart analyze \
  lib/src/a1_product_coordinator_contract.dart \
  test/a1_product_coordinator_contract_test.dart
```

Expected: PASS and no analyzer issues.

- [x] **Step 8: Add the no-legacy coordinator guard**

Create `packages/learning_core/test/a1_product_coordinator_no_legacy_test.dart`.

The test must fail if the new product coordinator imports or references old arc materializers:

```dart
import 'dart:io';

import 'package:test/test.dart';

void main() {
  test('A1ProductCoordinator does not depend on hardline arc fallback', () {
    final source = File('lib/src/a1_product_coordinator.dart').readAsStringSync();

    expect(source, isNot(contains('A1ConversationArcCatalog')));
    expect(source, isNot(contains('A1ConversationArcInstantiator')));
    expect(source, isNot(contains('A1MetadataBackedCandidateHarness')));
    expect(source, isNot(contains('createA1ConversationArcFocusPlan')));
    expect(source, isNot(contains('createMasteryFocusPlan')));
  });
}
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_coordinator_no_legacy_test.dart \
  -r expanded
```

Expected first run: FAIL until `a1_product_coordinator.dart` exists. After Step 9 it must PASS.

- [x] **Step 9: Implement the new coordinator shell with blockers only**

Create `packages/learning_core/lib/src/a1_product_coordinator.dart`.

The initial shell must accept collaborators but return owned blockers until each stage is wired:

```dart
final class A1ProductCoordinator {
  const A1ProductCoordinator({
    required this.generationModePolicy,
  });

  final A1GenerationModePolicy generationModePolicy;

  A1ProductCoordinatorResult createLesson({
    A1TypedMemoryProfile memoryProfile = const A1TypedMemoryProfile(
      hasAnyTypedFacts: false,
    ),
    A1TypedReadiness typedReadiness = const A1TypedReadiness(
      renderableCompositionCandidateCount: 0,
      knownPredicateFrameCount: 0,
      knownSemanticRoleClassCount: 0,
      typedSemanticFactCount: 0,
      islandCount: 0,
      reasonCompatiblePairCount: 0,
    ),
    List<A1VisibleLessonFingerprint> recentLessonFingerprints = const [],
  }) {
    final decision = generationModePolicy.selectMode(
      memoryProfile: memoryProfile,
      typedReadiness: typedReadiness,
    );
    return A1ProductCoordinatorResult.blocked(
      generationMode: decision.mode,
      growthMode: A1ProductGrowthMode.blocked,
      ownerCode: decision.mode == A1GenerationMode.typedBootstrap
          ? 'bootstrap.generator_not_wired'
          : 'robust.generator_not_wired',
      componentLedger: const {
        'generation_mode_policy': true,
        'legacy_fallback_absent': true,
      },
      trace: [
        'generationMode:${decision.mode.name}',
        'generationMode.legacyFallbackAttempted:false',
        'legacyComparison.used:false',
      ],
    );
  }
}
```

Export it from `packages/learning_core/lib/learning_core.dart`.

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_coordinator_contract_test.dart \
  test/a1_product_coordinator_no_legacy_test.dart \
  -r expanded
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart analyze \
  lib/src/a1_product_coordinator.dart \
  lib/src/a1_product_coordinator_contract.dart
```

Expected: PASS and no analyzer issues. The product coordinator now exists but blocks honestly.

- [x] **Step 10: Wire typed bootstrap into the new coordinator**

Create `packages/learning_core/test/a1_product_coordinator_bootstrap_test.dart`.

Test empty memory through the new coordinator:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('empty memory produces typed bootstrap without hardline arc fallback', () {
    final coordinator = A1ProductCoordinator(
      generationModePolicy: A1GenerationModePolicy.defaults(),
      bootstrapGenerator: A1BootstrapCandidateFactory.defaults(),
      materializer: const A1ProductLessonMaterializer(),
    );

    final result = coordinator.createLesson(
      memoryProfile: A1TypedMemoryProfile.empty(),
      typedReadiness: const A1TypedReadiness(
        renderableCompositionCandidateCount: 0,
        knownPredicateFrameCount: 0,
        knownSemanticRoleClassCount: 0,
        typedSemanticFactCount: 0,
        islandCount: 0,
        reasonCompatiblePairCount: 0,
      ),
    );

    expect(result.isReady, isTrue);
    expect(result.generationMode, A1GenerationMode.typedBootstrap);
    expect(result.growthMode, A1ProductGrowthMode.lexicalGrowth);
    expect(result.productProofEligible, isTrue);
    expect(result.componentLedger['bootstrap_generator'], isTrue);
    expect(result.componentLedger['legacy_fallback_absent'], isTrue);
    expect(result.trace, contains('generationMode.legacyFallbackAttempted:false'));
    expect(result.trace, isNot(contains('legacyComparison.used:true')));
    expect(result.lesson!.writebackFactIds, isNotEmpty);
    expect(result.lesson!.visibleTranscript, contains('Tutor:'));
  });
}
```

Create `packages/learning_core/lib/src/a1_product_lesson_materializer.dart` to convert `A1TypedLessonPlan` into `A1ProductLessonPayload`. The first materializer may be a thin adapter over typed lesson fields; it must not compile through `A1ConversationArcCatalog`.

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_bootstrap_candidate_factory_test.dart \
  test/a1_bootstrap_starter_catalog_test.dart \
  test/a1_product_coordinator_bootstrap_test.dart \
  test/a1_product_coordinator_no_legacy_test.dart \
  -r expanded
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart analyze \
  lib/src/a1_product_coordinator.dart \
  lib/src/a1_product_coordinator_contract.dart \
  lib/src/a1_product_lesson_materializer.dart \
  test/a1_product_coordinator_bootstrap_test.dart
```

Expected: PASS. Empty memory now creates a real product-spine bootstrap lesson through the new coordinator.

- [x] **Step 11: Prove bootstrap memory writeback changes the next product decision**

Extend `packages/learning_core/test/a1_product_coordinator_bootstrap_test.dart` with a two-start proof:

```dart
test('bootstrap writeback facts are visible before the next product start', () {
  final coordinator = A1ProductCoordinator(
    generationModePolicy: A1GenerationModePolicy.defaults(),
    bootstrapGenerator: A1BootstrapCandidateFactory.defaults(),
    materializer: const A1ProductLessonMaterializer(),
  );

  final first = coordinator.createLesson(
    memoryProfile: A1TypedMemoryProfile.empty(),
    typedReadiness: const A1TypedReadiness(
      renderableCompositionCandidateCount: 0,
      knownPredicateFrameCount: 0,
      knownSemanticRoleClassCount: 0,
      typedSemanticFactCount: 0,
      islandCount: 0,
      reasonCompatiblePairCount: 0,
    ),
  );

  final facts = first.lesson!.writebackFactIds;
  final second = coordinator.createLesson(
    memoryProfile: A1TypedMemoryProfile(
      hasAnyTypedFacts: true,
      semanticFactIds: facts,
    ),
    recentLessonFingerprints: [
      A1VisibleLessonFingerprint(
        primaryIslandId: first.lesson!.primaryIslandId,
        transcriptHash: first.lesson!.visibleTranscriptFingerprint,
      ),
    ],
  );

  expect(second.trace.join('\n'), contains('memoryProfile.typedFacts:${facts.length}'));
  expect(second.trace.join('\n'), contains(facts.first));
});
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_coordinator_bootstrap_test.dart \
  test/a1_semantic_memory_writeback_contract_test.dart \
  test/a1_semantic_memory_projection_registry_test.dart \
  -r expanded
```

Expected: PASS. If the second start cannot use the fact yet, it must block with `memoryProfile.<owner>` or `bootstrap.<owner>`, not fall back.

- [x] **Step 12: Restore typed composition graduation as a product-coordinator gate**

Create `packages/learning_core/test/a1_product_coordinator_composition_gate_test.dart`.

Use seeded memory that satisfies `A1GenerationModePolicy.defaults()` and assert that the new coordinator attempts robust composition instead of bootstrap:

```dart
test('ready seeded memory enters typed composition gate', () {
  final coordinator = A1ProductCoordinator(
    generationModePolicy: A1GenerationModePolicy.defaults(),
    bootstrapGenerator: A1BootstrapCandidateFactory.defaults(),
    materializer: const A1ProductLessonMaterializer(),
  );

  final result = coordinator.createLesson(
    memoryProfile: A1TypedMemoryProfile.seededForComposition(),
    typedReadiness: const A1TypedReadiness(
      renderableCompositionCandidateCount: 12,
      knownPredicateFrameCount: 6,
      knownSemanticRoleClassCount: 10,
      typedSemanticFactCount: 12,
      islandCount: 3,
      reasonCompatiblePairCount: 1,
    ),
  );

  expect(result.generationMode, A1GenerationMode.typedComposition);
  expect(result.ownerCode, isNot('bootstrap.generator_not_wired'));
  expect(result.trace.join('\n'), contains('robust.generator'));
});
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_generation_mode_policy_test.dart \
  test/a1_typed_generation_router_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart \
  -r expanded
```

Expected: PASS. If robust generation is not wired yet, the result may block with `robust.generator_not_wired`, but it must prove composition mode was selected by the new coordinator.

- [x] **Step 13: Add growth-mode arbitration policy and working-system tests**

Create `packages/learning_core/lib/src/a1_product_growth_mode_policy.dart`.

Create `packages/learning_core/test/a1_product_growth_mode_policy_test.dart`.

The policy must decide whether the next product lesson should grow by vocabulary, form/paradigm, relation, composition, thought depth, or refresh. It must not keep selecting new lexical targets when memory already has enough known support to support a deeper rung.

Required policy input shape:

```dart
final class A1ProductGrowthModeInput {
  const A1ProductGrowthModeInput({
    required this.knownSupportLexemeCount,
    required this.availableHighPriorityLexicalGrowthCount,
    required this.recentLexicalGrowthCount,
    required this.verifiedPersons,
    required this.verifiedTenseAspects,
    required this.verifiedPolarities,
    required this.connectorFunctions,
    required this.knownRoleCount,
    required this.factCount,
    required this.recentSuccessCount,
    required this.refreshDueCount,
  });
}
```

Required policy output shape:

```dart
final class A1ProductGrowthModeDecision {
  const A1ProductGrowthModeDecision({
    required this.growthMode,
    required this.rungId,
    required this.reasonCode,
    required this.maxNewLexicalItems,
    required this.requiredTrace,
    this.blockerCode = '',
  });
}
```

Write these tests:

```dart
test('weak vocabulary base prefers bounded lexical growth', () {
  final decision = A1ProductGrowthModePolicy.defaults().select(
    const A1ProductGrowthModeInput(
      knownSupportLexemeCount: 4,
      availableHighPriorityLexicalGrowthCount: 20,
      recentLexicalGrowthCount: 0,
      verifiedPersons: ['1sg', '2sg'],
      verifiedTenseAspects: ['present_or_habitual'],
      verifiedPolarities: ['affirmative'],
      connectorFunctions: {},
      knownRoleCount: 2,
      factCount: 0,
      recentSuccessCount: 0,
      refreshDueCount: 0,
    ),
  );

  expect(decision.growthMode, A1ProductGrowthMode.lexicalGrowth);
  expect(decision.maxNewLexicalItems, 1);
  expect(decision.rungId, 'first_contact');
});

test('recent lexical load caps new words and prefers form growth when forms are ready', () {
  final decision = A1ProductGrowthModePolicy.defaults().select(
    const A1ProductGrowthModeInput(
      knownSupportLexemeCount: 24,
      availableHighPriorityLexicalGrowthCount: 30,
      recentLexicalGrowthCount: 3,
      verifiedPersons: ['1sg', '2sg', '3sg_m', '3sg_f'],
      verifiedTenseAspects: ['present_or_habitual', 'future'],
      verifiedPolarities: ['affirmative'],
      connectorFunctions: {},
      knownRoleCount: 4,
      factCount: 1,
      recentSuccessCount: 2,
      refreshDueCount: 0,
    ),
  );

  expect(decision.growthMode, A1ProductGrowthMode.formGrowth);
  expect(decision.maxNewLexicalItems, 0);
  expect(decision.requiredTrace, contains('growthMode.lexical_cap_reached'));
  expect(decision.requiredTrace, contains('growthMode.form_axis_ready'));
});

test('known support plus reason connector prefers thought depth over another noun', () {
  final decision = A1ProductGrowthModePolicy.defaults().select(
    const A1ProductGrowthModeInput(
      knownSupportLexemeCount: 36,
      availableHighPriorityLexicalGrowthCount: 25,
      recentLexicalGrowthCount: 2,
      verifiedPersons: ['1sg', '2sg', '3sg_m', '3sg_f'],
      verifiedTenseAspects: ['present_or_habitual', 'future', 'past'],
      verifiedPolarities: ['affirmative', 'negative'],
      connectorFunctions: {'reason'},
      knownRoleCount: 6,
      factCount: 3,
      recentSuccessCount: 3,
      refreshDueCount: 0,
    ),
  );

  expect(decision.growthMode, A1ProductGrowthMode.thoughtDepthGrowth);
  expect(decision.rungId, 'claim_with_reason');
  expect(decision.maxNewLexicalItems, 0);
});

test('negative production blocks when negative forms are not production ready', () {
  final decision = A1ProductGrowthModePolicy.defaults().select(
    const A1ProductGrowthModeInput(
      knownSupportLexemeCount: 40,
      availableHighPriorityLexicalGrowthCount: 10,
      recentLexicalGrowthCount: 2,
      verifiedPersons: ['1sg', '2sg', '3sg_m'],
      verifiedTenseAspects: ['present_or_habitual', 'future'],
      verifiedPolarities: ['affirmative'],
      connectorFunctions: {'contrast'},
      knownRoleCount: 6,
      factCount: 3,
      recentSuccessCount: 3,
      refreshDueCount: 0,
    ),
    requestedGrowthMode: A1ProductGrowthMode.formGrowth,
    requestedPolarity: 'negative',
  );

  expect(decision.growthMode, A1ProductGrowthMode.blocked);
  expect(decision.blockerCode, 'grammar.negative_form_not_production_ready');
});

test('refresh due beats new growth when memory needs repair', () {
  final decision = A1ProductGrowthModePolicy.defaults().select(
    const A1ProductGrowthModeInput(
      knownSupportLexemeCount: 28,
      availableHighPriorityLexicalGrowthCount: 20,
      recentLexicalGrowthCount: 1,
      verifiedPersons: ['1sg', '2sg', '3sg_m'],
      verifiedTenseAspects: ['present_or_habitual', 'future'],
      verifiedPolarities: ['affirmative'],
      connectorFunctions: {'reason'},
      knownRoleCount: 5,
      factCount: 2,
      recentSuccessCount: 1,
      refreshDueCount: 2,
    ),
  );

  expect(decision.growthMode, A1ProductGrowthMode.refreshOrRepair);
  expect(decision.maxNewLexicalItems, 0);
});
```

Create `packages/learning_core/test/a1_product_coordinator_growth_mode_arbitration_test.dart`.

This test assumes the product coordinator can already create lessons. It must prove the selected `growthMode`, `rungId`, `grammarAxisIds`, and traces reach the final coordinator result:

```dart
test('coordinator exposes why it chose vocabulary or rung growth', () {
  final coordinator = A1ProductCoordinator.productDefaultsForTest();

  final lexical = coordinator.createLesson(
    growthModeInput: const A1ProductGrowthModeInput(
      knownSupportLexemeCount: 4,
      availableHighPriorityLexicalGrowthCount: 20,
      recentLexicalGrowthCount: 0,
      verifiedPersons: ['1sg', '2sg'],
      verifiedTenseAspects: ['present_or_habitual'],
      verifiedPolarities: ['affirmative'],
      connectorFunctions: {},
      knownRoleCount: 2,
      factCount: 0,
      recentSuccessCount: 0,
      refreshDueCount: 0,
    ),
  );

  expect(lexical.growthMode, A1ProductGrowthMode.lexicalGrowth);
  expect(lexical.lesson!.growthTargetIds, isNotEmpty);
  expect(lexical.lesson!.supportTargetIds.length, lessThanOrEqualTo(1));
  expect(lexical.trace.join('\n'), contains('growthMode:lexicalGrowth'));

  final thoughtDepth = coordinator.createLesson(
    growthModeInput: const A1ProductGrowthModeInput(
      knownSupportLexemeCount: 36,
      availableHighPriorityLexicalGrowthCount: 20,
      recentLexicalGrowthCount: 2,
      verifiedPersons: ['1sg', '2sg', '3sg_m', '3sg_f'],
      verifiedTenseAspects: ['present_or_habitual', 'future', 'past'],
      verifiedPolarities: ['affirmative', 'negative'],
      connectorFunctions: {'reason'},
      knownRoleCount: 6,
      factCount: 3,
      recentSuccessCount: 3,
      refreshDueCount: 0,
    ),
  );

  expect(thoughtDepth.growthMode, A1ProductGrowthMode.thoughtDepthGrowth);
  expect(thoughtDepth.lesson!.growthTargetIds, isEmpty);
  expect(thoughtDepth.lesson!.supportTargetIds, isNotEmpty);
  expect(thoughtDepth.lesson!.grammarAxisIds, contains('reasoned_answer'));
  expect(thoughtDepth.trace.join('\n'), contains('growthMode.lexical_cap_reached'));
  expect(thoughtDepth.trace.join('\n'), contains('thoughtDepth.selected:claim_with_reason'));
});
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_growth_mode_policy_test.dart \
  test/a1_product_coordinator_growth_mode_arbitration_test.dart \
  test/a1_grammar_axis_policy_test.dart \
  test/a1_thought_depth_planner_test.dart \
  -r expanded
```

Expected: PASS. The coordinator must be able to explain when vocabulary growth caps out and why form, relation, composition, thought-depth, or refresh growth was selected instead.

- [x] **Step 14: Wire typed candidate generation and scoring into robust mode**

Extend `A1ProductCoordinator` with a robust generator collaborator. The first robust implementation may wrap `A1DialogueCandidateGenerator` plus `A1DialogueCandidateScoring`, but it must expose product trace:

```text
typedCandidate.generated:<count>
typedCandidate.selected:<candidateId>
typedCandidate.score:<score>
typedCandidate.blocked:<ownerCode>
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_dialogue_candidate_generator_test.dart \
  test/a1_dialogue_candidate_scoring_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart \
  -r expanded
```

Expected:

```text
typed_candidate_scoring participation is visible in the new coordinator trace
selected or blocked candidate cannot pass through bridge transcript or hardline arc catalog
first missing owner moves to propositionGraph, dialogueObligation, moveSequence, followUp, coherence, realizer, validator, or compiler
```

- [x] **Step 15: Wire graph, obligation, move sequence, and follow-up as robust-mode stages**

Prefer reusing `A1CoherentCandidateFactory.initial()` as the first robust generator spine if it can expose each stage. If it hides too much, wrap it with an adapter that returns stage-level trace and first owner codes without rewriting its internals.

Required trace:

```text
propositionGraph.observed:true
dialogueObligation.observed:true
moveSequencePlanner.observed:true
followUpPlanner.observed:true
```

Focused proof:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_coherent_candidate_factory_test.dart \
  test/a1_proposition_graph_test.dart \
  test/a1_dialogue_obligation_contract_test.dart \
  test/a1_dialogue_move_sequence_planner_test.dart \
  test/a1_follow_up_opportunity_planner_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart \
  -r expanded
```

Expected:

```text
robust mode either returns a ready lesson through graph/obligation/move/follow-up
or blocks with the first missing owner from one of those stages
```

- [x] **Step 16: Make coherence, realizer, validator, and materializer swappable coordinator collaborators**

Add constructor-injected collaborators for:

```text
coherence/scoring strategy
surface realizer
validator/preflight
product lesson materializer
```

Proof cases:

```text
fake coherence validator rejecting all -> result.ownerCode == coherence.fake_rejection
fake realizer producing unsupported placeholder -> result.ownerCode == realizer.unsupported_surface
fake validator rejecting required target -> result.ownerCode == validator.required_target_missing
fake materializer rejecting payload -> result.ownerCode == compilerMaterializer.fake_rejection
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_coherence_validator_test.dart \
  test/a1_surface_plan_realizer_test.dart \
  test/a1_compiler_materialization_audit_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart \
  -r expanded
```

Expected: PASS. Each fake must change only one injected collaborator and produce an owned blocker.

- [x] **Step 17: Add generator failure pressure and downgrade audit**

Create `packages/learning_core/lib/src/a1_product_generation_pressure_report.dart` and `packages/learning_core/test/a1_product_generator_failure_pressure_test.dart`.

The new coordinator must not treat "no lesson rendered" as one generic failure. It must expose whether the generator had too little usable material, produced material that later stages pruned, or could have rendered after a legitimate simplification. This is the safety valve that lets the product distinguish "add/repair metadata" from "relax a too-strict rule" from "fix a compiler/materializer gap."

Required pressure report shape:

```dart
enum A1ProductGenerationFailureClass {
  metadataScarcity,
  overconstrainedValidator,
  compilerGap,
  noViableFollowUp,
  memoryNotReady,
}

class A1ProductGenerationPressureReport {
  const A1ProductGenerationPressureReport({
    required this.candidateGeneratedCount,
    required this.prunedByStage,
    required this.failureClass,
    required this.firstOwner,
    required this.repairAttempted,
    required this.downgradeAttempted,
    required this.trace,
  });

  final int candidateGeneratedCount;
  final Map<String, int> prunedByStage;
  final A1ProductGenerationFailureClass failureClass;
  final String firstOwner;
  final bool repairAttempted;
  final bool downgradeAttempted;
  final List<String> trace;
}
```

Pressure tests:

```dart
test('classifies scarce metadata before blaming coherence', () {
  final report = A1ProductGenerationPressureReport(
    candidateGeneratedCount: 0,
    prunedByStage: const {},
    failureClass: A1ProductGenerationFailureClass.metadataScarcity,
    firstOwner: 'metadataReadiness.no_surface_ready_growth_target',
    repairAttempted: false,
    downgradeAttempted: false,
    trace: const [
      'generationPressure.failureClass:metadataScarcity',
      'generationPressure.firstOwner:metadataReadiness.no_surface_ready_growth_target',
    ],
  );

  expect(report.candidateGeneratedCount, 0);
  expect(report.failureClass, A1ProductGenerationFailureClass.metadataScarcity);
  expect(report.firstOwner, startsWith('metadataReadiness.'));
});

test('classifies over-constrained validation when candidates are generated then pruned', () {
  final report = A1ProductGenerationPressureReport(
    candidateGeneratedCount: 9,
    prunedByStage: const {
      'coherence': 2,
      'validator': 7,
    },
    failureClass: A1ProductGenerationFailureClass.overconstrainedValidator,
    firstOwner: 'validator.required_target_too_strict',
    repairAttempted: true,
    downgradeAttempted: true,
    trace: const [
      'generationPressure.candidateGeneratedCount:9',
      'generationPressure.pruned.validator:7',
      'generationPressure.failureClass:overconstrainedValidator',
      'generationPressure.repairAttempted:true',
      'generationPressure.downgradeAttempted:true',
    ],
  );

  expect(report.candidateGeneratedCount, greaterThan(0));
  expect(report.prunedByStage['validator'], 7);
  expect(report.failureClass, A1ProductGenerationFailureClass.overconstrainedValidator);
  expect(report.firstOwner, startsWith('validator.'));
  expect(report.repairAttempted, isTrue);
  expect(report.downgradeAttempted, isTrue);
});

test('records thought-depth downgrade when a higher rung cannot be safely rendered', () {
  final report = A1ProductGenerationPressureReport(
    candidateGeneratedCount: 4,
    prunedByStage: const {
      'followUp': 4,
    },
    failureClass: A1ProductGenerationFailureClass.noViableFollowUp,
    firstOwner: 'followUp.reason_connector_missing',
    repairAttempted: true,
    downgradeAttempted: true,
    trace: const [
      'growthMode.requested:thoughtDepthGrowth',
      'generationPressure.downgrade:simplify_thought_depth',
      'generationPressure.firstOwner:followUp.reason_connector_missing',
    ],
  );

  expect(report.failureClass, A1ProductGenerationFailureClass.noViableFollowUp);
  expect(report.trace, contains('generationPressure.downgrade:simplify_thought_depth'));
});
```

Coordinator proof cases:

```text
scarcity case:
  input has a growth target with no production-ready surface
  result is blocked
  pressureReport.failureClass == metadataScarcity
  result.ownerCode starts with metadataReadiness.
  no legacy fallback is attempted

over-constraint case:
  input produces multiple candidates
  fake validator rejects all required-target variants
  pressureReport.candidateGeneratedCount > 0
  pressureReport.prunedByStage.validator > 0
  pressureReport.failureClass == overconstrainedValidator
  result.ownerCode starts with validator.
  no legacy fallback is attempted

downgrade case:
  requested growth mode is thoughtDepthGrowth with claim_with_reason
  reason connector/follow-up is unavailable
  coordinator attempts simplify_thought_depth
  if simpler candidate renders, result is ready and trace includes repairAttempted:true
  if simpler candidate cannot render, result is blocked with first owner
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_generator_failure_pressure_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart \
  -r expanded
```

Expected: PASS. If generation cannot produce a lesson, the report must identify scarcity, over-constraint, compiler gap, missing follow-up, or memory readiness with candidate counts, pruned stages, repair/downgrade attempts, and first owner. A passing proof that calls an old arc, bridge transcript, seed/routine fallback, or generic prompt fallback is invalid.

- [ ] **Step 18: Wire the new coordinator into the app-path audit through explicit injection**

Modify `apps/mobile/lib/features/practice/focus_mastery_plan_gateway.dart` only after core coordinator bootstrap tests pass. Add a constructor path that can accept an `A1ProductCoordinator` for normal A1 Focus while leaving the old `FocusCoordinator` available for `legacyComparison`.

Modify `apps/mobile/test/a1_product_path_participation_audit_test.dart` so the injected product-coordinator proof observes:

```text
production_manifest_source
generation_mode_policy
bootstrap_generator
compiler_materializer
ui_readiness
memory_writeback_evidence
next_lesson_memory_consumption
legacy_fallback_absent
```

Run:

```bash
cd apps/mobile
/private/tmp/flutter-stable/bin/flutter test --no-pub \
  test/content_loading_test.dart \
  test/a1_product_path_participation_audit_test.dart \
  -r expanded
```

Expected: PASS. The default app path may still be old coordinator until the product coordinator can complete typed bootstrap, but the injected product path must be product-proof eligible and no-legacy.

- [ ] **Step 19: Add long-run backend product proof through the new coordinator**

Create `apps/mobile/test/a1_long_run_product_path_audit_test.dart`.

The test must run the product backend path repeatedly through `FocusMasteryPlanGateway.start(mode: mainFocus)` with the new coordinator injected, then apply completion evidence writes. Start with a 30-lesson proof; add a slower 100-lesson proof only if runtime remains acceptable.

Expected printed fields for every lesson:

```text
lesson index
generation mode
growth mode
selected rung
primary island
growth targets
support targets
grammar axes
component participation ledger
blocked owner codes
generation pressure report
full final conversation
writeback facts
next consumed facts
productProofEligible
legacyComparison.used
```

Passing minimum:

```text
30 starts either render or stop with first owner
no metadata_backed_profile_bridge
no hardline arc catalog/instantiator
no legacy seed/routine fallback
production metadata source observed
generation mode policy observed
typed bootstrap observed from A1BootstrapCandidateFactory
growth-mode arbitration observed on every ready or blocked row
memory writeback and next consumption observed after the first completion
no exact transcript repeat
same-shape loop reported as owned repetition/staleness blocker
no blocked row lacks generation pressure classification
```

Run:

```bash
cd apps/mobile
/private/tmp/flutter-stable/bin/flutter test --no-pub \
  test/a1_long_run_product_path_audit_test.dart \
  --concurrency=1 \
  -r expanded
```

- [ ] **Step 20: Add limited-vocabulary stress lane for the new coordinator**

Create `packages/learning_core/test/a1_limited_vocabulary_product_path_stress_test.dart`.

Use a compact, high-quality starter-like source with a small word set and strong metadata. The test must prove complexity growth does not depend only on having a large vocabulary pool.

Expected movement across the run:

```text
person/pronoun: first person and at least one non-first-person eligible form when metadata allows
tense/aspect: present and future, plus past only when reviewed metadata allows
polarity: positive and negative only when negative forms are production-ready
connectors: at least one reason/sequence/contrast connector
definiteness: definite and indefinite forms when surfaces exist
thought depth: at least two different obligation or move-sequence families
islands: at least three islands when the fixture contains them
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_limited_vocabulary_product_path_stress_test.dart \
  -r expanded
```

Expected: PASS or first owner explains the missing axis. Do not solve a limited-vocabulary failure by only adding more words.

- [ ] **Step 21: Update the audit report, spec, and plan with the product-path result**

Update:

- `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`
- `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- this plan

Required report shape:

```text
green components
yellow components with product behavior but weak output quality
red components not participating
first blocker owner for the longest run
whether JSON-derived metadata reached parity with starter-like Dart metadata
whether the new A1 product coordinator can generate 30 lessons through the injected app path
whether growth-mode arbitration moved from lexical growth to form/relation/composition/thought-depth growth when memory supported it
whether generator failures classify scarcity, over-constraint, compiler gaps, follow-up gaps, or memory readiness instead of falling back silently
whether the same path could plausibly continue indefinitely
whether the old FocusCoordinator was used only for legacy comparison
remaining repairs before AI augmentation
remaining repairs before UI reattachment
```

Verification:

```bash
git diff --check -- \
  docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md
```

Expected: no whitespace errors.

**Task 22P exit criteria:**

- new `A1ProductCoordinator` or `A1ProductSpineCoordinator` exists behind a clean contract;
- passing product proofs do not call old hardline A1 arc catalog/instantiator, bridge harnesses, or legacy seed/routine fallback;
- production metadata reaches the app-path backend through an adapter or reports the first parity blocker;
- generation mode policy is observed in app-path traces;
- growth-mode arbitration is observed and can explain lexical growth, form growth, relation growth, composition growth, thought-depth growth, refresh, or owned blockers;
- when vocabulary growth is capped by recent load or sufficient support memory, the coordinator selects a rung/form/thought growth path instead of adding another noun;
- generator failures expose candidate counts, pruned stages, repair/downgrade attempts, a first owner, and a failure class instead of using a generic fallback;
- typed bootstrap is produced by `A1BootstrapCandidateFactory` through the new coordinator and writes memory that the next lesson consumes;
- robust generation either participates through typed candidate scoring, graph, obligation, move sequence, follow-up, coherence/scoring, realizer, validator, and compiler, or reports the first missing owner;
- long-run backend product proof can render many lessons or stop with an owned blocker;
- final lesson payloads are UI-ready, even if UI interaction polish remains separate;
- old bridge and legacy fallback paths are absent from passing product proofs;
- deterministic output may still be plain, but the system demonstrates vocabulary, rung, grammar-axis, connector, thought-depth, and island movement before AI augmentation.

## Task 22Q: First-Class Product Lesson Compiler Contract

**Purpose:** Replace the thin product materializer / old compiler-preflight gap with a first-class `A1ProductLessonCompiler` boundary. The compiler must convert a selected bootstrap or robust product candidate into a UI-ready lesson package plus proof/writeback contract, or fail closed with an owned compiler blocker. It must not call the old `FocusCoordinator`, hardline A1 arc catalog/instantiator, metadata-backed bridge, seed/routine fallback, or parse product meaning out of transcript strings.

**Audit finding addressed:** the current product coordinator can reach coherent robust candidate selection but stops at `compilerMaterializer.not_wired`. The app path still has old compiler/materializer assumptions. Without a first-class compiler, the system can look coherent in backend tests while remaining unable to render, prove, write, and reload a real lesson.

**Implementation result:** Task 22Q backend slice is implemented. `A1ProductLessonCompiler` now rejects transcript-only input, compiles bootstrap typed plans and robust dialogue candidates into `A1CompiledLessonPackage`, emits UI stages, proof contract, memory writeback contract, metadata source IDs, and route fingerprints, and is wired into `A1ProductCoordinator`. A seeded typed-composition backend path now compiles instead of stopping at `compilerMaterializer.not_wired`. Remaining product work is the mobile session/UI adapter and repository read-projection parity for the compiled package.

**Architecture rule:** generator chooses; compiler proves, packages, or rejects. The compiler may normalize IDs, assemble stages, and validate contract completeness. It may not choose a different route, add hidden growth targets, invent semantic facts, synthesize unverified Egyptian Arabic forms, or use a legacy materializer to make a candidate render.

**Files:**

- Create: `packages/learning_core/lib/src/a1_product_lesson_compiler.dart`
- Create: `packages/learning_core/test/a1_product_lesson_compiler_contract_test.dart`
- Modify: `packages/learning_core/lib/src/a1_product_coordinator.dart`
- Modify: `packages/learning_core/lib/src/a1_product_coordinator_contract.dart`
- Modify: `packages/learning_core/lib/src/a1_product_lesson_materializer.dart`
- Modify: `packages/learning_core/lib/src/a1_product_robust_candidate_generator.dart` only if selected robust results are too thin for compilation
- Modify: `packages/learning_core/lib/src/a1_product_stage_collaborators.dart`
- Modify: `packages/learning_core/lib/src/a1_compiler_preflight.dart` only to mark old preflight as legacy comparison or retire it from product proof
- Modify: `packages/learning_core/lib/learning_core.dart`
- Test: `packages/learning_core/test/a1_product_coordinator_bootstrap_test.dart`
- Test: `packages/learning_core/test/a1_product_coordinator_composition_gate_test.dart`
- Test: `packages/learning_core/test/a1_semantic_memory_writeback_contract_test.dart`

**Compiler input contract:**

```text
A1ProductLessonCompilerInput
  generationMode
  growthMode
  selected typed bootstrap plan or selected robust candidate
  selected candidate score and score terms
  surface realization result, when available
  proposition graph fingerprint
  dialogue obligation ids
  dialogue move-sequence id and move ids
  follow-up opportunity ids, when present
  target bundle ids: support, growth, refresh, shape, grammar
  semantic role ids
  semantic fact ids
  required metadata ids and metadata source id
  route/frame/fingerprint ids
  recent route/fingerprint context
  memory profile snapshot ids
```

**Compiler output contract:**

```text
A1CompiledLessonPackage
  product lesson payload
  UI stages with stable stage ids
  transcript turns with stable turn ids
  expected learner action ids
  bounded typing box ids, when used
  final conversation stage id
  A1LessonProofContract-compatible proof data
  memory writeback contract
  source metadata ids
  route/frame/fingerprint ids
  compiler trace
```

**Required compiler blockers:**

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

- [x] **Step 1: Write failing compiler contract tests**

Create `packages/learning_core/test/a1_product_lesson_compiler_contract_test.dart` with tests that define the boundary before implementation.

Required test cases:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1ProductLessonCompiler contract', () {
    test('rejects selected robust candidate when proof contract data is missing', () {
      final compiler = A1ProductLessonCompiler.defaults();
      final result = compiler.compile(
        A1ProductLessonCompilerInput.robust(
          generationMode: A1GenerationMode.typedComposition,
          growthMode: A1ProductGrowthMode.compositionGrowth,
          candidate: A1ProductCompilerFixtures.robustCandidate(
            candidateId: 'candidate.missing_proof',
            semanticFacts: const [],
            growthTargetIds: const ['predicate.study'],
            supportTargetIds: const ['time.today'],
            requiredCompilerStageIds: const ['finalConversation'],
          ),
          metadataSourceId: 'egyptian_arabic.a1.production.v1',
          trace: const ['typedCandidate.selected:candidate.missing_proof'],
        ),
      );

      expect(result.isReady, isFalse);
      expect(result.ownerCode, 'compiler.proof_contract_missing');
      expect(result.trace, contains('compiler.blocked:compiler.proof_contract_missing'));
      expect(result.package, isNull);
    });

    test('rejects transcript-only input as unstructured', () {
      final compiler = A1ProductLessonCompiler.defaults();
      final result = compiler.compile(
        A1ProductLessonCompilerInput.transcriptOnlyForTest(
          visibleTranscript: 'Tutor: emta?\\nLearner: bukra.',
          metadataSourceId: 'egyptian_arabic.a1.production.v1',
        ),
      );

      expect(result.isReady, isFalse);
      expect(result.ownerCode, 'compiler.structured_input_missing');
      expect(result.package, isNull);
    });

    test('compiles bootstrap typed plan with UI stages and writeback contract', () {
      final compiler = A1ProductLessonCompiler.defaults();
      final plan = A1BootstrapCandidateFactory.defaults().generate(
        memoryProfile: A1TypedMemoryProfile.empty(),
        recentLessonFingerprints: const [],
      );

      final result = compiler.compile(
        A1ProductLessonCompilerInput.bootstrap(
          generationMode: A1GenerationMode.typedBootstrap,
          growthMode: A1ProductGrowthMode.lexicalGrowth,
          typedPlan: plan,
          metadataSourceId: 'egyptian_arabic.a1.production.v1',
        ),
      );

      expect(result.isReady, isTrue);
      expect(result.package!.payload.visibleTranscript, contains('Tutor:'));
      expect(result.package!.uiStages.map((stage) => stage.stageId),
          contains('finalConversation'));
      expect(result.package!.proofContract.canonicalProofTargetIds, isNotEmpty);
      expect(result.package!.memoryWritebackContract.semanticFactTargetIds,
          isNotEmpty);
      expect(result.trace, contains('compiler.ready:true'));
      expect(result.trace, isNot(contains('legacyComparison.used:true')));
    });

    test('compiles robust candidate without calling legacy materializer', () {
      final compiler = A1ProductLessonCompiler.defaults();
      final result = compiler.compile(
        A1ProductLessonCompilerInput.robust(
          generationMode: A1GenerationMode.typedComposition,
          growthMode: A1ProductGrowthMode.thoughtDepthGrowth,
          candidate: A1ProductCompilerFixtures.robustCandidate(
            candidateId: 'candidate.study.tomorrow.reason',
            semanticFacts: const [
              'fact.study.self.time.tomorrow',
              'fact.work.self.time.today',
            ],
            growthTargetIds: const ['time.tomorrow'],
            supportTargetIds: const ['predicate.study', 'time.today'],
            grammarAxisIds: const ['1sg', '2sg', 'future', 'reasoned_answer'],
            requiredCompilerStageIds: const ['finalConversation'],
            routeFrameId: 'route_frame.daily_activity_time',
            relationSequenceFingerprint: 'relation.reason.v1',
            secondHalfShapeFingerprint: 'shape.when_then_reason.v1',
          ),
          metadataSourceId: 'egyptian_arabic.a1.production.v1',
          trace: const [
            'propositionGraph.observed:true',
            'dialogueObligation.observed:true',
            'moveSequencePlanner.observed:true',
            'followUpPlanner.observed:true',
            'typedCandidate.selected:candidate.study.tomorrow.reason',
          ],
        ),
      );

      expect(result.isReady, isTrue);
      expect(result.package!.payload.generationMode,
          A1GenerationMode.typedComposition);
      expect(result.package!.payload.growthMode,
          A1ProductGrowthMode.thoughtDepthGrowth);
      expect(result.package!.payload.writebackFactIds,
          contains('fact.study.self.time.tomorrow'));
      expect(result.package!.proofContract
          .semanticFactTargetIdsByCanonicalTargetId.values
          .expand((ids) => ids), contains('fact.work.self.time.today'));
      expect(result.package!.routeFingerprintIds,
          contains('shape.when_then_reason.v1'));
      expect(result.trace, contains('compiler.legacyMaterializerAttempted:false'));
    });
  });
}
```

The fixture helpers may live in the same test file until a second test file needs them. They must build real `A1DialogueCandidate` objects with complete constructor fields rather than using maps or transcript parsing.

- [x] **Step 2: Run compiler contract tests and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_lesson_compiler_contract_test.dart \
  -r expanded
```

Expected: FAIL because `A1ProductLessonCompiler`, `A1ProductLessonCompilerInput`, `A1CompiledLessonPackage`, and fixture helpers do not exist yet.

- [x] **Step 3: Add compiler result and package models**

Create `packages/learning_core/lib/src/a1_product_lesson_compiler.dart` with focused types. Keep them in one file for this task unless it becomes too large after implementation.

Required public shape:

```dart
import 'a1_dialogue_candidate_generator.dart';
import 'a1_generation_mode_policy.dart';
import 'a1_lesson_proof_contract.dart';
import 'a1_product_coordinator_contract.dart';
import 'a1_typed_generation_router.dart';

final class A1ProductLessonCompiler {
  const A1ProductLessonCompiler();

  factory A1ProductLessonCompiler.defaults() =>
      const A1ProductLessonCompiler();

  A1ProductLessonCompilerResult compile(A1ProductLessonCompilerInput input) {
    throw UnimplementedError();
  }
}

sealed class A1ProductLessonCompilerInput {
  const A1ProductLessonCompilerInput._({
    required this.generationMode,
    required this.growthMode,
    required this.metadataSourceId,
    required this.trace,
    this.typedPlan,
    this.candidate,
    this.visibleTranscriptOnly = '',
  });

  const factory A1ProductLessonCompilerInput.bootstrap({
    required A1GenerationMode generationMode,
    required A1ProductGrowthMode growthMode,
    required A1TypedLessonPlan typedPlan,
    required String metadataSourceId,
    List<String> trace,
  }) = A1BootstrapCompilerInput;

  const factory A1ProductLessonCompilerInput.robust({
    required A1GenerationMode generationMode,
    required A1ProductGrowthMode growthMode,
    required A1DialogueCandidate candidate,
    required String metadataSourceId,
    List<String> trace,
  }) = A1RobustCompilerInput;

  const factory A1ProductLessonCompilerInput.transcriptOnlyForTest({
    required String visibleTranscript,
    required String metadataSourceId,
  }) = A1TranscriptOnlyCompilerInput;

  final A1GenerationMode generationMode;
  final A1ProductGrowthMode growthMode;
  final String metadataSourceId;
  final List<String> trace;
  final A1TypedLessonPlan? typedPlan;
  final A1DialogueCandidate? candidate;
  final String visibleTranscriptOnly;
}

final class A1BootstrapCompilerInput extends A1ProductLessonCompilerInput {
  const A1BootstrapCompilerInput({
    required A1GenerationMode generationMode,
    required A1ProductGrowthMode growthMode,
    required A1TypedLessonPlan typedPlan,
    required String metadataSourceId,
    List<String> trace = const [],
  }) : super._(
          generationMode: generationMode,
          growthMode: growthMode,
          typedPlan: typedPlan,
          metadataSourceId: metadataSourceId,
          trace: trace,
        );
}

final class A1RobustCompilerInput extends A1ProductLessonCompilerInput {
  const A1RobustCompilerInput({
    required A1GenerationMode generationMode,
    required A1ProductGrowthMode growthMode,
    required A1DialogueCandidate candidate,
    required String metadataSourceId,
    List<String> trace = const [],
  }) : super._(
          generationMode: generationMode,
          growthMode: growthMode,
          candidate: candidate,
          metadataSourceId: metadataSourceId,
          trace: trace,
        );
}

final class A1TranscriptOnlyCompilerInput extends A1ProductLessonCompilerInput {
  const A1TranscriptOnlyCompilerInput({
    required String visibleTranscript,
    required String metadataSourceId,
  }) : super._(
          generationMode: A1GenerationMode.blocked,
          growthMode: A1ProductGrowthMode.blocked,
          metadataSourceId: metadataSourceId,
          trace: const ['compiler.input:transcriptOnly'],
          visibleTranscriptOnly: visibleTranscript,
        );
}

final class A1ProductLessonCompilerResult {
  const A1ProductLessonCompilerResult._({
    required this.ownerCode,
    required this.trace,
    this.package,
  });

  const A1ProductLessonCompilerResult.ready({
    required A1CompiledLessonPackage package,
    required List<String> trace,
  }) : this._(
          ownerCode: '',
          package: package,
          trace: trace,
        );

  const A1ProductLessonCompilerResult.blocked({
    required String ownerCode,
    required List<String> trace,
  }) : this._(
          ownerCode: ownerCode,
          trace: trace,
        );

  final String ownerCode;
  final List<String> trace;
  final A1CompiledLessonPackage? package;

  bool get isReady => package != null && ownerCode.isEmpty;
}

final class A1CompiledLessonPackage {
  const A1CompiledLessonPackage({
    required this.payload,
    required this.uiStages,
    required this.proofContract,
    required this.memoryWritebackContract,
    required this.metadataSourceIds,
    required this.routeFingerprintIds,
  });

  final A1ProductLessonPayload payload;
  final List<A1CompiledLessonStage> uiStages;
  final A1LessonProofContract proofContract;
  final A1CompiledMemoryWritebackContract memoryWritebackContract;
  final List<String> metadataSourceIds;
  final List<String> routeFingerprintIds;
}

final class A1CompiledMemoryWritebackContract {
  const A1CompiledMemoryWritebackContract({
    required this.finalProofTargetIds,
    required this.supportOnlyTargetIds,
    required this.exposureOnlyTargetIds,
    required this.tutorOnlyExposureTargetIds,
    required this.semanticRoleTargetIds,
    required this.semanticFactTargetIds,
    required this.grammarTargetIds,
    required this.routeFingerprintIds,
    required this.evidenceKindByTargetId,
  });

  final List<String> finalProofTargetIds;
  final List<String> supportOnlyTargetIds;
  final List<String> exposureOnlyTargetIds;
  final List<String> tutorOnlyExposureTargetIds;
  final List<String> semanticRoleTargetIds;
  final List<String> semanticFactTargetIds;
  final List<String> grammarTargetIds;
  final List<String> routeFingerprintIds;
  final Map<String, String> evidenceKindByTargetId;
}

final class A1CompiledLessonStage {
  const A1CompiledLessonStage({
    required this.stageId,
    required this.stageType,
    required this.turns,
    required this.proofEligibleTargetIds,
    required this.exposureOnlyTargetIds,
    required this.supportOnlyTargetIds,
    required this.boundedTypingBoxIds,
  });

  final String stageId;
  final String stageType;
  final List<A1CompiledLessonTurn> turns;
  final List<String> proofEligibleTargetIds;
  final List<String> exposureOnlyTargetIds;
  final List<String> supportOnlyTargetIds;
  final List<String> boundedTypingBoxIds;
}

final class A1CompiledLessonTurn {
  const A1CompiledLessonTurn({
    required this.turnId,
    required this.speaker,
    required this.text,
    required this.targetIds,
  });

  final String turnId;
  final String speaker;
  final String text;
  final List<String> targetIds;
}
```

Add exports in `packages/learning_core/lib/learning_core.dart`.

- [x] **Step 4: Run tests to verify model names compile but behavior still fails**

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_lesson_compiler_contract_test.dart \
  -r expanded
```

Expected: FAIL from `UnimplementedError` or missing fixture helpers, not from missing public compiler types.

- [x] **Step 5: Implement fail-closed input validation**

Implement the first `compile` branches:

```dart
if (input is A1TranscriptOnlyCompilerInput) {
  return A1ProductLessonCompilerResult.blocked(
    ownerCode: 'compiler.structured_input_missing',
    trace: [
      ...input.trace,
      'compiler.blocked:compiler.structured_input_missing',
      'compiler.legacyMaterializerAttempted:false',
    ],
  );
}
if (input.metadataSourceId.trim().isEmpty) {
  return A1ProductLessonCompilerResult.blocked(
    ownerCode: 'compiler.metadata_source_missing',
    trace: [
      ...input.trace,
      'compiler.blocked:compiler.metadata_source_missing',
      'compiler.legacyMaterializerAttempted:false',
    ],
  );
}
```

For robust inputs, reject missing proof fields before constructing a package:

```text
candidate.requiredCompilerStageIds must contain finalConversation
candidate.semanticFacts must be nonempty
candidate.growthTargetIds or supportTargetIds must be nonempty
candidate.relationSequenceFingerprint or secondHalfShapeFingerprint must be nonempty
```

Map failures to the required compiler blocker codes.

- [x] **Step 6: Implement bootstrap compilation**

Move the useful logic from `A1ProductLessonMaterializer.materialize(A1TypedLessonPlan...)` into the compiler or make the old materializer a thin wrapper over the new compiler. Bootstrap compilation must produce:

```text
A1ProductLessonPayload
one or more UI stages
finalConversation stage
A1LessonProofContract-compatible target data
A1CompiledMemoryWritebackContract
metadata source id
visible and semantic fingerprints
compiler.ready:true trace
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_lesson_compiler_contract_test.dart \
  test/a1_product_coordinator_bootstrap_test.dart \
  -r expanded
```

Expected: bootstrap compiler test passes; robust compiler test may still fail until Step 7.

- [x] **Step 7: Implement robust candidate compilation**

Compile from `A1DialogueCandidate`, not from transcript text. The first robust compiler may use deterministic stage assembly:

```text
goalConversation: tutor/learner turns derived from candidate.turns or realized turns
boundedTyping: only when grammar/form targets exist
finalConversation: required for product proof
```

Required mappings:

```text
candidate.semanticFacts -> payload.writebackFactIds and proof semantic facts
candidate.supportTargetIds -> support-only/proof support roles
candidate.growthTargetIds -> proof-eligible growth roles unless explicitly support-only
candidate.shapeTargetIds -> route/fingerprint/progress targets
candidate.operationIds -> route/fingerprint/progress targets
candidate.dialogueObligationIds -> route/fingerprint/progress targets
candidate.dialogueMoveIds -> route/fingerprint/progress targets
candidate.requiredMetadataIds + input.metadataSourceId -> metadataSourceIds
candidate.relationSequenceFingerprint + candidate.secondHalfShapeFingerprint -> routeFingerprintIds
candidate.requiredSurfaceCells -> grammar/form readiness trace
```

If a candidate requires a verified form that cannot be represented by the compiler input, return `compiler.verified_form_missing`.

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_lesson_compiler_contract_test.dart \
  -r expanded
```

Expected: PASS.

- [x] **Step 8: Wire `A1ProductCoordinator` to use the compiler package**

Modify `A1ProductCoordinator` so bootstrap and robust paths depend on `A1ProductLessonCompiler` or a compiler interface. Remove `compilerMaterializer.not_wired` as the normal result after a coherent robust candidate is selected.

Expected result behavior:

```text
bootstrap ready -> compiler package ready -> productProofEligible true
robust selected + complete compile data -> compiler package ready
robust selected + missing proof/writeback/stage data -> compiler.* owner blocker
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_coordinator_bootstrap_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart \
  test/a1_product_lesson_compiler_contract_test.dart \
  -r expanded
```

Expected: PASS. If existing composition-gate assertions expected `compilerMaterializer.not_wired`, update them to the new owned compiler result that matches the current candidate data.

- [x] **Step 9: Add no-legacy compiler guard**

Add a test in `packages/learning_core/test/a1_product_lesson_compiler_contract_test.dart` that scans the compiler file and fails if it imports or references old materializers:

```dart
import 'dart:io';

test('compiler does not call legacy coordinator or hardline arc materializer', () {
  final source = File('lib/src/a1_product_lesson_compiler.dart').readAsStringSync();

  expect(source, isNot(contains('FocusCoordinator')));
  expect(source, isNot(contains('A1ConversationArcCatalog')));
  expect(source, isNot(contains('A1ConversationArcInstantiator')));
  expect(source, isNot(contains('A1MetadataBackedCandidateHarness')));
  expect(source, isNot(contains('seed/routine')));
});
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_lesson_compiler_contract_test.dart \
  -r expanded
```

Expected: PASS.

- [x] **Step 10: Add compiler writeback parity proof**

Extend `packages/learning_core/test/a1_semantic_memory_writeback_contract_test.dart` or create a focused assertion in `a1_product_lesson_compiler_contract_test.dart` proving compiled package IDs line up:

```text
payload.growthTargetIds are present in proof or support/exposure role maps
payload.supportTargetIds are present as support-only or stage targets
payload.writebackFactIds are present in memoryWritebackContract.semanticFactTargetIds
finalConversation stage proof targets match proofContract.canonicalProofTargetIds
routeFingerprintIds are nonempty for robust composition
metadataSourceIds include the production source id
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_lesson_compiler_contract_test.dart \
  test/a1_semantic_memory_writeback_contract_test.dart \
  -r expanded
```

Expected: PASS.

- [x] **Step 11: Analyzer and focused product coordinator verification**

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart analyze \
  lib/src/a1_product_lesson_compiler.dart \
  lib/src/a1_product_coordinator.dart \
  lib/src/a1_product_coordinator_contract.dart \
  lib/src/a1_product_lesson_materializer.dart \
  lib/src/a1_product_stage_collaborators.dart \
  test/a1_product_lesson_compiler_contract_test.dart \
  test/a1_product_coordinator_bootstrap_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart

/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_lesson_compiler_contract_test.dart \
  test/a1_product_coordinator_bootstrap_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart \
  test/a1_product_generator_failure_pressure_test.dart \
  -r expanded
```

Expected: analyzer reports no issues; focused tests pass.

- [x] **Step 12: Update product audit docs with compiler result**

Update:

- `docs/superpowers/audits/2026-06-05-product-behavior-map.md`
- `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- this plan

Record:

```text
whether robust composition still blocks at compiler
which compiler blocker appears first, if blocked
whether compiled package carries proof/writeback/UI stages
whether bootstrap and robust use the same compiler boundary
whether any legacy materializer was attempted
which memory projection parity gap remains before app path wiring
```

- [ ] **Step 13: Commit Task 22Q**

```bash
git add \
  packages/learning_core/lib/src/a1_product_lesson_compiler.dart \
  packages/learning_core/lib/src/a1_product_coordinator.dart \
  packages/learning_core/lib/src/a1_product_coordinator_contract.dart \
  packages/learning_core/lib/src/a1_product_lesson_materializer.dart \
  packages/learning_core/lib/src/a1_product_robust_candidate_generator.dart \
  packages/learning_core/lib/src/a1_product_stage_collaborators.dart \
  packages/learning_core/lib/src/a1_compiler_preflight.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_product_lesson_compiler_contract_test.dart \
  packages/learning_core/test/a1_product_coordinator_bootstrap_test.dart \
  packages/learning_core/test/a1_product_coordinator_composition_gate_test.dart \
  packages/learning_core/test/a1_semantic_memory_writeback_contract_test.dart \
  docs/superpowers/audits/2026-06-05-product-behavior-map.md \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md
git commit -m "feat: add first-class A1 product lesson compiler"
```

**Task 22Q exit criteria:**

- `A1ProductLessonCompiler` exists as the only product compiler boundary for bootstrap and robust candidates.
- A selected robust candidate no longer stops at `compilerMaterializer.not_wired`; it either compiles or returns a specific `compiler.*` owner.
- The compiler emits UI stages, final conversation stage, proof contract, memory writeback contract, metadata source IDs, and route/fingerprint IDs.
- The compiler rejects transcript-only input.
- The compiler fails closed on missing proof, writeback, final stage, semantic facts, metadata source, verified forms, or route fingerprints.
- The compiler does not import or call `FocusCoordinator`, hardline A1 arc catalog/instantiator, metadata-backed bridge, seed/routine fallback, or old app materializer rescue paths.
- Bootstrap and robust generation share the same compiler package shape.
- Focused tests prove local compilation, coordinator integration, no legacy compiler rescue, and proof/writeback ID parity.

## Task 22R: Product Spine Progression Audit Harness

**Purpose:** Add a repeatable diagnostic harness that runs the first-class product coordinator/compiler loop across multiple learner states, simulates completion from the compiler proof/writeback contract, reloads projected memory, and prints a readable report showing why lessons advance, repeat, block, or fail to consume written memory.

**Audit finding addressed:** Task 22Q moved the first blocker from backend compiler materialization to product-path progression. The next risk is that the backend can compile one lesson but cannot show whether memory writes affect later lessons, whether growth-mode policy balances lexical/form/thought-depth expansion, whether route diversity saturates, or whether strict rules stop generation without a clear owner. This task creates the debugging harness before the UI adapter becomes the final proof.

**Implementation result:** Task 22R is implemented. `A1ProductSpineProgressionAudit` now runs the product coordinator/compiler loop, requires `A1CompiledLessonPackage`, simulates completion from compiler proof/writeback contracts, reloads an audit memory projection, diagnoses raw-write/projected-read mismatches, and renders a Markdown report with full conversations, memory ledger rows, growth-mode decisions, transition diagnostics, diversity/saturation, blocker pressure, and fallback status. The command-line tool at `packages/learning_core/tool/a1_product_spine_progression_audit.dart` generated a 40-lesson brand-new learner report at `docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md`. CLI smoke checks also generated all five scenario reports to `/tmp`. The long-run diagnostic now shows the current product blocker clearly: after adding a sixth bootstrap predicate frame, growth policy advances to `relationGrowth` at lesson 9 and generation exits bootstrap at lesson 13 with the first non-bootstrap route also at lesson 13. The compiler now materializes contextual typed-composition move sequences, and typed composition now honors recent route fingerprints. The current report records no repeated transcript/route, then stops before lesson 15 with `arcCoherence.same_route_stale_repeat`. The remaining blocker is post-graduation route capacity: the product likely needs route-capacity-aware graduation plus a richer contextual bootstrap/starter tier so the learner keeps receiving safe varied lessons until typed composition can prove enough valid, non-repeating, renderable candidates. This remains backend simulated completion; real mobile session hydration and repository projection parity are still next.

**Files:**

- Create: `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- Create: `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`
- Create: `packages/learning_core/tool/a1_product_spine_progression_audit.dart`
- Modify: `packages/learning_core/lib/src/a1_product_coordinator_contract.dart`

## Task 22S: Typed Composition Saved-Memory Readiness Sweep

**Purpose:** Determine the practical saved-memory floor for typed composition by starting from a rich saved-memory seed, then descending through thinner saved-memory states while separating the current policy gate from forced route-capacity probes.

**Audit finding addressed:** Task 22R proved the product spine can graduate into typed composition, but it did not answer whether the current saved-memory threshold is actually enough for sustained meaningful composition. The system needs to know whether typed composition fails because saved memory is too thin, because policy graduates too early, because route capacity is too small, or because compiler surface selection is reading the wrong memory focus.

**Implementation result:** Task 22S is implemented. `A1TypedCompositionReadinessSweep` seeds descending saved-memory profiles from an oversized current-hook coverage seed down to a three-fact study-only cluster. For each seed it reports the current policy mode using derived readiness, then forces typed-composition readiness to test route capacity from exactly those saved facts. The CLI at `packages/learning_core/tool/a1_typed_composition_readiness_sweep.dart` generated `docs/superpowers/audits/2026-06-05-a1-typed-composition-readiness-sweep.md`. The current finding is that no seed satisfies the 6-lesson meaningful floor. The rich 32-fact saved-memory seed is strongest and covers 10 seed islands, 10 predicate frames, 17 role classes, and 5 reason-compatible pairs, but it still produces only 5 clean typed-composition lessons, touches only 3 output islands, and blocks with `arcCoherence.question_focus_unanswered`. The older full 12-fact saved-memory seed also produces 5 clean lessons before `arcCoherence.same_route_stale_repeat`; lower seeds can probe 3-5 lessons only when forced, and current policy keeps them in bootstrap. The sweep also exposed and pinned a compiler focus bug where broad saved memory could make a possession/use route render as a study/need exchange; the compiler now prioritizes selected candidate focus over unrelated saved facts.

**Files:**

- Create: `packages/learning_core/lib/src/a1_typed_composition_readiness_sweep.dart`
- Create: `packages/learning_core/test/a1_typed_composition_readiness_sweep_test.dart`
- Create: `packages/learning_core/tool/a1_typed_composition_readiness_sweep.dart`
- Create: `docs/superpowers/audits/2026-06-05-a1-typed-composition-readiness-sweep.md`
- Modify: `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- Modify: `packages/learning_core/lib/src/a1_product_lesson_compiler.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`

**Next handoff:** Do not lower the current typed-composition policy gate yet. The sweep says saved-memory ingestion works, including rich histories, but the route pool and candidate/coherence/compiler coverage are too shallow for typed composition to become the main lane. The next implementation task is Task 22T: harvest the working product behaviors from the legacy arc generator into typed route-packet, move-sequence, surface-realization, coherence, and liveliness contracts without reintroducing the legacy arc generator as a product fallback. A richer contextual bootstrap tier can still follow, but only after typed composition has a clearer route-capacity target and owned blockers.
- Modify: `packages/learning_core/lib/src/a1_product_coordinator.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `packages/learning_core/test/a1_product_coordinator_bootstrap_test.dart`
- Modify: `packages/learning_core/test/a1_product_coordinator_composition_gate_test.dart`
- Modify: `docs/superpowers/audits/2026-06-05-product-behavior-map.md`
- Modify: `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- Modify: this plan

**Harness contract:**

```text
A1ProductSpineProgressionAudit
  scenario preset
  requested lesson count
  metadata lane / vocabulary lane label
  starting memory state
  product coordinator
  growth-mode input strategy
  typed-readiness strategy
  audit memory store
  no-legacy assertion
  report renderer

Loop:
  project memory -> create lesson -> require compiled package
  -> simulate completion from compiled package proof/writeback contract
  -> write audit memory
  -> reload/project memory
  -> record whether lesson N+1 consumed lesson N memory
```

**Report contract:**

```text
A1ProductSpineProgressionAuditReport
  run summary
  lesson timeline
  memory ledger
  growth-mode decision ledger
  diversity ledger
  blocker pressure report
  no-legacy/fallback report
  markdown renderer
```

The report must show full conversation threads for every ready lesson. It must also show raw write state separately from projected read state so memory-write success cannot hide projection failure.

**Scenario presets:**

```text
brandNewLearner
smallVocabularySubset
compositionReadyLearner
largeVocabularyManifest
saturationFallbackPressure
```

Each scenario must answer these questions in the rendered report:

```text
Why lexical growth?
Why not form growth?
Why not thought-depth growth?
Why not relation/composition growth?
Why not refresh/repair?
Which threshold, cap, missing metadata field, missing form, memory projection state, or route/fingerprint saturation decided this?
```

**Sandbox and baseline discipline:**

Task 22R creates the scoreboard that makes later experimentation safe. After the harness lands and a baseline report is generated, tuning work should happen in explicit experiment lanes rather than directly mutating the best-known product spine.

Baseline rule:

```text
current committed product spine + current spec/plan + baseline harness report
= best-known baseline
```

Recommended baseline command after Task 22R is committed:

```bash
git tag baseline/a1-product-spine-22r-harness
```

If tags are not desired, record the baseline commit hash in the generated harness report.

Experiment branches or worktrees should start from the baseline commit and should be named by the product question they test:

```text
.worktrees/experiment-growth-policy
.worktrees/experiment-memory-projection
.worktrees/experiment-small-vocab-harness
.worktrees/experiment-coherence-thresholds
.worktrees/experiment-route-novelty
.worktrees/experiment-metadata-lane
```

Every experiment must run the same harness scenarios as the baseline and write a comparable Markdown report:

```text
docs/superpowers/audits/experiments/<experiment-name>.md
```

Experiment reports must be compared against the baseline report on these dimensions:

```text
completed lesson count
first blocker owner
legacy/fallback use
memory projection mismatch count
island diversity
route/fingerprint repetition
growth-mode balance
support/growth target balance
pronoun/tense/polarity/connectors reached
conversation readability
```

Prefer policy/config experiments over scattered code edits. Tuning should flow through swappable collaborators or explicit policy inputs when possible:

```text
growth-mode thresholds
lexical growth cap
support count threshold
thought-depth threshold
route novelty cooldown
coherence strictness
metadata/vocabulary lane
memory projection strategy
```

Promotion rule:

```text
An experiment may merge back only when it improves a named product metric
without regressing the core gates: no fallback, memory advancement, compiler
package readiness, and owned blockers.
```

Experiments that teach something but should not merge should be stashed or kept on clearly named rejected branches:

```bash
git stash push -u -m "experiment coherence threshold too strict"
```

or:

```text
experiment/rejected-coherence-too-strict
```

This section is intentionally workflow guidance, not an implementation requirement for Task 22R. Task 22R must make this sandbox approach possible by producing stable, comparable reports.

- [x] **Step 1: Write failing coordinator package exposure tests**

Extend `packages/learning_core/test/a1_product_coordinator_bootstrap_test.dart` and `packages/learning_core/test/a1_product_coordinator_composition_gate_test.dart` so product-ready coordinator results expose the full compiled package, not only `A1ProductLessonPayload`.

Required assertions:

```dart
expect(result.isReady, isTrue);
expect(result.lesson, isNotNull);
expect(result.compiledPackage, isNotNull);
expect(result.compiledPackage!.payload, same(result.lesson));
expect(result.compiledPackage!.proofContract.canonicalProofTargetIds,
    isNotEmpty);
expect(result.compiledPackage!.memoryWritebackContract.semanticFactTargetIds,
    isNotEmpty);
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_coordinator_bootstrap_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart \
  -r expanded
```

Expected: FAIL because `A1ProductCoordinatorResult` does not yet expose `compiledPackage`.

- [x] **Step 2: Expose compiled package from product coordinator results**

Modify `packages/learning_core/lib/src/a1_product_coordinator_contract.dart`:

```dart
final A1CompiledLessonPackage? compiledPackage;
```

Add the field to `A1ProductCoordinatorResult`, pass it through `A1ProductCoordinatorReadyResult`, and leave it null for blocked results. Import `a1_product_lesson_compiler.dart` into the contract file.

Modify `packages/learning_core/lib/src/a1_product_coordinator.dart` so both bootstrap and robust ready branches pass `compilerResult.package!` into `A1ProductCoordinatorResult.ready(...)`.

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_coordinator_bootstrap_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart \
  -r expanded
```

Expected: PASS. This step is required because the progression harness must audit proof/writeback contracts directly; it must not infer proof roles from transcript strings.

- [x] **Step 3: Write failing progression audit tests**

Create `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`.

Add these tests first:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  group('A1ProductSpineProgressionAudit', () {
    test('brand-new learner report prints lessons, memory deltas, and no legacy fallback', () {
      final report = A1ProductSpineProgressionAudit.defaults().run(
        A1ProductSpineAuditScenario.brandNewLearner(lessonCount: 3),
      );

      expect(report.completedLessonCount, greaterThan(0));
      expect(report.firstBlockerOwnerCode, isEmpty);
      expect(report.legacyFallbackUsed, isFalse);
      expect(report.lessons.first.visibleTranscript, contains('Tutor:'));
      expect(report.memoryLedger, isNotEmpty);
      expect(report.toMarkdown(), contains('## Run Summary'));
      expect(report.toMarkdown(), contains('## Lesson Timeline'));
      expect(report.toMarkdown(), contains('## Memory Ledger'));
      expect(report.toMarkdown(), contains('Why lexical growth?'));
    });

    test('memory projection mismatch is diagnosed separately from writeback success', () {
      final report = A1ProductSpineProgressionAudit.defaults().run(
        A1ProductSpineAuditScenario.brandNewLearner(
          lessonCount: 2,
          dropProjectedTargetIds: const ['fact.have.self.object.book'],
        ),
      );

      expect(report.memoryProjectionMismatchCount, greaterThan(0));
      expect(
        report.blockerPressure.ownerCounts.keys,
        contains('memoryProjection.projected_target_missing'),
      );
      expect(report.toMarkdown(), contains('Raw memory wrote target'));
      expect(report.toMarkdown(), contains('Projection did not expose target'));
    });

    test('overconstrained generation stops with first owner and pressure report', () {
      final report = A1ProductSpineProgressionAudit.defaults().run(
        A1ProductSpineAuditScenario.saturationFallbackPressure(
          lessonCount: 6,
          forceCompilerOwnerAfterLesson: 'compiler.route_fingerprint_missing',
        ),
      );

      expect(report.completedLessonCount, lessThan(6));
      expect(report.firstBlockerOwnerCode, 'compiler.route_fingerprint_missing');
      expect(
        report.toMarkdown(),
        contains('First blocker: compiler.route_fingerprint_missing'),
      );
    });

    test('small vocabulary lane reports complexity-growth pressure', () {
      final report = A1ProductSpineProgressionAudit.defaults().run(
        A1ProductSpineAuditScenario.smallVocabularySubset(lessonCount: 8),
      );

      expect(report.growthModeLedger, isNotEmpty);
      expect(report.toMarkdown(), contains('Vocabulary lane: small_subset'));
      expect(report.toMarkdown(), contains('Why not thought-depth growth?'));
      expect(report.toMarkdown(), contains('Known support count'));
    });
  });
}
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_spine_progression_audit_test.dart \
  -r expanded
```

Expected: FAIL because the audit harness, scenario model, report model, and markdown renderer do not exist yet.

- [x] **Step 4: Add audit models and report renderer**

Create `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart` with focused model classes:

```dart
final class A1ProductSpineProgressionAudit {
  const A1ProductSpineProgressionAudit({
    required this.coordinator,
    required this.memoryStoreFactory,
  });

  factory A1ProductSpineProgressionAudit.defaults();

  A1ProductSpineProgressionAuditReport run(
    A1ProductSpineAuditScenario scenario,
  );
}

final class A1ProductSpineAuditScenario {
  const A1ProductSpineAuditScenario._({
    required this.scenarioId,
    required this.lessonCount,
    required this.vocabularyLane,
    required this.initialMemoryProfile,
    required this.initialReadiness,
    required this.dropProjectedTargetIds,
    required this.forceCompilerOwnerAfterLesson,
  });

  factory A1ProductSpineAuditScenario.brandNewLearner({
    required int lessonCount,
    List<String> dropProjectedTargetIds,
  });

  factory A1ProductSpineAuditScenario.smallVocabularySubset({
    required int lessonCount,
  });

  factory A1ProductSpineAuditScenario.compositionReadyLearner({
    required int lessonCount,
  });

  factory A1ProductSpineAuditScenario.largeVocabularyManifest({
    required int lessonCount,
  });

  factory A1ProductSpineAuditScenario.saturationFallbackPressure({
    required int lessonCount,
    String forceCompilerOwnerAfterLesson,
  });

  final String scenarioId;
  final int lessonCount;
  final String vocabularyLane;
  final A1TypedMemoryProfile initialMemoryProfile;
  final A1TypedReadiness initialReadiness;
  final List<String> dropProjectedTargetIds;
  final String forceCompilerOwnerAfterLesson;
}

final class A1ProductSpineProgressionAuditReport {
  const A1ProductSpineProgressionAuditReport({
    required this.requestedLessonCount,
    required this.completedLessonCount,
    required this.firstBlockerOwnerCode,
    required this.legacyFallbackUsed,
    required this.memoryProjectionMismatchCount,
    required this.lessons,
    required this.memoryLedger,
    required this.growthModeLedger,
    required this.blockerPressure,
  });

  final int requestedLessonCount;
  final int completedLessonCount;
  final String firstBlockerOwnerCode;
  final bool legacyFallbackUsed;
  final int memoryProjectionMismatchCount;
  final List<A1ProductSpineLessonAuditRow> lessons;
  final List<A1ProductSpineMemoryLedgerRow> memoryLedger;
  final List<A1ProductSpineGrowthModeLedgerRow> growthModeLedger;
  final A1ProductSpineBlockerPressureReport blockerPressure;

  String toMarkdown();
}
```

Keep the implementation in one file for Task 22R unless the file becomes hard to scan. Export it from `packages/learning_core/lib/learning_core.dart`.

- [x] **Step 5: Implement audit memory store and simulated completion**

Add an internal in-memory store in `a1_product_spine_progression_audit.dart` that can:

```text
projectTypedMemoryProfile()
projectTypedReadiness()
projectGrowthModeInput()
writeCompiledCompletion(A1CompiledLessonPackage package)
recordRecentFingerprint(A1ProductLessonPayload payload, A1CompiledLessonPackage package)
markProjectionDrops(List<String> targetIds)
```

The simulated completion must write from:

```text
package.proofContract
package.memoryWritebackContract
package.payload.writebackFactIds
package.routeFingerprintIds
```

It must not parse target roles from `payload.visibleTranscript`.

Memory ledger rows must include:

```text
targetId
beforeProjectedState
lessonRole
plannedWriteKind
rawWriteObserved
afterProjectedState
consumedByNextLesson
diagnosis
```

Projection mismatch diagnosis must use owner code:

```text
memoryProjection.projected_target_missing
```

- [x] **Step 6: Implement progression loop and blocker pressure report**

Implement `A1ProductSpineProgressionAudit.run(...)`:

```text
for lesson index in requested count:
  build memory profile, readiness, growth input, recent fingerprints
  call A1ProductCoordinator.createLesson(...)
  if blocked:
    record first blocker owner and pressure report
    break
  if ready but compiledPackage is null:
    record first blocker owner audit.compiled_package_missing
    break
  assert trace contains legacyComparison.used:false
  append lesson timeline row
  simulate completion from compiled package
  reload projected memory
  compare raw writes vs projected reads
  append memory ledger rows
```

Growth-mode ledger rows must record:

```text
selectedGrowthMode
knownSupportLexemeCount
availableHighPriorityLexicalGrowthCount
recentLexicalGrowthCount
minimumSupportForNonLexicalGrowth
minimumSupportForThoughtDepth
refreshDueCount
whySelected
whyLexicalGrowth
whyFormGrowthNotSelected
whyThoughtDepthGrowthNotSelected
whyRelationGrowthNotSelected
whyRefreshNotSelected
```

The first implementation may derive the "why" strings from the existing growth-mode trace terms and scenario input values. Do not add natural-language speculation that is not backed by trace or policy input.

- [x] **Step 7: Implement Markdown report output**

`A1ProductSpineProgressionAuditReport.toMarkdown()` must render these sections exactly:

```markdown
# A1 Product Spine Progression Audit

## Run Summary
## Lesson Timeline
## Memory Ledger
## Growth Mode Decisions
## Diversity And Saturation
## Blocker Pressure
## Fallback/Legacy Check
```

Each ready lesson row must include:

```text
Lesson number
Generation mode
Growth mode
Vocabulary lane
Primary island
Support targets
Growth targets
Grammar axes
Semantic facts
Route fingerprints
Full visible conversation
Why selected
Memory written
Memory consumed by next lesson
```

The report should be dense but readable. Do not hide the full final conversation behind hashes.

- [x] **Step 8: Add command-line report tool for quick iteration**

Create `packages/learning_core/tool/a1_product_spine_progression_audit.dart`.

The tool must support:

```bash
dart run tool/a1_product_spine_progression_audit.dart --scenario brand_new --lessons 40
dart run tool/a1_product_spine_progression_audit.dart --scenario small_vocab --lessons 24
dart run tool/a1_product_spine_progression_audit.dart --scenario composition_ready --lessons 24
dart run tool/a1_product_spine_progression_audit.dart --scenario large_vocab --lessons 24
dart run tool/a1_product_spine_progression_audit.dart --scenario saturation --lessons 24
```

Default behavior: print Markdown to stdout.

Optional argument:

```bash
--out ../../docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md
```

When `--out` is supplied, write the same Markdown to the target path and print:

```text
wrote <path>
```

- [x] **Step 9: Run focused harness tests**

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_spine_progression_audit_test.dart \
  test/a1_product_coordinator_bootstrap_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart \
  test/a1_product_lesson_compiler_contract_test.dart \
  -r expanded
```

Expected: PASS.

- [x] **Step 10: Generate a first readable report snapshot**

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart run \
  tool/a1_product_spine_progression_audit.dart \
  --scenario brand_new \
  --lessons 40 \
  --out ../../docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md
```

Expected:

```text
wrote ../../docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md
```

Open the generated report and verify it contains:

```text
## Run Summary
## Transition Diagnostics
## Lesson Timeline
## Memory Ledger
## Growth Mode Decisions
## Blocker Pressure
Tutor:
Learner:
legacyComparison.used:false
```

- [x] **Step 11: Update docs with harness findings**

Update:

- `docs/superpowers/audits/2026-06-05-product-behavior-map.md`
- `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- this plan

Record:

```text
whether the harness can complete the requested lesson count
whether memory writes are projected into the next lesson
which growth modes appear and why
which vocabulary lane was used
whether route/fingerprint saturation appears
which first blocker appears when generation stops
whether the coordinator exposed the compiled package
whether any fallback/legacy path participated
```

- [x] **Step 12: Analyzer and verification**

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart analyze \
  lib/src/a1_product_spine_progression_audit.dart \
  lib/src/a1_product_coordinator_contract.dart \
  lib/src/a1_product_coordinator.dart \
  tool/a1_product_spine_progression_audit.dart \
  test/a1_product_spine_progression_audit_test.dart \
  test/a1_product_coordinator_bootstrap_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart

/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_spine_progression_audit_test.dart \
  test/a1_product_coordinator_bootstrap_test.dart \
  test/a1_product_coordinator_composition_gate_test.dart \
  test/a1_product_lesson_compiler_contract_test.dart \
  -r expanded
```

Expected: analyzer reports no issues; focused tests pass.

- [x] **Step 13: Commit Task 22R**

```bash
git add \
  packages/learning_core/lib/src/a1_product_spine_progression_audit.dart \
  packages/learning_core/lib/src/a1_product_coordinator_contract.dart \
  packages/learning_core/lib/src/a1_product_coordinator.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/tool/a1_product_spine_progression_audit.dart \
  packages/learning_core/test/a1_product_spine_progression_audit_test.dart \
  packages/learning_core/test/a1_product_coordinator_bootstrap_test.dart \
  packages/learning_core/test/a1_product_coordinator_composition_gate_test.dart \
  docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md \
  docs/superpowers/audits/2026-06-05-product-behavior-map.md \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md
git commit -m "feat: add A1 product spine progression audit harness"
```

**Task 22R exit criteria:**

- A quick command can generate a readable Markdown report for brand-new, small-vocabulary, composition-ready, large-vocabulary, and saturation scenarios.
- The report includes full final conversations, generation mode, growth mode, support/growth targets, grammar axes, semantic facts, route fingerprints, memory writes, memory projections, growth-mode decision reasons, and first blocker owners.
- The generated brand-new baseline runs long enough to show bootstrap graduation pressure: first non-lexical growth mode, first thought-depth growth mode or explicit absence, first non-bootstrap generation mode, first non-bootstrap route, first repeated transcript, first repeated route, and a warning only when policy advances but generation never exits bootstrap.
- The harness simulates completion from `A1CompiledLessonPackage` proof/writeback contracts and does not parse proof roles from transcript text.
- The harness detects raw-write/projected-read mismatches and assigns `memoryProjection.projected_target_missing`.
- Product-ready coordinator results expose the compiled package or the harness reports `audit.compiled_package_missing`.
- Any legacy, bridge, old arc, seed/routine, or fallback participation fails the no-legacy report.
- Focused tests prove the harness can diagnose memory non-consumption, overconstrained generation, growth-mode pressure, and no-legacy progression.
- The generated report is stable enough to serve as a baseline artifact for later experiment worktrees and policy/config tuning comparisons.

## Task 22T: Arc-to-Typed Generator Enrichment Without Legacy Fallback

**Purpose:** Enrich typed composition by harvesting the product behaviors that made the legacy arc generator useful - family route packets, reusable move sequences, safe slot/fact selection, maturity upgrades, surface realization discipline, quality checks, and liveliness proofs - while keeping the product path fully typed, metadata-backed, compiler-owned, and no-legacy.

**Audit finding addressed:** Task 22S proved that saved-memory ingestion can work, including a rich 32-fact history, but typed composition still cannot sustain the intended lesson flow. The rich seed only produced 5 clean typed-composition lessons, touched 3 output islands, and then blocked with `arcCoherence.question_focus_unanswered`. The older arc path produced better-feeling conversations because it had reusable family profiles, arc move chains, slot pools, verified-form realization, maturity rules, quality checks, and multi-session liveliness tests. The product should harvest those contracts into the typed generator instead of reviving `A1ConversationArcCatalog`, `A1ConversationArcInstantiator`, metadata-backed bridge transcripts, or routine/seed fallbacks.

**Architecture rule:** Old arc files are evidence, not runtime collaborators. Typed composition may copy product ideas from the old arc path, but product code must not import, instantiate, or call the old arc catalog, old arc instantiator, metadata-backed candidate harness, bridge transcript generator, or legacy seed/routine fallback. New route capacity must be expressed as typed, reusable, metadata-backed route packets and move/surface contracts that can generalize across islands, predicates, roles, tenses, pronouns, polarity, and thought-depth rungs.

**Hardcoding guardrails:**

- A learner-facing sentence must come from a typed move/surface contract plus selected metadata/verified forms, not from a one-off transcript string.
- Route packets may define reusable IDs, required roles, allowed obligations, grammar axes, maturity gates, and proof targets; they may not define a complete fixed conversation for one verb or one restaurant-like situation.
- A route packet is valid only if at least two metadata islands or two predicate/entity families can use the same packet shape, unless the packet is explicitly marked as a starter-only bootstrap bridge.
- New route capacity must not be food/location dominated. Food and location can be supported, but the first enrichment slice must prove daily activity, people, requests/home/shopping, feelings/reasons, preferences/alternatives, repair/social routine, time/scheduling, and descriptions have typed capacity.
- If a selected packet cannot render safely, the product must return an owned blocker such as `routeCapacity.surface_pattern_missing`, `compiler.verified_form_missing`, `arcCoherence.question_focus_unanswered`, or `metadataReadiness.role_pool_missing`; it must not rescue with generic `eh`, `emta`, `leh`, old arc materialization, or transcript parsing.
- The no-legacy guard tests must keep scanning product coordinator, typed generator, route packet registry, compiler, and audit harness files for forbidden old arc collaborators.

**Arc behavior to harvest into typed contracts:**

```text
Legacy arc concept -> Typed product destination

A1FamilyCapabilityProfile
  -> typed route family profile / enriched composition manifest

A1ConversationArc.requiredMoveIds
  -> A1DialogueMoveSequencePlan variants and route packet move skeletons

A1ConversationMove dialogueFunction + requiredSlotRoles
  -> typed move obligations, questionFocus, answerFocus, required role refs,
     and allowed answer relations

A1PhrasePattern
  -> A1SurfacePatternInventory entries plus compiler move realizer templates

slotPools
  -> metadata-backed role pools and A1CompositionMemoryIndex projections

maturityLevels
  -> thought-depth rung, tense, pronoun, polarity, connector, reason/detail,
     and multi-turn follow-up axes

memoryUnlockRequirementIds / blockedIf
  -> typed readiness gates and owned blocker codes

evidenceTargetIds / progressTargetIds
  -> A1LessonProofContract and A1SemanticMemoryWritebackContract targets

noveltyShiftIds
  -> route fingerprint, surface fingerprint, obligation fingerprint,
     and recent-history scoring terms

A1ConversationArcQualityValidator
  -> typed coherence validator and compiler preflight checks

A1ConversationLivelinessSimulation
  -> product spine progression harness and typed readiness sweep assertions
```

**Files:**

- Create: `docs/superpowers/audits/2026-06-05-a1-arc-to-typed-generator-harvest.md`
- Create: `packages/learning_core/lib/src/a1_typed_route_packet.dart`
- Create: `packages/learning_core/lib/src/a1_typed_route_packet_registry.dart`
- Create: `packages/learning_core/lib/src/a1_typed_route_packet_candidate_builder.dart`
- Create: `packages/learning_core/lib/src/a1_typed_move_realizer.dart`
- Create: `packages/learning_core/test/a1_arc_to_typed_generator_harvest_test.dart`
- Create: `packages/learning_core/test/a1_typed_route_packet_registry_test.dart`
- Create: `packages/learning_core/test/a1_typed_route_packet_candidate_builder_test.dart`
- Create: `packages/learning_core/test/a1_typed_move_realizer_test.dart`
- Modify: `packages/learning_core/lib/src/a1_coherent_candidate_factory.dart`
- Modify: `packages/learning_core/lib/src/a1_dialogue_move_sequence_planner.dart`
- Modify: `packages/learning_core/lib/src/a1_follow_up_opportunity_planner.dart`
- Modify: `packages/learning_core/lib/src/a1_surface_pattern_inventory.dart`
- Modify: `packages/learning_core/lib/src/a1_product_lesson_compiler.dart`
- Modify: `packages/learning_core/lib/src/a1_coherence_validator.dart`
- Modify: `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- Modify: `packages/learning_core/lib/src/a1_typed_composition_readiness_sweep.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Modify: `docs/superpowers/audits/2026-06-05-a1-typed-composition-readiness-sweep.md`
- Modify: `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- Modify: this plan

- [x] **Step 1: Write the arc-to-typed harvest audit document**

Create `docs/superpowers/audits/2026-06-05-a1-arc-to-typed-generator-harvest.md` with these sections:

```markdown
# A1 Arc-to-Typed Generator Harvest Audit

## Executive Summary
- The old arc generator is not product runtime.
- Typed composition is the product path.
- The harvest target is route-packet behavior, not fixed transcripts.

## Legacy Strengths Worth Harvesting
| Strength | Evidence | Product value | Typed destination |
|---|---|---|---|

## Typed Gaps Blocking Sustained Composition
| Gap | Current evidence | Product risk | Required owner code |
|---|---|---|---|

## No-Legacy Runtime Boundary
List forbidden imports, constructors, harnesses, fallbacks, and transcript parsing.

## Typed Route Packet Shape
Define the required fields for route packets, move templates, surface contracts,
readiness gates, proof/writeback targets, fingerprints, and blocker ownership.

## First Route Packets To Build
1. daily activity time/reason/topic/sequence
2. people relationship/person reference
3. request/detail for home and shopping objects
4. feelings state/reason/degree
5. preference/alternative/reason
6. repair/continue/social routine
7. time scheduling
8. descriptions/detail

## Acceptance Metrics
- Rich saved-memory typed sweep produces at least 6 clean non-repeating typed lessons.
- Output touches at least 5 non-food/location islands.
- No selected typed route fails with `arcCoherence.question_focus_unanswered`.
- No generic question fallback appears in compiled conversations.
- Product no-legacy guards pass.
```

Do not edit runtime code in this step. This document is the handrail for the implementation steps below.

- [x] **Step 2: Add no-legacy harvest guard tests**

Create `packages/learning_core/test/a1_arc_to_typed_generator_harvest_test.dart`.

The test must scan these product files:

```dart
const productFiles = [
  'lib/src/a1_product_coordinator.dart',
  'lib/src/a1_product_robust_candidate_generator.dart',
  'lib/src/a1_coherent_candidate_factory.dart',
  'lib/src/a1_typed_route_packet_registry.dart',
  'lib/src/a1_typed_route_packet_candidate_builder.dart',
  'lib/src/a1_typed_move_realizer.dart',
  'lib/src/a1_product_lesson_compiler.dart',
  'lib/src/a1_product_spine_progression_audit.dart',
  'lib/src/a1_typed_composition_readiness_sweep.dart',
];
```

It must fail if any scanned file contains:

```dart
const forbiddenRuntimeReferences = [
  'A1ConversationArcCatalog',
  'A1ConversationArcInstantiator',
  'A1MetadataBackedCandidateHarness',
  'metadata_backed_profile_bridge',
  'legacy seed',
  'routine fallback',
];
```

Expected result before implementation: FAIL because the new files do not exist. Expected result after implementation: PASS, proving the arc generator remains audit-only evidence.

- [x] **Step 3: Define typed route packet models**

Create `packages/learning_core/lib/src/a1_typed_route_packet.dart`.

The model must include these required fields:

```dart
class A1TypedRoutePacket {
  const A1TypedRoutePacket({
    required this.packetId,
    required this.familyId,
    required this.routeFrameId,
    required this.supportedIslandIds,
    required this.supportedGrowthModes,
    required this.minThoughtDepthRung,
    required this.maxThoughtDepthRung,
    required this.requiredSemanticRoleClasses,
    required this.optionalSemanticRoleClasses,
    required this.requiredFactRelationIds,
    required this.allowedDialogueObligationIds,
    required this.moveTemplateIds,
    required this.surfacePatternIds,
    required this.requiredGrammarAxisIds,
    required this.proofTargetIds,
    required this.writebackTargetIds,
    required this.maturityUpgradeIds,
    required this.readinessGateIds,
    required this.blockerOwnerPrefix,
    required this.shapeFingerprint,
  });

  final String packetId;
  final String familyId;
  final String routeFrameId;
  final Set<String> supportedIslandIds;
  final Set<String> supportedGrowthModes;
  final int minThoughtDepthRung;
  final int maxThoughtDepthRung;
  final Set<String> requiredSemanticRoleClasses;
  final Set<String> optionalSemanticRoleClasses;
  final Set<String> requiredFactRelationIds;
  final List<String> allowedDialogueObligationIds;
  final List<String> moveTemplateIds;
  final List<String> surfacePatternIds;
  final Set<String> requiredGrammarAxisIds;
  final Set<String> proofTargetIds;
  final Set<String> writebackTargetIds;
  final Set<String> maturityUpgradeIds;
  final Set<String> readinessGateIds;
  final String blockerOwnerPrefix;
  final String shapeFingerprint;
}
```

The route packet must not contain full transcript text. If a future implementation needs a surface, it must point to `surfacePatternIds` and move templates.

- [x] **Step 4: Add a metadata-backed typed route packet registry**

Create `packages/learning_core/lib/src/a1_typed_route_packet_registry.dart`.

The initial registry must include reusable packet shapes for:

```text
daily_activity_time
daily_activity_reason
daily_activity_sequence
people_relationship_reference
people_location_or_activity
request_detail_object
home_possession_use
feelings_reason_degree
preference_alternative_reason
repair_continue
social_routine_close
time_scheduling_shift
description_detail
```

Each packet must be keyed by reusable role/fact/surface IDs. Do not write complete learner-facing conversations into the registry.

Create `packages/learning_core/test/a1_typed_route_packet_registry_test.dart` with assertions:

```dart
expect(registry.packets, isNotEmpty);
expect(registry.primaryFamilyIds, containsAll([
  'daily_activities',
  'people_relationships',
  'home_objects_possessions',
  'shopping_requests',
  'feelings_states',
  'preferences_opinions',
  'conversation_repair',
  'social_politeness',
  'time_scheduling',
  'descriptions',
]));
expect(registry.packetsForFamily('daily_activities').length,
    greaterThanOrEqualTo(3));
expect(registry.packetsForFamily('feelings_states'), isNotEmpty);
expect(registry.foodOrLocationDominanceRatio, lessThan(0.35));
expect(registry.packetsWithoutSurfacePatterns, isEmpty);
expect(registry.packetsWithoutProofTargets, isEmpty);
```

Expected: PASS only when route capacity is distributed across the non-restaurant product shape.

- [x] **Step 5: Build typed candidates from route packets instead of one-off plan methods**

Create `packages/learning_core/lib/src/a1_typed_route_packet_candidate_builder.dart`.

The builder must take:

```text
A1TypedRoutePacketRegistry
A1CompositionMemoryIndex
A1DialogueMoveSequencePlanner
A1FollowUpOpportunityPlanner
A1SurfacePatternInventory
recent route/surface fingerprints
growth mode decision
target bundle/proof requirements
```

It must output `A1DialogueCandidate` instances or owned rejections. Rejection owner codes must include:

```text
routeCapacity.role_pool_missing
routeCapacity.fact_relation_missing
routeCapacity.surface_pattern_missing
routeCapacity.move_sequence_missing
routeCapacity.proof_target_missing
routeCapacity.recent_fingerprint_saturated
metadataReadiness.verified_form_missing
arcCoherence.question_focus_unanswered
```

Modify `packages/learning_core/lib/src/a1_coherent_candidate_factory.dart` so the old direct plan list becomes either:

```text
1. a thin adapter over typed route packets, or
2. legacy comparison code that product proofs cannot call.
```

Create `packages/learning_core/test/a1_typed_route_packet_candidate_builder_test.dart` with tests that seed facts for daily activity, people, request/detail, feelings, and preference packets and assert at least one candidate per seeded family before coherence validation.

- [x] **Step 6: Add a typed move realizer for question-focus-safe surfaces**

Create `packages/learning_core/lib/src/a1_typed_move_realizer.dart`.

The realizer must accept:

```text
A1DialogueCandidate
A1DialogueMoveSequencePlan
A1SurfacePatternInventory
selected metadata role bindings
verified form lookups
compiler proof/writeback targets
```

It must return either typed turns or an owned blocker. It must not return generic bare prompts. Add `packages/learning_core/test/a1_typed_move_realizer_test.dart` with assertions:

```dart
expect(turns.any((turn) => turn.text.trim() == 'eh?'), isFalse);
expect(turns.any((turn) => turn.text.trim() == 'emta?'), isFalse);
expect(turns.any((turn) => turn.text.trim() == 'leh?'), isFalse);
expect(result.blockerOwnerCode, isNot('arcCoherence.question_focus_unanswered'));
expect(result.turns.every((turn) => turn.dialogueAct.isNotEmpty), isTrue);
expect(result.turns.every((turn) => turn.surfacePatternId.isNotEmpty), isTrue);
```

Modify `packages/learning_core/lib/src/a1_product_lesson_compiler.dart` so robust typed candidates use this realizer before falling back to compiler blockers. The compiler must still own package assembly, proof contract, writeback contract, and UI stage output.

- [ ] **Step 7: Port old quality checks into typed coherence without old arc calls**

Status after the 2026-06-05 implementation: first-pass visible-repeat quality is wired through typed scoring as `sameVisibleTranscriptRecent`, and typed compiler output now stores a true visible transcript hash instead of reusing the internal second-half shape id. The full old quality-rule port remains open. In particular, same surface-pattern stale repeat, repeated learner-answer collapse, bridge-required topic/time/person shifts, and additional typed coherence repair recommendations still need a focused follow-up slice.

Modify `packages/learning_core/lib/src/a1_coherence_validator.dart`.

Typed coherence must reject:

```text
question focus unanswered
answer relation mismatch
same-route stale repeat
same surface-pattern stale repeat
repeated learner answer collapse
follow-up asks for detail that the answer cannot provide
reason prompt without a prior claim
time/location/person shift without bridge
topic shift without connector or explicit route transition
```

Use the old arc quality validator only as evidence for what to test. Do not import it.

Extend `packages/learning_core/test/a1_typed_route_packet_candidate_builder_test.dart` or create focused coherence tests proving each rejection owns a clear `arcCoherence.*` code and recommends either route-packet expansion, surface-pattern repair, metadata readiness, or compiler realization.

- [x] **Step 8: Upgrade typed readiness and product spine reports to measure route-packet capacity**

Modify `packages/learning_core/lib/src/a1_typed_composition_readiness_sweep.dart` and `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`.

Reports must include:

```text
typed route packets considered
typed route packets selected
route packets rejected by owner code
families reachable from saved memory
families blocked by missing role pools
families blocked by missing surface patterns
families blocked by coherence
families blocked by compiler realization
question-focus-safe turn count
generic prompt fallback count
```

Update `docs/superpowers/audits/2026-06-05-a1-typed-composition-readiness-sweep.md` after running the sweep.

- [x] **Step 9: Verify the enrichment with product-path acceptance metrics**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_arc_to_typed_generator_harvest_test.dart \
  test/a1_typed_route_packet_registry_test.dart \
  test/a1_typed_route_packet_candidate_builder_test.dart \
  test/a1_typed_move_realizer_test.dart \
  test/a1_product_lesson_compiler_contract_test.dart \
  test/a1_product_spine_progression_audit_test.dart \
  test/a1_typed_composition_readiness_sweep_test.dart \
  -r expanded
```

Expected: PASS.

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart run \
  tool/a1_typed_composition_readiness_sweep.dart
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart run \
  tool/a1_product_spine_progression_audit.dart \
  --scenario brand_new \
  --lessons 40 \
  --out ../../docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md
```

Expected route-capacity result:

```text
rich saved-memory forced typed composition:
  clean typed lessons >= 6
  output islands >= 5
  generic prompt fallback count == 0
  first blocker is not arcCoherence.question_focus_unanswered
  first blocker is not compiler focus mismatch
```

Expected product-spine result:

```text
brand-new learner:
  bootstrap remains available until typed route capacity is ready
  first non-bootstrap lesson appears only after readiness gates pass
  no old arc, bridge, routine, or seed fallback participates
  blocker report names route capacity, metadata readiness, coherence,
  compiler, or memory projection when generation cannot continue
```

- [x] **Step 10: Commit Task 22T**

```bash
git add \
  docs/superpowers/audits/2026-06-05-a1-arc-to-typed-generator-harvest.md \
  docs/superpowers/audits/2026-06-05-a1-typed-composition-readiness-sweep.md \
  docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md \
  packages/learning_core/lib/src/a1_typed_route_packet.dart \
  packages/learning_core/lib/src/a1_typed_route_packet_registry.dart \
  packages/learning_core/lib/src/a1_typed_route_packet_candidate_builder.dart \
  packages/learning_core/lib/src/a1_typed_move_realizer.dart \
  packages/learning_core/lib/src/a1_coherent_candidate_factory.dart \
  packages/learning_core/lib/src/a1_dialogue_move_sequence_planner.dart \
  packages/learning_core/lib/src/a1_follow_up_opportunity_planner.dart \
  packages/learning_core/lib/src/a1_surface_pattern_inventory.dart \
  packages/learning_core/lib/src/a1_product_lesson_compiler.dart \
  packages/learning_core/lib/src/a1_coherence_validator.dart \
  packages/learning_core/lib/src/a1_product_spine_progression_audit.dart \
  packages/learning_core/lib/src/a1_typed_composition_readiness_sweep.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_arc_to_typed_generator_harvest_test.dart \
  packages/learning_core/test/a1_typed_route_packet_registry_test.dart \
  packages/learning_core/test/a1_typed_route_packet_candidate_builder_test.dart \
  packages/learning_core/test/a1_typed_move_realizer_test.dart
git commit -m "feat: enrich typed A1 generator route capacity"
```

**Task 22T exit criteria:**

- The arc-to-typed harvest audit exists and clearly identifies which old arc behaviors were harvested into typed contracts.
- Product runtime still has no old arc catalog, old arc instantiator, bridge harness, seed/routine fallback, or transcript-parsing rescue path.
- Typed route packets exist as reusable metadata-backed route capacity, not fixed conversations.
- Typed composition can build candidates from route packets across at least five non-food/location families from rich saved memory.
- The compiler realizes robust typed move sequences through question-focus-safe surfaces or fails closed with owned compiler/metadata/coherence blockers.
- The rich saved-memory readiness sweep reaches at least 6 clean non-repeating typed lessons and no longer blocks first on `arcCoherence.question_focus_unanswered`.
- Product spine reports route-packet capacity, rejection owners, generic prompt fallback count, and whether bootstrap graduation is route-capacity-aware.
- Tests prove the enriched typed generator improves sustained route capacity without reintroducing mostly hardcoded transcript solutions.

**Task 22T implementation result, 2026-06-05:**

- Added the arc-to-typed harvest audit, typed route packet model/registry, packet candidate builder, typed move realizer, route-packet pressure reporting, and no-legacy guard coverage.
- Wired packet candidates into `A1CoherentCandidateFactory`, robust selection, compiler materialization, and product-spine/readiness reports without importing the legacy arc catalog, legacy arc instantiator, bridge harness, or seed/routine fallback.
- Updated typed compiler output so `visibleTranscriptFingerprint` is a real visible-text hash, while route fingerprints remain shape/proposition/move identifiers for memory and route cooldown.
- Added visible transcript cooldown to scoring. Exact learner-visible repeats now block before compilation as `sameVisibleTranscriptRecent` instead of being misclassified as new route shapes.
- Fixed the first packet surface collapse where `home_possession_use` and `description_detail` both rendered as the same possession conversation.
- Verification passed:
  - `dart test test/a1_arc_to_typed_generator_harvest_test.dart test/a1_typed_route_packet_registry_test.dart test/a1_typed_route_packet_candidate_builder_test.dart test/a1_typed_move_realizer_test.dart test/a1_product_lesson_compiler_contract_test.dart test/a1_product_spine_progression_audit_test.dart test/a1_typed_composition_readiness_sweep_test.dart -r expanded`
  - `dart analyze` on the touched task files.
- Latest readiness sweep result:
  - minimum capacity seed: `saved_memory_4_fact_study_reason` with 4 facts;
  - minimum meaningful seed: `saved_memory_rich_history` with 32 facts;
  - rich saved memory produced 8 typed-composition probe lessons, 5 islands, 0 suspicious transcripts, 0 generic prompt fallbacks, no repeated transcript, and no repeated route.
- Latest brand-new product-spine result:
  - requested 40 lessons, completed 15;
  - first non-lexical growth: lesson 9;
  - first non-bootstrap typed composition: lesson 13;
  - first blocker: `sameVisibleTranscriptRecent`;
  - no completed repeated transcript, no completed repeated route, no legacy/fallback use, and 0 memory projection mismatches.
- Remaining product gap: the route packet library and typed coherence/scoring stack are now working well enough to expose the real bottleneck. Brand-new progression still saturates at 15 lessons because the current typed packet set does not yet provide enough genuinely distinct visible routes, and thought-depth growth still does not appear in the brand-new audit.

## Task 22U: Growth/Capacity Failure-Mode Audit And Plan Calibration

**Purpose:** Before adding more typed route packets or a richer growth controller, audit why the current typed generator stops expanding and whether the next work should target route capacity, growth arbitration, metadata/forms, compiler realization, coherence/proof strictness, or memory write/read consumption.

**Product question:** Can the current typed spine keep producing expanding lessons when it has enough memory, and if not, which exact owner prevents expansion?

**Architecture rule:** This is an audit/design slice, not a product-code slice. It may read source, reports, and test harnesses. It may regenerate reports. It may update this plan and the product behavior map. It must not add route packets, controller code, or compiler behavior.

**Concerns to audit:**

```text
1. Capacity looks large but usable capacity is small.
2. Growth controller selects unrenderable goals.
3. Coherence/proof rules are too strict for valid beginner routes.
4. Generator can produce many lessons but stays shallow and non-expansive.
5. Route packets drift into hardcoded arcs instead of reusable typed schemas.
6. Memory writes do not unlock future growth.
7. Deterministic surfaces remain robotic even when structurally valid.
```

**Files:**

- Create: `docs/superpowers/audits/2026-06-05-a1-growth-capacity-failure-mode-audit.md`
- Modify: `docs/superpowers/audits/2026-06-05-product-behavior-map.md`
- Modify: `docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md`
- Modify: `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- Read: `docs/superpowers/audits/2026-06-05-a1-typed-composition-readiness-sweep.md`
- Read: `docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md`
- Read: `packages/learning_core/lib/src/a1_typed_route_packet_registry.dart`
- Read: `packages/learning_core/lib/src/a1_typed_route_packet_candidate_builder.dart`
- Read: `packages/learning_core/lib/src/a1_product_growth_mode_policy.dart`
- Read: `packages/learning_core/lib/src/a1_generation_mode_policy.dart`
- Read: `packages/learning_core/lib/src/a1_dialogue_candidate_scoring.dart`
- Read: `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- Read: `packages/learning_core/lib/src/a1_typed_composition_readiness_sweep.dart`

- [x] **Step 1: Regenerate current audit evidence**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart run \
  tool/a1_typed_composition_readiness_sweep.dart \
  --lessons-per-seed 8 \
  --out ../../docs/superpowers/audits/2026-06-05-a1-typed-composition-readiness-sweep.md
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart run \
  tool/a1_product_spine_progression_audit.dart \
  --scenario brand_new \
  --lessons 40 \
  --out ../../docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md
```

Expected current baseline:

```text
rich saved-memory meaningful floor: yes
brand-new completed lessons: 15
brand-new first blocker: sameVisibleTranscriptRecent
first thought-depth lesson: none
legacy/fallback used: false
memory projection mismatches: 0
```

- [x] **Step 2: Create failure-mode audit document**

Create `docs/superpowers/audits/2026-06-05-a1-growth-capacity-failure-mode-audit.md` with these sections:

```markdown
# A1 Growth/Capacity Failure-Mode Audit

## Executive Summary
- Current readiness state.
- Highest-confidence blocker.
- What should change in the plan.

## Baseline Evidence
| Report | Metric | Current value | Product meaning |
|---|---|---:|---|

## Failure-Mode Matrix
| Concern | Evidence | Status | Owner | Action |
|---|---|---|---|---|

## Route Capacity Findings
| Family / axis | Registry coverage | Usable now | Blocked by | Recommended action |
|---|---:|---:|---|---|

## Growth Axis Findings
| Axis | Current readiness evidence | Current selected behavior | Missing proof | Action |
|---|---|---|---|---|

## Quality Expansion Findings
| Quality risk | Current evidence | Required test/report metric | Action |
|---|---|---|---|

## Plan Calibration
State which planned tasks should move earlier, change scope, or become blocked.

## Next Implementation Slices
1. Route capacity expansion.
2. Growth controller pressure/cooldown.
3. Remaining quality/coherence port.
```

- [x] **Step 3: Audit route capacity against product concerns**

Inspect the route packet registry and reports. Record:

```text
packet count
family count
families with only one packet
families used in rich sweep
families used in brand-new product spine
families blocked by missing fact relation
families not reachable because writeback does not create their facts
families with learner-visible collapse risk
```

The audit must decide whether the next route-capacity slice should add:

```text
new packet families
more move variants per existing packet
more reusable relation types
more surface patterns
more writeback facts from bootstrap/contextual starter
```

- [x] **Step 4: Audit growth-axis behavior**

Compare the intended pressure/cooldown controller against current `A1ProductGrowthModePolicy`, `A1GenerationModePolicy`, and product-spine output. Record:

```text
where lexical growth stops
where relation growth begins
why thought-depth never appears
whether form growth appears
whether refresh/repair appears
whether route capacity is part of growth-axis selection
whether the selected axis has renderable candidate count
```

The audit must decide which of these is the first growth-controller action:

```text
add axis pressure ledger only
add route-capacity-aware axis eligibility
add cooldown scoring
add thought-depth first-use bonus
add verified-form pressure
add refresh/repair pressure
```

- [x] **Step 5: Audit expansion quality**

Use current reports to decide whether the system is at risk of producing many shallow lessons. Record:

```text
unique question demands
unique move sequences
unique relation types
unique route packet families
unique thought-depth rungs
connector usage
form/pronoun/tense/polarity coverage
generic prompt fallback count
visible transcript repeats
route family dominance
```

The audit must recommend concrete pass/fail thresholds for the next implementation slices.

- [x] **Step 6: Update product behavior map**

Update `docs/superpowers/audits/2026-06-05-product-behavior-map.md` to reflect:

```text
Task 22U audit result
current readiness
top blockers
which next slice has priority
what can defer until after route/growth expansion
```

- [x] **Step 7: Calibrate this plan based on audit findings**

Add an `Audit result` subsection to Task 22U and adjust Task 22V/22W if the audit shows the next action should change.

- [x] **Step 8: Verify audit slice**

Run:

```bash
git diff --check
```

Expected: no whitespace errors.

**Task 22U audit result, 2026-06-05:**

- Created `docs/superpowers/audits/2026-06-05-a1-growth-capacity-failure-mode-audit.md`.
- Regenerated the readiness sweep and brand-new product-spine reports.
- Confirmed the current baseline:
  - rich saved memory clears the meaningful typed-composition floor;
  - brand-new progression completes 15 of 40 lessons;
  - typed composition begins at lesson 13;
  - first blocker is `sameVisibleTranscriptRecent`;
  - first thought-depth lesson is none;
  - generic prompt fallback count is 0;
  - legacy/fallback used is false;
  - memory projection mismatches are 0.
- Found that route capacity is the first implementation priority. The registry has 14 packets, but brand-new progression selects only 6 packet candidates and rejects 36 with `routeCapacity.fact_relation_missing`.
- Found that growth arbitration is the second implementation priority. The current policy is threshold-driven; it selects lexical growth until support count 20, then relation growth, and thought-depth requires support count 32. The brand-new audit stops at support count 30, so thought-depth never gets a chance to prove whether it has usable candidate capacity.
- Changed Task 22V scope from broad packet addition to reachable route capacity expansion. The first packets should consume facts already written by brand-new bootstrap: `have book/bag`, `need notebook/pen`, `want tea/meat`, `go school/home`, `feel hungry/thirsty`, and `study topic/place`.
- Changed Task 22W scope so its first deliverable is a growth-axis pressure/capacity ledger before selection behavior changes.
- Deferred broad old-quality-rule port into Task 22X. Quality risks are real, but route capacity is the active blocker. Quality metrics should be added alongside 22V/22W so more output is not mistaken for better output.

## Task 22V: Typed Route Capacity Expansion

**Purpose:** Add enough reusable typed route capacity that brand-new product progression can continue past the current visible-repeat ceiling without returning to old arcs or fixed transcripts.

**Depends on:** Task 22U. Do not implement until Task 22U names the first route-capacity actions and pass/fail thresholds.

**Goal:** The backend product-spine audit should produce more valid non-bootstrap lessons, with higher route-family and move-sequence diversity, while preserving no-legacy and no-generic-prompt guarantees.

**Architecture rule:** Route additions must be typed schemas, not full scripts. New capacity should enter through `A1TypedRoutePacket`, move-sequence variants, surface pattern ids, metadata/readiness gates, proof/writeback targets, and compiler/realizer support.

**Blocker-removal contract:**

```text
blocker found:
  brand-new product-spine run completes 15/40 lessons and stops at sameVisibleTranscriptRecent
  typed route packet audit considers 42 packet attempts, selects 6, rejects 36 with routeCapacity.fact_relation_missing

component responsible:
  typed route packet registry, candidate builder, move-sequence planner, surface pattern inventory, typed realizer, compiler package assembly

missing capability:
  route packets that can consume the facts brand-new bootstrap already writes instead of requiring richer future memory

validation proof:
  product-spine report shows completed lessons greater than Task 22U baseline
  route packet report shows more selected packet families and fewer routeCapacity.fact_relation_missing rejections
  compiler/realizer tests show new packets produce concrete prompts, learner answers, proof targets, and writeback facts without generic question words
```

**Missing components this task must add or prove unnecessary:**

```text
reachable possession/use route from have book/bag
reachable request/detail route from need notebook/pen
reachable preference/contrast route from want tea/meat
reachable place/time detail route from go school/home
reachable feeling/reason route from feel hungry/thirsty
reachable study/topic/place route from study topic/place
at least one route packet that changes the second exchange job rather than only replacing the object noun
report grouping that separates route-capacity blockers from coherence, compiler, metadata, and memory blockers
```

**Validation matrix:**

| blocker | expected after Task 22V | proof |
|---|---|---|
| `sameVisibleTranscriptRecent` is first post-graduation stop | blocker moves later or reports a more specific owner | `a1_product_spine_progression_audit.dart --scenario brand_new --lessons 40` |
| `routeCapacity.fact_relation_missing` dominates packet rejection | rejection count drops and selected packet family count rises | product-spine report route packet section |
| new route packet only exists in registry but cannot render | failing compiler/realizer test before implementation, passing after | `a1_typed_move_realizer_test.dart`, `a1_product_lesson_compiler_contract_test.dart` |
| new packets become hardcoded arc scripts | no-legacy/no-transcript guard continues to pass | typed route packet no-legacy guard |
| route capacity expands but output remains one shell | unique question demands or move sequences increase | product-spine diversity section |

**Candidate route capacity targets:**

```text
reason_from_known_action
sequence_two_events
contrast_two_preferences
where_detail_from_known_place
when_detail_from_known_time
person_reference_shift
negative_preference_or_need
future_plan
repair_then_continue
description_attribute_detail
```

**Files likely to change:**

- `packages/learning_core/lib/src/a1_typed_route_packet_registry.dart`
- `packages/learning_core/lib/src/a1_typed_route_packet_candidate_builder.dart`
- `packages/learning_core/lib/src/a1_dialogue_move_sequence_planner.dart`
- `packages/learning_core/lib/src/a1_surface_pattern_inventory.dart`
- `packages/learning_core/lib/src/a1_typed_move_realizer.dart`
- `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- `packages/learning_core/lib/src/a1_typed_composition_readiness_sweep.dart`
- `packages/learning_core/test/a1_typed_route_packet_registry_test.dart`
- `packages/learning_core/test/a1_typed_route_packet_candidate_builder_test.dart`
- `packages/learning_core/test/a1_typed_move_realizer_test.dart`
- `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`
- `packages/learning_core/test/a1_typed_composition_readiness_sweep_test.dart`

**Required tests before implementation:**

```text
1. A route-capacity unit test proving at least one new packet per chosen axis is selectable from seeded memory.
2. A compiler/realizer test proving each selected packet compiles without generic prompts.
3. A product-spine test proving brand-new completed lesson count improves beyond the Task 22U baseline.
4. A diversity assertion proving unique question demands, move sequences, or packet families increased.
5. A no-legacy guard proving old arc/runtime collaborators are still absent.
```

**Required report fields before exit:**

```text
Task 22U baseline completed lessons
Task 22V completed lessons
first blocker owner/code
route packet attempts/selected/rejected
routeCapacity.fact_relation_missing count
selected packet family count
unique question demand count
unique move-sequence count
generic prompt fallback count
visible transcript repeat count
legacy/fallback used
```

**Expected exit criteria:**

```text
brand-new completed lessons > Task 22U baseline
first blocker later than Task 22U baseline or more specific than sameVisibleTranscriptRecent
generic prompt fallback count == 0
visible transcript repeats == none
legacy/fallback used == false
route packet family count increases
```

**Implementation result, 2026-06-05:**

- Added bootstrap-reachable typed route packets for request/detail, want/preference contrast, feeling/reason, and study topic/place, using facts the current brand-new bootstrap already writes.
- Added matching surface-pattern inventory rows and typed move realization so these packets produce concrete, non-generic tutor/learner turns.
- Added candidate-builder and realizer tests proving bootstrap-like memory unlocks the new packets and each packet renders visibly distinct output.
- Updated product-spine proof so the brand-new run now completes 21/40 lessons instead of the Task 22U baseline of 15/40.
- Current first blocker remains `sameVisibleTranscriptRecent`, but it occurs later after more typed route capacity is exercised.
- Regenerated `docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md`.

## Task 22W: Growth Controller Pressure/Cooldown And Route-Capacity-Aware Selection

**Purpose:** Replace the current mostly threshold-driven growth behavior with a deterministic pressure/cooldown controller that chooses lexical, relation, composition, form, thought-depth, or refresh growth only when a renderable candidate exists.

**Depends on:** Task 22U and the first Task 22V route-capacity expansion. Do not implement until there is enough route capacity for the controller to make meaningful choices.

**Goal:** The backend product-spine audit should show lesson-to-lesson movement across growth axes, including thought-depth or form growth when readiness and route capacity permit it.

**Architecture rule:** The controller must score `axis + usable candidate capacity`, not axis alone. If an axis has zero renderable candidates, it may produce a diagnostic but must not be selected as the lesson goal.

**Blocker-removal contract:**

```text
blocker found:
  growth mode is mostly threshold-driven
  brand-new run reaches support count 30, while thought-depth requires 32 and never proves whether it has usable candidate capacity
  lexical and relation growth can keep advancing without a clear reason why form, thought-depth, composition, or refresh were not chosen

component responsible:
  growth-axis controller, generation mode policy, robust candidate generator, product coordinator trace, product-spine report

missing capability:
  deterministic arbitration over axis plus renderable candidate capacity, with cooldown and pressure traces

validation proof:
  product-spine report prints every growth axis score, readiness, usable candidate count, selected axis, selected candidate id, and blocked alternatives
  tests prove an axis with zero candidates cannot be selected
  tests prove repeated lexical growth cools down when another renderable axis is ready
```

**Missing components this task must add or prove unnecessary:**

```text
A1GrowthAxisController input model with memory readiness, recent axis history, route capacity counts, proof burden, and repetition risk
A1GrowthAxisDecision output model with selected axis, selected candidate id, score terms, blocked alternatives, and owner-coded suppressions
axis pressure ledger in product-spine report
cooldown terms for recently repeated lexical/relation choices
route-capacity gate that suppresses advanced axes with zero renderable candidates
degradation ladder that tries thought-depth, composition, relation, form, lexical, refresh/repair with owned blocker traces
```

**Validation matrix:**

| blocker | expected after Task 22W | proof |
|---|---|---|
| controller selects by thresholds only | score ledger explains selection and rejected alternatives | `a1_growth_axis_controller_test.dart` and product-spine report |
| thought-depth/form never gets a chance | axis appears when readiness and route capacity permit, or report names zero usable capacity | brand-new and seeded rich-history progression reports |
| controller chooses an unrenderable axis | test proves zero-candidate axes are suppressed | `a1_growth_axis_controller_test.dart` |
| lexical growth dominates because it is always safe | cooldown lowers repeated lexical score when another axis is ready | controller unit test and report score terms |
| generation stops with vague blocker | report names first owner and blocked axis alternatives | product-spine report blocker pressure section |

**Controller shape:**

```text
axisScore =
  readiness
+ learningValue
+ memoryPressure
+ routeCapacity
+ firstUseBonus
+ priorityValue
- recentAxisCooldown
- proofBurden
- renderRisk
- repetitionRisk
```

**Growth axes:**

```text
lexical_growth
relation_growth
composition_growth
form_growth
thought_depth_growth
refresh_repair
```

**Files likely to change:**

- Create: `packages/learning_core/lib/src/a1_growth_axis_controller.dart`
- Create: `packages/learning_core/test/a1_growth_axis_controller_test.dart`
- Modify: `packages/learning_core/lib/src/a1_product_growth_mode_policy.dart`
- Modify: `packages/learning_core/lib/src/a1_generation_mode_policy.dart`
- Modify: `packages/learning_core/lib/src/a1_product_coordinator.dart`
- Modify: `packages/learning_core/lib/src/a1_product_robust_candidate_generator.dart`
- Modify: `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- Modify: `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`

**Required report additions:**

```text
Growth Axis Pressure
- lexical score/readiness/candidate count
- relation score/readiness/candidate count
- composition score/readiness/candidate count
- form score/readiness/candidate count
- thought-depth score/readiness/candidate count
- refresh/repair score/readiness/candidate count
- selected axis
- selected candidate id
- blocked alternatives by owner
```

**Required tests before implementation:**

```text
1. Controller unit test: lexical wins for a brand-new profile only when non-lexical candidate capacity is zero.
2. Controller unit test: relation/composition wins over lexical when lexical was used recently and relation/composition has renderable candidates.
3. Controller unit test: thought-depth is suppressed with owner routeCapacity.zero_candidate_count when no thought-depth route can compile.
4. Controller unit test: thought-depth or form wins when readiness, verified forms, and route capacity are present.
5. Product-spine test: brand-new report includes Growth Axis Pressure for every lesson after bootstrap begins.
6. No-legacy guard: controller cannot call old arcs, bridge harnesses, seed fallback, routine fallback, or transcript parsing.
```

**Expected exit criteria:**

```text
brand-new run shows at least three growth axes after bootstrap starts
first thought-depth or form growth appears when route capacity and readiness permit
lexical growth receives cooldown after repeated use
advanced axes are suppressed when candidate capacity is zero
blocked alternatives are reported with owner codes
no old arc, bridge, routine, seed fallback, or transcript parsing participates
```

**Implementation result, 2026-06-05:**

- Wired robust compiled lessons to use the selected typed candidate's growth axis when a renderable candidate exists, instead of always preserving the threshold policy's `relationGrowth` label.
- Added growth-axis trace terms showing the policy mode and the candidate-selected mode.
- Added a `Growth Axis Pressure` report section to the product-spine report.
- The brand-new 40-lesson report now shows first thought-depth growth at lesson 15.
- This is the first route-capacity-aware arbitration slice. A fuller standalone `A1GrowthAxisController` with per-axis score tables and zero-candidate suppression remains the next deeper controller implementation if tuning shows axis selection still feels unstable.

## Task 22X: Typed Expansion Quality Rules

**Purpose:** Prevent the typed generator from passing simply because it can produce more lessons. This slice adds quality metrics and typed blockers for shallow, repetitive, non-expanding output after route capacity and growth-axis reporting give the system enough candidate breadth to judge fairly.

**Depends on:** Task 22U and at least the first route-capacity expansion in Task 22V. Some checks may also depend on Task 22W if they need growth-axis pressure data.

**Goal:** A backend run should fail product-quality gates when it produces many valid but shallow slot-swap lessons, repeated openings, repeated learner-answer bodies, unsupported topic/time/person shifts, weak follow-ups, or route-family dominance.

**Architecture rule:** Quality checks should be typed structural checks, not naturalness polishing. AI may later improve surface naturalness, but deterministic quality must first prove the conversation changes job, relation, route, form, or thought depth.

**Blocker-removal contract:**

```text
blocker found:
  route capacity can increase lesson count while still producing shallow slot swaps, repeated openings, weak follow-ups, or one-family dominance

component responsible:
  typed coherence validator, typed candidate scoring, product-spine report, readiness sweep report

missing capability:
  deterministic quality gates that recognize "valid but poor product behavior" using typed route/move/relation/fingerprint evidence

validation proof:
  tests fail a candidate pool that repeats opening prompts, learner answer bodies, question demands, or route families beyond configured caps
  reports expose quality warnings separately from hard blockers so tuning does not hide capacity gains
```

**Missing components this task must add or prove unnecessary:**

```text
opening prompt fingerprint
learner answer body fingerprint
question demand id dominance counter
route family dominance counter
move-sequence dominance counter
follow-up answerability check
topic/time/person bridge requirement
reason/sequence/contrast anchor checks
thought-depth/form stagnation warning across long runs
qualityExpansion warning and blocker owner codes
```

**Validation matrix:**

| blocker | expected after Task 22X | proof |
|---|---|---|
| many lessons complete but feel like slot swaps | report shows route family, question demand, move sequence, opening, and answer dominance | product-spine report quality section |
| repeated openings sneak through because visible transcript differs slightly | opening prompt fingerprint flags repeat pressure | coherence/scoring unit test |
| follow-up asks for unsupported detail | candidate rejected with answerability owner code | `a1_coherence_validator_test.dart` |
| quality gates overconstrain capacity | warnings are separated from hard blockers and report owner/action | product-spine report |
| AI is used to solve deterministic structure | no AI dependency; deterministic typed data only | no-legacy/no-AI guard or source scan |

**Quality risks to cover:**

```text
repeated opening prompt
repeated learner answer body
same surface pattern stale repeat
same question demand dominance
same route family dominance
follow-up asks for a detail the answer cannot supply
topic/time/person shift without bridge
reason question without enough anchor context
sequence/contrast/reason claims without compatible facts
many lessons completed but no thought-depth/form expansion
```

**Files likely to change:**

- `packages/learning_core/lib/src/a1_coherence_validator.dart`
- `packages/learning_core/lib/src/a1_dialogue_candidate_scoring.dart`
- `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- `packages/learning_core/lib/src/a1_typed_composition_readiness_sweep.dart`
- `packages/learning_core/test/a1_coherence_validator_test.dart`
- `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`
- `packages/learning_core/test/a1_typed_composition_readiness_sweep_test.dart`

**Required report additions:**

```text
unique opening prompt count
repeated opening prompt count
repeated learner answer body count
question demand dominance
route family dominance
unique relation type count
unique thought-depth rung count
connector usage count
verified form axis coverage
qualityExpansion warnings/blockers
```

**Required tests before implementation:**

```text
1. Coherence/scoring test: repeated opening prompt is penalized or rejected according to threshold.
2. Coherence/scoring test: repeated learner answer body is penalized or rejected according to threshold.
3. Coherence/scoring test: follow-up requiring a reason/detail is rejected when candidate facts cannot answer it.
4. Product-spine test: report prints dominance and qualityExpansion fields.
5. Readiness sweep test: rich saved memory cannot pass the meaningful floor by repeating one family or one move sequence.
6. Guard test: quality rules operate on typed candidate fields, not transcript parsing or legacy arc names.
```

**Expected exit criteria:**

```text
generic prompt fallback count == 0
visible transcript repeats == none
repeated opening/answer body counts are reported
route family dominance is reported
quality blockers name structural owners, not vague naturalness
AI remains deferred; quality rules operate on deterministic typed data
```

**Implementation result, 2026-06-05:**

- Added deterministic quality-expansion metrics to the product-spine report:
  - repeated opening prompt count;
  - repeated learner answer body count;
  - route family dominance;
  - question demand dominance;
  - unique route family count;
  - unique route fingerprint count.
- Added product-spine tests requiring the quality section to be present in the long brand-new run.
- This is a reporting/diagnostic slice, not the full hard-blocking quality gate. Follow-up quality work can now use these metrics to decide whether to penalize or reject shallow output.

## Task 22Y: Compiler To UI Payload Parity Proof

**Purpose:** Prove the first-class compiler package can survive the app adapter/UI evidence loop without losing proof targets, writeback facts, route fingerprints, grammar/form axes, metadata source ids, or selected conversation turns.

**Depends on:** Task 22V, Task 22W, and Task 22X backend reports. Do not use this task to compensate for backend generation weakness. If backend progression still blocks before producing enough first-class compiled packages, return to the first backend owner.

**Goal:** The UI should remain a visualizer and evidence collector. It should not reinterpret pedagogy, replace canonical proof targets with concrete details, or infer memory writes from transcript text.

**Blocker-removal contract:**

```text
blocker found:
  Task 22Q created a first-class compiler package, but real app rendering and completion may still read old payload assumptions

component responsible:
  app adapter, Focus session gateway, lesson presenter, evidence writer, learner memory repository, progress projection

missing capability:
  parity proof that compiler-owned UI stages, proof contract, writeback contract, metadata ids, route fingerprints, and typed evidence reach the UI path and then return to memory/read projection

validation proof:
  UI-started test renders a compiled package, completes final conversation through the real completion path, writes memory from compiler contracts, reloads memory, and shows the next backend start consuming that memory
```

**Missing components this task must add or prove unnecessary:**

```text
adapter from A1CompiledLessonPackage to the mobile lesson/session payload
stable mapping for stage ids and final conversation ids
stable mapping for bounded typing box ids when form growth is present
proof/writeback contract passthrough from compiler package to FocusEvidenceWriter
metadata source id passthrough for selected support/growth targets
route/frame/fingerprint passthrough for route novelty and progress projection
repository read/projection parity check after UI completion
progress display binding that reads compiler/writeback-derived memory rather than legacy arc labels
```

**Files likely to change:**

- `apps/mobile/lib/features/practice/focus_mastery_plan_gateway.dart`
- `apps/mobile/lib/features/practice/focus_evidence_writer.dart`
- `apps/mobile/lib/shared/persistence/learner_memory_repository.dart`
- `apps/mobile/test/focus_ui_memory_balanced_progression_test.dart`
- `apps/mobile/test/a1_ui_completion_memory_regression_audit_test.dart`
- `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`
- `packages/learning_core/test/a1_product_lesson_compiler_contract_test.dart` only if a missing compiler field is discovered

**Validation matrix:**

| blocker | expected after Task 22Y | proof |
|---|---|---|
| UI renders old/legacy lesson shape | UI payload originates from `A1CompiledLessonPackage` | UI test trace or adapter assertion |
| canonical proof target is replaced by concrete detail target | both canonical and detail evidence are written with correct roles | UI completion memory regression test |
| route/fingerprint memory is dropped | next start sees route/fingerprint evidence in projected memory | UI completion plus next-start test |
| form/grammar proof cannot round-trip | bounded typing ids and grammar targets write/read when present | form-growth UI fixture test |
| progress display disagrees with coordinator memory | progress projection reads same written evidence | progress assertion in UI audit |

**Required tests before implementation:**

```text
1. UI adapter test: a compiled bootstrap package renders stages and final conversation without legacy arc materializer input.
2. UI adapter test: a compiled robust typed package renders selected turns, route ids, metadata ids, proof ids, and writeback ids.
3. UI completion test: final conversation completion writes canonical proof targets, concrete detail evidence, semantic facts, grammar axes, and route fingerprints.
4. Next-start test: after UI completion, `FocusMasteryPlanGateway` reloads memory and the product coordinator trace contains memoryProfile.profile_consumed plus the written route/fact ids.
5. Progress test: progress projection reflects the same proof/writeback evidence used by coordinator selection.
6. No-legacy guard: UI adapter does not call old arc catalog/instantiator, metadata-backed bridge, seed/routine fallback, or transcript parsing to recover missing fields.
```

**Expected exit criteria:**

```text
backend compiled package is the source of UI lesson payload
UI completion writes compiler-owned proof and writeback contracts
next backend start consumes UI-written memory
progress projection and coordinator projection agree on proof/fact/route evidence
no legacy app materializer rescue path participates
remaining failures name compiler, UI adapter, evidence writer, repository projection, or progress owner codes
```

**Implementation result, 2026-06-05:**

- Added `A1CompiledLessonFocusPlanAdapter` in `learning_core`.
- The adapter converts an `A1CompiledLessonPackage` into a bound `FocusLessonPlan` while preserving:
  - bound conversation turns;
  - final conversation stage;
  - canonical proof targets;
  - compiler proof contract;
  - memory write requirements;
  - route fingerprints and metadata source trace.
- Added `a1_compiled_lesson_focus_plan_adapter_test.dart` proving compiler package to Focus plan proof parity.
- Important remaining gap: the mobile `FocusMasteryPlanGateway` still uses `FocusCoordinator.createA1ConversationArcFocusPlan` for normal Focus. The new adapter creates the first-class UI payload boundary, but the app path still needs a subsequent gateway/session wiring slice before full UI evidence-loop parity can be claimed.

## Task 22Z: Progression Gate Harness And Next-Work Decision

**Purpose:** Upgrade the product-spine progression harness from "show me the lessons" to "tell me which product capability is failing and which large repair bundle should be worked on next."

**Depends on:** Task 22R, Task 22V, Task 22W, Task 22X, and Task 22Y. Do not use this task to add more route packets or tune lesson wording. This task must make the current failure shape measurable before more generator work happens.

**Goal:** Prevent endless small transcript patches by evaluating every product-spine run against explicit progression gates: bootstrap exit, vocabulary growth, rung/thought-depth growth, grammar/form growth, route novelty, semantic use, saturation behavior, compiler/writeback, and failure explanation.

**Blocker-removal contract:**

```text
blocker found:
  richer seeded memory and route-capacity additions prove the product path can run,
  but the typed generator still collapses into narrow route pockets and barely tests
  rungs, grammar axes, or semantic expansion

component responsible:
  product-spine harness, growth diagnostics, quality diagnostics, route-capacity
  diagnosis, compiler/writeback diagnosis, and next-work recommendation logic

missing capability:
  one report section that classifies each product axis as pass/warning/fail/unmeasured
  and recommends the next large repair bundle instead of a small local patch

validation proof:
  tests prove the report renders gate statuses, owner-coded evidence, and a prioritized
  next-work recommendation; regenerated reports identify the current next subsystem
  repair area from real product-spine runs
```

**Files:**

- Modify: `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- Modify: this plan
- Modify: `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- Modify: `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`
- Regenerate: `docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md`
- Regenerate or create: scenario-specific product-spine reports as needed for `composition_ready` and `large_vocab`

**Required tests before implementation:**

```text
1. Gate report renders a "Progression Gates" section with every required gate.
2. Long brand-new run marks no legacy fallback and compiler/writeback as passing when memory writes project forward.
3. Long brand-new or rich-memory run marks route novelty/saturation as warning or fail when same-visible-transcript or dominance pressure blocks progression.
4. Report renders "Recommended Next Work" with a large repair bundle such as typed_generator_expansion_bundle, growth_rung_controller_bundle, or compiler_ui_parity_bundle.
5. The recommendation includes multiple concrete repair surfaces, not a one-line local patch.
```

**Gate definitions:**

| gate | pass | warning | fail | unmeasured |
|---|---|---|---|---|
| bootstrap exit | typed composition starts and later lessons continue | typed composition starts but soon blocks | policy advances but generator stays bootstrap or exits into immediate repeat | scenario never reaches eligibility |
| vocabulary growth | new growth targets are written and later consumed | lexical growth works but dominates too long | memory writes do not affect target selection | scenario has no growth targets |
| rung/thought-depth growth | non-lexical and thought-depth modes produce valid lessons | thought-depth appears in narrow route pockets | non-lexical policy fires but output stays simple Q/A | scenario cannot support depth |
| grammar/form growth | grammar axes or form-growth mode appear and write/read | metadata suggests readiness but output remains limited | form growth is selected but cannot compile | scenario lacks form metadata |
| route novelty/saturation | route families and fingerprints vary without repeats | variety exists but dominance/repeated openings are high | same transcript/route/pocket blocks run | not enough lessons |
| semantic use | written semantic facts affect later routes | facts are written but reused narrowly | facts are inert or projected away | scenario has no facts |
| compiler/writeback | compiler package writes proof/writeback consumed next lesson | package compiles but app path remains unwired | compiled package missing or memory projection mismatches | no compiled lesson |
| failure explanation | blocker owner and repair bundle are named | blocker is named but repair is broad | blocker is vague or hidden by fallback | no blocker and no long run |

**Implementation steps:**

- [x] **Step 1: Add failing gate-report tests**

Add expectations to `packages/learning_core/test/a1_product_spine_progression_audit_test.dart` requiring:

```dart
expect(report.toMarkdown(), contains('## Progression Gates'));
expect(report.toMarkdown(), contains('Bootstrap exit'));
expect(report.toMarkdown(), contains('Route novelty / saturation'));
expect(report.toMarkdown(), contains('## Recommended Next Work'));
expect(report.toMarkdown(), contains('typed_generator_expansion_bundle'));
expect(report.toMarkdown(), contains('large repair bundle'));
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_spine_progression_audit_test.dart -r expanded
```

Expected: FAIL because the report does not yet render progression gates or the next-work recommendation.

- [x] **Step 2: Implement gate status models inside the existing harness**

In `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`, add focused immutable types:

```dart
enum A1ProductSpineGateStatus { pass, warning, fail, unmeasured }

final class A1ProductSpineProgressionGateRow {
  const A1ProductSpineProgressionGateRow({
    required this.name,
    required this.status,
    required this.evidence,
    required this.nextAction,
  });
}

final class A1ProductSpineNextWorkRecommendation {
  const A1ProductSpineNextWorkRecommendation({
    required this.bundleId,
    required this.summary,
    required this.repairSurfaces,
  });
}
```

Keep them in the harness file for now. Split later only if the file becomes hard to scan.

- [x] **Step 3: Derive gate rows from the existing run data**

Compute gates from existing report fields:

```text
bootstrap exit -> transitionDiagnostics.firstNonBootstrapGenerationLessonNumber
vocabulary growth -> memoryLedger growth/final proof writes and consumption
rung growth -> firstNonLexicalGrowthLessonNumber and firstThoughtDepthGrowthLessonNumber
grammar/form growth -> grammarAxisIds and selected formGrowth mode
route novelty/saturation -> repeated openings, learner answer repeats, route family dominance, first blocker
semantic use -> semanticFactIds written and consumed
compiler/writeback -> compiled lessons, memory ledger, projection mismatches
failure explanation -> first blocker and blockerPressure owner counts
```

Do not parse semantics out of transcripts. Use only compiler package fields, ledger rows, growth rows, fingerprints, and blocker owners.

- [x] **Step 4: Add next-work recommendation logic**

The recommendation must choose a large bundle:

```text
typed_generator_expansion_bundle:
  when route novelty/saturation fails or rich memory still collapses into narrow route pockets

growth_rung_controller_bundle:
  when grammar/form/rung gates fail before route saturation, or policy chooses axes without viable candidates

compiler_ui_parity_bundle:
  when compiler/writeback is warning/fail because the app adapter or projection path is the first owner

memory_projection_bundle:
  when raw writes exist but projection mismatches or next lessons do not consume them
```

The selected recommendation must include at least four repair surfaces so the output does not encourage a small patch.

- [x] **Step 5: Render sections**

Extend `A1ProductSpineProgressionAuditReport.toMarkdown()` with:

```text
## Progression Gates
| Gate | Status | Evidence | Next action |

## Recommended Next Work
- Bundle: typed_generator_expansion_bundle
- Why this bundle: ...
- Large repair bundle: ...
- Repair surfaces:
  - route packet registry
  - move-sequence planner
  - follow-up planner / question demand coverage
  - typed coherence and anti-repeat scoring
  - surface realizer / compiler acceptance
```

- [x] **Step 6: Run tests**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_spine_progression_audit_test.dart \
  -r expanded
```

Expected: PASS.

- [x] **Step 7: Regenerate reports**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart run \
  tool/a1_product_spine_progression_audit.dart \
  --scenario brand_new \
  --lessons 40 \
  --out ../../docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md

/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart run \
  tool/a1_product_spine_progression_audit.dart \
  --scenario composition_ready \
  --lessons 24 \
  --out ../../docs/superpowers/audits/2026-06-05-a1-product-spine-composition-ready-harness.md

/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart run \
  tool/a1_product_spine_progression_audit.dart \
  --scenario large_vocab \
  --lessons 24 \
  --out ../../docs/superpowers/audits/2026-06-05-a1-product-spine-large-vocab-harness.md
```

Expected: each report includes `## Progression Gates` and `## Recommended Next Work`.

- [x] **Step 8: Report the current decision**

Read the regenerated reports and summarize:

```text
current next large repair bundle
why it is first
which gates are red/yellow
which gates are green enough to avoid reopening right now
which task should follow Task 22Z
```

Do not commit unless explicitly asked.

**Expected exit criteria:**

```text
product-spine reports tell us what to fix next at subsystem-bundle level
route/rung/grammar/semantic/compiler gates are visible
current blocker is classified without falling back to transcript vibes
report recommends a large repair bundle, not a small local patch
tests prove the gate and recommendation sections stay present
```
**Implementation result, 2026-06-05:**

- Added progression gate diagnostics to `A1ProductSpineProgressionAuditReport` for bootstrap exit, vocabulary growth, rung/thought-depth growth, grammar/form growth, route novelty/saturation, semantic use, compiler/writeback, and failure explanation.
- Added a bundle-level next-work recommendation section that chooses among `typed_generator_expansion_bundle`, `growth_rung_controller_bundle`, `compiler_ui_parity_bundle`, and `memory_projection_bundle` from real report evidence.
- Updated `a1_product_spine_progression_audit_test.dart` so long brand-new and composition-ready runs must render gate statuses and a broad repair recommendation.
- Regenerated the brand-new, composition-ready, and large-vocabulary product-spine reports. All three recommend `typed_generator_expansion_bundle`. The repeated current finding is: backend memory write/read and compiler package writeback are green enough for this slice, typed composition is reachable, but route novelty/saturation is red because the generator still collapses into narrow route pockets and blocks on `sameVisibleTranscriptRecent`.
- This means the next work should not be a small transcript patch. It should repair the connected typed-generator surfaces together: route packet registry, move-sequence planner, follow-up/question-demand coverage, typed coherence and anti-repeat scoring, surface realizer/compiler acceptance, and route-family cooldown/rerouting policy.

## Task 23A: Typed Generator Expansion Blocker Audit

**Purpose:** Decompose `typed_generator_expansion_bundle` into concrete failing surfaces and produce an actionable repair sequence that fixes the broken typed generator as a connected subsystem rather than through small transcript patches.

**Depends on:** Task 22Z. Do not add route packets, change scoring, or tune realizer output in this task. This task explains what to fix next and protects against forcing bad product moves.

**Goal:** When route novelty/saturation fails, the report should answer why no valid alternative lesson was selected and what bundle-sized repair sequence should follow.

**Blocker-removal contract:**

```text
blocker found:
  Task 22Z reports typed_generator_expansion_bundle, but that is still too broad
  to implement safely without knowing whether route packets, fact compatibility,
  realizer/compiler acceptance, coherence, scoring, or rung/form coverage is first

component responsible:
  product-spine audit report, typed route packet pressure extraction, quality
  metrics, progression gates, and bundle-level repair planning

missing capability:
  typed-generator expansion blocker audit with rows for route packet coverage,
  fact compatibility, surface/realizer/compiler, coherence and anti-repeat,
  scoring and rerouting, rung/grammar readiness, and product move guardrails

validation proof:
  tests prove the report renders blocker surfaces, safety guardrails, and an
  actionable repair plan; regenerated reports use current product-spine evidence
  to recommend the next repair sequence
```

**Files:**

- Modify: `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- Modify: this plan
- Modify: `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- Modify: `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`
- Regenerate: `docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md`
- Regenerate: `docs/superpowers/audits/2026-06-05-a1-product-spine-composition-ready-harness.md`
- Regenerate: `docs/superpowers/audits/2026-06-05-a1-product-spine-large-vocab-harness.md`

**Required tests before implementation:**

```text
1. Product-spine report renders "Typed Generator Expansion Blocker Audit".
2. The audit includes route packet coverage, fact compatibility, surface/realizer/compiler, coherence and anti-repeat, scoring and rerouting, rung/grammar readiness, and product move guardrail rows.
3. The report renders "Expansion Safety Guardrails" and states "desired growth axis is not generation permission".
4. The report renders "Actionable Typed Generator Repair Plan" with multiple ordered steps.
5. The repair plan is bundle-sized and includes route packets, move sequences, realizer/compiler acceptance, typed coherence fixtures, scoring/rerouting, and progression gate verification.
```

**Guardrail rules:**

```text
A product move cannot pass because a target move merely appears.
It passes only when the move is selected from typed candidates, survives
semantic compatibility, metadata/form readiness, coherence, anti-repeat,
proof-burden, compiler materialization, and memory writeback.

If a desired move has no valid candidates, the product path must block or
degrade intentionally to another valid axis. It must not force contrast,
sequence, grammar movement, or ask-back just to satisfy a product metric.
```

**Implementation steps:**

- [x] **Step 1: Add failing report tests**

Add expectations to `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`:

```dart
expect(markdown, contains('## Typed Generator Expansion Blocker Audit'));
expect(markdown, contains('Route packet coverage'));
expect(markdown, contains('Fact compatibility'));
expect(markdown, contains('Surface/realizer/compiler'));
expect(markdown, contains('Coherence and anti-repeat'));
expect(markdown, contains('Scoring and rerouting'));
expect(markdown, contains('Rung/grammar readiness'));
expect(markdown, contains('Product move guardrail'));
expect(markdown, contains('desired growth axis is not generation permission'));
expect(markdown, contains('## Actionable Typed Generator Repair Plan'));
expect(markdown, contains('Expand typed route capacity'));
```

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_spine_progression_audit_test.dart -r expanded
```

Expected: FAIL because the report does not yet render the expansion blocker audit.

- [x] **Step 2: Add typed generator blocker rows**

In `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`, derive rows from existing run data:

```text
route packet coverage -> considered/selected packet counts, unique family count, route dominance
fact compatibility -> routeCapacity.fact_relation_missing counts
surface/realizer/compiler -> generic prompt fallback count, compiler blockers, metadata/surface blockers
coherence and anti-repeat -> sameVisibleTranscriptRecent, arcCoherence blockers, repeated openings/answers
scoring and rerouting -> dominance while selected packets exist
rung/grammar readiness -> thought-depth/form-growth signals and question demand dominance
product move guardrail -> no forced pass if validation or compiler evidence is missing
```

- [x] **Step 3: Render safety guardrails**

Add a report section:

```text
## Expansion Safety Guardrails
- desired growth axis is not generation permission
- Product move passes only after typed candidate selection, validation, compiler materialization, writeback, and anti-repeat checks.
- If no valid candidates exist, block or degrade intentionally; do not force malformed product movement.
```

- [x] **Step 4: Render actionable repair plan**

The plan should list the next repair sequence:

```text
1. Expand typed route capacity.
2. Add move-sequence and answer-demand coverage.
3. Add surface realizer and compiler acceptance.
4. Add typed coherence fixtures.
5. Add scoring and rerouting pressure.
6. Re-run progression gates and reject safety regressions.
```

- [x] **Step 5: Run tests and analyzer**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_spine_progression_audit_test.dart -r expanded

/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart analyze \
  lib/src/a1_product_spine_progression_audit.dart \
  test/a1_product_spine_progression_audit_test.dart
```

Expected: PASS and no analyzer issues.

- [x] **Step 6: Regenerate scenario reports**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart run \
  tool/a1_product_spine_progression_audit.dart \
  --scenario brand_new \
  --lessons 40 \
  --out ../../docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md

/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart run \
  tool/a1_product_spine_progression_audit.dart \
  --scenario composition_ready \
  --lessons 24 \
  --out ../../docs/superpowers/audits/2026-06-05-a1-product-spine-composition-ready-harness.md

/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart run \
  tool/a1_product_spine_progression_audit.dart \
  --scenario large_vocab \
  --lessons 24 \
  --out ../../docs/superpowers/audits/2026-06-05-a1-product-spine-large-vocab-harness.md
```

Expected: each report includes blocker rows, guardrails, and the actionable repair plan.

- [x] **Step 7: Report next implementation scope**

Summarize:

```text
which typed-generator surface is most constrained
which surfaces are already green enough
what the next repair task should include
which safety guardrails must remain hard gates
```

Do not commit unless explicitly asked.

**Expected exit criteria:**

```text
typed_generator_expansion_bundle is decomposed into exact repair surfaces
the report explains why alternatives are unavailable when route novelty fails
the report prevents forced bad moves by requiring typed candidates to pass validation and compiler gates
the next implementation scope is a large connected repair sequence, not a small patch
```

**Implementation result, 2026-06-05:**

- Added `## Typed Generator Expansion Blocker Audit` to `A1ProductSpineProgressionAuditReport`.
- The blocker audit now decomposes the generic `typed_generator_expansion_bundle` into route packet coverage, fact compatibility, surface/realizer/compiler, coherence and anti-repeat, scoring and rerouting, rung/grammar readiness, and product move guardrail rows.
- Added `## Expansion Safety Guardrails`, explicitly preserving the rule: desired growth axis is not generation permission. A product move only counts when it survives typed candidate selection, validation, compiler materialization, writeback, and anti-repeat checks.
- Added `## Actionable Typed Generator Repair Plan` with the next six-part repair sequence: expand typed route capacity, add move-sequence/question-demand coverage, add realizer/compiler acceptance, add typed coherence fixtures, add scoring/rerouting pressure, then re-run progression gates and reject safety regressions.
- Regenerated brand-new, composition-ready, and large-vocabulary product-spine reports. The common current finding is: surface/realizer/compiler and product move guardrail are passing, memory projection remains clean, but coherence and anti-repeat is failing with `sameVisibleTranscriptRecent`; scoring/rerouting, fact compatibility, and rung/grammar readiness are warning-level depending on scenario.
- The next implementation scope should be a connected typed-generator repair bundle, not a local transcript fix: build route/rung capacity and rerouting together while keeping coherence/compiler validation hard.

## Task 23B: Rung-Aware Learning Trajectory Planner

**Purpose:** Make the backend product spine choose the next logical lesson direction from learner rung, memory, recent history, and validated capacity instead of relying on broad growth mode plus candidate score side effects.

**Depends on:** Task 23A. Do not add new material or broad route-packet content in this task except tiny fixtures needed to prove planner behavior. This task creates the modular trajectory decision layer and proves it can classify current capacity.

**Product rule:** Skill level comes first. Growth direction comes second. Candidate selection comes third.

```text
learner memory and proof state
-> current rung floor and allowed stretch rung
-> candidate next moves at that rung
-> capacity proof for each move
-> selected learning trajectory move
-> typed candidate selection
-> compiler/writeback
```

**Architecture rule:** Rung thresholds, next-move definitions, selection weights, downgrade rules, and capacity thresholds must live in swappable policy/registry surfaces. Do not bury these in `A1DialogueCandidateScoring` or route packet constants.

**Files:**

- Create: `packages/learning_core/lib/src/a1_learning_trajectory.dart`
- Create: `packages/learning_core/lib/src/a1_learning_trajectory_policy.dart`
- Create: `packages/learning_core/lib/src/a1_learning_trajectory_planner.dart`
- Modify: `packages/learning_core/lib/src/a1_product_robust_candidate_generator.dart`
- Modify: `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Test: `packages/learning_core/test/a1_learning_trajectory_planner_test.dart`
- Test: `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`

**New modular surfaces:**

```text
A1RungPlacementPolicy
  owns rung floor, stretch rung, refresh exception, and downgrade floor rules

A1NextMoveRegistry
  owns move ids, move families, required signals, preferred rung bands, and priority order

A1LearningTrajectoryPolicy
  owns capacity thresholds, overuse thresholds, downgrade behavior, and scoring weights

A1LearningTrajectoryPlanner
  consumes candidates, recent history, growth input, and policy; emits selected move and rejected move rows

A1LearningTrajectoryDecision
  serializable report object with selected rung, selected move, capacity counts, rejected owners, and downgrade reason
```

**Required tests before implementation:**

```text
1. Rung-5 learner + reason saturation + valid sequence capacity selects rung-5 sequence/detail/neighboring move, not another reason loop.
2. Rung-5 learner + contrast desired but only rung-1 contrast capacity blocks or downgrades within rung floor; it does not select rung-1 contrast.
3. Brand-new learner receives rung-1/rung-2 bootstrap permission.
4. Planner output includes selectedRungFloor, selectedMoveId, preferredMoveId, downgradeReason, capacity counts, and owner-coded rejected moves.
5. Product-spine report prints trajectory decision rows for every typed-composition lesson.
```

**Implementation steps:**

- [ ] **Step 1: Add trajectory model tests**

Create `packages/learning_core/test/a1_learning_trajectory_planner_test.dart` with tests that construct a small set of fake `A1DialogueCandidate` objects at different rungs/moves. The tests must assert that a higher-rung learner never satisfies a move by dropping below their rung floor unless the selected move is `refresh_repair`.

- [ ] **Step 2: Implement immutable trajectory model types**

Create `a1_learning_trajectory.dart` with:

```text
A1LearningTrajectoryMoveId
A1LearningTrajectoryMove
A1LearningTrajectoryCandidateCapacity
A1LearningTrajectoryRejectedMove
A1LearningTrajectoryDecision
```

The model must expose `toTraceEntries()` and `toMarkdownRows()` so audits can surface decisions without parsing logs.

- [ ] **Step 3: Implement policy/registry surfaces**

Create `a1_learning_trajectory_policy.dart` with:

```text
A1RungPlacementPolicy.defaults()
A1NextMoveRegistry.defaults()
A1LearningTrajectoryPolicy.defaults()
```

Default moves must include:

```text
route_novelty
detail_growth
reason_growth
contrast_growth
sequence_growth
choice_growth
ask_back_growth
person_shift
tense_shift
polarity_shift
neighboring_island
refresh_repair
```

- [ ] **Step 4: Implement planner**

Create `a1_learning_trajectory_planner.dart`. It should classify candidates by existing fields first:

```text
questionDemandId -> detail/reason/contrast/sequence/choice/ask_back
thoughtDepthRung -> rung band
requiredGrammarAxisIds and shapeTargetIds -> form/person/tense/polarity hints
familyId and recent family ids -> route novelty and neighboring island
score blockers -> capacity rejection owners
```

- [ ] **Step 5: Wire planner into robust generator diagnostics**

Modify `A1ScoredProductRobustCandidateGenerator.select()` so it computes a trajectory decision after candidate generation and before final selected-candidate choice. The first implementation may keep candidate scoring as the final selector, but the selected candidate must be inside the selected move when capacity exists. If no candidate exists inside the selected move, the decision must record an owned downgrade.

- [ ] **Step 6: Add report output**

Extend `A1ProductSpineProgressionAuditReport` with:

```text
## Learning Trajectory Decisions
lesson, rung floor, preferred move, selected move, selected candidate, downgrade reason, capacity counts
```

- [ ] **Step 7: Verify**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_learning_trajectory_planner_test.dart \
  test/a1_product_spine_progression_audit_test.dart \
  -r expanded

/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart analyze \
  lib/src/a1_learning_trajectory.dart \
  lib/src/a1_learning_trajectory_policy.dart \
  lib/src/a1_learning_trajectory_planner.dart \
  lib/src/a1_product_robust_candidate_generator.dart \
  lib/src/a1_product_spine_progression_audit.dart \
  test/a1_learning_trajectory_planner_test.dart \
  test/a1_product_spine_progression_audit_test.dart
```

**Exit criteria:**

```text
trajectory decision is first-class and reportable
rung floor is enforced before growth direction
planner can downgrade intentionally without violating rung floor
selected move/capacity is visible in traces and reports
no route-packet/material expansion is hidden inside this task
```

## Task 23C: Material Capacity Diagnostic And Expansion Fork

**Purpose:** Determine whether the next failure is insufficient authored material or missing system capability, then execute a material expansion only if the trajectory report proves material is the bottleneck.

**Depends on:** Task 23B. Do not change route scoring to hide material gaps. Do not add random vocabulary. Material changes must be capability-led and traceable to trajectory blockers.

**Files:**

- Create: `packages/learning_core/lib/src/a1_material_capacity_audit.dart`
- Create or modify: production A1 material source used by the current typed path
- Modify: `packages/learning_core/lib/learning_core.dart`
- Test: `packages/learning_core/test/a1_material_capacity_audit_test.dart`
- Regenerate: `docs/superpowers/audits/2026-06-05-a1-material-capacity-report.md`
- Modify: this plan with the audit result before Task 23D implementation begins

**Material capacity dimensions:**

```text
contrast pairs by island and rung
sequence-compatible event pairs by island and rung
reason-compatible fact pairs by island and rung
place/time/detail facts
choice pairs
ask-back/social routines
person-shift forms/examples
tense/aspect forms/examples
polarity/negative forms/examples
surface patterns
micro-situations
priority ordering
island balance
```

**Required tests before implementation:**

```text
1. Audit reports before-capacity for contrast, sequence, reason, detail, person shift, tense shift, and polarity.
2. Audit distinguishes material owners from system owners.
3. If material is too thin, report includes exact capacity targets for expansion.
4. If material is sufficient, report says system repair should proceed without material expansion.
```

**Implementation steps:**

- [ ] **Step 1: Write material audit tests**

Create tests that feed the current material registry/adapter into the audit and assert rows like:

```text
moveId: contrast_growth
rungFloor: 4
usableMaterialCount
missingOwner: material.contrast_capacity_too_low or none
```

- [ ] **Step 2: Implement audit model and report**

Create `A1MaterialCapacityAudit` with before/after row support. It must not depend on transcript text.

- [ ] **Step 3: Run current material audit**

Generate `docs/superpowers/audits/2026-06-05-a1-material-capacity-report.md`.

- [ ] **Step 4: Decide fork**

If material rows are red for trajectory-selected moves, update this plan with a concrete material expansion scope before Task 23D. If material is green enough, record that Task 23D should focus on system capacity/rerouting.

- [ ] **Step 5: Conditional material expansion**

If triggered, add material in capability groups:

```text
minimum 6 contrast-compatible facts across at least 3 islands
minimum 5 sequence-compatible pairs across at least 2 islands
minimum 6 reason-compatible pairs across at least 3 islands
minimum person/tense/polarity forms needed by the trajectory planner's first forcing scenarios
```

Exact counts may be adjusted in the audit result, but the plan must record the chosen counts before implementation.

- [ ] **Step 6: Verify material reaches typed path**

Tests must prove new material can become typed candidates. A material row that cannot be selected by the typed path does not count.

**Exit criteria:**

```text
we know whether material or system capability is the first bottleneck
material blockers have exact owner codes and capacity targets
if material was expanded, typed candidate capacity increases in tests
if material was not expanded, Task 23D starts with evidence that system wiring/scoring is the next owner
```

## Task 23D: Capacity-Aware Typed Selection And Rerouting

**Purpose:** Make robust typed selection follow the rung-aware trajectory decision, reroute away from saturated pockets, and keep coherence/compiler gates hard.

**Depends on:** Task 23B and the Task 23C fork result.

**Files:**

- Modify: `packages/learning_core/lib/src/a1_product_robust_candidate_generator.dart`
- Modify: `packages/learning_core/lib/src/a1_dialogue_candidate_scoring.dart`
- Modify: `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- Test: `packages/learning_core/test/a1_product_robust_candidate_generator_test.dart`
- Test: `packages/learning_core/test/a1_dialogue_candidate_scoring_test.dart`
- Test: `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`

**Required behavior:**

```text
candidate scoring consumes trajectory move and rung floor
sameVisibleTranscriptRecent triggers rerouting if another valid candidate exists
route family and question-demand saturation lower priority without allowing incoherent alternatives
selected candidate must be at or above rung floor unless refresh/repair
blocked output names whether no alternative exists because of material, route capacity, coherence, compiler, or scoring
```

**Required tests before implementation:**

```text
1. Recent reason saturation plus valid sequence/detail capacity selects non-reason move.
2. Same visible transcript blocked candidate does not stop selection when another typed candidate passes.
3. Rung floor blocks lower-rung candidate even when lower-rung candidate has higher raw score.
4. If all alternatives fail coherence/compiler, selection blocks with owner code rather than forcing output.
```

**Implementation steps:**

- [ ] **Step 1: Add failing robust-generator selection tests**

In `packages/learning_core/test/a1_product_robust_candidate_generator_test.dart`, add focused tests named:

```text
selects_non_reason_move_when_recent_reason_route_is_saturated
blocks_lower_rung_candidate_even_when_raw_score_is_higher
reroutes_same_visible_transcript_when_valid_alternative_exists
returns_owned_blocker_when_all_trajectory_candidates_fail_hard_gates
```

The fixtures should use deterministic candidate objects with explicit:

```text
questionDemandId
thoughtDepthRung
familyId
visibleTranscript
coherence/pass-fail state
compiler/pass-fail state
recentTranscript history
```

Expected failure before implementation:

```text
sameVisibleTranscriptRecent remains the selected/final blocker even when another trajectory-compatible candidate exists,
or a lower-rung candidate wins because raw score still outranks rung/product direction.
```

- [ ] **Step 2: Add trajectory-aware scoring tests**

In `packages/learning_core/test/a1_dialogue_candidate_scoring_test.dart`, add tests named:

```text
applies_selected_trajectory_move_bonus_only_above_rung_floor
applies_recent_route_saturation_penalty_without_allowing_incoherent_candidates
emits_owner_code_when_candidate_is_rejected_by_trajectory_floor
```

The scoring result must expose traceable reasons such as:

```text
trajectory.selectedMove.match
trajectory.rungFloor.blocked
trajectory.recentRouteSaturation.penalty
trajectory.sameVisibleTranscript.rerouteCandidateAvailable
```

- [ ] **Step 3: Add trajectory-aware score terms and blockers**

Modify `A1DialogueCandidateScoring` so the scoring input can include the selected `A1LearningTrajectoryDecision`. Keep coherence and compiler failure as hard blockers. Add score terms only for candidates that already pass hard gates.

- [ ] **Step 4: Modify robust generator to select within trajectory decision**

Modify `A1ScoredProductRobustCandidateGenerator.select()` so selection proceeds in this order:

```text
hard-gate invalid candidates removed
trajectory move/rung-floor compatible candidates preferred
recent saturation and same transcript penalties applied
highest remaining score selected
if selected trajectory move has no candidate, emit owned downgrade/blocker
```

Do not let the generator force a product move by choosing an incoherent candidate, a compiler-invalid candidate, or a candidate below the rung floor.

- [ ] **Step 5: Add reroute trace rows**

Add trace rows to the selected result and progression audit so a failed run shows:

```text
preferredMoveId
selectedMoveId
preferredMoveCandidateCount
selectedMoveCandidateCount
sameVisibleTranscriptCandidatesBlocked
rerouteCandidateChosen
finalBlockerOwner
```

- [ ] **Step 6: Update product-spine report with reroute outcomes**

Extend `A1ProductSpineProgressionAuditReport.toMarkdown()` so the report includes a compact reroute table directly after `## Learning Trajectory Decisions`. This table must make it obvious whether the system chose a new path, exhausted valid candidates, or hit material capacity.

- [ ] **Step 7: Verify no safety regression**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_robust_candidate_generator_test.dart \
  test/a1_dialogue_candidate_scoring_test.dart \
  test/a1_product_spine_progression_audit_test.dart \
  -r expanded
```

**Exit criteria:**

```text
selection follows trajectory when capacity exists
rerouting happens before sameVisibleTranscriptRecent becomes final blocker
lower-rung candidates cannot satisfy higher-rung growth
coherence/compiler remain hard gates
```

## Task 23E: Route, Rung, And Move-Sequence Capacity Repair

**Purpose:** Add the actual typed route capacity needed by the trajectory planner and material audit, across packets, move sequences, question demands, realizer surfaces, coherence fixtures, and compiler acceptance.

**Depends on:** Task 23D. If Task 23C identified material blockers, run the material expansion before this task or include it as the first sub-slice with exact capacity targets.

**Files likely to change:**

- `packages/learning_core/lib/src/a1_typed_route_packet_registry.dart`
- `packages/learning_core/lib/src/a1_dialogue_move_sequence_planner.dart`
- `packages/learning_core/lib/src/a1_surface_pattern_inventory.dart`
- `packages/learning_core/lib/src/a1_typed_move_realizer.dart`
- `packages/learning_core/lib/src/a1_coherence_validator.dart`
- `packages/learning_core/lib/src/a1_product_lesson_compiler.dart` only if compiler acceptance exposes a missing field
- `packages/learning_core/test/a1_typed_route_packet_candidate_builder_test.dart`
- `packages/learning_core/test/a1_typed_move_realizer_test.dart`
- `packages/learning_core/test/a1_coherence_validator_test.dart`
- `packages/learning_core/test/a1_product_lesson_compiler_contract_test.dart`

**Capacity groups to implement only when backed by Task 23B/23C evidence:**

```text
detail growth at current rung
contrast growth at rung 4+
sequence growth at rung 5+
choice/ask-back growth at rung 4+
person shift at current rung floor
tense/aspect shift at current rung floor
polarity shift only when verified negative forms exist
neighboring island move with support reuse
```

**Required tests before implementation:**

```text
1. Each new route packet has proof targets, writeback targets, surface patterns, and reusable scope.
2. Each new move sequence has a coherence-accepted positive fixture and an incoherent forced-move negative fixture.
3. Realizer produces no generic bare prompts for new moves.
4. Compiler package carries proof/writeback for every new move family.
5. Candidate builder shows increased capacity for trajectory-selected moves.
```

**Implementation steps:**

- [ ] **Step 1: Start with capacity evidence, not desired transcript shape**

Read the Task 23B trajectory report and Task 23C material capacity report. Choose one failing move family at a time in this priority order unless the reports prove a different first blocker:

```text
sequence_growth at rung 5+
contrast_growth at rung 4+
detail_growth at current rung floor
person_shift or tense_shift at current rung floor
neighboring_island support reuse
```

Record the chosen move family and blocker owner in the task notes before editing code.

- [ ] **Step 2: Add route packet registry tests**

In `packages/learning_core/test/a1_typed_route_packet_registry_test.dart`, add tests proving the selected move family has at least two reusable packets across supported islands or micro-situations. Each packet must assert:

```text
questionDemandId matches the move family
thoughtDepthRung is at or above the intended rung floor
proofTargetIds is not empty
reusableScope is not empty
surfacePatternIds is not empty
required relation ids match the move family
```

- [ ] **Step 3: Add candidate builder capacity tests**

In `packages/learning_core/test/a1_typed_route_packet_candidate_builder_test.dart`, add a fixture graph that has enough compatible facts for the chosen move family and assert:

```text
selected candidate count increases for the selected move
pruned findings distinguish material gaps from route packet gaps
no selected candidate uses a lower rung to satisfy a higher-rung move
```

- [ ] **Step 4: Add move-sequence planner fixtures**

In `packages/learning_core/test/a1_dialogue_move_sequence_planner_test.dart`, add one positive and one negative fixture for the selected move family:

```text
positive: coherent question -> learner answer -> follow-up -> learner proof
negative: forced wrong follow-up demand is rejected with owner code
```

The positive fixture must not use generic prompts such as bare `eh` when the move family requires a specific demand.

- [ ] **Step 5: Add realizer and surface inventory tests**

In `packages/learning_core/test/a1_typed_move_realizer_test.dart`, assert the selected move family realizes:

```text
a specific tutor demand
a learner answer with the required role/fact
a follow-up that advances the same product move
no duplicated first-turn/follow-up question wording
```

If the current `A1SurfacePatternInventory` lacks a required surface, add it there with a move-specific pattern id instead of special-casing one word.

- [ ] **Step 6: Add coherence and compiler contract tests**

In `packages/learning_core/test/a1_coherence_validator_test.dart`, assert the positive fixture passes and the negative forced fixture fails. In `packages/learning_core/test/a1_product_lesson_compiler_contract_test.dart`, assert the compiled package carries:

```text
selected move id or trace equivalent
proof/writeback targets
focus words
question demand id
thought depth rung
learner-visible transcript
```

- [ ] **Step 7: Implement the smallest reusable capacity bundle**

Update the registry/planner/surface/realizer/coherence files needed for the selected move family. The implementation must be global by move capability and metadata role, not by one literal verb or one final transcript.

- [ ] **Step 8: Re-run trajectory and material reports**

Regenerate the product-spine report and material capacity report. The selected move family's capacity row must improve, and any remaining failure must move to the next exact owner code.

- [ ] **Step 9: Repeat only for evidence-backed move families**

Repeat Steps 2-8 for the next move family only when the report shows it is the next product blocker. Do not expand every route family in one uncontrolled patch.

**Verification commands:**

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_typed_route_packet_registry_test.dart \
  test/a1_typed_route_packet_candidate_builder_test.dart \
  test/a1_dialogue_move_sequence_planner_test.dart \
  test/a1_typed_move_realizer_test.dart \
  test/a1_coherence_validator_test.dart \
  test/a1_product_lesson_compiler_contract_test.dart \
  test/a1_product_spine_progression_audit_test.dart \
  -r expanded

/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart analyze \
  lib/src/a1_typed_route_packet_registry.dart \
  lib/src/a1_dialogue_move_sequence_planner.dart \
  lib/src/a1_surface_pattern_inventory.dart \
  lib/src/a1_typed_move_realizer.dart \
  lib/src/a1_coherence_validator.dart \
  lib/src/a1_product_lesson_compiler.dart
```

**Exit criteria:**

```text
new capacity is global/reusable, not one transcript script
capacity covers multiple islands where material supports it
forced bad product moves are rejected
compiler/writeback continues to pass
```

## Task 23F: Rung-Aware Product-Spine Trial

**Purpose:** Prove the whole backend product spine now behaves like a learning trajectory: it places the learner at the right rung, chooses a logical next direction, uses enough material to go there, and produces coherent compiled lessons without fallback.

**Depends on:** Task 23B, Task 23C fork result, Task 23D, and Task 23E.

**Files:**

- Modify: `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- Modify: `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`
- Regenerate:
  - `docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md`
  - `docs/superpowers/audits/2026-06-05-a1-product-spine-composition-ready-harness.md`
  - `docs/superpowers/audits/2026-06-05-a1-product-spine-large-vocab-harness.md`

**Acceptance gates:**

```text
no legacy fallback
no generic prompt fallback
memory projection mismatches remain 0
compiler/writeback remains pass
route novelty/saturation improves from fail to warning/pass
sameVisibleTranscriptRecent is no longer first blocker at the current lesson count
trajectory decisions appear for typed-composition lessons
rung floor is never violated outside refresh/repair
at least three growth directions appear across long-run scenarios
at least one non-reason thought-depth move appears when material supports it
material blockers, if any remain, are exact and owner-coded
```

**Required scenario tests:**

```text
brand_new: starts in bootstrap, graduates only when capacity exists, and does not reset after graduation
composition_ready: starts typed composition and rotates direction after saturation
large_vocab: uses vocabulary breadth without staying in a single route pocket
rung_5_form_ready: selects form/tense/person move at rung floor, not beginner reset
material_pressure: reports material owner when a desired move has insufficient material
```

**Implementation steps:**

- [ ] **Step 1: Add scenario-specific assertions**

In `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`, add or update tests named:

```text
brand_new_path_graduates_without_losing_rung_context
composition_ready_path_rotates_growth_directions
large_vocab_path_uses_breadth_without_single_pocket_lock
rung_five_form_ready_path_never_resets_to_beginner_shape
material_pressure_path_reports_material_owner
```

Each test should assert report rows, not hand-inspect transcripts.

- [ ] **Step 2: Add report metrics that answer the product question**

Extend the audit report with summary values:

```text
typedLessonsGenerated
uniqueVisibleTranscriptCount
uniqueQuestionDemandCount
uniqueGrowthDirectionCount
maxRungReached
rungFloorViolationCount
legacyFallbackCount
genericPromptFallbackCount
memoryProjectionMismatchCount
compilerFailureCount
firstBlockerOwner
```

- [ ] **Step 3: Regenerate long-run reports**

Run brand-new, composition-ready, large-vocabulary, rung-5-form-ready, and material-pressure scenarios for enough lessons to cross the bootstrap/composition boundary. Use at least:

```text
brand_new: 36 lessons
composition_ready: 30 lessons
large_vocab: 30 lessons
rung_5_form_ready: 24 lessons
material_pressure: 12 lessons
```

- [ ] **Step 4: Record before/after lesson shape**

For each report, include a compact readable lesson table:

```text
lesson number
mode
rung floor
selected move
question demand id
island/family
learner-visible transcript
writeback summary
first blocker if generation stops
```

- [ ] **Step 5: Make the next action impossible to confuse**

At the end of each report, write one of these exact next-action labels:

```text
next_action: system_route_capacity
next_action: material_capacity_expansion
next_action: scoring_reroute_policy
next_action: rung_policy_tuning
next_action: compiler_ui_gateway
next_action: ready_for_ui_parity
```

The label must be backed by owner-coded evidence in the report.

- [ ] **Step 6: Verify product-spine acceptance gates**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_product_spine_progression_audit_test.dart \
  -r expanded

/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart analyze \
  lib/src/a1_product_spine_progression_audit.dart \
  test/a1_product_spine_progression_audit_test.dart
```

**Exit criteria:**

```text
the backend product spine demonstrates rung-aware trajectory behavior
remaining blockers are specific enough to choose system repair, material expansion, or UI integration
the next post-23F task can safely be app gateway/UI parity or AI naturalness, not another abstract backend patch
```


## Task 24A: Metadata Source Ownership Audit

**Purpose:** Make the active metadata sources explicit before adding more material, so we do not improve a file that the product path does not exercise.

**Depends on:** Task 23F. Do not change production source loading in this task.

**Files:**

- Read: `apps/mobile/assets/content/egyptian-arabic.json`
- Read: `apps/mobile/assets/content/egyptian-arabic-a1-production.json`
- Read: `apps/mobile/lib/shared/content/kalami_content.dart`
- Read: `apps/mobile/lib/shared/state/providers.dart`
- Read: `packages/learning_core/lib/src/a1_production_metadata_source.dart`
- Read: `packages/learning_core/lib/src/a1_lexeme_metadata_registry.dart`
- Read: `packages/learning_core/lib/src/starter_language_metadata.dart`
- Read: `packages/learning_core/lib/src/a1_material_capacity_audit.dart`
- Create: `docs/superpowers/audits/2026-06-05-a1-metadata-source-ownership-audit.md`

**Implementation result:** Completed in this planning slice. The audit records that the broad mobile asset remains the app default, the newer A1 production manifest has its own parity tests and is bundled as an asset, `StarterLanguageMetadata.v1` remains the execution-quality reference/default in several paths, and `A1ProductionMetadataSource` is the current adapter boundary but is lexeme-first rather than capability-pack-first.

- [x] **Step 1: Inventory file usage**

Run:

```bash
rg -n "egyptian-arabic(\\.json|-a1-production\\.json)|A1ProductionMetadataSource|StarterLanguageMetadata\\.v1|A1MaterialCapacityAudit|A1ProductSpineProgressionAudit\\.defaults|productDefaultsForTest" \
  apps packages docs/superpowers
```

Expected: source ownership is visible enough to classify each file as active product source, bundled candidate, execution reference, adapter, audit fixture, or legacy/reference.

- [x] **Step 2: Record ownership audit**

Create `docs/superpowers/audits/2026-06-05-a1-metadata-source-ownership-audit.md` with:

```text
active mobile default source
bundled curated A1 manifest candidate
starter/native quality reference
current JSON adapter boundary
current route/material capacity source
files that should be harvest/reference only
next required adapter decision
```

- [x] **Step 3: Classify the immediate risk**

The audit must state this exact product risk:

```text
The next material upgrade can fail silently if the new capability pack is authored but the product-spine harness, coordinator, compiler, or UI still reads the broad default asset, native starter metadata, or route-packet-only material capacity.
```

## Task 24B: A1 Core Capability Pack Schema Contract

**Purpose:** Define the JSON shape for a curated capability-first test pack before populating rows. This prevents blind import from old metadata and makes the next material expansion testable.

**Depends on:** Task 24A.

**Files:**

- Modify: `docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md`
- Modify: `docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md`
- Later create in Task 24D: `apps/mobile/assets/content/egyptian-arabic-a1-core-capability-pack.json`

**Implementation result:** Completed in this planning slice. The spec now defines the A1 core capability pack contract and requires the pack to enter the real product path through adapter parity before it can be treated as active material.

- [x] **Step 1: Add schema contract to spec**

Add a section named `A1 Core Capability Pack Contract` that defines:

```text
authored JSON source
execution representation in Dart/repository surfaces
lexemes
verified forms
semantic facts
relation pairs
capability targets
surface examples
readiness flags
priority order
eight balanced A1 islands
material-capacity acceptance gates
```

- [x] **Step 2: Record first pack targets**

The spec must name these first-pack targets:

```text
6-10 useful words per core island
10-15 verb/predicate families with verified form coverage
12-16 reason-compatible relation pairs
12-16 contrast-compatible relation pairs
10-12 sequence-compatible relation pairs
5-8 polarity/negative rows, defaulting to non-production readiness unless explicitly unlocked
```

- [x] **Step 3: Lock the non-import rule**

The spec must require old rows to be classified as:

```text
keep_as_is
keep_but_transform
use_as_reference_only
reject_for_now
```

No old metadata row can enter the capability pack unless it serves a named capability and has verified Franco Arabic/product readiness.

## Task 24C: Existing Metadata Harvest Audit

**Purpose:** Reuse useful work without dragging old product behavior forward. This audit decides how the broad compiled asset, curated production manifest, and native starter metadata should influence the new pack.

**Depends on:** Task 24B.

**Files:**

- Read: `apps/mobile/assets/content/egyptian-arabic.json`
- Read: `apps/mobile/assets/content/egyptian-arabic-a1-production.json`
- Read: `packages/learning_core/lib/src/starter_language_metadata.dart`
- Read: `packages/learning_core/test/a1_production_curriculum_manifest_test.dart`
- Create: `docs/superpowers/audits/2026-06-05-a1-core-capability-pack-harvest-audit.md`

**Implementation result:** Completed in this planning slice. The audit classifies the broad asset as harvest/reference, the A1 production manifest as the best current guide, and `StarterLanguageMetadata.v1` as the execution-quality reference. It also records the first capability-pack scope and the exact next implementation route.

- [x] **Step 1: Compute material distribution**

Run:

```bash
jq -r '.lexical_items[] | select((.progression_band // "") == "a1") | [.id, (.part_of_speech // ""), ((.situation_tags // [])|join("+")), ((.function_tags // [])|join("+")), (.canonical // ""), (.review_status // "")] | @tsv' \
  apps/mobile/assets/content/egyptian-arabic.json

jq -r '.lexical_items[] | [.id, (.part_of_speech // ""), ((.situation_tags // [])|join("+")), ((.function_tags // [])|join("+")), (.canonical // "")] | @tsv' \
  apps/mobile/assets/content/egyptian-arabic-a1-production.json
```

Expected: the audit can name counts for lexemes, verbs, negative/polarity rows, restaurant pressure, and island distribution.

- [x] **Step 2: Classify sources and row families**

Create `docs/superpowers/audits/2026-06-05-a1-core-capability-pack-harvest-audit.md` with:

```text
keep_as_is examples
keep_but_transform examples
use_as_reference_only examples
reject_for_now examples
first capability-pack islands
first capability-pack material targets
next implementation route for Task 24D
```

- [x] **Step 3: State the no-blind-import gate**

The audit must state:

```text
The new pack is capability-first. Existing rows are guide material only until they are reshaped into verified forms, semantic facts, relation pairs, capability targets, readiness flags, and deterministic priority order.
```

## Task 24D.0: Product Spine Convergence Gate

**Purpose:** Prevent the next material and generator tasks from becoming another small-loop patch cycle. Every future product-spine report must say whether it retired the current blocker, reopened an older blocker, or revealed the next exact owner.

**Depends on:** Task 24C.

**Files:**

- Modify: `docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md`
- Later modify in Task 24F/24G:
  - `packages/learning_core/lib/src/a1_material_capacity_audit.dart`
  - `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
  - `packages/learning_core/test/a1_material_capacity_audit_test.dart`
  - `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`

**Implementation result:** Added in this planning slice. Later tasks must wire these fields into the audit reports before claiming product improvement.

- [x] **Step 1: Define blocker regression ledger**

Every product-spine and material-capacity report after Task 24D must track these previously named blockers:

```text
legacy_fallback_used
wrong_metadata_source_used
bootstrap_graduates_too_early
typed_composer_stalls_after_graduation
same_route_repeats
same_transcript_shell_repeats
material_capacity_too_low
route_packet_capacity_too_low
rung_floor_ignored
rich_memory_produces_beginner_lessons
compiler_loses_writeback_facts
memory_writeback_not_consumed_by_next_lesson
food_or_restaurant_dominance
unsupported_franco_surface_used
```

- [x] **Step 2: Define traction metrics**

Every product-spine report after Task 24D must print:

```text
unique_growth_direction_count
unique_route_family_count
unique_question_demand_count
unique_island_count
repeated_opening_prompt_count
repeated_learner_answer_shape_count
repeated_second_exchange_shell_count
max_rung_reached
person_shift_count
tense_shift_count
polarity_shift_count
support_growth_balance_summary
memory_writeback_consumed_by_next_lesson_count
```

- [x] **Step 3: Define convergence verdict**

Every report after Task 24D must end with:

```text
old_blockers_reopened: none|comma_separated_owner_codes
current_primary_blocker: owner_code_or_none
current_secondary_blocker: owner_code_or_none
traction_score_changed: yes|no
next_action: exact_owner
```

Allowed `next_action` values:

```text
next_action: more_capability_pack_material
next_action: typed_generator_route_capacity
next_action: scoring_reroute_policy
next_action: coherence_or_validator
next_action: compiler_writeback_or_ui_gateway
next_action: memory_projection_contract
next_action: ready_for_ui_parity
```

- [x] **Step 4: Define stop rule**

If Task 24D through Task 24G do not improve traction, do not keep adding metadata blindly. Pause and classify:

```text
capacity counts still low -> more_capability_pack_material
capacity counts good but candidates not generated -> typed_generator_route_capacity
candidates generated but rejected -> coherence_or_validator
candidates pass but look stale -> scoring_reroute_policy
lessons compile but next lesson does not change -> memory_projection_contract
compiler payload loses evidence -> compiler_writeback_or_ui_gateway
```

## Task 24D: Build The First A1 Core Capability Pack

**Purpose:** Add the first curated, capability-first metadata pack that is large enough to test whether the typed generator is starved by material or structurally weak.

**Depends on:** Task 24A, Task 24B, Task 24C, and Task 24D.0.

**Files:**

- Create: `apps/mobile/assets/content/egyptian-arabic-a1-core-capability-pack.json`
- Create: `packages/learning_core/test/a1_core_capability_pack_schema_test.dart`
- Later Task 24E, not this task:
  - `packages/learning_core/lib/src/a1_production_metadata_source.dart`
  - `packages/learning_core/lib/src/a1_core_capability_pack_source.dart`
  - `packages/learning_core/lib/src/a1_lexeme_metadata_registry.dart`
  - `packages/learning_core/lib/learning_core.dart`

**Implementation result:** Completed in this slice. The first capability-pack JSON now exists with all required schema sections, balanced eight-island lexeme coverage, 10 starter verb/predicate families with verified person/tense/polarity rows, relation-pair capacity for reason/contrast/sequence/polarity, readiness flags, and deterministic priority order. Adapter wiring was intentionally deferred to Task 24E.

- [x] **Step 1: Write schema/readiness tests first**

Create `packages/learning_core/test/a1_core_capability_pack_schema_test.dart` with tests named:

```text
core_capability_pack_has_required_sections
core_capability_pack_balances_eight_primary_islands
core_capability_pack_verifies_form_rows_before_production_readiness
core_capability_pack_relation_pairs_have_writable_facts
core_capability_pack_priority_order_is_deterministic
```

The tests must load `apps/mobile/assets/content/egyptian-arabic-a1-core-capability-pack.json` and assert the file has:

```text
manifest_id == egyptian_arabic.a1.core_capability_pack.v1
lexemes
verified_forms
semantic_facts
relation_pairs
capability_targets
surface_examples
readiness_flags
priority_order
```

- [x] **Step 2: Create the minimal pack that fails product-capacity gates honestly**

Add the JSON file with reviewed rows only. The first content pass must cover all eight primary islands and at least the first 10 verb/predicate families from the harvest audit. Do not include unreviewed rows, brand/register rows, or restaurant filler.

- [x] **Step 3: Verify schema tests**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_core_capability_pack_schema_test.dart \
  -r expanded
```

Expected: PASS after the pack has required sections and deterministic readiness/priority rules.

## Task 24E: Capability Pack Adapter Parity

**Purpose:** Make the new pack enter the existing product path instead of becoming another isolated metadata sandbox.

**Depends on:** Task 24D.

**Files:**

- Create: `packages/learning_core/test/a1_core_capability_pack_source_test.dart`
- Modify or create:
  - `packages/learning_core/lib/src/a1_core_capability_pack_source.dart`
  - `packages/learning_core/lib/src/a1_production_metadata_source.dart`
  - `packages/learning_core/lib/src/a1_lexeme_metadata_registry.dart`
  - `packages/learning_core/lib/src/language_metadata_repository.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`

- [x] **Step 1: Write adapter parity tests**

The tests must prove representative pack rows compile into:

```text
A1LexemeMetadataRegistry
LanguageMetadataRepository
selectable vs structurallyReady readiness
approved Franco aliases
memory target ids
compatible frame ids
grammar feature ids
slot pool ids
positive/negative counterpart ids
priority order
```

- [x] **Step 2: Implement the narrowest adapter**

Prefer extending `A1ProductionMetadataSource` only if the capability sections fit cleanly. If adding those sections would make the lexeme source muddled, create `A1CoreCapabilityPackSource` that still outputs the same execution surfaces.

- [x] **Step 3: Verify adapter tests**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart test \
  test/a1_core_capability_pack_schema_test.dart \
  test/a1_core_capability_pack_source_test.dart \
  test/a1_production_metadata_source_test.dart \
  test/a1_metadata_source_parity_test.dart \
  -r expanded
```

Expected: PASS, with no regression in the current production-source tests.

**Implementation result:** Completed. `A1CoreCapabilityPackSource` now loads the curated JSON pack into `A1LexemeMetadataRegistry` and `LanguageMetadataRepository` surfaces, preserving readiness, Franco aliases, memory targets, frame ids, grammar axes, positive/negative counterparts, semantic fact ids, material summaries, blocker reporting, and deterministic priority order. The adapter stays separate from `A1ProductionMetadataSource` so the pack contract can evolve without muddling the older broad JSON source.

## Task 24F: Capability Pack Material Capacity Gate

**Purpose:** Make the material capacity audit measure the new capability pack rather than only route-packet inventory.

**Depends on:** Task 24E.

**Files:**

- Modify: `packages/learning_core/lib/src/a1_material_capacity_audit.dart`
- Modify: `packages/learning_core/tool/a1_material_capacity_audit.dart`
- Modify: `packages/learning_core/test/a1_material_capacity_audit_test.dart`
- Regenerate: `docs/superpowers/audits/2026-06-05-a1-material-capacity-report.md`

- [x] **Step 1: Add pack-backed capacity tests**

Add tests that load the new pack and assert before/after-ready rows for:

```text
reason_growth target >= 6 usable, >= 3 islands
contrast_growth target >= 6 usable, >= 3 islands
sequence_growth target >= 5 usable, >= 2 islands
tense_shift target >= 4 usable, >= 2 islands
person_shift target >= 4 usable, >= 2 islands
polarity_shift target >= 3 usable, >= 2 islands
```

- [x] **Step 2: Extend the material audit input**

`A1MaterialCapacityAudit` should accept the capability-pack execution surface as an input collaborator. Keep the current route-packet-only default available for comparison, but the product-spine readiness report must print whether each row is route-packet-limited, material-limited, or both.

- [x] **Step 3: Regenerate the material report**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-stable/bin/cache/dart-sdk/bin/dart run \
  tool/a1_material_capacity_audit.dart \
  --out ../../docs/superpowers/audits/2026-06-05-a1-material-capacity-report.md
```

Expected: the report names exact remaining material blockers or clears them with before/after counts.

**Implementation result:** Completed. `A1MaterialCapacityAudit` now accepts the core capability pack as an input collaborator while keeping route-packet-only defaults for comparison. The regenerated report separates authored material capacity from route-packet capacity. Authored material blockers are now false for the core pack; remaining owners are route-capacity owners for reason, contrast, sequence, tense, and polarity.

## Task 24G: Capability Pack Product-Spine Trial

**Purpose:** Prove the curated capability pack improves the real backend product path, not just metadata tests.

**Depends on:** Task 24F.

**Files:**

- Modify: `packages/learning_core/lib/src/a1_product_spine_progression_audit.dart`
- Modify: `packages/learning_core/tool/a1_product_spine_progression_audit.dart`
- Modify: `packages/learning_core/test/a1_product_spine_progression_audit_test.dart`
- Regenerate:
  - `docs/superpowers/audits/2026-06-05-a1-product-spine-progression-harness.md`
  - `docs/superpowers/audits/2026-06-05-a1-product-spine-large-vocab-harness.md`
  - `docs/superpowers/audits/2026-06-05-a1-product-spine-rung-5-form-ready-harness.md`

- [x] **Step 1: Add a capability-pack lane**

Add a product-spine scenario/lane named:

```text
core_capability_pack
```

It must feed the pack through the same coordinator/compiler loop used by the current harness.

- [x] **Step 2: Add acceptance assertions**

The test must assert:

```text
completed lesson count improves beyond current material-limited baseline
legacyFallbackUsed == false
memoryProjectionMismatchCount == 0
uniqueGrowthDirectionCount >= 5
maxRungReached >= 5 for seeded/rung-ready scenarios
firstBlockerOwnerCode is empty or not material.reason_pair_too_narrow/material.contrast_capacity_too_low/material.sequence_pair_missing/material.tense_shift_forms_missing/material.polarity_forms_missing
```

- [x] **Step 3: Regenerate reports and choose the next owner**

Run the brand-new, large-vocab, and rung-5-form-ready reports with the capability-pack lane. The final `next_action` must be one of:

```text
next_action: typed_generator_route_capacity
next_action: scoring_reroute_policy
next_action: coherence_or_validator
next_action: compiler_ui_gateway
next_action: ready_for_ui_parity
```

If material is still the owner, the report must list the exact missing rows by capability target instead of saying generic material expansion.

**Implementation result:** Completed as a convergence-gate harness, not as a product-green result. The new `core_capability_pack` lane loads the curated pack, seeds the backend product-spine loop through the same coordinator/compiler path, carries a pack-backed material-capacity report, and prints a `## Product Spine Convergence Gate`. The core lane currently completes 4/24 lessons, reaches typed composition immediately, reaches rung floor 5, uses no legacy fallback, has no memory projection mismatch, and has no generic prompt fallback. It does **not** meet the desired diversity threshold yet: unique growth direction remains 1. Because authored material blockers are false while route-capacity blockers remain true, the selected next owner is now `next_action: typed_generator_route_capacity`, not generic material expansion.

## Task 22J: Bounded AI Natural Dialogue Composer Contract

**Purpose:** Add the integration seam for a future AI layer that makes dialogue more natural while preserving the deterministic typed learning contract. The deterministic generator remains the source of allowed vocabulary, grammar axes, facts, and proof requirements.

**Audit finding addressed:** deterministic composition can prove vocabulary and thought growth but may still sound unnatural, especially when optional details are forced into stiff question-answer shapes. AI should improve naturalness without becoming an unbounded lesson generator.

**Files:**

- Create: `packages/learning_core/lib/src/a1_ai_dialogue_contract.dart`
- Create: `packages/learning_core/lib/src/a1_ai_dialogue_validator.dart`
- Create: `packages/learning_core/lib/src/a1_ai_dialogue_composer_adapter.dart`
- Modify: `packages/learning_core/lib/src/a1_coherent_candidate_factory.dart`
- Modify: `packages/learning_core/lib/src/a1_compiler_preflight.dart`
- Modify: `packages/learning_core/lib/learning_core.dart`
- Test: `packages/learning_core/test/a1_ai_dialogue_contract_test.dart`
- Test: `packages/learning_core/test/a1_ai_dialogue_validator_test.dart`
- Test: `packages/learning_core/test/a1_ai_dialogue_fixture_audit_test.dart`

**Implementation progress note:** AI contract, validator, deterministic adapter seam, and fixture audit have been implemented and verified in `packages/learning_core`. The deterministic-candidate-to-AI-contract builder remains open until Task 22I-P proves the metadata-backed production candidate shape that should feed it.

- [x] **Step 1: Add AI contract test**

Create `packages/learning_core/test/a1_ai_dialogue_contract_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('AI composer receives learning contract rather than finished template', () {
    final contract = A1AiDialogueContract(
      requiredGrowthTargets: const ['predicate.study', 'time.tomorrow'],
      allowedKnownVocabulary: const ['ana', 'enta', 'study', 'school', 'tomorrow', 'today', 'work'],
      allowedGrammarAxes: const ['1sg', '2sg', 'future', 'present_or_habitual'],
      semanticIntent: 'ask_when_and_answer_with_place_or_reason',
      requiredPredicateFrames: const ['study_topic_place_time'],
      optionalSupportFacts: const ['works(person.learner, time.today)'],
      forbiddenTargets: const ['predicate.legacy_arc'],
      maxTurns: 4,
      maxUnknownWords: 0,
      expectedFactsToWrite: const ['studies(person.learner, time.tomorrow)'],
      coherenceRules: const ['no_contextless_why', 'second_exchange_must_change_job'],
      learnerLevel: 'A1',
      recentLessonFingerprints: const [],
    );

    expect(contract.requiredGrowthTargets, contains('predicate.study'));
    expect(contract.allowedKnownVocabulary, isNot(contains('history_advanced_unknown')));
    expect(contract.maxUnknownWords, 0);
  });
}
```

- [x] **Step 2: Implement AI dialogue contract**

Create `packages/learning_core/lib/src/a1_ai_dialogue_contract.dart` with immutable fields from Step 1 plus `toTraceMap()`. The trace must include counts and ids needed for audits, but must not include provider-specific prompts or secrets.

- [x] **Step 3: Add AI validator tests**

Create `packages/learning_core/test/a1_ai_dialogue_validator_test.dart`:

```dart
import 'package:learning_core/learning_core.dart';
import 'package:test/test.dart';

void main() {
  test('validator accepts natural dialogue that preserves the learning contract', () {
    final result = A1AiDialogueValidator.defaults().validate(
      contract: A1AiDialogueFixtures.studyTomorrowContract(),
      output: A1AiDialogueFixtures.naturalStudyTomorrowOutput(),
    );

    expect(result.accepted, isTrue);
  });

  test('validator rejects unknown vocabulary and unsupported grammar', () {
    final result = A1AiDialogueValidator.defaults().validate(
      contract: A1AiDialogueFixtures.studyTomorrowContract(),
      output: A1AiDialogueFixtures.unknownWordAndUnsupportedGrammarOutput(),
    );

    expect(result.accepted, isFalse);
    expect(result.ownerCodes, contains('aiDialogue.unknown_vocabulary'));
    expect(result.ownerCodes, contains('aiDialogue.unsupported_grammar_axis'));
    expect(result.ownerCodes, contains('aiDialogue.missing_required_growth_target'));
  });
}
```

- [x] **Step 4: Implement AI validator and adapter seam**

Create:

- `packages/learning_core/lib/src/a1_ai_dialogue_validator.dart`
- `packages/learning_core/lib/src/a1_ai_dialogue_composer_adapter.dart`

Validation checks:

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
maxTurnsRespected
```

Owner codes:

```text
aiDialogue.missing_required_growth_target
aiDialogue.forbidden_target_present
aiDialogue.unknown_vocabulary
aiDialogue.unsupported_grammar_axis
aiDialogue.semantic_intent_lost
aiDialogue.expected_fact_not_writable
aiDialogue.compiler_preflight_failed
aiDialogue.coherence_failed
aiDialogue.recent_fingerprint_repeat
aiDialogue.too_many_turns
```

Adapter modes:

```text
deterministicOnly
constrainedNaturalizer
constrainedDialogueComposer
```

Default production mode remains `deterministicOnly`.

- [x] **Step 5: Add fixture audit for the AI seam**

Create `packages/learning_core/test/a1_ai_dialogue_fixture_audit_test.dart` using a fake adapter. Assert:

- good fixture output is accepted;
- unknown vocabulary is rejected;
- unsupported grammar is rejected;
- missing required growth target is rejected;
- optional awkward detail may be omitted when required facts still write;
- accepted output still passes compiler preflight and coherence validation.

The audit must print accepted natural dialogue and rejected owner codes.

- [ ] **Step 6: Integrate deterministic candidate to AI contract builder**

Modify `packages/learning_core/lib/src/a1_coherent_candidate_factory.dart` so every selected candidate can build an `A1AiDialogueContract` from its deterministic plan.

The contract builder must map:

```text
candidate.growthTargetIds -> requiredGrowthTargets
candidate.knownSupportIds -> allowedKnownVocabulary
candidate.grammarAxes -> allowedGrammarAxes
candidate.predicateFrameIds -> requiredPredicateFrames
candidate.optionalSupportFacts -> optionalSupportFacts
candidate.expectedWritebackFacts -> expectedFactsToWrite
candidate.recentFingerprints -> recentLessonFingerprints
```

- [ ] **Step 7: Verify Task 22J**

Run:

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_ai_dialogue_contract_test.dart \
  test/a1_ai_dialogue_validator_test.dart \
  test/a1_ai_dialogue_fixture_audit_test.dart \
  -r expanded
git diff --check
```

Expected: PASS.

- [ ] **Step 8: Commit Task 22J**

```bash
git add \
  packages/learning_core/lib/src/a1_ai_dialogue_contract.dart \
  packages/learning_core/lib/src/a1_ai_dialogue_validator.dart \
  packages/learning_core/lib/src/a1_ai_dialogue_composer_adapter.dart \
  packages/learning_core/lib/src/a1_coherent_candidate_factory.dart \
  packages/learning_core/lib/src/a1_compiler_preflight.dart \
  packages/learning_core/lib/learning_core.dart \
  packages/learning_core/test/a1_ai_dialogue_contract_test.dart \
  packages/learning_core/test/a1_ai_dialogue_validator_test.dart \
  packages/learning_core/test/a1_ai_dialogue_fixture_audit_test.dart \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md
git commit -m "feat: add bounded A1 AI dialogue contract"
```

## Task 23: Integrated Composition Trace And Audit Report

**Purpose:** Make every selected or rejected A1 candidate explain its composition decision: memory, growth mode, operation, frame, information focus, dialogue obligation, move sequence, semantic compatibility, coherence, compiler materialization, score, and proof/evidence shape.

**Audit finding addressed:** product diversity cannot be trusted if the report only says a route changed; the trace must show whether the lesson is new because of words, form, relation, move path, composition, or thought depth.

**Remediation Decision Record:**

```text
productFailure: after composition exists, failures can still be opaque unless the trace names which product-shape layer selected or rejected each candidate, including direct-claim follow-up opportunities
firstFailingLayer: coordinatorPolicy integration
evidence: the Task 22 pipeline introduces operation/focus/frame/relation/thought-depth/dialogue-obligation/move-sequence/follow-up-opportunity decisions that the old trace does not record
selectedRepair: emit selected and rejected typed-candidate traces with owner-coded blockers, obligation status, move-sequence status, follow-up opportunity status, and scoring terms
whyThisRepairFirst: backend and UI product studies need a single readable account of why similar words produced a fresh or stale lesson
productionBehaviorChanged: FocusCoordinator and audits expose composition trace fields for every selected/rejected candidate
backendProof: coordinator decision audit and mobile product audit include composition trace terms and grouped rejection owners
uiProductCheckpoint: no direct UI text change; UI testing can diagnose missing shape evidence or stale shape selection
remainingOwnedBlocker: productDiversity remains until Task 24 proves multi-start behavior meets the freshness thresholds
```

**Files:**

- Modify: `packages/learning_core/lib/src/focus_coordinator.dart`
- Modify: `packages/learning_core/lib/src/focus_frontier_trace.dart`
- Modify: `packages/learning_core/lib/src/a1_memory_led_progression_audit.dart`
- Modify: `packages/learning_core/lib/src/a1_progression_contracts.dart`
- Modify: `packages/learning_core/test/a1_coordinator_decision_audit_test.dart`
- Modify: `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`

- [ ] **Step 1: Add failing trace expectations**

In `packages/learning_core/test/a1_coordinator_decision_audit_test.dart`, assert selected rows include:

```text
memoryProfile.profile_consumed
coordinatorPolicy.target_bundle_selected
compositionMemory.index_built
semanticFact.projected:<factId>
microSituation.selected:<microSituationId>
compositionOpportunity.growth_mode:<mode>
dialogueOperation.selected:<operationId>
routeFrame.selected:<routeFrameId>
informationFocus.selected:<focusPlanId>
thoughtDepth.selected:<thoughtDepthRung>
dialogueObligation.selected:<obligationId>
dialogueMoveSequence.selected:<sequenceId>
dialogueMoveSequence.fallback_tier:<fallbackTier>
followUpOpportunity.selected:<opportunityId>
followUpAffordance.selected:<affordanceId>
followUpRelation.selected:<relationTypeId>
followUpOpportunity.scoreTerm:<term>
followUpOpportunity.cooldownPenalty:<term>
semanticCompatibility.edge:<edgeId>
surfacePattern.selected:<surfacePatternId>
answerExpectation.selected:<answerExpectationId>
metadataReadiness.route_requirements_consumed
dialogueObligation.validation_passed
dialogueMoveSequence.minimum_exchange_passed
surfaceRealization.contextual_prompt_passed
arcCoherence.typed_validator_passed
compilerMaterialization.preflight_passed
dialogueScoring.term:<scoreTerm>
shapeProof.targets_present
```

Also assert rejected candidates are grouped by first failing owner and include the exact missing operation, route frame, dialogue obligation, move sequence, compatibility edge, metadata field, coherence relation, compiler stage, or evidence path.

For follow-up opportunity rejections, assert the trace includes:

```text
followUpOpportunity.rejected:<ownerCode>
followUpOpportunity.requiredFact:<factId>
followUpOpportunity.requiredCompatibility:<edgeId>
followUpOpportunity.requiredSurface:<surfacePatternId>
```

- [ ] **Step 2: Run and verify failure**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_coordinator_decision_audit_test.dart
```

Expected: FAIL until composition trace fields are emitted.

- [ ] **Step 3: Add trace model fields**

Extend the trace/report models with:

```text
growthMode
operationIds
routeFrameId
informationFocusPlanId
thoughtDepthRung
dialogueObligationIds
dialogueMoveSequenceId
dialogueMoveIds
dialogueFallbackTier
minimumExchangeSatisfied
contextualPromptSatisfied
semanticFactIds
microSituationIds
semanticCompatibilityEdges
surfacePatternIds
answerExpectationIds
supportTargetIds
growthTargetIds
refreshTargetIds
shapeTargetIds
scoreTerms
blockingScoreTerms
repairActionIds
firstFailingOwner
firstFailingCode
repairHint
```

Do not encode these only as free-form strings. Free-form trace reasons may remain for debugging, but audit assertions must read typed fields.

- [ ] **Step 4: Add stale-shape report rows**

Update `A1MemoryLedProductProgressionAudit` so product rows print:

```text
family
arc
routeFrame
operation
focus
thoughtDepth
dialogue obligations
move sequence
move ids
fallback tier
semantic facts
micro-situations
surface patterns
answer expectations
support/growth/refresh ids
shape ids
repair actions
score terms
rejected owner counts
visible transcript fingerprint
visible relation sequence fingerprint
```

The report must make obvious when lessons reused many words but changed operation/focus/relation, and when they merely changed a noun inside the same shell.

- [ ] **Step 5: Verify**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_coordinator_decision_audit_test.dart \
  test/a1_memory_led_progression_audit_test.dart

cd ../../apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_memory_led_product_progression_audit_test.dart \
  --concurrency=1
```

Expected: PASS. Product rows include enough typed trace data to identify why the selected lesson is fresh, stale, blocked, or undercovered.

- [ ] **Step 6: Commit**

```bash
git add \
  packages/learning_core/lib/src/focus_coordinator.dart \
  packages/learning_core/lib/src/focus_frontier_trace.dart \
  packages/learning_core/lib/src/a1_memory_led_progression_audit.dart \
  packages/learning_core/lib/src/a1_progression_contracts.dart \
  packages/learning_core/test/a1_coordinator_decision_audit_test.dart \
  packages/learning_core/test/a1_memory_led_progression_audit_test.dart \
  apps/mobile/test/a1_memory_led_product_progression_audit_test.dart
git commit -m "feat: trace A1 composition decisions"
```

## Task 24: Backend Product Progression Proof

**Purpose:** Prove real backend lesson starts produce memory-led composition diversity: support-growth blends, same-words-new-shape lessons, thought-depth growth, or exact owned blockers.

**Audit finding addressed:** `productDiversity` underdeveloped; earlier rows were all-growth or same-feeling route shells even after memory writes.

**Remediation Decision Record:**

```text
productFailure: several completed lessons still feel too similar, uncumulative, or stuck in short route shells
firstFailingLayer: productDiversity
evidence: product audit rows show allGrowthIslandHopping, repeated relation fingerprints, and same-second-half shapes after memory writes
selectedRepair: strengthen backend multi-start study to require composition diversity, thought-depth growth, or exact owner blocker after remediation
whyThisRepairFirst: backend proof must demonstrate that production selection behavior changed before UI proof
productionBehaviorChanged: production gateway starts must consume memory and return fresh operation/focus/relation/thought-depth rows when viable
backendProof: a1_memory_led_product_progression_audit_test reports supportGrowthBlend, sameWordsNewShape, thoughtDepthGrowth, or owned blockers
uiProductCheckpoint: visible app test waits for Task 25
remainingOwnedBlocker: uiEvidenceLoop owns failure if backend passes and UI does not
```

**Files:**

- Modify: `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`
- Modify: `apps/mobile/test/a1_memory_balanced_focus_progression_test.dart`
- Modify: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`

- [ ] **Step 1: Strengthen backend product test**

In `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`, add:

```dart
expect(
  result.productRows.skip(1).any(
    (row) =>
        row.classification ==
            A1ProgressionClassification.supportGrowthBlend ||
        row.classification ==
            A1ProgressionClassification.sameRouteProductiveReturn ||
        row.scoreTerms.contains('sameWordsNewShape') ||
        row.scoreTerms.contains('thoughtDepthGrowth') ||
        row.growthMode == 'composition_growth' ||
        row.growthMode == 'thought_depth_growth',
  ),
  isTrue,
  reason:
      'after remediation, at least one later backend start must be memory-led composition diversity',
);
expect(
  result.productRows.skip(1).any(
    (row) =>
        row.operationIds.isNotEmpty &&
        row.routeFrameId.isNotEmpty &&
        row.informationFocusPlanId.isNotEmpty &&
        row.microSituationIds.isNotEmpty &&
        row.surfacePatternIds.isNotEmpty &&
        row.answerExpectationIds.isNotEmpty &&
        row.shapeTargetIds.any((id) => id.startsWith('a1.')),
  ),
  isTrue,
  reason:
      'backend product rows must expose operation/frame/focus/micro-situation/surface/answer/shape evidence',
);
expect(
  _uniqueCount(result.productRows.map((row) => row.relationSequenceFingerprint)),
  greaterThanOrEqualTo(2),
  reason:
      'multi-start backend proof must show more than one relation sequence unless owned blockers explain scarcity',
);
expect(
  result.blockers,
  everyElement(
    predicate<A1ProgressionBlockerRow>(
      (blocker) => blocker.isActionable,
      'remaining blockers must be owned and actionable',
    ),
  ),
);
expect(
  result.productRows.skip(1),
  everyElement(
    predicate<dynamic>(
      (row) =>
          (row.repeatedExactSupportSurfaceCount == 0 &&
              row.repeatedSecondHalfShapeCount == 0) ||
          row.blockerCodes.any(
            (code) =>
                code.startsWith('supportPool.') ||
                code.startsWith('metadataReadiness.paradigm_form_unverified') ||
                code.startsWith('metadataReadiness.semantic_compatibility_missing') ||
                code.startsWith('arcCoverage.') ||
                code.startsWith('arcCoherence.') ||
                code.startsWith('compilerMaterialization.'),
          ),
      'exact support-surface or second-half-shape repeats must rotate or be owned by blocker',
    ),
  ),
);
```

Add a small local `_uniqueCount` helper in the test file if one does not already exist. If the audit cannot compute `repeatedSecondHalfShapeCount` or `relationSequenceFingerprint` yet, add those fields in Task 23 instead of weakening this assertion.

- [ ] **Step 2: Run and verify current behavior**

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_memory_led_product_progression_audit_test.dart \
  test/a1_memory_balanced_focus_progression_test.dart \
  --concurrency=1
```

Expected after Tasks 11-23: PASS with at least one support-growth, same-words-new-shape, composition-growth, or thought-depth row. If it fails, use printed blocker owners to return to the first failing layer.

- [ ] **Step 3: Update audit report note**

Append a section to `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`:

```markdown
## Post-Remediation Backend Product Check

- Date:
- Commands:
- Result:
- First composition-diverse row:
- Operation/focus/frame/micro-situation/surface/answer evidence:
- Relation sequence diversity:
- Remaining blockers:
- Next owner:
```

Fill the fields with the actual test output from this task.

- [ ] **Step 4: Commit**

```bash
git add \
  apps/mobile/test/a1_memory_led_product_progression_audit_test.dart \
  apps/mobile/test/a1_memory_balanced_focus_progression_test.dart \
  docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md
git commit -m "test: prove backend A1 memory-led progression"
```

## Task 25: UI Evidence Loop Product Proof

**Purpose:** Prove UI-started Focus completion writes canonical lexical proof plus operation/focus/frame/relation/thought detail evidence through the real app path, then affects the next lesson.

**Audit finding addressed:** `uiEvidenceLoop` and `progressAlignment` risk after backend remediation.

**Remediation Decision Record:**

```text
productFailure: backend progression may improve while app usage still feels unchanged
firstFailingLayer: UI/controller/evidence loop
evidence: spec requires UI-started Focus proof after backend progression passes; Task 16D requires canonical proof targets from learning_core to survive UI completion instead of being replaced by concrete detail targets; Task 22 adds shape targets required for composition growth
selectedRepair: add UI-started multi-lesson proof using production evidence path and the A1LessonProofContract plus Task 22 shape-target mapping
whyThisRepairFirst: user-facing improvement cannot be claimed from backend tests alone
productionBehaviorChanged: UI completion path writes canonical final proof plus practiced lexical/form/operation/focus/frame/relation/thought detail evidence and next start reads current memory
backendProof: backend product progression test from Task 24 passes
uiProductCheckpoint: app/server session should show familiar support anchors, controlled new growth, and new composition shapes after completed lessons, with no canonical or shape target missing from rollups
remainingOwnedBlocker: progressAlignment owns mismatch if Progress and coordinator disagree
```

**Files:**

- Modify: `apps/mobile/test/focus_ui_memory_balanced_progression_test.dart`
- Modify: `apps/mobile/test/a1_memory_led_product_progression_audit_test.dart`
- Modify: `apps/mobile/test/a1_ui_completion_memory_regression_audit_test.dart`
- Modify: `apps/mobile/lib/features/practice/focus_mastery_plan_gateway.dart` if UI path does not consume latest memory
- Modify: `apps/mobile/lib/features/practice/focus_evidence_writer.dart` if UI completion does not write final proof
- Modify: `apps/mobile/lib/shared/persistence/learner_memory_repository.dart` if surface-aware evidence loading drops shape/fact evidence

- [ ] **Step 1: Strengthen UI proof test**

In `apps/mobile/test/focus_ui_memory_balanced_progression_test.dart`, add a test that:

```dart
testWidgets('completed UI Focus proof affects next A1 start', (tester) async {
  // Use the existing app/test harness in this file.
  // Complete the final conversation stage through the same submission path
  // used by the lesson player.
  // Assert every canonical proof target in plan.a1ProofContract reached
  // target memory and surface-aware rollups.
  // Assert concrete component/form targets remain present as detail evidence.
  // Assert a1.operation.*, a1.focus.*, a1.frame.*, a1.relation.*,
  // and a1.thought.* targets from the lesson proof survive into
  // surface-aware evidence events and rollups.
  // Assert practiced semantic fact, micro-situation, surface-pattern,
  // and answer-expectation evidence survives when present in the proof.
  // Start the next Focus session through FocusMasteryPlanGateway.
  // Assert the next selection trace contains memoryProfile.profile_consumed
  // plus compositionMemory.index_built, and either supportGrowthBlend,
  // sameWordsNewShape, thoughtDepthGrowth, or an owned blocker.
});
```

Use the existing helper patterns already present in this test file; do not invent a separate fake evidence writer.

- [ ] **Step 2: Run and verify failure or pass**

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/focus_ui_memory_balanced_progression_test.dart \
  --concurrency=1
```

Expected: PASS if UI is already wired; otherwise FAIL showing whether write, read, or render path is stale.

- [ ] **Step 3: Repair UI evidence loop only if test fails**

If canonical final proof is not written, repair the Task 16D `A1LessonProofContract` mapping through `FocusEvidenceWriter.recordAcceptedEvents` in the lesson completion path.

If concrete detail targets are written but canonical targets are missing, do not patch the coordinator. Repair the UI evidence loop so concrete detail cannot replace canonical proof.

If lexical targets are written but `a1.operation.*`, `a1.focus.*`, `a1.frame.*`, `a1.relation.*`, `a1.thought.*`, practiced semantic fact, micro-situation, surface-pattern, or answer-expectation evidence is missing, repair the proof payload/evidence writer path. Do not hard-code shape history in the coordinator to compensate for missing UI evidence.

If next start reads stale memory, repair `FocusMasteryPlanGateway.start` so it reloads current `LearnerMemoryRepository.loadSurfaceAwareEvidenceEvents()` before coordinator selection.

If selected targets are not visible in rendered stages, repair the stage presenter binding and classify remaining failure as compiler or UI binding.

- [ ] **Step 4: Verify UI proof and backend proof**

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/focus_ui_memory_balanced_progression_test.dart \
  test/a1_ui_completion_memory_regression_audit_test.dart \
  test/a1_memory_led_product_progression_audit_test.dart \
  --concurrency=1
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add \
  apps/mobile/test/focus_ui_memory_balanced_progression_test.dart \
  apps/mobile/test/a1_ui_completion_memory_regression_audit_test.dart \
  apps/mobile/test/a1_memory_led_product_progression_audit_test.dart \
  apps/mobile/lib/features/practice/focus_mastery_plan_gateway.dart \
  apps/mobile/lib/features/practice/focus_evidence_writer.dart \
  apps/mobile/lib/shared/persistence/learner_memory_repository.dart
git commit -m "test: prove UI A1 evidence affects next focus"
```

## Task 26: Manual Server Product Checkpoint

**Purpose:** Let the user operate the app after the first visible remediation set and confirm whether the product feels different.

**Audit finding addressed:** product/UI proof gate.

**Remediation Decision Record:**

```text
productFailure: backend tests may pass while learner experience remains stale, boring, or incoherent
firstFailingLayer: productDiversity
evidence: user explicitly requires UI-visible checkpoints after meaningful milestones
selectedRepair: run server checkpoint and record visible behavior against expected milestone improvements
whyThisRepairFirst: after backend and UI proofs pass, user testing is the only way to validate feel
productionBehaviorChanged: no code change unless checkpoint finds a blocker
backendProof: Tasks 24 and 25 pass
uiProductCheckpoint: user operates several Focus lessons and checks support anchors, controlled growth, same-words-new-shape behavior, thought-depth growth, surface completeness, and coherence
remainingOwnedBlocker: record exact owner if visible behavior still fails
```

**Files:**

- Create: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-ui-checkpoint.md`

- [ ] **Step 1: Start or reuse the app server**

Run the existing project server command from the branch. If the server is already running on `127.0.0.1:7362`, reuse it. Otherwise start the normal mobile/web dev server and report the URL.

- [ ] **Step 2: Ask the user to complete several Focus lessons**

Tell the user to check:

- familiar words appear intentionally as support;
- the same exact support surface does not carry several lessons in a row unless the report names an owned blocker;
- known words can expand into verified nearby forms, such as first-person present to third-person present or first-person future;
- at least one controlled new target appears;
- lesson route, operation, information focus, relation sequence, or thought depth feels meaningfully different;
- returning to a cluster does not repeat the same second-half shell with only the noun swapped;
- when the learner has enough memory, at least one response expands into a connected thought rather than a one-clause answer;
- matching/building/bounded/final cue include selected material;
- question-answer-follow-up chain makes sense.

- [ ] **Step 3: Record checkpoint note**

Create `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-ui-checkpoint.md`:

```markdown
# A1 Memory-Led Coordinator UI Checkpoint

Date: 2026-06-01
Branch: `codex/coordinator-memory-integration`

## Expected Visible Improvements

- Familiar material appears as deliberate support.
- Exact support surfaces rotate or return an owned blocker.
- Paradigm expansion uses verified forms only.
- One or two controlled new targets are introduced.
- Route, operation, focus, relation sequence, or thought depth changes are meaningful.
- Same known words can appear in a different sentence/dialogue shape.
- Repeated second-half shells are blocked or owner-coded.
- Longer connected answers appear when memory supports them.
- Lesson stages include selected words and meanings.
- Conversation chain feels coherent.

## User Observations

Record the user's observations as dated bullet lines. Quote short UI labels or lesson text only when the user supplied them.

## Owner Classification

| observation | owner | next repair |
|---|---|---|

## Decision

- Continue:
- Return to owner task:
```

Fill every field from the actual checkpoint. Do not invent observations.

- [ ] **Step 4: Commit checkpoint**

```bash
git add docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-ui-checkpoint.md
git commit -m "docs: record A1 coordinator UI checkpoint"
```

## Task 27: Final Verification And Remaining Blocker Report

**Purpose:** Prove the implementation phase is complete enough to report honestly and prepare for PR.

**Files:**

- Read: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`
- Read: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-ui-checkpoint.md`
- Modify if needed: `docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md`

- [ ] **Step 1: Run learning core audit suite**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart test \
  test/a1_memory_led_progression_audit_test.dart \
  test/a1_shared_surface_audit_test.dart \
  test/a1_memory_profile_consumption_audit_test.dart \
  test/a1_coordinator_decision_audit_test.dart \
  test/a1_arc_capability_audit_test.dart \
  test/a1_metadata_surface_progression_audit_test.dart \
  test/a1_compiler_materialization_audit_test.dart \
  test/a1_conversation_coherence_progression_audit_test.dart \
  test/a1_coordinator_memory_profile_test.dart \
  test/a1_progression_policy_test.dart \
  test/a1_support_rotation_policy_test.dart \
  test/a1_target_bundle_test.dart
```

Expected: PASS.

- [ ] **Step 2: Run mobile product suite**

```bash
cd apps/mobile
/private/tmp/flutter-sdk/bin/flutter test \
  test/a1_memory_led_product_progression_audit_test.dart \
  test/a1_memory_balanced_focus_progression_test.dart \
  test/focus_ui_memory_balanced_progression_test.dart \
  --concurrency=1
```

Expected: PASS.

- [ ] **Step 3: Run analyzers**

```bash
cd packages/learning_core
/private/tmp/flutter-sdk/bin/cache/dart-sdk/bin/dart analyze

cd ../../apps/mobile
/private/tmp/flutter-sdk/bin/flutter analyze
```

Expected: no new analyzer errors introduced by this plan.

- [ ] **Step 4: Run placeholder scan**

```bash
rg -n "TBD|TODO|FIXME|implement later|description description|supporting line" \
  packages/learning_core/lib \
  packages/learning_core/test \
  apps/mobile/lib \
  apps/mobile/test \
  docs/superpowers/specs/2026-06-01-a1-memory-driven-island-progression-design.md \
  docs/superpowers/plans/2026-06-01-a1-memory-led-coordinator-island-progression-plan.md
```

Expected: no learner-facing placeholder matches. If docs contain intentional "not valid" wording, mention it in the final report rather than editing it out.

- [ ] **Step 5: Final report**

Report to the user:

- what changed in memory profile;
- what changed in coordinator behavior;
- what changed in support rotation and paradigm expansion;
- what changed in route capability;
- what changed in metadata readiness;
- what changed in compiler preflight;
- what changed in coherence validation;
- what changed in backend product progression;
- what changed in UI evidence loop;
- whether the user-visible checkpoint passed;
- remaining owned blockers and next repair task.

- [ ] **Step 6: Commit final report updates if changed**

```bash
git add docs/superpowers/notes/2026-06-01-a1-memory-led-coordinator-audit-report.md
git commit -m "docs: summarize A1 coordinator remediation results"
```
