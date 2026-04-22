const cards = [
  ["A first-time investor asks what a mutual fund does with their money. How would you explain it?", "It pools money from many investors and invests in equity, debt or other securities. A professional fund manager runs it as per the scheme objective.", "Basics", "Easy", ["mutual fund", "pooled investment"]],
  ["A client sees the AMC name on a statement and asks what role it plays. What should you say?", "The AMC manages mutual fund schemes, investment decisions and operations. It works under SEBI mutual fund regulations.", "Basics", "Easy", ["AMC", "fund house"]],
  ["An investor asks why their units have a daily value called NAV. What is NAV?", "NAV is the per-unit value of a mutual fund scheme. It is calculated from scheme assets minus liabilities.", "NAV", "Easy", ["NAV", "unit value"]],
  ["A trainee asks how NAV is calculated at day-end. What formula applies?", "NAV = total scheme assets minus liabilities, divided by total units. It represents value per unit.", "NAV", "Easy", ["NAV", "formula"]],
  ["A client asks what AUM means in a fund factsheet. How do you explain it?", "AUM is the total market value of assets managed by the scheme or fund house. It shows fund size.", "Basics", "Easy", ["AUM", "fund size"]],
  ["An investor notices expense ratio in the SID and asks why it matters. What should you say?", "Expense ratio is the annual cost charged to manage the scheme. It is adjusted in NAV and affects net returns.", "Basics", "Easy", ["expense ratio", "cost"]],
  ["A salaried client wants to invest monthly instead of lump sum. What option fits?", "A SIP invests a fixed amount regularly in a mutual fund. It builds discipline and reduces timing risk.", "SIP", "Easy", ["SIP", "monthly investment"]],
  ["A client wants to move money gradually from liquid fund to equity fund. What should be used?", "Use an STP to transfer a fixed amount between schemes at intervals. Each transfer is redemption plus purchase.", "Transactions", "Easy", ["STP", "switch"]],
  ["A retired investor wants monthly cash flow from an existing fund. What facility can help?", "An SWP allows periodic withdrawal from fund units. Tax applies only on the gain portion of each withdrawal.", "Transactions", "Easy", ["SWP", "withdrawal"]],
  ["A taxpayer asks for a mutual fund option under Section 80C. What can you suggest?", "ELSS is an equity tax-saving fund eligible under Section 80C. Each investment has a 3-year lock-in.", "Taxation", "Easy", ["ELSS", "80C"]],
  ["A client wants to put all money into one sector fund. How do you explain diversification?", "Diversification spreads money across assets, sectors or securities. It helps reduce concentration risk.", "Risk", "Easy", ["diversification", "risk"]],
  ["An investor asks why a fund is compared with Nifty or another index. What is a benchmark?", "A benchmark is an index used to compare scheme performance. It helps judge category-relative returns.", "Basics", "Easy", ["benchmark", "index"]],
  ["A customer asks who decides what securities the scheme buys. What is the fund manager's role?", "The fund manager selects and monitors securities within the scheme mandate. They manage portfolio risk and performance.", "Basics", "Easy", ["fund manager", "portfolio"]],
  ["A new investor asks the difference between equity and debt funds. How do you explain it?", "Equity funds invest mainly in shares and suit long-term goals. Debt funds invest in bonds or money market papers.", "Basics", "Easy", ["equity", "debt"]],
  ["A client asks whether to choose an index fund or active fund. What is the basic difference?", "An index fund tracks a market index. An active fund tries to outperform its benchmark through manager decisions.", "Basics", "Easy", ["index", "active fund"]],
  ["A client wants a mutual fund that trades like a share. What is an ETF?", "An ETF is a fund traded on an exchange through demat. Its market price can differ slightly from NAV.", "Basics", "Easy", ["ETF", "exchange"]],
  ["A client needs to park surplus money for a few days. What is a liquid fund?", "A liquid fund invests in short-term debt and money market instruments. It is used for short parking, not guaranteed returns.", "Basics", "Easy", ["liquid fund", "short term"]],
  ["A client sees higher yield in a credit risk fund. What risk should be explained?", "Credit risk funds invest in lower-rated debt for higher potential return. They carry higher downgrade and default risk.", "Risk", "Medium", ["credit risk", "debt"]],
  ["A client asks whether to use equity for a 6-month goal. How should horizon guide choice?", "Short goals usually need liquid or debt-oriented options. Equity is better suited for longer horizons due to volatility.", "Risk", "Easy", ["horizon", "equity", "debt"]],
  ["A client wants high returns without risk. How do you explain risk-return trade-off?", "Higher return potential usually means higher risk. Mutual fund returns are market-linked and not guaranteed.", "Risk", "Easy", ["risk", "return"]],
  ["An investor confuses face value with NAV. What is the difference?", "Face value is the initial accounting value, often Rs. 10. NAV changes daily with the portfolio value.", "NAV", "Easy", ["face value", "NAV"]],
  ["A client invests Rs. 10,000 and asks how many units they will receive. How are units allotted?", "Units are allotted by investment amount divided by applicable NAV. The applicable NAV depends on cut-off and realization rules.", "NAV", "Easy", ["units", "allotment"]],
  ["A client asks why NAV fell after the market dropped. What explains the movement?", "NAV moves with the market value of securities held by the scheme. Expenses and portfolio changes also affect it.", "NAV", "Easy", ["market", "NAV"]],
  ["A client receives IDCW payout and then sees NAV fall. What should you explain?", "After IDCW payout, NAV falls by roughly the payout amount. Check total value, not NAV alone.", "NAV", "Medium", ["IDCW", "dividend", "NAV"]],
  ["A client wants to redeem early and sees exit load mentioned. What is exit load?", "Exit load is a charge for redeeming within a specified period. It is deducted from redemption proceeds.", "Transactions", "Easy", ["exit load", "redemption"]],
  ["A client asks when exit load will be charged on redemption. What should you check?", "Check the scheme exit load period and each unit's holding date. Load applies only within the specified period.", "Transactions", "Easy", ["exit load", "holding period"]],
  ["A client notices ETF price and NAV are different. How do you explain this?", "ETF NAV comes from underlying assets, while exchange price comes from demand and supply. Premiums or discounts can occur.", "NAV", "Medium", ["ETF", "market price"]],
  ["A client asks why NAV changes every business day. What is the reason?", "NAV changes because portfolio securities move in value and expenses are adjusted. It reflects current scheme value.", "NAV", "Easy", ["NAV", "daily change"]],
  ["A client sees NAV drop on dividend date and thinks they lost money. What should you say?", "A NAV drop can happen due to IDCW payout. Compare units plus payout received, not NAV alone.", "NAV", "Medium", ["NAV", "IDCW"]],
  ["A walk-in client fills a form to buy mutual fund units. What is this transaction called?", "It is a purchase transaction. Units are allotted after valid application and fund realization as per NAV rules.", "Transactions", "Easy", ["purchase", "units"]],
  ["A client wants money back from their mutual fund investment. What transaction is this?", "This is redemption, where units are sold back to the scheme. Payout uses applicable NAV after load, if any.", "Transactions", "Easy", ["redemption", "withdrawal"]],
  ["A client wants to move from one scheme to another within the same AMC. What is this called?", "It is a switch. For NAV and tax, it is treated as redemption from one scheme and purchase into another.", "Transactions", "Easy", ["switch", "AMC"]],
  ["An investor submits a request near the deadline and asks which NAV applies. What is cut-off timing?", "Cut-off timing is the deadline for same-day NAV eligibility. Valid request and fund availability rules both matter.", "NAV Rules", "Medium", ["cut-off", "NAV"]],
  ["A client invests after the cut-off time. Which NAV generally applies?", "For most schemes, investment after cut-off gets next business day's NAV. Fund realization timing also matters.", "NAV Rules", "Easy", ["cut-off", "next NAV"]],
  ["A client asks what T+1 or T+2 means after redemption. How do you explain it?", "T is transaction date; +1 or +2 means business days after it. It indicates expected settlement or payout timeline.", "Transactions", "Easy", ["T+1", "T+2"]],
  ["A client calls with a folio number and asks what it represents. What should you say?", "A folio number is the investor account identifier with the AMC. It tracks holdings, transactions and investor details.", "Transactions", "Easy", ["folio", "account"]],
  ["A client wants to invest but KYC is not validated. What is KYC?", "KYC verifies identity and address for mutual fund investing in India. Without valid KYC, transactions can be blocked.", "Compliance", "Easy", ["KYC", "identity"]],
  ["A client is asked to submit FATCA details while investing. Why is it needed?", "FATCA/CRS captures tax residency and foreign tax status. AMCs require it for regulatory compliance.", "Compliance", "Medium", ["FATCA", "CRS"]],
  ["A client starts SIP and signs an auto-debit form. What is a SIP mandate?", "A SIP mandate authorizes bank auto-debit for installments. NACH or e-mandate is commonly used in India.", "SIP", "Easy", ["mandate", "NACH"]],
  ["A SIP installment fails due to insufficient bank balance. What is this called?", "This is a SIP bounce. The failed installment is usually skipped, while future SIPs continue unless stopped.", "SIP", "Medium", ["SIP bounce", "bank"]],
  ["A client wants to stop SIP before the next debit date. What should be done?", "Submit SIP cancellation or pause request before the AMC/RTA deadline. Bank mandate cancellation may be separate.", "SIP", "Easy", ["SIP cancellation", "pause"]],
  ["A client redeems units and asks when money will reach the bank. What timeline applies?", "Payout depends on scheme type, commonly T+1 or T+2 business days. Correct bank details are essential.", "Transactions", "Easy", ["redemption", "payout"]],
  ["A client asks whether to select growth or IDCW option. What is the difference?", "Growth keeps gains invested in NAV. IDCW may pay distributable surplus, but payout is not guaranteed.", "Transactions", "Easy", ["growth", "IDCW"]],
  ["A client asks why nominee details are requested. What is a nominee?", "A nominee is recorded to receive units or proceeds after investor death. It simplifies transmission documentation.", "Compliance", "Easy", ["nominee", "transmission"]],
  ["A client sells equity mutual fund units after more than 12 months. How is tax handled?", "Equity MF LTCG above Rs. 1.25 lakh in a financial year is taxed at 12.5%. STT conditions apply.", "Taxation", "Medium", ["equity", "LTCG"]],
  ["A client redeems a debt mutual fund and asks about tax. What should you explain?", "Most debt-oriented MF gains are added to income and taxed as per slab. Indexation benefit is generally not available.", "Taxation", "Medium", ["debt", "tax"]],
  ["A client asks the difference between STCG and LTCG. How do you explain it?", "STCG and LTCG depend on how long units were held. Tax rate changes by fund type and holding period.", "Taxation", "Easy", ["STCG", "LTCG"]],
  ["A client asks when equity mutual fund gains become long-term. What is the holding period?", "Equity-oriented mutual fund units held for more than 12 months are long-term. Shorter holding is STCG.", "Taxation", "Easy", ["equity", "holding period"]],
  ["A client receives IDCW payout and asks whether it is taxable. What should you say?", "IDCW is added to investor income and taxed as per slab. TDS may apply above prescribed limits.", "Taxation", "Medium", ["IDCW", "dividend tax"]],
  ["A client switches from one fund to another and asks if tax applies. What is the answer?", "Yes. A switch is redemption plus purchase, so capital gains tax may apply on the switched-out units.", "Taxation", "Medium", ["switch", "capital gains"]],
  ["An investor submits purchase before cut-off, but money reaches the AMC next day. Which NAV applies?", "NAV depends on when funds are available for utilization, not just request time. Next-day realization means next applicable NAV.", "NAV Rules", "Hard", ["fund realization", "cut-off"]],
  ["A client places redemption after the cut-off time. Which NAV will be used?", "For most schemes, redemption after cut-off gets next business day's NAV. Check scheme-specific cut-off rules.", "NAV Rules", "Medium", ["redemption", "cut-off"]],
  ["A SIP date falls on a market holiday. What happens to the SIP?", "The SIP is usually processed on the next business day. NAV follows processing and fund realization rules.", "SIP", "Medium", ["SIP", "holiday"]],
  ["A client switches from Fund A to Fund B and asks which NAV applies. How do you explain it?", "Switch-out uses redemption NAV of the old scheme. Switch-in uses purchase NAV of the new scheme.", "NAV Rules", "Medium", ["switch", "NAV"]],
  ["A client submits a transaction on a stock market holiday. When will it be processed?", "It is generally processed on the next business day. NAV depends on cut-off and realization rules.", "Transactions", "Easy", ["holiday", "business day"]],
  ["A trainee asks why liquid fund NAV rules differ from equity funds. What is the reason?", "Liquid and overnight funds follow special rules because they hold very short-term instruments. Fund availability timing is critical.", "NAV Rules", "Medium", ["liquid fund", "overnight"]],
  ["A client's one SIP installment fails and they worry the SIP is closed. What should you say?", "One failed SIP is usually skipped and the next cycle continues. Repeated failures may trigger cancellation as per AMC rules.", "SIP", "Medium", ["SIP failure", "bounce"]],
  ["A minor investor turns 18 and wants to continue transactions. What is required?", "Update the folio from minor to major with KYC, bank and signature documents. Transactions may pause until done.", "Compliance", "Medium", ["minor", "major", "KYC"]],
  ["An investor dies without nominee registered. How will the units be claimed?", "Legal heirs must follow the transmission process with required legal documents. No nominee means more documentation.", "Compliance", "Medium", ["nominee", "legal heir"]],
  ["A client's KYC status is incomplete during purchase. What happens?", "The transaction may be rejected or blocked until KYC is valid. Complete KYC through KRA, AMC or RTA.", "Compliance", "Easy", ["KYC", "rejection"]],
  ["A client has not submitted FATCA declaration. Can the investment proceed?", "The AMC may restrict or reject the transaction until FATCA/CRS details are submitted. It is mandatory compliance data.", "Compliance", "Medium", ["FATCA", "restriction"]],
  ["A redemption payout fails because bank details are wrong. What should be done?", "Update and validate correct bank details with proof. Payout can be reprocessed after the bank mandate is corrected.", "Transactions", "Medium", ["bank", "redemption"]],
  ["A client has multiple folios with the same AMC and wants easier tracking. What can be suggested?", "Request folio consolidation if investor details and holding pattern match. It simplifies statements and servicing.", "Transactions", "Medium", ["folio", "consolidation"]],
  ["A client asks the branch to apply yesterday's NAV for today's transaction. Is it allowed?", "No. Backdated NAV is not allowed. NAV must follow SEBI cut-off, acceptance and realization rules.", "NAV Rules", "Easy", ["backdated NAV", "SEBI"]],
  ["A client paid for purchase but units are not allotted. What should be checked first?", "Check payment realization, transaction status, KYC, PAN and scheme details. Units need a valid processed transaction.", "Transactions", "Medium", ["units", "payment"]],
  ["A client complains that the applied NAV is different from expected. What should the office verify?", "Verify timestamp, cut-off, fund realization date and scheme type. These decide applicable NAV.", "NAV Rules", "Medium", ["NAV mismatch", "cut-off"]],
  ["The online system was down near cut-off and a client wants same-day NAV. What should be explained?", "Same-day NAV needs valid transaction acceptance as per rules. Escalate per AMC policy, but backdating is not allowed.", "Compliance", "Hard", ["system down", "NAV"]],
  ["A client wants to redeem ELSS units after one year due to urgent need. Can it be done?", "No. Each ELSS investment has a 3-year lock-in. Units can be redeemed only after that lock-in ends.", "Taxation", "Easy", ["ELSS", "lock-in"]],
  ["A retiree uses SWP and asks whether the full withdrawal is taxable. What should you say?", "Tax applies only on the capital gain portion, not the full SWP amount. Each SWP is treated as redemption.", "Taxation", "Medium", ["SWP", "capital gains"]],
  ["A client compares growth and IDCW options for tax impact. What is the practical difference?", "IDCW is taxed as income when paid. Growth is taxed as capital gains when units are redeemed or switched.", "Taxation", "Medium", ["growth", "IDCW"]],
  ["Markets fall sharply and a client wants to stop all equity SIPs. What should you advise cautiously?", "Explain that equity volatility is normal and panic exits can hurt goals. Review risk profile and horizon first.", "Risk", "Medium", ["market crash", "SIP"]],
  ["A client wants to invest only in small-cap funds for high returns. What risk should be highlighted?", "Small-cap funds can be highly volatile and unsuitable as the only holding. Diversification is important.", "Risk", "Medium", ["small cap", "volatility"]],
  ["A retired investor wants heavy equity exposure for monthly expenses. What should be considered?", "Equity exposure should match risk appetite, income need and horizon. Capital protection and liquidity matter in retirement.", "Risk", "Medium", ["retirement", "equity"]],
  ["A client says a low NAV fund is cheaper than a high NAV fund. What should you clarify?", "Low NAV does not mean cheap. Returns depend on portfolio performance, not whether NAV is Rs. 10 or Rs. 100.", "NAV", "Medium", ["low NAV", "misconception"]],
  ["A client compares two funds only because one NAV is Rs. 10 and another is Rs. 100. What should you say?", "NAV level alone does not decide value. Compare risk, performance, portfolio, cost and suitability.", "NAV", "Medium", ["NAV", "comparison"]],
  ["A client chooses a fund only because it gave the best 1-year return. What should be checked?", "Review long-term performance, consistency, benchmark, risk and category fit. One-year returns can mislead.", "Risk", "Medium", ["returns", "performance"]],
  ["A client asks if mutual funds can guarantee returns like an FD. What is the correct response?", "Mutual funds are market-linked and cannot guarantee returns. Even debt funds carry credit and interest-rate risk.", "Risk", "Easy", ["guaranteed returns", "FD"]],
  ["A client wants to wait for the perfect market level before investing. How does SIP help?", "SIP spreads investment across dates and reduces timing risk. It supports disciplined investing in volatile markets.", "SIP", "Medium", ["SIP", "market timing"]],
  ["A client's portfolio is concentrated in one sector fund. What risk exists?", "Sector concentration increases risk because performance depends on one industry. Diversified funds reduce single-theme dependence.", "Risk", "Medium", ["sector", "concentration"]],
  ["A client asks for the single best mutual fund. What is the right office response?", "There is no universal best fund. Suitability depends on goal, horizon, risk profile, tax status and allocation.", "Suitability", "Medium", ["advice", "risk profile"]],
  ["A client wants to invest a large lump sum when markets are high. What practical approach can be suggested?", "Consider staggered investment or STP based on goal and risk profile. This can reduce timing risk.", "Risk", "Medium", ["lump sum", "STP"]],
  ["A client sees short-term loss in an equity fund and wants to redeem. What should you explain?", "Short-term losses are common in equity funds. Review goal horizon before deciding to exit.", "Risk", "Medium", ["loss", "equity"]],
  ["A business owner needs to park money for one week. Which type of fund is more suitable?", "Overnight or liquid funds are generally used for very short-term parking. Returns are market-linked, not guaranteed.", "Risk", "Medium", ["overnight fund", "liquid fund"]],
  ["A client compares FD and mutual fund for safety and returns. How do you explain the difference?", "FDs offer fixed interest terms from the bank. Mutual funds are market-linked and returns can fluctuate.", "Risk", "Easy", ["FD", "market-linked"]],
  ["A client asks for high return with low risk in mutual funds. What should you say?", "High return with low risk is not realistic. Fund choice must match risk appetite, horizon and goal.", "Risk", "Easy", ["risk-return", "expectations"]],
  ["A trainee asks who regulates mutual funds in India. What is SEBI's role?", "SEBI regulates mutual funds, AMCs and intermediaries in India. Its role is investor protection, disclosure and market regulation.", "Compliance", "Easy", ["SEBI", "regulator"]],
  ["A client sees AMFI mentioned in distributor communication. What is AMFI?", "AMFI is India's mutual fund industry association. It supports standards, distributor registration and investor awareness.", "Compliance", "Easy", ["AMFI", "industry body"]],
  ["A customer asks why the distributor mentions an ARN. What is ARN?", "ARN is the AMFI Registration Number for mutual fund distributors. It identifies authorized distributors for transactions.", "Compliance", "Easy", ["ARN", "distributor"]],
  ["A client asks why direct plan returns differ from regular plan returns. What should you explain?", "Direct plans usually have lower expense ratios because distributor commission is not included. Regular plans include distributor costs.", "Compliance", "Easy", ["direct plan", "regular plan"]],
  ["A client is confused between AMC and RTA roles. How do you explain them?", "The AMC manages schemes and investments. The RTA handles investor records, statements, servicing and transaction processing.", "Compliance", "Easy", ["AMC", "RTA"]]
].map(([question, answer, concept, difficulty, tags], index) => ({
  id: `card-${index + 1}`,
  question,
  answer,
  concept,
  difficulty,
  tags
}));

