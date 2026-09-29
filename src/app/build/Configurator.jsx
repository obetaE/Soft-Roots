"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/components/cart/useCart";
import {
  buildId,
  buildLook,
  configFromSearchParams,
  configToQuery,
  defaultConfig,
  getSpecs,
  priceBuild,
  trucks,
} from "@/libs/configurator";
import { formatPrice } from "@/libs/products";
import ui from "@/components/ui/ui.module.css";
import styles from "./build.module.css";

// three.js is large and browser-only, so the viewer loads separately from the options panel.
const TruckViewer = dynamic(() => import("./TruckViewer"), {
  ssr: false,
  loading: () => <div className={styles.viewerMessage}>Preparing 3D studio…</div>,
});

const priceLabel = (price) => (price ? `+${formatPrice(price)}` : "Included");

function OptionGroup({ group, config, paintHex, onChoose, onToggle }) {
  const value = config[group.id];
  const multi = group.type === "multi";
  const selected = group.choices.filter((choice) => (multi ? value.includes(choice.id) : choice.id === value));
  const summary = multi
    ? selected.length
      ? `${selected.length} selected`
      : "None selected"
    : `${selected[0].label} · ${priceLabel(selected[0].price)}`;
  const name = `option-${group.id}`;

  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{group.label}</legend>
      <p className={styles.selected}>{summary}</p>

      {group.type === "swatch" ? (
        <div className={styles.swatches}>
          {group.choices.map((choice) => (
            <label key={choice.id} className={styles.swatchOption} title={`${choice.label} (${priceLabel(choice.price)})`}>
              <input
                type="radio"
                name={name}
                value={choice.id}
                checked={value === choice.id}
                onChange={() => onChoose(group.id, choice.id)}
                className={styles.swatchInput}
              />
              <span className={styles.swatch} style={{ background: choice.hex ?? paintHex }} aria-hidden="true" />
              <span className="visually-hidden">
                {choice.label}, {priceLabel(choice.price)}
              </span>
            </label>
          ))}
        </div>
      ) : (
        <div className={styles.cards}>
          {group.choices.map((choice) => {
            const checked = multi ? value.includes(choice.id) : value === choice.id;
            return (
              <label key={choice.id} className={styles.card}>
                <input
                  type={multi ? "checkbox" : "radio"}
                  name={name}
                  value={choice.id}
                  checked={checked}
                  onChange={() => (multi ? onToggle(group.id, choice.id) : onChoose(group.id, choice.id))}
                  className={styles.cardInput}
                />
                <span className={styles.cardBody}>
                  <span className={styles.cardTitle}>
                    <span>{choice.label}</span>
                    <span className={styles.cardPrice}>{priceLabel(choice.price)}</span>
                  </span>
                  {choice.description && <span className={styles.cardDescription}>{choice.description}</span>}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </fieldset>
  );
}

export default function Configurator() {
  const truck = trucks[0];
  const searchParams = useSearchParams();
  const [config, setConfig] = useState(() => configFromSearchParams(truck, searchParams));
  const [headlights, setHeadlights] = useState(false);
  const [status, setStatus] = useState("");
  const statusTimer = useRef(0);
  const { addBuild, getQuantity, ready } = useCart();

  const look = useMemo(() => ({ ...buildLook(truck, config), headlights }), [truck, config, headlights]);
  const pricing = useMemo(() => priceBuild(truck, config), [truck, config]);
  const specs = useMemo(() => getSpecs(truck, config), [truck, config]);
  const inCart = ready ? getQuantity(buildId(truck, config)) : 0;

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  // The URL always mirrors the build, so it can be bookmarked or shared.
  const commit = (next) => {
    setConfig(next);
    window.history.replaceState(null, "", `?${configToQuery(truck, next)}`);
  };

  const choose = (groupId, choiceId) => commit({ ...config, [groupId]: choiceId });

  const toggle = (groupId, choiceId) => {
    const list = config[groupId];
    commit({
      ...config,
      [groupId]: list.includes(choiceId) ? list.filter((id) => id !== choiceId) : [...list, choiceId].sort(),
    });
  };

  const flash = (message) => {
    setStatus(message);
    clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(""), 3500);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flash("Link copied. Share your build!");
    } catch {
      flash("Copy this page’s address to share your build.");
    }
  };

  return (
    <div className={styles.layout}>
      <section className={styles.stage} aria-label="3D preview">
        <div className={styles.stageHeader}>
          <p className={styles.brand}>{truck.brand}</p>
          <h1 className={styles.title}>{truck.model}</h1>
          <p className={styles.tagline}>{truck.tagline}</p>
        </div>
        <TruckViewer truck={truck} look={look} onToggleHeadlights={() => setHeadlights((value) => !value)} />
      </section>

      <section className={styles.panel} aria-label="Configure your truck">
        <div className={styles.panelBody}>
          {truck.groups.map((group) => (
            <OptionGroup
              key={group.id}
              group={group}
              config={config}
              paintHex={look.paint}
              onChoose={choose}
              onToggle={toggle}
            />
          ))}

          <h2 className={styles.legend}>Performance</h2>
          <dl className={styles.specs}>
            {specs.map((spec) => (
              <div key={spec.label} className={styles.spec}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>

          <details className={styles.breakdown}>
            <summary>Price breakdown</summary>
            <ul>
              {pricing.lines.map((line) => (
                <li key={line.label} className={styles.line}>
                  <span>{line.label}</span>
                  <span>{line.price ? formatPrice(line.price) : "Included"}</span>
                </li>
              ))}
            </ul>
          </details>

          <p className={styles.disclaimer}>
            Fictional vehicle and pricing for a portfolio project. <Link href="/terms">Terms &amp; Credits</Link>
          </p>
        </div>

        <div className={styles.summary}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Your build</span>
            <output className={styles.total} aria-live="polite">
              {formatPrice(pricing.total)}
            </output>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${ui.btn} ${ui.btnPrimary}`}
              onClick={() => {
                addBuild(truck.id, config);
                flash("Build added to your cart.");
              }}
            >
              Add Build to Cart
            </button>
            <button type="button" className={`${ui.btn} ${ui.btnOutline} ${styles.shareButton}`} onClick={handleShare}>
              Share
            </button>
          </div>
          <div className={styles.links}>
            <Link href="/book">Book a test drive</Link>
            {inCart > 0 ? (
              <Link href="/cart">In cart ({inCart}) · View cart</Link>
            ) : (
              <button type="button" className={styles.linkButton} onClick={() => commit(defaultConfig(truck))}>
                Reset build
              </button>
            )}
          </div>
          <p className={styles.status} role="status">
            {status}
          </p>
        </div>
      </section>
    </div>
  );
}
