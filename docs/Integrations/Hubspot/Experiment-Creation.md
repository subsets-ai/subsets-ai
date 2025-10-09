# Experiment Creation

Subsets handles the complexity which is required to link an experiment to a segment of users and
the respective HubSpot campaign.

This page will be a concise guide on how to setup an experiment to a HubSpot campaign. Below is a high level overview on
the steps
taken to create an experiment, and link that to the correct campaign. As shown, you are only responsible for writing an
external ID value,
and pasting the campaign URL during the experiment creation Flow. The Demo video will show this in practice.

<div>
  <div style={{display: 'inline-flex', alignItems: 'center', gap: '20px', fontSize: '13px', marginBottom: '10px', fontFamily: 'monospace', padding: '8px 12px', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #e0e0e0'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
      <div style={{width: '12px', height: '12px', backgroundColor: '#e3f2fd', border: '2px solid #2196f3', borderRadius: '3px'}}></div>
      <span>User</span>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
      <div style={{width: '12px', height: '12px', backgroundColor: '#f3e5f5', border: '2px solid #9c27b0', borderRadius: '3px'}}></div>
      <span>Subsets</span>
    </div>
  </div>
</div>

```mermaid
graph LR;
    A["Input External ID<br/>(subsets_experiment_id)"]:::userStep
    B["Paste Campaign URL"]:::userStep
    C["List (Segment) Auto-Inserted into HubSpot"]:::subsetsStep
    D["Experiment Linked to HubSpot Campaign"]:::subsetsStep

    A --> B --> C --> D

    classDef userStep fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,rx:8,ry:8,font-family:monospace
    classDef subsetsStep fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,rx:8,ry:8,font-family:monospace
```

<div style={{position: 'relative', paddingBottom: '56.25%', height: 0}}><iframe style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, borderRadius: '5px'}} src="https://www.tella.tv/video/cmgi8zz0k00dw0dl5es6pezr2/embed?b=0&title=1&a=1&loop=0&t=0&muted=0&wt=0" allowfullscreen allowtransparency></iframe></div>