const state = {
  activeIndex: 0,
  filtered: [...cards],
  revealed: false,
  known: new Set(JSON.parse(localStorage.getItem("mf-known-cards") || "[]"))
};

const els = {
  answerText: document.querySelector("#answerText"),
  cardList: document.querySelector("#cardList"),
  cardPosition: document.querySelector("#cardPosition"),
  conceptBadge: document.querySelector("#conceptBadge"),
  conceptFilter: document.querySelector("#conceptFilter"),
  deckCount: document.querySelector("#deckCount"),
  difficultyFilter: document.querySelector("#difficultyFilter"),
  difficultyLabel: document.querySelector("#difficultyLabel"),
  knownBtn: document.querySelector("#knownBtn"),
  knownCount: document.querySelector("#knownCount"),
  nextBtn: document.querySelector("#nextBtn"),
  prevBtn: document.querySelector("#prevBtn"),
  questionText: document.querySelector("#questionText"),
  revealBtn: document.querySelector("#revealBtn"),
  resetBtn: document.querySelector("#resetBtn"),
  searchInput: document.querySelector("#searchInput"),
  shuffleBtn: document.querySelector("#shuffleBtn"),
  tagLine: document.querySelector("#tagLine"),
  totalCount: document.querySelector("#totalCount"),
  visibleCount: document.querySelector("#visibleCount")
};

