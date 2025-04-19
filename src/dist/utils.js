
import { mountCallback, updateElement } from "./dom.js";

const stateStore = new Map();
const refStore = new Map();
const instanceMap = new Map();

export function useState(initialValue, { comp, instanceId, ele, vdom }) {
  if (!stateStore.has(instanceId)) {
    stateStore.set(instanceId, {
      value: initialValue,
      comp,
      vdom: vdom,
      ele,
    });
  }

  // Always get the latest state from stateStore
  const currentState = stateStore.get(instanceId);

  const setState = (updater) => {
    const prevState = stateStore.get(instanceId);
    const newValue = typeof updater === 'function' ? updater(prevState.value) : updater;

    // Update the value in stateStore
    stateStore.set(instanceId, {
      ...prevState,
      value: newValue,
    });

    // Schedule an update
    scheduleUpdate(instanceId);
  };

  return [currentState, setState];
}

export function useRef(identifier) {
  const refId = `${currentInstanceId}_${identifier}`;

  if (!refStore.has(refId)) {
    refStore.set(refId, { current: null });
  }

  return refStore.get(refId);
}

let updateQueue = new Set();
let isUpdating = false;

function scheduleUpdate(instanceId) {
  updateQueue.add(instanceId);

  if (!isUpdating) {
    isUpdating = true;
    Promise.resolve().then(processUpdates);
  }
}

function processUpdates() {
  updateQueue.forEach(instanceId => {
    const { comp, vdom, ele } = stateStore.get(instanceId);
    const newVdom = comp();
    updateElement(ele.current, vdom.current ? vdom.current : vdom, newVdom);
    stateStore.set(instanceId, { ...stateStore.get(instanceId), vdom: newVdom });
  });

  updateQueue.clear();
  isUpdating = false;
}

// Instance management
let currentInstanceId = null;

export function trackInstance(instance, id) {
  instanceMap.set(id, instance);
  currentInstanceId = id;
}



export const useEffect = (value, tab) => {
  if (!mountCallback.has(value)) {
    mountCallback.add(value)
  }
}