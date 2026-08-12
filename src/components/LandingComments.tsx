import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, CheckCircle2, ThumbsUp, Sparkles, MessageCircleHeart } from 'lucide-react';
import { sanitizeInput, containsPromptInjection } from '../lib/securityPrompt';

export interface CommentItem {
  id: string;
  name: string;
  role: string;
  rating: number; // 1 to 5
  text: string;
  date: string;
  likes?: number;
}

interface LandingCommentsProps {
  showToast: (msg: string) => void;
}

export default function LandingComments({ showToast }: LandingCommentsProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  // Fetch real comments stored on the server
  const fetchComments = async () => {
    try {
      const res = await fetch('/api/comments');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.comments)) {
          setComments(data.comments);
        }
      }
    } catch (e) {
      console.error('Failed to fetch real comments:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = sanitizeInput(name);
    const cleanRole = sanitizeInput(role);
    const cleanText = sanitizeInput(text);

    if (!cleanName.trim()) {
      showToast('Por favor, informe um nome ou identificação válido.');
      return;
    }
    if (!cleanText.trim()) {
      showToast('Por favor, escreva um comentário ou avaliação válido.');
      return;
    }

    if (containsPromptInjection(text)) {
      showToast('O texto fornecido contém padrões inválidos de entrada.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          role: cleanRole || 'Docente da Rede Estadual',
          rating,
          text: cleanText
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (Array.isArray(data.comments)) {
          setComments(data.comments);
        } else if (data.comment) {
          setComments(prev => [data.comment, ...prev]);
        }
        setName('');
        setRole('');
        setRating(5);
        setText('');
        showToast('Obrigado! Sua avaliação foi gravada e publicada com sucesso.');
      } else {
        showToast(data.error || 'Erro ao publicar avaliação. Tente novamente.');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
      showToast('Erro ao se conectar ao servidor para enviar o comentário.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    if (userLiked[id]) return;
    setUserLiked(prev => ({ ...prev, [id]: true }));

    // Optimistic UI update
    setComments(prev =>
      prev.map(c => (c.id === id ? { ...c, likes: (c.likes || 0) + 1 } : c))
    );

    try {
      await fetch(`/api/comments/${encodeURIComponent(id)}/like`, {
        method: 'POST'
      });
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  const averageRating = comments.length > 0
    ? (comments.reduce((acc, curr) => acc + curr.rating, 0) / comments.length).toFixed(1)
    : '5.0';

  return (
    <section id="comentarios" className="py-16 md:py-24 bg-slate-100/70 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* SECTION HEADER */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs bg-blue-100/80 text-blue-800 font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider border border-blue-200/60 shadow-2xs inline-flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Mural da Comunidade Docente</span>
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Avaliações & Depoimentos dos Professores
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Veja a opinião de colegas educadores da rede estadual e compartilhe sua experiência com a plataforma.
          </p>

          {/* RATING OVERVIEW BADGE */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <div className="flex items-center text-amber-400">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-5 h-5 fill-amber-400 stroke-amber-500" />
              ))}
            </div>
            <span className="text-slate-800 font-black text-lg">{averageRating}</span>
            <span className="text-slate-500 text-xs font-semibold">
              ({comments.length} {comments.length === 1 ? 'avaliação' : 'avaliações'})
            </span>
          </div>
        </div>

        {/* MAIN GRID: FORM + COMMENTS LIST */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* COMMENT FORM CARD */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 md:p-7 shadow-sm space-y-5 sticky top-24">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageCircleHeart className="w-5 h-5 text-blue-600" />
                <span>Deixe sua avaliação</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Seu comentário e avaliação serão compartilhados com a comunidade docente.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* RATING PICKER */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Sua Nota
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (hoverRating || rating)
                            ? 'fill-amber-400 stroke-amber-500'
                            : 'stroke-slate-300 fill-slate-100'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-600 ml-2">
                    {rating} de 5 estrelas
                  </span>
                </div>
              </div>

              {/* NAME INPUT */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Seu Nome / Identificação *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ex: Profª. Maria Silva"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-slate-50/50"
                  required
                />
              </div>

              {/* ROLE / SCHOOL INPUT */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Disciplina / Unidade Escolar <span className="text-slate-400 font-normal">(Opcional)</span>
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  placeholder="Ex: Matemática • EE São Paulo"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-slate-50/50"
                />
              </div>

              {/* COMMENT TEXTAREA */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Comentário ou Sugestão *
                </label>
                <textarea
                  rows={4}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Escreva sua opinião sincera ou sugestão para a comunidade..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-slate-50/50 resize-none"
                  required
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Publicando...' : 'Publicar Avaliação'}</span>
              </button>
            </form>
          </div>

          {/* COMMENTS LIST FEED */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <span>Avaliações Publicadas</span>
                <span className="text-xs font-extrabold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                  {comments.length}
                </span>
              </h3>
              <span className="text-xs text-slate-500">Mural em tempo real</span>
            </div>

            {isLoading ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-slate-500">Carregando avaliações dos usuários...</p>
              </div>
            ) : comments.length === 0 ? (
              /* EMPTY STATE WHEN NO COMMENTS HAVE BEEN SUBMITTED YET */
              <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 max-w-md mx-auto">
                  <h4 className="font-extrabold text-slate-900 text-base">
                    Mural de Avaliações
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Seja o primeiro professor a compartilhar sua experiência, sugestões e opinião sobre a plataforma!
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-block text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl">
                    ✏️ Preencha o formulário ao lado para publicar seu comentário
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {comments.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-extrabold text-sm text-slate-900">{item.name}</h4>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" title="Professor Verificado" />
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">{item.role}</p>
                        </div>
                      </div>

                      {/* STARS DISPLAY */}
                      <div className="flex items-center text-amber-400 shrink-0">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= item.rating
                                ? 'fill-amber-400 stroke-amber-500'
                                : 'stroke-slate-300 fill-slate-100'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                      "{item.text}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                      <span>{item.date}</span>
                      <button
                        onClick={() => handleLike(item.id)}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition cursor-pointer ${
                          userLiked[item.id]
                            ? 'bg-blue-50 text-blue-600 font-bold'
                            : 'hover:bg-slate-100 text-slate-500'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{item.likes || 0} Útil</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