function init() {
  const concepts = ["All", ...new Set(cards.map((card) => card.concept).sort())];
  els.conceptFilter.innerHTML = concepts.map((concept) => `<option>${concept}</option>`).join("");
  els.totalCount.textContent = cards.length;
  bindEvents();
  applyFilters();
}

function bindEvents() {
  els.searchInput.addEventListener("input", applyFilters);
  els.conceptFilter.addEventListener("change", applyFilters);
  els.difficultyFilter.addEventListener("change", applyFilters);
  els.revealBtn.addEventListener("click", toggleReveal);
  els.knownBtn.addEventListener("click", toggleKnown);
  els.prevBtn.addEventListener("click", () => moveCard(-1));
  els.nextBtn.addEventListener("click", () => moveCard(1));
  els.shuffleBtn.addEventListener("click", shuffleDeck);
  els.resetBtn.addEventListener("click", resetProgress);
  document.addEventListener("keydown", handleKeys);
}

function applyFilters() {
  const query = els.searchInput.value.trim().toLowerCase();
  const concept = els.conceptFilter.value;
  const difficulty = els.difficultyFilter.value;

  state.filtered = cards.filter((card) => {
    const haystack = [card.question, card.answer, card.concept, card.difficulty, ...card.tags].join(" ").toLowerCase();
    return (!query || haystack.includes(query)) &&
      (concept === "All" || card.concept === concept) &&
      (difficulty === "All" || card.difficulty === difficulty);
  });

  state.activeIndex = 0;
  state.revealed = false;
  render();
}

