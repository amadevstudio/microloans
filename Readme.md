# Microloan showcase

## Local development

### CMS part
```bash
cd cms
# docker-compose -f docker-compose.dev.yml up --watch
docker-compose -f docker-compose.dev.yml up db
npm run develop
```

### Frontend part
```bash
cd front
npm run codegen
npm run dev
```
