// KINO research and integration registry — 2026-10-10
// Public documentation links only. No private credentials or implied active integrations.
export const kinoRegistry = Object.freeze({
  property: { address:"870 S Tusa Rd, Maricopa, AZ 85139", parcel:"501-38-107", lot:"203", requestedGrantee:"Ms Kayleen Merissa Loera Guzman Sanchez Daniel", recordedTransferVerified:false, recorder:"https://acclaim.pinalcountyaz.gov/acclaimweb/", software:"https://www.harrisrecordingsolutions.com/products/acclaim/" },
  sites: [
    {name:"KayleenGPT",url:"https://kayleengpt13.netlify.app",repo:"Joaquinloera/Kayleengpt13"},
    {name:"Matcha Manita",url:"https://kayleenllc.netlify.app",repo:"Joaquinloera/matcha-manita"},
    {name:"SonoraPort",url:"https://sonoraportaiholdingllc.com",repo:"Joaquinloera/sonoraport-banking"}
  ],
  integrations: [
    {name:"Dutchie",sector:"dispensary",docs:"https://support.dutchie.com/hc/en-us/articles/27660267271187-Dutchie-POS-API-key-request-process-for-third-party-integrations",status:"research"},
    {name:"Cova",sector:"dispensary",docs:"https://api.covasoft.net/Documentation",status:"research"},
    {name:"BLAZE",sector:"dispensary",docs:"https://apidocs.blaze.me/intro",status:"research"},
    {name:"Sweed",sector:"dispensary",docs:"https://www.sweedpos.com/ecommerce-public-api",status:"research"},
    {name:"Metrc",sector:"compliance",docs:"https://www.metrc.com/track-and-trace-technology/open-api/",status:"research"},
    {name:"AZ ADHS",sector:"licensing",docs:"https://www.azdhs.gov/licensing/marijuana/",status:"research"},
    {name:"Harris Acclaim",sector:"county-recording",docs:"https://www.harrisrecordingsolutions.com/products/acclaim/",status:"research"},
    {name:"GitHub",sector:"code",docs:"https://docs.github.com/en/rest/apps/apps",status:"connected-tool"},
    {name:"Supabase",sector:"database",docs:"https://supabase.com/docs/guides/database/postgres/row-level-security",status:"connected-tool"},
    {name:"Netlify",sector:"deployment",docs:"https://docs.netlify.com/build/configure-builds/build-hooks/",status:"connected-tool"},
    {name:"Stripe",sector:"payments",docs:"https://stripe.com/legal/restricted-businesses",status:"policy-review"}
  ],
  workstreams:["SWARM","SKIM","RECOVER","COMPARE","CODE","TEST","SAVE","VERIFY"],
  internalAgents:["#281102 KINO","#88 CYBERCOM 29.999.00","#2222 SOUTHCOM 29.999.00","#1111 CENTCOM 29.999.00"]
});