function currentCard() {
  return state.filtered[state.activeIndex];
}

function render() {
  const card = currentCard();
  els.deckCount.textContent = state.filtered.length;
  els.visibleCount.textContent = `${state.filtered.length} card${state.filtered.length === 1 ? "" : "s"}`;
  els.knownCount.textContent = state.known.size;

  if (!card) {
    els.questionText.textContent = "No cards match these filters.";
    els.answerText.hidden = true;
    els.conceptBadge.textContent = "Empty";
    els.tagLine.textContent = "Try another search";
    els.cardPosition.textContent = "0";
    els.difficultyLabel.textContent = "-";
    els.cardList.innerHTML = `<div class="empty-state">No matching flashcards</div>`;
    return;
  }

  els.questionText.textContent = card.question;
  els.answerText.textContent = card.answer;
  els.answerText.hidden = !state.revealed;
  els.conceptBadge.textContent = card.concept;
  els.tagLine.textContent = card.tags.join(" / ");
  els.cardPosition.textContent = `${state.activeIndex + 1} of ${state.filtered.length}`;
  els.difficultyLabel.textContent = card.difficulty;
  els.revealBtn.textContent = state.revealed ? "Hide Answer" : "Reveal Answer";
  els.knownBtn.textContent = state.known.has(card.id) ? "Known" : "Mark Known";
  els.knownBtn.classList.toggle("is-known", state.known.has(card.id));

  renderList();
}

function renderList() {
  els.cardList.innerHTML = state.filtered.map((card, index) => {
    const active = index === state.activeIndex ? " is-active" : "";
    const known = state.known.has(card.id) ? " is-known" : "";
    return `
      <button class="list-card${active}${known}" type="button" data-index="${index}">
        <strong>${escapeHtml(card.concept)}: ${escapeHtml(card.question)}</strong>
        <span>${escapeHtml(card.difficulty)} | ${escapeHtml(card.tags.slice(0, 3).join(", "))}</span>
      </button>
    `;
  }).join("");

  els.cardList.querySelectorAll(".list-card").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeIndex = Number(button.dataset.index);
      state.revealed = false;
      render();
    });
  });
}

function toggleReveal() {
  if (!currentCard()) return;
  state.revealed = !state.revealed;
  render();
}

function toggleKnown() {
  const card = currentCard();
  if (!card) return;
  if (state.known.has(card.id)) {
    state.known.delete(card.id);
  } else {
    state.known.add(card.id);
  }
  saveKnown();
  render();
}

function moveCard(direction) {
  if (!state.filtered.length) return;
  state.activeIndex = (state.activeIndex + direction + state.filtered.length) % state.filtered.length;
  state.revealed = false;
  render();
}

function shuffleDeck() {
  for (let i = state.filtered.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.filtered[i], state.filtered[j]] = [state.filtered[j], state.filtered[i]];
  }
  state.activeIndex = 0;
  state.revealed = false;
  render();
}

function resetProgress() {
  state.known.clear();
  saveKnown();
  render();
}

function handleKeys(event) {
  if (["INPUT", "SELECT"].includes(event.target.tagName)) return;
  if (event.key === "ArrowLeft") moveCard(-1);
  if (event.key === "ArrowRight") moveCard(1);
  if (event.key === " ") {
    event.preventDefault();
    toggleReveal();
  }
  if (event.key.toLowerCase() === "k") toggleKnown();
}

function saveKnown() {
  localStorage.setItem("mf-known-cards", JSON.stringify([...state.known]));
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

init();
